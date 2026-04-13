// ============================================================
// Simulación de Base de Datos del Videojuego 2D
// Esta capa simula la conexión y operaciones CRUD con una DB
// ============================================================

export interface Player {
  id: string;
  username: string;
  avatarColor: string;
  totalCoins: number;
  createdAt: string;
  lastLogin: string;
  isOnline: boolean;
}

export interface LevelProgress {
  id: string;
  playerId: string;
  levelNumber: number;
  levelName: string;
  coinsCollected: number;
  totalCoinsInLevel: number;
  isCompleted: boolean;
  bestTime: string;
  attempts: number;
  stars: number; // 0-3
}

export interface GameSession {
  id: string;
  playerId: string;
  startedAt: string;
  endedAt: string | null;
  coinsEarned: number;
  levelsPlayed: number;
}

// --- Simulated Database Tables ---

const players: Player[] = [
  {
    id: "p001",
    username: "DragonSlayer99",
    avatarColor: "hsl(142, 71%, 45%)",
    totalCoins: 1250,
    createdAt: "2025-03-10T08:30:00Z",
    lastLogin: "2025-04-13T14:22:00Z",
    isOnline: true,
  },
  {
    id: "p002",
    username: "PixelWarrior",
    avatarColor: "hsl(217, 91%, 60%)",
    totalCoins: 890,
    createdAt: "2025-03-15T10:00:00Z",
    lastLogin: "2025-04-12T19:45:00Z",
    isOnline: false,
  },
  {
    id: "p003",
    username: "StarCollector",
    avatarColor: "hsl(45, 93%, 58%)",
    totalCoins: 2100,
    createdAt: "2025-02-28T15:20:00Z",
    lastLogin: "2025-04-13T11:10:00Z",
    isOnline: true,
  },
  {
    id: "p004",
    username: "NightRunner",
    avatarColor: "hsl(280, 65%, 60%)",
    totalCoins: 560,
    createdAt: "2025-04-01T09:15:00Z",
    lastLogin: "2025-04-11T22:30:00Z",
    isOnline: false,
  },
  {
    id: "p005",
    username: "CoinMaster_X",
    avatarColor: "hsl(0, 84%, 60%)",
    totalCoins: 3400,
    createdAt: "2025-01-20T12:00:00Z",
    lastLogin: "2025-04-13T16:00:00Z",
    isOnline: true,
  },
];

const levelProgress: LevelProgress[] = [
  // DragonSlayer99
  { id: "lp001", playerId: "p001", levelNumber: 1, levelName: "Bosque Encantado", coinsCollected: 45, totalCoinsInLevel: 50, isCompleted: true, bestTime: "02:34", attempts: 3, stars: 3 },
  { id: "lp002", playerId: "p001", levelNumber: 2, levelName: "Caverna Oscura", coinsCollected: 30, totalCoinsInLevel: 50, isCompleted: true, bestTime: "04:12", attempts: 5, stars: 2 },
  { id: "lp003", playerId: "p001", levelNumber: 3, levelName: "Castillo del Dragón", coinsCollected: 12, totalCoinsInLevel: 60, isCompleted: false, bestTime: "--:--", attempts: 2, stars: 0 },
  // PixelWarrior
  { id: "lp004", playerId: "p002", levelNumber: 1, levelName: "Bosque Encantado", coinsCollected: 50, totalCoinsInLevel: 50, isCompleted: true, bestTime: "01:58", attempts: 2, stars: 3 },
  { id: "lp005", playerId: "p002", levelNumber: 2, levelName: "Caverna Oscura", coinsCollected: 20, totalCoinsInLevel: 50, isCompleted: false, bestTime: "--:--", attempts: 4, stars: 1 },
  // StarCollector
  { id: "lp006", playerId: "p003", levelNumber: 1, levelName: "Bosque Encantado", coinsCollected: 50, totalCoinsInLevel: 50, isCompleted: true, bestTime: "01:45", attempts: 1, stars: 3 },
  { id: "lp007", playerId: "p003", levelNumber: 2, levelName: "Caverna Oscura", coinsCollected: 48, totalCoinsInLevel: 50, isCompleted: true, bestTime: "03:02", attempts: 2, stars: 3 },
  { id: "lp008", playerId: "p003", levelNumber: 3, levelName: "Castillo del Dragón", coinsCollected: 55, totalCoinsInLevel: 60, isCompleted: true, bestTime: "05:30", attempts: 4, stars: 2 },
  // NightRunner
  { id: "lp009", playerId: "p004", levelNumber: 1, levelName: "Bosque Encantado", coinsCollected: 38, totalCoinsInLevel: 50, isCompleted: true, bestTime: "03:10", attempts: 6, stars: 2 },
  // CoinMaster_X
  { id: "lp010", playerId: "p005", levelNumber: 1, levelName: "Bosque Encantado", coinsCollected: 50, totalCoinsInLevel: 50, isCompleted: true, bestTime: "01:30", attempts: 1, stars: 3 },
  { id: "lp011", playerId: "p005", levelNumber: 2, levelName: "Caverna Oscura", coinsCollected: 50, totalCoinsInLevel: 50, isCompleted: true, bestTime: "02:15", attempts: 1, stars: 3 },
  { id: "lp012", playerId: "p005", levelNumber: 3, levelName: "Castillo del Dragón", coinsCollected: 60, totalCoinsInLevel: 60, isCompleted: true, bestTime: "04:00", attempts: 2, stars: 3 },
];

const gameSessions: GameSession[] = [
  { id: "gs001", playerId: "p001", startedAt: "2025-04-13T14:00:00Z", endedAt: "2025-04-13T14:45:00Z", coinsEarned: 75, levelsPlayed: 2 },
  { id: "gs002", playerId: "p003", startedAt: "2025-04-13T10:30:00Z", endedAt: "2025-04-13T11:10:00Z", coinsEarned: 120, levelsPlayed: 3 },
  { id: "gs003", playerId: "p005", startedAt: "2025-04-13T15:00:00Z", endedAt: null, coinsEarned: 50, levelsPlayed: 1 },
  { id: "gs004", playerId: "p002", startedAt: "2025-04-12T19:00:00Z", endedAt: "2025-04-12T19:45:00Z", coinsEarned: 40, levelsPlayed: 1 },
];

// --- Simulated Database Service (CRUD Operations) ---

export const GameDatabase = {
  // Connection simulation
  connectionString: "Server=localhost;Database=GameDB_2D;User=admin;Password=****;",
  isConnected: true,

  // Players
  getAllPlayers: (): Player[] => [...players],
  getPlayerById: (id: string): Player | undefined => players.find(p => p.id === id),

  // Level Progress
  getAllLevelProgress: (): LevelProgress[] => [...levelProgress],
  getProgressByPlayer: (playerId: string): LevelProgress[] =>
    levelProgress.filter(lp => lp.playerId === playerId),

  // Sessions
  getAllSessions: (): GameSession[] => [...gameSessions],

  // Stats
  getStats: () => ({
    totalPlayers: players.length,
    totalCoins: players.reduce((sum, p) => sum + p.totalCoins, 0),
    onlinePlayers: players.filter(p => p.isOnline).length,
    completedLevels: levelProgress.filter(lp => lp.isCompleted).length,
    totalLevels: 3,
  }),
};
