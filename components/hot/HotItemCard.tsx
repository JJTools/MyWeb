'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaEye, FaGamepad, FaTools } from 'react-icons/fa';
import { HotItem } from '@/models/HotModel';

interface HotItemCardProps {
  item: HotItem;
}

export default function HotItemCard({ item }: HotItemCardProps) {
  return (
    <Link href={item.path} className="card block hover:scale-105 transition-transform">
      <div className="relative h-40">
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          {/* 使用占位符图像 */}
          <span className="text-gray-400 text-4xl">
            {item.type === 'game' ? <FaGamepad /> : <FaTools />}
          </span>
        </div>
        {/* 注意：在生产环境中应该有真实图片 */}
        {/* <Image 
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover"
        /> */}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{item.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${
            item.type === 'game' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
          }`}>
            {item.type === 'game' ? '游戏' : '工具'}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        <div className="flex items-center text-gray-500 text-sm">
          <FaEye className="mr-1" />
          <span>{item.views} 次浏览</span>
        </div>
      </div>
    </Link>
  );
}