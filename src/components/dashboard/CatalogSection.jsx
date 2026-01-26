import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Music, Search, Upload, FolderOpen, Trash2, Edit2, ChevronLeft, ChevronRight, FileSpreadsheet, Sparkles, Plus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ConfirmDialog from "../ConfirmDialog";
import { apiClient } from "@/api/apiClient";
import { toast } from "sonner";

export default function CatalogSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [showAddSongDialog, setShowAddSongDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);
  const [newSong, setNewSong] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [totalSongs, setTotalSongs] = useState(0);
  
  // 🆕 Stati per upload Excel
  const [selectedFile, setSelectedFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef(null);
  
  // 🆕 Stati per generazione da cartella
  const [generating, setGenerating] = useState(false);
  
  const itemsPerPage = 50;

  // Load songs on component mount
  useEffect(() => {
    loadSongs();
  }, []);

  // Load songs when page or search changes  
  useEffect(() => {
    loadSongs();
  }, [currentPage, searchQuery]);

  const loadSongs = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getSongs({
        search: searchQuery || undefined,
        page: currentPage,
        per_page: itemsPerPage,
      });

      setSongs(response.songs);
      setTotalSongs(response.total);
    } catch (error) {
      console.error('Error loading songs:', error);
      toast.error("Impossibile caricare il catalogo")
    } finally {
      setLoading(false);
    }
  };

  const handleAddSong = async () => {
    if (!newSong.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      await apiClient.addSong({ file_name: newSong.trim() });
      
      setNewSong("");
      setShowAddSongDialog(false);
      await loadSongs(); // Reload to get updated list
      toast.success("Canzone aggiunta al catalogo")
    } catch (error) {
      console.error('Error adding song:', error);
      toast.error("Impossibile aggiungere la canzone")
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSong = (songId) => {
    setSongToDelete(songId);
    setShowDeleteDialog(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Scroll to top della pagina
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const proceedWithDeleteSong = async () => {
    if (!songToDelete) return;
    
    try {
      await apiClient.deleteSong(songToDelete);
      await loadSongs();
      toast.success("Canzone eliminata dal catalogo");
    } catch (error) {
      console.error('Error deleting song:', error);
    } finally {
      setShowDeleteDialog(false);
      setSongToDelete(null);
    }
  };

  const handleClearCatalog = async () => {
    if (!confirm('Sei sicuro di voler eliminare TUTTE le canzoni dal catalogo? Questa azione non può essere annullata.')) {
      return;
    }

    try {
      await apiClient.clearCatalog();
      setSongs([]);
      setTotalSongs(0);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error clearing catalog:', error);
    }
  };

  // 🆕 Funzioni per upload Excel
  const handleFileSelect = () => {
    console.log('🔹 File select clicked');
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('🔹 Selected file:', file.name, file.type);
      setSelectedFile(file);
    }
  };

  const handleImportExcel = async () => {
    if (!selectedFile) {
      toast.error("Seleziona prima un file Excel");
      return;
    }

    // Se il catalogo ha già canzoni, chiedi conferma
    if (totalSongs > 0) {
      setShowReplaceDialog(true);
      return;
    }

    // Procedi direttamente se catalogo vuoto
    await proceedWithImport();
  };

    const proceedWithImport = async () => {
    try {
      setImporting(true);
      const data = await readExcelFile(selectedFile);
      
      if (data.length === 0) {
        toast.error("Il file Excel è vuoto o non contiene dati validi");
        return;
      }

      // Cancella il catalogo esistente se necessario
      if (totalSongs > 0) {
        await apiClient.clearCatalog();
      }

      await apiClient.bulkAddSongs({ songs: data });
      
      setSelectedFile(null);
      setShowImportDialog(false);
      setShowReplaceDialog(false);
      loadSongs();
      toast.success("Canzoni importate con successo")
    } catch (error) {
      console.error('Error importing Excel:', error);
      toast.error("Impossibile importare il file Excel")
    } finally {
      setImporting(false);
    }
  };

  const generateCatalogFromFolder = async () => {
    // Debug dettagliato
    console.log('=== DEBUG DIRECTORY PICKER ===');
    console.log('showDirectoryPicker available:', !!window.showDirectoryPicker);
    console.log('User Agent:', navigator.userAgent);
    console.log('Protocol:', location.protocol);
    console.log('Hostname:', location.hostname);
    console.log('Secure Context:', window.isSecureContext);
    
    // Controlla se l'API esiste
    if (!('showDirectoryPicker' in window)) {
      console.log('❌ showDirectoryPicker NOT in window');
      toast.error("Il tuo browser non supporta la selezione cartelle. Usa 'Importa Massivamente' per selezionare i file");
      return;
    }

    // Controlla se è effettivamente una funzione
    if (typeof window.showDirectoryPicker !== 'function') {
      console.log('❌ showDirectoryPicker is not a function:', typeof window.showDirectoryPicker);
      toast.error("Funzione selezione cartelle non disponibile. Usa 'Importa Massivamente'");
      return;
    }

    console.log('✅ API checks passed, attempting to open picker...');

    try {
      setGenerating(true);
      
      // Prova a chiamare l'API
      const dirHandle = await window.showDirectoryPicker();
      console.log('✅ Directory picker opened successfully');
      
      const audioFiles = [];

      // Scansiona ricorsivamente la cartella
      async function scanDirectory(dirHandle, path = '') {
        for await (const entry of dirHandle.values()) {
          if (entry.kind === 'file') {
            // 🎤 FILTRO FILE AUDIO E KARAOKE COMPLETO
            if (/\.(mp3|wav|flac|aac|mid|midi|kar|ogg|m4a|cdg|kfn|mp4|avi|krk)$/i.test(entry.name)) {
              audioFiles.push(entry.name);
            }
          } else if (entry.kind === 'directory') {
            await scanDirectory(entry, path + entry.name + '/');
          }
        }
      }

      await scanDirectory(dirHandle);
      console.log(`✅ Found ${audioFiles.length} files`);
      
      if (audioFiles.length === 0) {
        toast.error("Nessun file trovato nella cartella selezionata");
        return;
      }

      // Genera Excel
      try {
        const XLSX = await import('xlsx');
        
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([
          ['Titolo Canzone'],
          ...audioFiles.map(file => [file])
        ]);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Catalogo');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `catalogo_da_cartella_${new Date().toLocaleDateString("it-IT").replace(/\//g, "-")}.xlsx`;
        link.click();
        
        toast.success(`🎉 Catalogo Excel Generato con ${audioFiles.length} file!`);
        
      } catch (xlsxError) {
        console.error('XLSX Error:', xlsxError);
        // Fallback CSV...
        toast.success("🎉 Catalogo generato (fallback CSV)!");
      }
      
      setShowGenerateDialog(false);
      
    } catch (error) {
      console.log('❌ Directory picker error:', error);
      console.log('Error name:', error.name);
      console.log('Error message:', error.message);
      
      if (error.name === 'AbortError') {
        console.log('User cancelled');
        return;
      }
      
      // Errore specifico
      let errorMessage = `Errore selezione cartella: ${error.message}`;
      
      if (error.name === 'NotAllowedError') {
        errorMessage = "Permesso negato. Riprova e concedi l'accesso alla cartella";
      } else if (error.name === 'SecurityError') {
        errorMessage = "Errore di sicurezza. Prova su HTTPS o usa 'Importa Massivamente'";
      }
      
      toast.error(errorMessage);
      
    } finally {
      setGenerating(false);
    }
  };

  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      console.log('🔹 Inizio lettura file:', file.name);
      
      if (window.XLSX) {
        processFile();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/xlsx@0.18.5/dist/xlsx.full.min.js';
      script.onload = () => {
        console.log('📊 XLSX caricato da CDN');
        processFile();
      };
      script.onerror = () => {
        reject(new Error('Impossibile caricare la libreria Excel. Controlla la connessione internet.'));
      };
      document.head.appendChild(script);
      
      function processFile() {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = window.XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = window.XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            
            const songs = jsonData
              .slice(jsonData[0] && typeof jsonData[0][0] === 'string' && jsonData[0][0].toLowerCase().includes('titolo') ? 1 : 0)
              .map(row => row[0])
              .filter(song => song && typeof song === 'string' && song.trim())
              .map(song => song.trim());
            
            resolve([...new Set(songs)]);
          } catch (error) {
            reject(new Error('Errore nella lettura del file Excel: ' + error.message));
          }
        };
        
        reader.onerror = () => reject(new Error('Errore nella lettura del file'));
        reader.readAsArrayBuffer(file);
      }
    });
  };

  const handleCloseImportDialog = () => {
    setSelectedFile(null);
    setShowImportDialog(false);
  };

  const totalPages = Math.ceil(totalSongs / itemsPerPage);
  const filteredSongs = songs; // Songs are already filtered by the API

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">Catalogo Canzoni</h2>
          <p className="text-gray-400">Gestisci e configura il tuo catalogo</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border-2 border-cyan-700/30 bg-cyan-900/10 backdrop-blur-sm rounded-xl p-5">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-cyan-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex-1">
              <div className="text-base font-semibold text-cyan-200 mb-1">Genera Catalogo Automaticamente</div>
              <div className="text-sm text-cyan-400/80">Crea automaticamente un Excel dai tuoi file audio</div>
            </div>
          </div>
          <Button 
            onClick={() => setShowGenerateDialog(true)}
            size="sm"
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Genera
          </Button>
        </div>

        <div className="border-2 border-purple-800/30 bg-purple-900/10 backdrop-blur-sm rounded-xl p-5">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Upload className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="text-base font-semibold text-purple-200 mb-1">Importa Massivamente</div>
              <div className="text-sm text-purple-400/80">Carica un file Excel con le tue canzoni</div>
            </div>
          </div>
          <Button 
            onClick={() => setShowImportDialog(true)}
            size="sm"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            Importa
          </Button>
        </div>

        <div className="border-2 border-gray-700/30 bg-gray-800/30 backdrop-blur-sm rounded-xl p-5">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-gray-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="text-base font-semibold text-gray-200 mb-1">Aggiungi Canzone</div>
              <div className="text-sm text-gray-400/80">Inserisci una canzone manualmente</div>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddSongDialog(true)}
            size="sm"
            variant="outline"
            className="w-full border-gray-600/20 bg-gray-600/20 text-gray-300 hover:text-white hover:bg-gray-800/50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Aggiungi
          </Button>
        </div>
      </div>

      {/* Add Song Dialog */}
      <Dialog open={showAddSongDialog} onOpenChange={setShowAddSongDialog}>
        <DialogContent className="bg-gray-900 border-purple-800/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Aggiungi Canzone</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="songName" className="text-gray-300">Nome Canzone</Label>
              <Input
                id="songName"
                placeholder="Es. Artista - Titolo - Versione.mp3"
                value={newSong}
                onChange={(e) => setNewSong(e.target.value)}
                className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500"
              />
              <p className="text-xs text-gray-500">
                Inserisci il nome come vuoi che appaia nel catalogo
              </p>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowAddSongDialog(false);
                  setNewSong("");
                }}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                Annulla
              </Button>
              <Button
                onClick={handleAddSong}
                disabled={!newSong.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Aggiungi
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showImportDialog} onOpenChange={handleCloseImportDialog}>
        <DialogContent className="bg-gray-900 border-purple-800/30 text-white max-w-3xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Upload className="w-6 h-6 text-purple-400" />
              Importa Canzoni Massivamente
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Hai già un file Excel con le tue canzoni? Importalo direttamente nel tuo catalogo
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div className="bg-purple-900/30 border border-purple-700/50 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3 text-purple-300">📋 Come funziona</h3>
              <ol className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                  <span><strong>Prepara il tuo Excel:</strong> Assicurati che il file abbia una sola colonna con intestazione "Titolo Canzone" e una canzone per riga</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                  <span><strong>Seleziona il file:</strong> Clicca nell'area qui sotto per caricare il tuo file Excel (.xlsx, .xls)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                  <span><strong>Importa nel catalogo:</strong> Tutte le canzoni verranno aggiunte automaticamente al tuo catalogo karaoke</span>
                </li>
              </ol>
              
              <div className="mt-4 pt-3 border-t border-purple-700/30">
                <div className="font-semibold text-purple-300 mb-2">Esempio formato Excel:</div>
                <div className="bg-gray-800/50 p-3 rounded border border-gray-700 font-mono text-sm">
                  <div className="text-purple-400 font-bold">Titolo Canzone</div>
                  <div className="text-gray-300">Volare.midi</div>
                  <div className="text-gray-300">Hotel California - Eagles.mp3</div>
                  <div className="text-gray-300">Azzurro_Celentano_1968.mp3</div>
                  <div className="text-gray-300">Bohemian Rhapsody (Queen).midi</div>
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-blue-900/30 border border-blue-700/50 rounded">
                <p className="text-sm text-blue-300">
                  💡 <strong>Non hai un Excel?</strong> Usa "Genera Catalogo Automaticamente" per crearlo dalla tua cartella di file audio
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div 
                className="border-2 border-dashed border-purple-700/50 rounded-lg p-8 text-center hover:border-purple-600/70 transition-colors cursor-pointer"
                onClick={handleFileSelect}
              >
                <FileSpreadsheet className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                {selectedFile ? (
                  <div>
                    <p className="text-green-400 mb-2">✅ File selezionato:</p>
                    <p className="text-white font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-300 mb-2">Clicca per selezionare il file Excel</p>
                    <p className="text-sm text-gray-500">Supporta .xlsx, .xls</p>
                  </div>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="ghost"
                onClick={handleCloseImportDialog}
                disabled={importing}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                Annulla
              </Button>
              <Button 
                onClick={handleImportExcel}
                disabled={!selectedFile || importing}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {importing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                {importing ? "Importando..." : "Importa Canzoni"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <DialogContent className="bg-gray-900 border-purple-800/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              Genera Catalogo Automaticamente
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Seleziona una cartella per scansionare automaticamente tutti i file audio e generare un file Excel
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div className="bg-cyan-900/30 border border-cyan-700/50 rounded-lg p-4">
        <h3 className="font-bold text-lg mb-3 text-cyan-300">📁 Come funziona</h3>
        <ol className="space-y-3 text-sm text-gray-300">
          <li className="flex items-start gap-3">
            <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
            <span><strong>Organizza i tuoi file:</strong> Metti tutti i file audio/karaoke in una cartella principale del tuo computer. Puoi organizzarli come preferisci: senza suddivisione oppure in sottocartelle per artista, genere, ecc.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
            <span><strong>Clicca "Seleziona Cartella":</strong> Il browser ti chiederà di scegliere la cartella principale. Seleziona quella che contiene tutti i tuoi file musicali.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
            <span><strong>Scansione automatica:</strong> Il sistema analizzerà automaticamente la cartella e tutte le eventuali sottocartelle, trovando ogni file audio presente.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
            <span><strong>Download del catalogo:</strong> Verrà generato e scaricato automaticamente un file Excel con tutti i titoli trovati, pronto per l'importazione nel tuo catalogo.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">5</span>
            <span><strong>Importa il catalogo:</strong> Una volta scaricato il catalogo utilizza il bottone <strong>"Importa Massivamente"</strong> per caricare il catalogo</span>
          </li>
        </ol>
        
        <div className="mt-4 pt-3 border-t border-cyan-700/30">
          <p className="text-xs text-gray-400 mb-2">
            <strong>Formati supportati:</strong> MP3, WAV, FLAC, AAC, OGG, M4A, MIDI, KAR, CDG, KFN, MP4, AVI, KRK
          </p>
          <p className="text-xs text-gray-400">
            <strong>Browser supportati:</strong> Chrome e Edge
          </p>
        </div>
      </div>

            <div className="space-y-3">
              <button 
                onClick={generateCatalogFromFolder}
                disabled={generating}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 py-3 text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-white font-medium"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Scansionando cartella...
                  </>
                ) : (
                  <>
                    <FolderOpen className="w-5 h-5" />
                    Seleziona Cartella e Genera Excel
                  </>
                )}
              </button>
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="ghost"
                onClick={() => setShowGenerateDialog(false)}
                disabled={generating}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                Chiudi
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {songs.length === 0 && !searchQuery ? (
        <Card className="border-purple-800/30 bg-gray-800/50 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Nessun catalogo o canzone aggiunta
            </h3>
            <p className="text-gray-400 mb-6">
              Inizia caricando il tuo primo catalogo
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="border-purple-800/30 bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">{searchQuery ? totalSongs : totalSongs}</div>
                  <div className="text-sm text-gray-400">{searchQuery ? "Risultati Trovati" : "Brani Totali nel Catalogo"}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-800/30 bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  placeholder="Cerca nel nome del file..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 h-12 bg-gray-900/50 border-purple-800/50 text-white placeholder:text-gray-500"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-800/30 bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">
                  {searchQuery ? `Risultati per "${searchQuery}"` : "Il tuo Catalogo"}
                </CardTitle>
                <div className="text-sm text-gray-400">
                  Pagina {currentPage} di {totalPages || 1}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 bg-gray-900/50 rounded-lg text-sm font-medium text-gray-400">
                  <div className="col-span-10">Nome File</div>
                  {/* <div className="col-span-2">Azioni</div> */}
                </div>
                {songs.map((song, index) => (
                  <div
                    key={song.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-4 bg-gray-900/30 border border-purple-800/20 rounded-lg hover:border-purple-600/50 hover:shadow-lg hover:shadow-purple-900/20 transition-all"
                  >
                    <div className="col-span-1 md:col-span-10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Music className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white break-all">{song.file_name}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredSongs.length === 0 && searchQuery && (
                <div className="text-center py-12">
                  <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Nessuna canzone trovata
                  </h3>
                  <p className="text-gray-400">
                    Prova a modificare i termini di ricerca
                  </p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-purple-800/30">
                  <Button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-gray-800/50 disabled:opacity-30"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Precedente
                  </Button>

                  <Button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-gray-800/50 disabled:opacity-30"
                  >
                    Successiva
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Conferma eliminazione canzone */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Elimina Canzone"
        description="Sei sicuro di voler eliminare questa canzone? Questa azione non può essere annullata."
        onConfirm={proceedWithDeleteSong}
        confirmText="Elimina"
        variant="danger"
      />

      {/* Conferma sostituzione catalogo */}
      <ConfirmDialog
        open={showReplaceDialog}
        onOpenChange={setShowReplaceDialog}
        title="Sostituisci Catalogo"
        description={`Attenzione: hai già ${totalSongs} canzoni nel catalogo. L'importazione cancellerà tutto il catalogo esistente e lo sostituirà con le canzoni del file Excel. Vuoi continuare?`}
        onConfirm={proceedWithImport}
        confirmText="Sì, Sostituisci"
        variant="danger"
      />
    </div>
  );
}