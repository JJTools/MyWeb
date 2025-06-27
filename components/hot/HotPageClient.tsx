'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { HotItem } from '@/models/HotModel';
import HotItemCard from './HotItemCard';
import { useHotViewModel } from '@/view-models/HotViewModel';

// Tab类型定义
type TabType = '全部' | '游戏' | '工具' | '最多浏览';

interface HotPageClientProps {
  initialData: {
    allItems: HotItem[];
    hotGames: HotItem[];
    hotTools: HotItem[];
    mostViewed: HotItem[];
  };
}

export default function HotPageClient({ initialData }: HotPageClientProps) {
  // 使用服务器端传来的初始数据
  const [activeTab, setActiveTab] = useState<TabType>('全部');
  
  // 真实场景下，这里应该使用客户端状态管理，这里使用服务端数据模拟
  const { allItems, hotGames, hotTools, mostViewed } = initialData;
  
  // 切换标签
  const handleTabChange = (index: number) => {
    const tabs: TabType[] = ['全部', '游戏', '工具', '最多浏览'];
    setActiveTab(tabs[index]);
  };

  // 根据当前激活的标签获取数据
  const getActiveItems = () => {
    switch (activeTab) {
      case '游戏':
        return hotGames;
      case '工具':
        return hotTools;
      case '最多浏览':
        return mostViewed;
      default:
        return allItems;
    }
  };

  const activeItems = getActiveItems();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">热门内容</h1>
      </div>

      <Tab.Group onChange={handleTabChange}>
        <Tab.List className="flex space-x-1 rounded-xl bg-primary-100 p-1">
          {['全部', '游戏', '工具', '最多浏览'].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
                 ${
                   selected
                     ? 'bg-white text-primary-700 shadow'
                     : 'text-primary-600 hover:bg-white/[0.12] hover:text-primary-700'
                 }`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          {['全部', '游戏', '工具', '最多浏览'].map((category, idx) => (
            <Tab.Panel
              key={idx}
              className="rounded-xl focus:outline-none"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {activeItems.length > 0 ? (
                  activeItems.map((item) => (
                    <HotItemCard key={item.id} item={item} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">暂无内容</p>
                  </div>
                )}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
} 