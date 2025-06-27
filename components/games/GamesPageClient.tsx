'use client';

import { useState, useEffect } from 'react';
import { GameItem } from '@/models/GamesModel';
import GameCard from './GameCard';
import { FaFilter, FaStar, FaFire } from 'react-icons/fa';

interface GamesPageClientProps {
  initialData: {
    allGames: GameItem[];
    recommendedGames: GameItem[];
    popularGames: GameItem[];
    categories: string[];
    difficulties: readonly ['easy', 'medium', 'hard'];
  };
}

export default function GamesPageClient({ initialData }: GamesPageClientProps) {
  const { allGames, recommendedGames, popularGames, categories, difficulties } = initialData;
  
  // 筛选状态
  const [filteredGames, setFilteredGames] = useState<GameItem[]>(allGames);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // 当筛选条件变化时，更新游戏列表
  useEffect(() => {
    let result = [...allGames];
    
    if (selectedCategory) {
      result = result.filter(game => game.category === selectedCategory);
    }
    
    if (selectedDifficulty) {
      result = result.filter(game => game.difficulty === selectedDifficulty);
    }
    
    setFilteredGames(result);
  }, [allGames, selectedCategory, selectedDifficulty]);
  
  // 重置所有筛选
  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedDifficulty(null);
  };

  // 难度标签映射
  const difficultyLabels = {
    easy: '简单',
    medium: '中等',
    hard: '困难',
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">游戏中心</h1>
      
      {/* 推荐游戏 */}
      <section>
        <div className="flex items-center mb-4">
          <FaStar className="text-yellow-500 mr-2" />
          <h2 className="text-xl font-semibold">推荐游戏</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
      
      {/* 热门游戏 */}
      <section>
        <div className="flex items-center mb-4">
          <FaFire className="text-orange-500 mr-2" />
          <h2 className="text-xl font-semibold">热门游戏</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
      
      {/* 所有游戏与筛选 */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">所有游戏</h2>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md"
          >
            <FaFilter className="mr-2" />
            筛选
          </button>
        </div>
        
        {/* 筛选面板 */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                <select 
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="border rounded-md py-1 px-2 w-40"
                >
                  <option value="">全部分类</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">难度</label>
                <select 
                  value={selectedDifficulty || ''}
                  onChange={(e) => setSelectedDifficulty(e.target.value as any || null)}
                  className="border rounded-md py-1 px-2 w-40"
                >
                  <option value="">全部难度</option>
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficultyLabels[difficulty]}</option>
                  ))}
                </select>
              </div>
              
              <div className="self-end">
                <button 
                  onClick={resetFilters}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
                >
                  重置
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* 游戏列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">没有找到符合条件的游戏</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 