// 热门模块的数据模型

export interface HotItem {
  id: string;
  title: string;
  description: string;
  type: 'game' | 'tool';
  imageUrl: string;
  path: string;
  isPopular: boolean;
  views: number;
}

// 模拟API数据
const hotItems: HotItem[] = [
  {
    id: '1',
    title: '消消乐游戏',
    description: '经典三消游戏，挑战您的策略思维',
    type: 'game',
    imageUrl: '/images/match-three.jpg',
    path: '/games/match-three',
    isPopular: true,
    views: 1540,
  },
  {
    id: '2',
    title: '计算器工具',
    description: '简单易用的在线计算器',
    type: 'tool',
    imageUrl: '/images/calculator.jpg',
    path: '/tools/calculator',
    isPopular: true,
    views: 1280,
  },
  {
    id: '3',
    title: '记忆翻牌',
    description: '锻炼记忆力的翻牌游戏',
    type: 'game',
    imageUrl: '/images/memory-game.jpg',
    path: '/games/memory',
    isPopular: true,
    views: 950,
  },
  {
    id: '4',
    title: '日历工具',
    description: '查看日期和安排活动',
    type: 'tool',
    imageUrl: '/images/calendar.jpg',
    path: '/tools/calendar',
    isPopular: false,
    views: 780,
  },
  {
    id: '5',
    title: '贪吃蛇',
    description: '经典贪吃蛇游戏',
    type: 'game',
    imageUrl: '/images/snake.jpg',
    path: '/games/snake',
    isPopular: true,
    views: 880,
  },
  {
    id: '6',
    title: '笔记本',
    description: '在线记录笔记的工具',
    type: 'tool',
    imageUrl: '/images/notepad.jpg',
    path: '/tools/notepad',
    isPopular: false,
    views: 650,
  },
];

export class HotModel {
  // 获取所有热门项目
  async getAllItems(): Promise<HotItem[]> {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...hotItems];
  }

  // 获取热门游戏
  async getHotGames(): Promise<HotItem[]> {
    const items = await this.getAllItems();
    return items.filter(item => item.type === 'game' && item.isPopular);
  }

  // 获取热门工具
  async getHotTools(): Promise<HotItem[]> {
    const items = await this.getAllItems();
    return items.filter(item => item.type === 'tool' && item.isPopular);
  }

  // 按照浏览量排序获取热门项目
  async getMostViewedItems(limit: number = 5): Promise<HotItem[]> {
    const items = await this.getAllItems();
    return items
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }
} 