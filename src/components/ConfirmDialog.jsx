import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  onConfirm,
  confirmText = "Conferma",
  cancelText = "Annulla",
  variant = "danger" // "danger" or "warning"
}) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-red-800/30 text-white max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              variant === "danger" 
                ? "bg-red-900/50 border border-red-700/50" 
                : "bg-yellow-900/50 border border-yellow-700/50"
            }`}>
              <AlertTriangle className={`w-6 h-6 ${
                variant === "danger" ? "text-red-400" : "text-yellow-400"
              }`} />
            </div>
            <DialogTitle className="text-xl">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-gray-400 text-sm pt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex gap-3 justify-end mt-6">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-gray-300 hover:text-white hover:bg-gray-800/50"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            className={`${
              variant === "danger"
                ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                : "bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
            }`}
          >
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}