'use client';

import { useState } from 'react';
import { ToolItem } from '@/models/ToolsModel';
import ToolCard from './ToolCard';
import { FaFilter, FaTools } from 'react-icons/fa';

interface ToolsPageClientProps {
  initialData: {
    allTools: ToolItem[];
    popularTools: ToolItem[];
    categories: string[];
  };
}

export default function ToolsPageClient({ initialData }: ToolsPageClientProps) {
  const { allTools, popularTools, categories } = initialData;
  
  // 筛选状态
  const [filteredTools, setFilteredTools] = useState<ToolItem[]>(allTools);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 处理分类筛选
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    
    if (!category) {
      // 如果没有选择类别，只应用搜索筛选
      handleSearchFilter(searchTerm, null);
    } else {
      // 应用类别和搜索筛选
      handleSearchFilter(searchTerm, category);
    }
  };
  
  // 处理搜索筛选
  const handleSearchFilter = (term: string, category: string | null = selectedCategory) => {
    setSearchTerm(term);
    
    let result = [...allTools];
    
    // 应用类别筛选
    if (category) {
      result = result.filter(tool => tool.category === category);
    }
    
    // 应用搜索筛选
    if (term.trim()) {
      const lowerTerm = term.toLowerCase();
      result = result.filter(tool => 
        tool.title.toLowerCase().includes(lowerTerm) || 
        tool.description.toLowerCase().includes(lowerTerm)
      );
    }
    
    setFilteredTools(result);
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">工具中心</h1>
      
      {/* 热门工具 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">热门工具</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
      
      {/* 搜索和筛选 */}
      <section className="bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              搜索工具
            </label>
            <input
              type="text"
              id="search"
              className="w-full border rounded-md py-2 px-3"
              placeholder="输入工具名称或关键词..."
              value={searchTerm}
              onChange={(e) => handleSearchFilter(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              选择类别
            </label>
            <select
              id="category"
              className="border rounded-md py-2 px-3"
              value={selectedCategory || ''}
              onChange={(e) => handleCategoryChange(e.target.value || null)}
            >
              <option value="">全部类别</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {(selectedCategory || searchTerm) && (
            <div className="self-end">
              <button
                className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm('');
                  setFilteredTools(allTools);
                }}
              >
                重置筛选
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* 工具列表 */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {selectedCategory ? `${selectedCategory}工具` : '所有工具'}
            {searchTerm && ` (搜索: "${searchTerm}")`}
          </h2>
          <div className="text-gray-500">
            找到 {filteredTools.length} 个结果
          </div>
        </div>
        
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <FaTools className="mx-auto text-gray-400 text-4xl mb-2" />
            <p className="text-gray-500">没有找到符合条件的工具</p>
          </div>
        )}
      </section>
    </div>
  );
} 