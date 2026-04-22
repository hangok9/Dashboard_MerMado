import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlusCircle } from 'lucide-react';

export default function AddModal({ isOpen, onClose, onAdd, categoryName }) {
  const [text, setText] = useState('');

  // Limpiar el input cada vez que se abre el modal
  useEffect(() => {
    if (isOpen) setText('');
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay con desenfoque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Ventana del Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white/60 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
          >
            {/* Decoración sutil de fondo */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-500/10 rounded-xl text-rose-600">
                    <PlusCircle size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Añadir a <span className="text-rose-600">{categoryName}</span>
                  </h3>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2 ml-1">
                    ¿Qué tienes en mente?
                  </label>
                  <textarea
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Escribe aquí tu plan, idea o tema..."
                    className="w-full bg-white/40 border border-white/60 rounded-2xl p-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500/50 transition-all resize-none h-32"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3.5 rounded-2xl font-bold text-slate-500 hover:bg-black/5 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={!text.trim()}
                    className="flex-1 px-6 py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-bold shadow-lg shadow-rose-500/20 transition-all transform active:scale-95"
                  >
                    Guardar plan
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}