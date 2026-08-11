export interface Skill {
  name: string;
  level: number; // 0..99 or 100 or negative numbers
  raw?: string; // original level e.g. "5", "5+1", "-1"
}

export interface Member {
  name: string;
  nickname: string;
  birthday: string;
  description: string;
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  image: string;
  skills: Skill[];
}

export const members: Member[] = [
  // TIER S
  {
    name: 'José',
    nickname: 'Gato',
    birthday: '25 de Jun',
    description: 'Admin supremo del grupo de WhatsApp. Se encuentra en su arco de redención fitness, bajando de peso para que el Duel Disk no le apriete el brazo.',
    tier: 'S',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jose',
    skills: [
      { name: 'Estresar Gatos', level: 99, raw: '5' },
      { name: 'Tenis', level: 80, raw: '4' },
      { name: 'Programador / QA', level: 80, raw: '4' }
    ]
  },
  {
    name: 'Gaby',
    nickname: 'Negativo',
    birthday: '18 de Oct - 2000',
    description: 'Líder oficial de las decisiones rechazadas. Su habilidad especial es activar una Trap Card de "No" a cualquier plan divertido. Rata negativa por naturaleza.',
    tier: 'S',
    image: '/members/gaby.jpg',
    skills: [
      { name: 'Negatividad', level: 100, raw: '5+1' },
      { name: 'Pokémon', level: 60, raw: '3' },
      { name: 'Cocina', level: -20, raw: '-1' }
    ]
  },
  {
    name: 'JR',
    nickname: 'El Adicto',
    birthday: '20 de Ago - 1994',
    description: 'Su sangre es 50% hemoglobina y 50% tinta de carta de Yu-Gi-Oh!. Si no está jugando, está pensando en el próximo combo prohibido.',
    tier: 'S',
    image: '/members/jr.jpg',
    skills: [
      { name: 'Videojuegos', level: 99, raw: '5' },
      { name: 'Cocina', level: 80, raw: '4' },
      { name: 'Peluquería', level: 60, raw: '3' }
    ]
  },
  {
    name: 'Enzo',
    nickname: 'Enzo',
    birthday: '4 de Jul',
    description: 'Un pilar fundamental de la mesa. Siempre listo para el duelo, nunca para la derrota.',
    tier: 'S',
    image: '/members/enzo.jpg',
    skills: [
      { name: 'Atención al Público', level: 60, raw: '3' },
      { name: 'Memoria', level: 0, raw: '0' },
      { name: 'Pelos', level: -20, raw: '-1' },
      { name: 'Motociclista', level: 60, raw: '3' }
    ]
  },
  {
    name: 'Funda',
    nickname: 'Funda',
    birthday: '27 de Ago',
    description: 'Protege sus cartas y su honor con la misma intensidad. Un Gurruboy de pura cepa.',
    tier: 'S',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Funda',
    skills: [
      { name: 'Fitness', level: 80, raw: '4' },
      { name: 'Papá', level: 99, raw: '5' }
    ]
  },

  // TIER A
  {
    name: 'Nico',
    nickname: 'Nico',
    birthday: '25 de Feb',
    description: 'Gurruboy de alto rango. Sus jugadas son tan limpias como su historial de victorias.',
    tier: 'A',
    image: '/members/nico.jpg',
    skills: [
      { name: 'Estudios', level: 99, raw: '5' },
      { name: 'Buena Gente', level: 80, raw: '4' }
    ]
  },
  {
    name: 'Diego',
    nickname: 'Diego',
    birthday: '5 de Jul',
    description: 'Estratega nato. Dicen que puede leer tu mano solo con el sonido de las cartas al barajarse.',
    tier: 'A',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diego',
    skills: [
      { name: 'Vóley', level: 80, raw: '4' },
      { name: 'Disolver Sociedades', level: 99, raw: '5' }
    ]
  },
  {
    name: 'Fede',
    nickname: 'Fede',
    birthday: '23 de Nov - 1985',
    description: 'Anfitrión de lujo y duelista de temer. Su casa es el Coliseo donde se forjan las leyendas.',
    tier: 'A',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fede',
    skills: [
      { name: 'Belleza', level: 99, raw: '5' },
      { name: 'Inteligencia', level: 99, raw: '5' },
      { name: 'Partes del Cuerpo', level: -80, raw: '-4' }
    ]
  },
  {
    name: 'Bauty',
    nickname: 'Bauty',
    birthday: '5 de Dic',
    description: 'Joven promesa que ya es realidad. No te fíes de su cara amable en medio de un duelo.',
    tier: 'A',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bauti',
    skills: [
      { name: 'Idiomas', level: 99, raw: '5' },
      { name: 'Ajedrez', level: 60, raw: '3' },
      { name: 'Trampas', level: 80, raw: '4' }
    ]
  },
  {
    name: 'Zaphkyel',
    nickname: 'Zaphkyel',
    birthday: '7 de Feb',
    description: 'Sus jugadas son eléctricas. Aparece y desaparece del meta con la velocidad del rayo.',
    tier: 'A',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zap',
    skills: [
      { name: 'Gym', level: 99, raw: '5' },
      { name: 'Ingeniero', level: 40, raw: '2' },
      { name: 'Morbo', level: 100, raw: '5+1' },
      { name: 'Inversiones', level: 80, raw: '4' }
    ]
  },
  {
    name: 'Marcos',
    nickname: 'Marcos',
    birthday: 'A confirmar',
    description: 'Consistencia pura. Te saca a patadas de un boliche o te prepara un rico café.',
    tier: 'A',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcos',
    skills: [
      { name: 'Bipolaridad', level: 99, raw: '5' },
      { name: 'Bouncer / Barista', level: 99, raw: '5' },
      { name: 'Vivir de Noche', level: 80, raw: '4' }
    ]
  },
  {
    name: 'Fito',
    nickname: 'Juez Fito',
    birthday: '12 de Oct',
    description: 'Juez oficial del grupo. Solo juega Genesys y decks "fun" (que solo son divertidos para él mientras te gana).',
    tier: 'A',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fito',
    skills: [
      { name: 'Misterio', level: 80, raw: '4' },
      { name: 'Anti-Meta', level: 80, raw: '4' }
    ]
  },

  // TIER B
  {
    name: 'Hada',
    nickname: 'Hada',
    birthday: '20 de Abr',
    description: 'Otro que duda de su identidad "Boy". Estamos investigando si es por su mazo de hadas o por una crisis existencial.',
    tier: 'B',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hada',
    skills: [
      { name: 'Manoseo', level: 80, raw: '4' },
      { name: 'Romper Celus', level: 99, raw: '5' },
      { name: '7 Oficios', level: 99, raw: '5' }
    ]
  },
  {
    name: 'Leo Flor',
    nickname: 'Flor',
    birthday: '30 de Abr',
    description: 'A un paso de la gloria. Está farmeando experiencia para subir a la A, solo le falta un Top 8.',
    tier: 'B',
    image: '/members/pablo.jpg',
    skills: [
      { name: 'Anti-Meta', level: 99, raw: '5' },
      { name: 'Manualidades', level: 80, raw: '4' }
    ]
  },
  {
    name: 'DjAlex',
    nickname: 'El Fantasma',
    birthday: '24 de Jun',
    description: 'Leyenda urbana. Se dice que si vas a una juntada y hay luna llena, Alex tampoco viene.',
    tier: 'B',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    skills: [
      { name: 'Audios Molestos', level: 99, raw: '5' },
      { name: 'DJ', level: 80, raw: '4' },
      { name: 'Asistencia', level: 15, raw: '1' }
    ]
  },
  {
    name: 'Amir Pablo',
    nickname: 'Amir',
    birthday: '31 de mar',
    description: 'No estuvo desde el Génesis, pero se ganó su lugar. Su asistencia es como un drop rate de carta rara: difícil pero apreciada.',
    tier: 'B',
    image: '/members/pablo.jpg',
    skills: [
      { name: 'Chambeador', level: 99, raw: '5' },
      { name: 'Buena Gente', level: 80, raw: '4' },
      { name: 'Anti-Meta', level: 80, raw: '4' }
    ]
  },
  {
    name: 'Mario',
    nickname: 'El Desertor',
    birthday: '20 de Jun',
    description: 'Jugador de Magic. Nos abandonó por el maná, pero el corazón siempre vuelve al Reino de los Duelos.',
    tier: 'B',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mario',
    skills: [
      { name: 'Magic', level: 80, raw: '4' },
      { name: 'Olfato', level: -40, raw: '-2' }
    ]
  },
  {
    name: 'Lau',
    nickname: 'Lau',
    birthday: '4 de Ene',
    description: 'No viene seguido, pero cuando aparece, el aura de buena gente sube el nivel del grupo.',
    tier: 'B',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lau',
    skills: [
      { name: 'Cocina', level: 80, raw: '4' },
      { name: 'Yu-Gi-Oh!', level: 40, raw: '2' },
      { name: 'Gym', level: 60, raw: '3' }
    ]
  },
  {
    name: 'Manu',
    nickname: 'Manu',
    birthday: 'A confirmar',
    description: 'Nos abandonó, pero su sombra aún recorre las mesas de juego. Se lo extraña (a veces).',
    tier: 'B',
    image: '/members/manu.jpg',
    skills: [
      { name: 'El Único Normal', level: 99, raw: '5' },
      { name: 'Zapatero', level: 99, raw: '5' },
      { name: 'Asistencia', level: 0, raw: '0' }
    ]
  },

  // TIER C
  {
    name: 'Leo Musculoso',
    nickname: 'Musculoso',
    birthday: '5 de Julio',
    description: 'Dice que no se siente muy Gurruboy, pero tiene más esencia que un sobre de 1ra Edición. Una leyenda que siempre vuelve.',
    tier: 'C',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo',
    skills: [
      { name: 'Misterio', level: 99, raw: '5' },
      { name: 'Mentiroso', level: 80, raw: '4' },
      { name: 'Emprendedor', level: 99, raw: '5' },
      { name: 'Fitness', level: 80, raw: '4' }
    ]
  }
];
