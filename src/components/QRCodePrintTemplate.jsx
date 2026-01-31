export const generateQRPrintHTML = (user, base64data, paypalQrCode = null) => {
  return `
	          <!DOCTYPE html>
<html>
<head>
  <title>QR Code - ${user?.stage_name}</title>
  <meta charset="UTF-8">
  <style>
    @page {
      size: A4;
      margin: 15mm;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Arial', sans-serif;
      color: #333;
      background: white;
      font-size: 14px;
    }

    .print-container {
      max-width: 100%;
      text-align: center;
    }

    /* Header compatto */
    .header {
      margin-bottom: 20px;
      padding-bottom: 15px;
      /* border-bottom: 2px solid #9333ea; ← RIMUOVI QUESTA RIGA */
    }

    .logo-image {
      height: 40px;
      width: auto;
      margin: 0 auto 8px auto;
      display: block;
    }

    .dj-name {
      font-size: 22px;
      color: #1f2937;
      font-weight: 600;
      margin-bottom: 3px;
    }

    .subtitle {
      font-size: 14px;
      color: #6b7280;
    }

    /* QR Code principale compatto */
    .qr-section {
      margin: 20px 0;
      padding: 15px;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      background: #f9fafb;
    }

    .qr-container {
      background: white;
      padding: 12px;
      border-radius: 8px;
      display: inline-block;
      /* border: 2px solid #9333ea; */
    }

    .qr-image {
      width: 160px;
      height: 160px;
      display: block;
      margin: 0 auto;
    }

    .qr-info {
      margin-top: 10px;
      padding: 8px;
      background: #f3f4f6;
      border-radius: 6px;
      font-size: 12px;
    }

    .qr-id {
      font-weight: 600;
      color: #374151;
      margin-bottom: 3px;
    }

    /* Due colonne per le sezioni */
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin: 15px 0;
    }

    /* Box Come Funziona */
    .instructions-box {
      padding: 12px;
      background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
      border: 2px solid #0ea5e9;
      border-radius: 8px;
    }

    .instructions-title {
      font-size: 14px;
      font-weight: bold;
      color: #0c4a6e;
      margin-bottom: 10px;
      text-align: center;
    }

    .step {
      margin: 6px 0;
      padding: 6px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 4px;
      font-size: 11px;
      text-align: left;
    }

    .step-number {
      display: inline-block;
      background: #0ea5e9;
      color: white;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      text-align: center;
      font-size: 10px;
      font-weight: bold;
      margin-right: 6px;
      line-height: 16px;
    }

    /* Box Donazioni con QR */
    .donation-box {
      padding: 12px;
      background: linear-gradient(135deg, #fef3c7, #fbbf24);
      border: 3px solid #d97706;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(217, 119, 6, 0.2);
    }

    .donation-title {
      font-size: 14px;
      font-weight: bold;
      color: #92400e;
      margin-bottom: 10px;
      text-align: center;
    }

    .donation-content {
      display: grid;
      grid-template-columns: 1fr 70px;
      gap: 10px;
      align-items: center;
    }

    .donation-text {
      color: #b45309;
      line-height: 1.3;
      font-size: 10px;
      text-align: left;
    }

    .donation-qr {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .donation-qr-placeholder {
      width: 60px;
      height: 60px;
      border: 2px dashed #d97706;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 8px;
      color: #92400e;
      text-align: center;
      line-height: 1.1;
      font-weight: bold;
    }

    .donation-qr-label {
      font-size: 8px;
      color: #92400e;
      font-weight: bold;
      margin-top: 3px;
      text-align: center;
    }

    .highlight {
      background: rgba(251, 191, 36, 0.3);
      padding: 1px 3px;
      border-radius: 3px;
      font-weight: bold;
    }

    .service-badge {
      background: #059669;
      color: white;
      padding: 2px 4px;
      border-radius: 3px;
      font-weight: bold;
      font-size: 9px;
    }

    /* Footer compatto */
    .footer {
      margin-top: 15px;
      padding-top: 10px;
      border-top: 1px solid #e5e7eb;
      font-size: 10px;
      color: #6b7280;
    }

    .footer-brand {
      font-weight: bold;
      color: #9333ea;
    }

    @media print {
      @page {
        margin: 0 !important;
        padding: 0 !important;
      }
      
      body { 
        font-size: 10pt;
        margin: 1.6cm !important;
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      
      .logo-image { 
        height: 35px;
        width: auto;
      }
      
      .qr-image { 
        width: 140px; 
        height: 140px; 
      }
      
      .step { 
        font-size: 9px; 
      }
      
      .donation-text { 
        font-size: 8px; 
      }
      
      .donation-qr-placeholder { 
        width: 50px; 
        height: 50px; 
        font-size: 7px; 
      }
    }
  </style>
</head>
<body">
  <div class="print-container">
    
    <!-- Header -->
    <div class="header">
  <img src="/logo_print.png" alt="Karaokati Logo" class="logo-image" style="margin-bottom: 20px;" />
  <h1 class="dj-name">${user?.stage_name}</h1>
</div>

    <!-- QR Code principale -->
    <div class="qr-section">
      <div class="qr-container">
        ${base64data 
			? `<img src="${base64data}" alt="QR Code Karaokati" class="qr-image" />`
			: `<div class="qr-placeholder" style="width: 160px; height: 160px; border: 2px dashed #9333ea; display: flex; align-items: center; justify-content: center; background: #f9fafb; border-radius: 8px; margin: 0 auto;">
				<div style="text-align: center; color: #9333ea; font-size: 12px; font-weight: bold;">
					QR CODE<br/>${user?.qr_code_id}
				</div>
				</div>`
			}
      </div>
      <div class="qr-info">
        <div style="font-size: 10px; color: #6b7280; margin-top: 3px;">
          🚀🎤🎵 Scansiona per accedere all'assistente digitale 🎵🎤🚀
        </div>
      </div>
    </div>

    <!-- Griglia con due box -->
    <div class="content-grid">
      
      <!-- Box Come Funziona -->
      <div class="instructions-box">
        <div class="instructions-title">📱 Come Prenotare</div>
        
        <div class="step">
          <span class="step-number">1</span>
          Scansiona il QR code con il telefono
        </div>
        
        <div class="step">
          <span class="step-number">2</span>
          Inserisci l'artista o il titolo della canzone
        </div>

        <div class="step">
          <span class="step-number">3</span>
          Sfoglia il catalogo e prenotati! Il DJ riceverà subito la tua richiesta
        </div>
        
        <div class="step" style="background: rgba(147, 51, 234, 0.1);">
          <span class="step-number">💡</span>
          Nota bene: In ogni momento potrai visualizzare lo stato delle tue prenotazioni o eliminarle
        </div>
        
      </div>

      <!-- Box Donazioni con QR code -->
      <div class="donation-box">
        <div class="donation-title">🎵 Ti piace questo servizio?</div>
        
        <div class="donation-content">
          <div class="donation-text">
            <p style="margin-bottom: 5px;">
              <span class="highlight">Karaokati rende possibile</span> questo sistema di prenotazione digitale per migliorare la tua esperienza karaoke.
            </p>
            <p style="margin-bottom: 5px;">
              Questo servizio è <strong>fondamentale per i DJ</strong> e ci permette di organizzare meglio le serate, ridurre le code e soddisfare tutti i clienti.
            </p>
            <p style="margin-bottom: 5px;">
              <strong>Se ti sta piacendo questo servizio</strong>, considera una piccola donazione per aiutare Karaokati a rimanere gratuito e sempre disponibile.
            </p>
            <p style="font-weight: bold; color: #dc2626; font-size: 9px; text-align: center;">
              🙏 Grazie per supportare l'innovazione nel karaoke!
            </p>
          </div>
          
          <div class="donation-qr">
            ${paypalQrCode 
              ? `<img src="${paypalQrCode}" alt="QR Code Donazione" style="width: 60px; height: 60px; border-radius: 6px;" />`
              : `<div class="donation-qr-placeholder">
                  QR CODE
                  DONAZIONE
                </div>`
            }
            <div class="donation-qr-label">Scansiona<br/>per donare</div>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div class="footer">
      <p>
        <span style="font-weight: bold;">Sistema di prenotazione digitale powered by</span> 
        <span class="footer-brand">Karaokati</span> - 
        <span style="font-style: italic;">Karaoke del futuro</span> © 2026
      </p>
    </div>

  </div>
</body>
</html>
  `;
};