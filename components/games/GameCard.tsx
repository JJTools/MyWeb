'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaGamepad } from 'react-icons/fa';
import { GameItem } from '@/models/GamesModel';

// 难度映射颜色
const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
};

// 难度映射中文
const difficultyLabels = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
};

interface GameCardProps {
  game: GameItem;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={game.path} className="card block hover:scale-105 transition-transform">
      <div className="relative h-40">
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          {/* 使用占位符图像 */}
          <span className="text-gray-400 text-4xl">
            <FaGamepad />
          </span>
        </div>
        {/* 注意：在生产环境中应该有真实图片 */}
        {/* <Image 
          src={game.imageUrl}
          alt={game.title}
          fill
          className="object-cover"
        /> */}
        
        {/* 推荐标签 */}
        {game.isRecommended && (
          <div className="absolute top-2 right-2 bg-orange-100 text-orange-800 px-2 py-1 text-xs rounded-full flex items-center">
            <FaStar className="mr-1" />
            推荐
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{game.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[game.difficulty]}`}>
            {difficultyLabels[game.difficulty]}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{game.description}</p>
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <span>{game.category}</span>
          <span>{game.playCount} 次游玩</span>
        </div>
      </div>
    </Link>
  );
}