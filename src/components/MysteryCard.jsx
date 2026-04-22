import { motion } from 'framer-motion';
import { Check, Pencil, Trash2, RotateCcw } from 'lucide-react';

export default function MysteryCard({ task, categoryType, onComplete, onDeleteRequest, onEdit, onFlip, onUnflip }) {
  const isMystery = categoryType === 'mystery';
  // Mostramos el frontal si: no es misterio, o ya se ha volteado, o está en recuerdos
  const showFront = !isMystery || task.isFlipped || task.category === '🏆';

  return (
    <motion.div 
      className="relative w-full h-32 mb-4 cursor-pointer group"
      style={{ perspective: 1000 }} 
      // Solo permitimos hacer clic para voltear (abrir) si es misterio y está boca abajo
      onClick={() => isMystery && !task.isFlipped && onFlip(task.id)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="w-full h-full relative rounded-xl shadow-lg"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: showFront ? 0 : 180 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        {/* CARA TRASERA (Misterio - Estilo Baraja Premium) */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/70 to-white/20 backdrop-blur-xl rounded-xl card-pattern shadow-[inset_0_0_20px_rgba(255,255,255,0.6)] border border-white/60"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Borde interior decorativo */}
          <div className="absolute inset-2 border border-white/40 rounded-lg pointer-events-none"></div>
          <span className="text-5xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">
            {task.category}
          </span>
        </div>

        {/* CARA FRONTAL (Contenido) */}
        <div 
          className="absolute inset-0 p-4 flex flex-col justify-between bg-white/70 backdrop-blur-2xl rounded-xl border border-white/60 shadow-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <p className="text-sm text-slate-700 font-medium leading-tight overflow-hidden text-ellipsis line-clamp-3">
            {task.text}
          </p>
          
          <div className="flex justify-between items-center mt-2" onClick={(e) => e.stopPropagation()}>
             {/* NUEVO BOTÓN: Volver a ocultar (Solo para cartas misteriosas volteadas) */}
             <div>
              {isMystery && task.category !== '🏆' && task.isFlipped && (
                 <button 
                   onClick={(e) => {
                     e.stopPropagation();
                     onUnflip(task.id);
                   }} 
                   className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors flex items-center gap-1 text-xs font-semibold" 
                   title="Volver a ocultar"
                 >
                   <RotateCcw size={14} strokeWidth={2.5} />
                 </button>
              )}
             </div>

            {/* Controles de Acción (Completar, Editar, Borrar) */}
            <div className="flex gap-1">
              {task.category !== '🏆' && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); onComplete(task); }} className="p-2 text-teal-600 hover:bg-teal-50 hover:text-teal-700 rounded-full transition-colors" title="Completar">
                    <Check size={16} strokeWidth={2.5} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onEdit(task.id); }} className="p-2 text-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition-colors" title="Editar">
                    <Pencil size={16} strokeWidth={2.5} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onDeleteRequest(task.id); }} className="p-2 text-rose-400 hover:bg-rose-50 hover:text-rose-600 rounded-full transition-colors" title="Borrar (Error)">
                    <Trash2 size={16} strokeWidth={2.5} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}