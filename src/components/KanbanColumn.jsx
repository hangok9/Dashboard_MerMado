import MysteryCard from './MysteryCard';
import { Dices, Plus, Ghost } from 'lucide-react';

export default function KanbanColumn({ category, tasks, onComplete, onDeleteRequest, onEdit, onFlip, onUnflip, onPickRandom, onAddTask }) {
  const colTasks = tasks.filter(t => t.category === category.id);
  const hasUnflipped = colTasks.some(t => !t.isFlipped);

  return (
    /* He cambiado h-[75vh] por h-[85vh] para ganar espacio hacia abajo */
    <div className="min-w-[320px] w-[320px] h-[85vh] flex-shrink-0 bg-white/40 backdrop-blur-md rounded-3xl p-5 border border-white/50 shadow-xl snap-center flex flex-col">
      
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-white/40">
        <h2 className="text-xl font-semibold text-slate-800 tracking-wide flex items-center gap-2">
          <span className="text-2xl">{category.id}</span>
          {category.name}
        </h2>
        
        <div className="flex gap-1">
          {category.type === 'mystery' && hasUnflipped && (
            <button onClick={() => onPickRandom(category.id)} className="p-2 text-slate-500 hover:bg-white/60 hover:text-indigo-600 rounded-full transition-all bg-white/30">
              <Dices size={18} strokeWidth={2.5} />
            </button>
          )}
          {category.id !== '🏆' && (
            <button onClick={() => onAddTask(category.id)} className="p-2 text-slate-500 hover:bg-white/60 hover:text-rose-600 rounded-full transition-all bg-white/30">
              <Plus size={18} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
      
      {/* El div de abajo ya tiene 'overflow-y-auto', lo que permite el scroll si hay muchas tareas */}
      <div className="flex flex-col flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0">
        {colTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400/80 italic gap-3">
            <Ghost size={36} strokeWidth={1.5} className="opacity-40" />
            <p className="text-sm font-medium">Aún no hay nada aquí...</p>
          </div>
        ) : (
          colTasks.map(task => (
            <MysteryCard 
              key={task.id} 
              task={task} 
              categoryType={category.type}
              onComplete={onComplete} 
              onDeleteRequest={onDeleteRequest}
              onEdit={onEdit} 
              onFlip={onFlip}
              onUnflip={onUnflip}
            />
          ))
        )}
      </div>
    </div>
  );
}