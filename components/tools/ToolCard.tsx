'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaTools } from 'react-icons/fa';
import { ToolItem } from '@/models/ToolsModel';

interface ToolCardProps {
  tool: ToolItem;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={tool.path} className="card block hover:scale-105 transition-transform">
      <div className="relative h-40">
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          {/* 使用占位符图像 */}
          <span className="text-gray-400 text-4xl">
            <FaTools />
          </span>
        </div>
        {/* 注意：在生产环境中应该有真实图片 */}
        {/* <Image 
          src={tool.imageUrl}
          alt={tool.title}
          fill
          className="object-cover"
        /> */}

        {/* 类别标签 */}
        <div className="absolute top-2 right-2 bg-primary-100 text-primary-800 px-2 py-1 text-xs rounded-full">
          {tool.category}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-medium text-lg">{tool.title}</h3>
        </div>
        <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
        <div className="flex items-center justify-end text-gray-500 text-sm">
          <span>{tool.useCount} 次使用</span>
        </div>
      </div>
    </Link>
  );
}