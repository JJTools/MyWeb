'use client';

import { useState, useEffect } from 'react';
import { ToolsModel, ToolItem } from '@/models/ToolsModel';

export class ToolsViewModel {
  private model: ToolsModel;

  constructor() {
    this.model = new ToolsModel();
  }

  // 获取所有工具
  async getAllTools(): Promise<ToolItem[]> {
    return await this.model.getAllTools();
  }

  // 按类别获取工具
  async getToolsByCategory(category: string): Promise<ToolItem[]> {
    return await this.model.getToolsByCategory(category);
  }

  // 获取最常用的工具
  async getMostUsedTools(limit: number = 5): Promise<ToolItem[]> {
    return await this.model.getMostUsedTools(limit);
  }

  // 获取工具详情
  async getToolById(id: string): Promise<ToolItem | undefined> {
    return await this.model.getToolById(id);
  }
}

// React Hook，用于在组件中使用
export function useToolsViewModel() {
  const [viewModel] = useState(new ToolsViewModel());
  const [allTools, setAllTools] = useState<ToolItem[]>([]);
  const [popularTools, setPopularTools] = useState<ToolItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 并行获取数据
        const [allToolsData, popularToolsData] = await Promise.all([
          viewModel.getAllTools(),
          viewModel.getMostUsedTools(),
        ]);

        // 提取所有类别
        const uniqueCategories = Array.from(
          new Set(allToolsData.map(tool => tool.category))
        );

        setAllTools(allToolsData);
        setPopularTools(popularToolsData);
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载工具数据时出错');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [viewModel]);

  return {
    allTools,
    popularTools,
    categories,
    loading,
    error,
    getToolById: viewModel.getToolById.bind(viewModel),
    getToolsByCategory: viewModel.getToolsByCategory.bind(viewModel),
  };
}