'use client';

import { useState, useEffect } from 'react';
import { GamesModel, GameItem } from '@/models/GamesModel';

export class GamesViewModel {
  private model: GamesModel;

  constructor() {
    this.model = new GamesModel();
  }

  // 获取所有游戏
  async getAllGames(): Promise<GameItem[]> {
    return await this.model.getAllGames();
  }

  // 获取推荐游戏
  async getRecommendedGames(): Promise<GameItem[]> {
    return await this.model.getRecommendedGames();
  }

  // 按类别获取游戏
  async getGamesByCategory(category: string): Promise<GameItem[]> {
    return await this.model.getGamesByCategory(category);
  }

  // 按难度获取游戏
  async getGamesByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Promise<GameItem[]> {
    return await this.model.getGamesByDifficulty(difficulty);
  }

  // 获取最受欢迎的游戏
  async getMostPopularGames(limit: number = 5): Promise<GameItem[]> {
    return await this.model.getMostPopularGames(limit);
  }

  // 获取游戏详情
  async getGameById(id: string): Promise<GameItem | undefined> {
    return await this.model.getGameById(id);
  }
}

// React Hook，用于在组件中使用
export function useGamesViewModel() {
  const [viewModel] = useState(new GamesViewModel());
  const [allGames, setAllGames] = useState<GameItem[]>([]);
  const [recommendedGames, setRecommendedGames] = useState<GameItem[]>([]);
  const [popularGames, setPopularGames] = useState<GameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 并行获取数据
        const [allGamesData, recommendedGamesData, popularGamesData] = await Promise.all([
          viewModel.getAllGames(),
          viewModel.getRecommendedGames(),
          viewModel.getMostPopularGames(),
        ]);

        setAllGames(allGamesData);
        setRecommendedGames(recommendedGamesData);
        setPopularGames(popularGamesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载游戏数据时出错');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [viewModel]);

  return {
    allGames,
    recommendedGames,
    popularGames,
    loading,
    error,
    getGameById: viewModel.getGameById.bind(viewModel),
    getGamesByCategory: viewModel.getGamesByCategory.bind(viewModel),
    getGamesByDifficulty: viewModel.getGamesByDifficulty.bind(viewModel),
  };
}