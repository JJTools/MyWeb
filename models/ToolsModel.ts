// 工具模块的数据模型

export interface ToolItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  path: string;
  category: string;
  useCount: number;
}

// 模拟API数据
const toolItems: ToolItem[] = [
  {
    id: 'calculator',
    title: '计算器',
    description: '简单易用的在线计算器',
    imageUrl: '/images/calculator.jpg',
    path: '/tools/calculator',
    category: '数学',
    useCount: 2430,
  },
  {
    id: 'calendar',
    title: '日历',
    description: '查看日期和安排活动',
    imageUrl: '/images/calendar.jpg',
    path: '/tools/calendar',
    category: '时间管理',
    useCount: 1920,
  },
  {
    id: 'notepad',
    title: '笔记本',
    description: '在线记录笔记的工具',
    imageUrl: '/images/notepad.jpg',
    path: '/tools/notepad',
    category: '文本',
    useCount: 1750,
  },
  {
    id: 'todo-list',
    title: '待办事项',
    description: '管理您的任务和待办事项',
    imageUrl: '/images/todo-list.jpg',
    path: '/tools/todo-list',
    category: '任务管理',
    useCount: 1480,
  },
  {
    id: 'timer',
    title: '计时器',
    description: '简单的计时工具',
    imageUrl: '/images/timer.jpg',
    path: '/tools/timer',
    category: '时间管理',
    useCount: 980,
  },
  {
    id: 'converter',
    title: '单位转换器',
    description: '转换不同单位的工具',
    imageUrl: '/images/converter.jpg',
    path: '/tools/converter',
    category: '工具',
    useCount: 850,
  },
];

export class ToolsModel {
  // 获取所有工具
  async getAllTools(): Promise<ToolItem[]> {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...toolItems];
  }

  // 按照类别获取工具
  async getToolsByCategory(category: string): Promise<ToolItem[]> {
    const tools = await this.getAllTools();
    return tools.filter(tool => tool.category === category);
  }

  // 获取最受欢迎的工具
  async getMostUsedTools(limit: number = 5): Promise<ToolItem[]> {
    const tools = await this.getAllTools();
    return tools
      .sort((a, b) => b.useCount - a.useCount)
      .slice(0, limit);
  }

  // 获取工具详情
  async getToolById(id: string): Promise<ToolItem | undefined> {
    const tools = await this.getAllTools();
    return tools.find(tool => tool.id === id);
  }
} 