import { motion } from 'framer-motion';

export default function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/80 p-6 rounded-2xl shadow-xl backdrop-blur-md max-w-sm text-center border border-white/40"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-2">⚠️ ¿Seguro que es un error?</h3>
        <p className="text-sm text-gray-600 mb-6">
          Recuerda: si ya lo hemos hecho, usa el botón de Completar (✅) para guardarlo en Recuerdos. Confirma para eliminar definitivamente.
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow-md">
            Borrar Error
          </button>
        </div>
      </motion.div>
    </div>
  );
}