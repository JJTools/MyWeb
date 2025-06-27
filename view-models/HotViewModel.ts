'use client';

import { useState, useEffect } from 'react';
import { HotModel, HotItem } from '@/models/HotModel';

export class HotViewModel {
  private model: HotModel;

  constructor() {
    this.model = new HotModel();
  }

  // 获取所有热门项目
  async getAllItems(): Promise<HotItem[]> {
    return await this.model.getAllItems();
  }

  // 获取热门游戏
  async getHotGames(): Promise<HotItem[]> {
    return await this.model.getHotGames();
  }

  // 获取热门工具
  async getHotTools(): Promise<HotItem[]> {
    return await this.model.getHotTools();
  }

  // 获取最多浏览的项目
  async getMostViewedItems(limit: number = 5): Promise<HotItem[]> {
    return await this.model.getMostViewedItems(limit);
  }
}

// React Hook，用于在组件中使用
export function useHotViewModel() {
  const [viewModel] = useState(new HotViewModel());
  const [allItems, setAllItems] = useState<HotItem[]>([]);
  const [hotGames, setHotGames] = useState<HotItem[]>([]);
  const [hotTools, setHotTools] = useState<HotItem[]>([]);
  const [mostViewed, setMostViewed] = useState<HotItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 并行获取数据
        const [allItemsData, hotGamesData, hotToolsData, mostViewedData] = await Promise.all([
          viewModel.getAllItems(),
          viewModel.getHotGames(),
          viewModel.getHotTools(),
          viewModel.getMostViewedItems(),
        ]);

        setAllItems(allItemsData);
        setHotGames(hotGamesData);
        setHotTools(hotToolsData);
        setMostViewed(mostViewedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载数据时出错');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [viewModel]);

  return {
    allItems,
    hotGames,
    hotTools,
    mostViewed,
    loading,
    error,
  };
} 