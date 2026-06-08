export interface Member {
  name: string;
  nickname: string;
  birthday: string;
  description: string;
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  image: string;
}

export const members: Member[] = [
  // TIER S
  {
    name: 'José',
    nickname: 'Gato',
    birthday: '25 de Jun',
    description: 'Admin supremo del grupo de WhatsApp. Se encuentra en su arco de redención fitness, bajando de peso para que el Duel Disk no le apriete el brazo.',
    tier: 'S',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jose'
  },
  {
    name: 'Gaby',
    nickname: 'Negativo',
    birthday: '18 de Oct - 2000',
    description: 'Líder oficial de las decisiones rechazadas. Su habilidad especial es activar una Trap Card de "No" a cualquier plan divertido. Rata negativa por naturaleza.',
    tier: 'S',
    image: '/members/gaby.jpg'
  },
  {
    name: 'JR',
    nickname: 'El Adicto',
    birthday: '20 de Ago - 1994',
    description: 'Su sangre es 50% hemoglobina y 50% tinta de carta de Yu-Gi-Oh!. Si no está jugando, está pensando en el próximo combo prohibido.',
    tier: 'S',
    image: '/members/jr.jpg'
  },
  {
    name: 'Enzo',
    nickname: 'Enzo',
    birthday: '4 de Jul',
    description: 'Un pilar fundamental de la mesa. Siempre listo para el duelo, nunca para la derrota.',
    tier: 'S',
    image: '/members/enzo.jpg'
  },
  {
    name: 'Funda',
    nickname: 'Funda',
    birthday: '27 de Ago',
    description: 'Protege sus cartas y su honor con la misma intensidad. Un Gurruboy de pura cepa.',
    tier: 'S',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Funda'
  },
  // TIER A
  {
    name: 'Nico',
    nickname: 'Nico',
    birthday: '25 de Feb',
    description: 'Gurruboy de alto rango. Sus jugadas son tan limpias como su historial de victorias.',
    tier: 'A',
    image: '/members/nico.jpg'
  },
  {
    name: 'Diego',
    nickname: 'Diego',
    birthday: '5 de Jul',
    description: 'Estratega nato. Dicen que puede leer tu mano solo con el sonido de las cartas al barajarse.',
    tier: 'A',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diego'
  },
  {
    name: 'Fede',
    nickname: 'Fede',
    birthday: '23 de Nov - 1985',
    description: 'Anfitrión de lujo y duelista de temer. Su casa es el Coliseo donde se forjan las leyendas.',
    tier: 'A',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fede'
  },
  {
    name: 'Bauty',
    nickname: 'Bauty',
    birthday: '5 de Dic',
    description: 'Joven promesa que ya es realidad. No te fíes de su cara amable en medio de un duelo.',
    tier: 'A',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bauti'
  },
  {
    name: 'Zaphkyel',
    nickname: 'Zaphkyel',
    birthday: '7 de Feb',
    description: 'Sus jugadas son eléctricas. Aparece y desaparece del meta con la velocidad del rayo.',
    tier: 'A',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zap'
  },
  {
    name: 'Marcos',
    nickname: 'Marcos',
    birthday: 'A confirmar',
    description: 'Consistencia pura. Un miembro que mantiene el nivel de la A bien alto.',
    tier: 'A',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcos'
  },
  {
    name: 'Fito',
    nickname: 'Juez Fito',
    birthday: '12 de Oct',
    description: 'Juez oficial del grupo. Solo juega Genesys y decks "fun" (que solo son divertidos para él mientras te gana).',
    tier: 'A',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fito'
  },
  // TIER B
  {
    name: 'Hada',
    nickname: 'Hada',
    birthday: '20 de Abr',
    description: 'Otro que duda de su identidad "Boy". Estamos investigando si es por su mazo de hadas o por una crisis existencial.',
    tier: 'B',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hada'
  },
  {
    name: 'Leo Flor',
    nickname: 'Flor',
    birthday: '30 de Abr',
    description: 'A un paso de la gloria. Está farmeando experiencia para subir a la A, solo le falta un Top 8.',
    tier: 'B',
    image: '/members/pablo.jpg'
  },
  {
    name: 'DjAlex',
    nickname: 'El Fantasma',
    birthday: '24 de Jun',
    description: 'Leyenda urbana. Se dice que si vas a una juntada y hay luna llena, Alex tampoco viene.',
    tier: 'B',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
  },
  {
    name: 'Amir Pablo',
    nickname: 'Amir',
    birthday: '31 de mar',
    description: 'No estuvo desde el Génesis, pero se ganó su lugar. Su asistencia es como un drop rate de carta rara: difícil pero apreciada.',
    tier: 'B',
    image: '/members/pablo.jpg'
  },
  {
    name: 'Mario',
    nickname: 'El Desertor',
    birthday: '20 de Jun',
    description: 'Jugador de Magic. Nos abandonó por el maná, pero el corazón siempre vuelve al Reino de los Duelos.',
    tier: 'B',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mario'
  },
  {
    name: 'Lau',
    nickname: 'Lau',
    birthday: '4 de Ene',
    description: 'No viene seguido, pero cuando aparece, el aura de buena gente sube el nivel del grupo.',
    tier: 'B',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lau'
  },
  {
    name: 'Manu',
    nickname: 'Manu',
    birthday: 'A confirmar',
    description: 'Nos abandonó, pero su sombra aún recorre las mesas de juego. Se lo extraña (a veces).',
    tier: 'B',
    image: '/members/manu.jpg'
  },
  // TIER C
  {
    name: 'Héctor',
    nickname: 'El Cafetero',
    birthday: '27 de Julio',
    description: 'Tiene el espíritu Gurruboy a tope, pero es el "Newbie". Tiene una cafetería, así que su castigo por derecho de piso es traer café para todos. Juega mejor de lo que admite.',
    tier: 'C',
    image: '/members/hector.jpg'
  },
  {
    name: 'Leo Musculoso',
    nickname: 'Musculoso',
    birthday: '5 de Julio',
    description: 'Dice que no se siente muy Gurruboy, pero tiene más esencia que un sobre de 1ra Edición. Una leyenda que siempre vuelve.',
    tier: 'C',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo'
  },
  // TIER D
  {
    name: 'Dany',
    nickname: 'Estandar-Man',
    birthday: 'A confirmar',
    description: 'El jugador de Yu-Gi-Oh! más estándar del mundo. Ni muy meta, ni muy fun. El equilibrio perfecto de la mediocridad (con amor).',
    tier: 'D',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dany'
  }
];
