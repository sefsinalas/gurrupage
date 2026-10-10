export interface TournamentPlayerResult {
  name: string;
  fullName: string;
  isGurru: boolean;
  avatar?: string;
  position: number;
  totalPlayers: number;
  points: number;
  wins: number;
  losses: number;
  draws: number;
  notes?: string;
}

export interface Tournament {
  id: string;
  title: string;
  edition: string;
  date: string;
  location: string;
  organizer: string;
  totalPlayers: number;
  rounds: number;
  sourceUrl: string;
  description: string;
  results: TournamentPlayerResult[];
}

export const tournaments: Tournament[] = [
  {
    id: 'wcq-nacional-2026',
    title: 'WCQ National 2026',
    edition: 'Nacional Yu-Gi-Oh! Argentina 2026',
    date: 'Mayo 2026',
    location: 'Palais Rouge, CABA',
    organizer: 'Dima Game',
    totalPlayers: 582,
    rounds: 13,
    sourceUrl: 'https://calendario.yugiohargentina.com/torneos/2097',
    description:
      'El evento más importante del año en Argentina con 582 duelistas de todo el país compitiendo por la gloria y cupos al Continental.',
    results: [
      {
        name: 'Leo',
        fullName: 'Ricardo Aguirre',
        isGurru: false,
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=RicardoAguirre',
        position: 102,
        totalPlayers: 582,
        points: 21,
        wins: 7,
        losses: 6,
        draws: 0,
        notes: 'Referencia / Gran actuación entrando al Top 18%'
      },
      {
        name: 'Jr',
        fullName: 'Carlos Dominguez',
        isGurru: true,
        avatar: '/members/jr.jpg',
        position: 182,
        totalPlayers: 582,
        points: 12,
        wins: 4,
        losses: 4,
        draws: 0,
        notes: 'Mejor resultado Gurruboy: Top 31% y récord parejo 4-4'
      },
      {
        name: 'Alex',
        fullName: 'Alex Mauro Castro',
        isGurru: true,
        avatar: '/members/alex.jpg',
        position: 223,
        totalPlayers: 582,
        points: 12,
        wins: 4,
        losses: 4,
        draws: 0,
        notes: 'Gran desempeño en el Top 38% con récord 4-4'
      },
      {
        name: 'Gaby',
        fullName: 'Maximiliano Puca',
        isGurru: true,
        avatar: '/members/gaby.jpg',
        position: 254,
        totalPlayers: 582,
        points: 12,
        wins: 4,
        losses: 4,
        draws: 0,
        notes: 'Sólido Top 44% con récord 4-4 y 12 puntos'
      },
      {
        name: 'Tomy',
        fullName: 'Tomas Vistas',
        isGurru: false,
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=TomasVistas',
        position: 314,
        totalPlayers: 582,
        points: 12,
        wins: 4,
        losses: 4,
        draws: 0,
        notes: 'Referencia / En la mitad de tabla con récord 4-4'
      },
      {
        name: 'Fede',
        fullName: 'Eduardo Santillan',
        isGurru: true,
        avatar: '/members/fede.jpg',
        position: 395,
        totalPlayers: 582,
        points: 9,
        wins: 3,
        losses: 5,
        draws: 0,
        notes: 'Peleando cada duelo: 3 victorias y 9 puntos'
      },
      {
        name: 'Mario',
        fullName: 'Mario Gonzalez',
        isGurru: true,
        avatar: '/members/mario.jpg',
        position: 516,
        totalPlayers: 582,
        points: 3,
        wins: 1,
        losses: 6,
        draws: 0,
        notes: 'Sumó 1 victoria representando en la arena nacional'
      },
      {
        name: 'Enzo',
        fullName: 'Enzo Espinoza',
        isGurru: true,
        avatar: '/members/enzo.jpg',
        position: 518,
        totalPlayers: 582,
        points: 3,
        wins: 1,
        losses: 6,
        draws: 0,
        notes: 'Presente y sumando puntos en las rondas suizas'
      }
    ]
  }
];
