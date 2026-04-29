import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { supabase } from './supabaseClient';
import { CATEGORIES } from './data';
import KanbanColumn from './components/KanbanColumn';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import AddModal from './components/AddModal';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  // 1. CARGAR DATOS Y ESCUCHAR CAMBIOS (REALTIME)
  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await supabase.from('tasks').select('*').order('created_at', { ascending: true });
      if (data) setTasks(data);
    };

    fetchTasks();

    // Suscripción Realtime: Actualiza la web de los dos al segundo
    const channel = supabase
      .channel('tasks-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        fetchTasks();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // 2. FUNCIONES DE ACCIÓN (CONECTADAS A LA NUBE)
  const confirmAddTask = async (text) => {
    await supabase.from('tasks').insert([{ 
      text, 
      category: activeCategoryId, 
      isFlipped: false 
    }]);
    setIsAddModalOpen(false);
  };

  const handleFlip = async (id) => {
    await supabase.from('tasks').update({ isFlipped: true }).eq('id', id);
  };

  const handleUnflip = async (id) => {
    await supabase.from('tasks').update({ isFlipped: false }).eq('id', id);
  };

  const handleComplete = async (taskToComplete) => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    // Según la regla: "Lo que se acaba se mueve al archivo, no se borra"[cite: 2]
    await supabase.from('tasks').update({ category: '🏆', isFlipped: true }).eq('id', taskToComplete.id);
  };

  const confirmDelete = async () => {
    await supabase.from('tasks').delete().eq('id', deleteCandidate);
    setDeleteCandidate(null);
  };

  const handleEdit = async (id) => {
    const taskToEdit = tasks.find(t => t.id === id);
    const newText = prompt("Edita el texto:", taskToEdit.text);
    if (newText) {
      await supabase.from('tasks').update({ text: newText }).eq('id', id);
    }
  };

  // 3. LOGICA AUXILIAR
  const handleOpenAddModal = (categoryId) => {
    setActiveCategoryId(categoryId);
    setIsAddModalOpen(true);
  };

  const pickRandom = (categoryId) => {
    const closedTasks = tasks.filter(t => t.category === categoryId && !t.isFlipped);
    if (closedTasks.length === 0) return;
    const randomTask = closedTasks[Math.floor(Math.random() * closedTasks.length)];
    handleFlip(randomTask.id);
  };

  const activeCategoryName = Object.values(CATEGORIES).find(c => c.id === activeCategoryId)?.name || "";

  return (
    <div className="min-h-screen p-6 md:p-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-purple-500 to-teal-500 drop-shadow-sm">
          ✨ Nuestro Dashboard
        </span>
      </h1>

      <div className="flex gap-8 overflow-x-auto pb-10 snap-x snap-mandatory items-start">
        {Object.values(CATEGORIES).map(cat => (
          <KanbanColumn 
            key={cat.id} 
            category={cat} 
            tasks={tasks}
            onComplete={handleComplete}
            onDeleteRequest={setDeleteCandidate}
            onEdit={handleEdit}
            onFlip={handleFlip}
            onUnflip={handleUnflip}
            onPickRandom={pickRandom}
            onAddTask={handleOpenAddModal}
          />
        ))}
      </div>

      <AddModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={confirmAddTask}
        categoryName={activeCategoryName}
      />

      {deleteCandidate && (
        <ConfirmDeleteModal 
          onConfirm={confirmDelete} 
          onCancel={() => setDeleteCandidate(null)} 
        />
      )}
    </div>
  );
}