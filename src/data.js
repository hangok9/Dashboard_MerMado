export const CATEGORIES = {
  conversacion: { id: '🗣️', name: 'Conversación', type: 'mystery' },
  discusion: { id: '🧱', name: 'Evitar discusión', type: 'mystery' },
  serios: { id: '🌱', name: 'Serios', type: 'mystery' },
  spicy: { id: '🌶️', name: 'Spicy', type: 'mystery' },
  organizar: { id: '📆', name: 'A organizar', type: 'normal' },
  pelis: { id: '🎬', name: 'Pelis', type: 'normal' },
  cocina: { id: '👩🏼‍🍳', name: 'Cocina', type: 'normal' },
  planes: { id: '🌟', name: 'Planes', type: 'mystery' },
  rutas: { id: '🏎️', name: 'Viajes', type: 'normal' },
  recuerdos: { id: '🏆', name: 'Recuerdos', type: 'normal' } 
};

export const INITIAL_TASKS = [
  { id: 1, text: "mirar que se puede hacer 24-25-26 ametlla", category: '📆', isFlipped: false },
  { id: 2, text: "¿Hemos perdido la chispa?", category: '🗣️', isFlipped: false },
  { id: 3, text: "Aclarar que temas podemos hablar y cuáles no", category: '🧱', isFlipped: false },
  { id: 4, text: "Thailandes (si no se puede el 23)", category: '🌟', isFlipped: false },
  { id: 5, text: "Cuando tenemos un desacuerdo pequeño, cómo nos sentimos", category: '🌱', isFlipped: false }
];