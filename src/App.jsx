import { useState } from 'react';
import confetti from 'canvas-confetti';
import { CATEGORIES, INITIAL_TASKS } from './data';
import KanbanColumn from './components/KanbanColumn';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import AddModal from './components/AddModal'; // Asegúrate de que el archivo se llame así

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const handleOpenAddModal = (categoryId) => {
    setActiveCategoryId(categoryId);
    setIsAddModalOpen(true);
  };

  const confirmAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      category: activeCategoryId,
      isFlipped: false
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleComplete = (taskToComplete) => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    setTasks(prev => prev.map(t => 
      t.id === taskToComplete.id ? { ...t, category: '🏆', isFlipped: true } : t
    ));
  };

  const handleFlip = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isFlipped: true } : t));
  };

  const handleUnflip = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isFlipped: false } : t));
  };

  const handleDeleteRequest = (id) => setDeleteCandidate(id);
  
  const confirmDelete = () => {
    setTasks(prev => prev.filter(t => t.id !== deleteCandidate));
    setDeleteCandidate(null);
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find(t => t.id === id);
    const newText = prompt("Edita el texto:", taskToEdit.text);
    if (newText) setTasks(prev => prev.map(t => t.id === id ? { ...t, text: newText } : t));
  };

  const pickRandom = (categoryId) => {
    const closedTasks = tasks.filter(t => t.category === categoryId && !t.isFlipped);
    if (closedTasks.length === 0) return;
    const randomTask = closedTasks[Math.floor(Math.random() * closedTasks.length)];
    handleFlip(randomTask.id);
  };

  // Buscamos el nombre de la categoría activa de forma segura
  const activeCategoryObj = Object.values(CATEGORIES).find(c => c.id === activeCategoryId);
  const activeCategoryName = activeCategoryObj ? activeCategoryObj.name : "";

  return (
    <div className="min-h-screen p-6 md:p-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-purple-500 to-teal-500">
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
            onDeleteRequest={handleDeleteRequest}
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
        <ConfirmDeleteModal onConfirm={confirmDelete} onCancel={() => setDeleteCandidate(null)} />
      )}
    </div>
  );
}