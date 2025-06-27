// 游戏模块的数据模型

export interface GameItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  path: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  playCount: number;
  isRecommended: boolean;
}

// 模拟API数据
const gameItems: GameItem[] = [
  {
    id: 'match-three',
    title: '消消乐',
    description: '经典三消游戏，挑战您的策略思维',
    imageUrl: '/images/match-three.jpg',
    path: '/games/match-three',
    difficulty: 'easy',
    category: '休闲',
    playCount: 3240,
    isRecommended: true,
  },
  {
    id: 'memory',
    title: '记忆翻牌',
    description: '锻炼记忆力的翻牌游戏',
    imageUrl: '/images/memory-game.jpg',
    path: '/games/memory',
    difficulty: 'medium',
    category: '智力',
    playCount: 1850,
    isRecommended: true,
  },
  {
    id: 'snake',
    title: '贪吃蛇',
    description: '经典贪吃蛇游戏',
    imageUrl: '/images/snake.jpg',
    path: '/games/snake',
    difficulty: 'easy',
    category: '休闲',
    playCount: 2180,
    isRecommended: false,
  },
  {
    id: 'puzzle',
    title: '拼图游戏',
    description: '挑战您的空间思维能力',
    imageUrl: '/images/puzzle.jpg',
    path: '/games/puzzle',
    difficulty: 'hard',
    category: '智力',
    playCount: 950,
    isRecommended: true,
  },
  {
    id: 'tetris',
    title: '俄罗斯方块',
    description: '经典俄罗斯方块游戏',
    imageUrl: '/images/tetris.jpg',
    path: '/games/tetris',
    difficulty: 'medium',
    category: '休闲',
    playCount: 1720,
    isRecommended: false,
  },
  {
    id: '2048',
    title: '2048',
    description: '数字合并益智游戏',
    imageUrl: '/images/2048.jpg',
    path: '/games/2048',
    difficulty: 'medium',
    category: '智力',
    playCount: 2630,
    isRecommended: true,
  },
];

export class GamesModel {
  // 获取所有游戏
  async getAllGames(): Promise<GameItem[]> {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...gameItems];
  }

  // 获取推荐游戏
  async getRecommendedGames(): Promise<GameItem[]> {
    const games = await this.getAllGames();
    return games.filter(game => game.isRecommended);
  }

  // 按照类别获取游戏
  async getGamesByCategory(category: string): Promise<GameItem[]> {
    const games = await this.getAllGames();
    return games.filter(game => game.category === category);
  }

  // 按照难度获取游戏
  async getGamesByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Promise<GameItem[]> {
    const games = await this.getAllGames();
    return games.filter(game => game.difficulty === difficulty);
  }

  // 获取最受欢迎的游戏
  async getMostPopularGames(limit: number = 5): Promise<GameItem[]> {
    const games = await this.getAllGames();
    return games
      .sort((a, b) => b.playCount - a.playCount)
      .slice(0, limit);
  }

  // 获取游戏详情
  async getGameById(id: string): Promise<GameItem | undefined> {
    const games = await this.getAllGames();
    return games.find(game => game.id === id);
  }
} 