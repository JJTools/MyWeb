import { HotModel } from '@/models/HotModel';
import HotPageClient from '@/components/hot/HotPageClient';

// 服务端获取数据
async function getHotData() {
  const model = new HotModel();
  
  const [allItems, hotGames, hotTools, mostViewed] = await Promise.all([
    model.getAllItems(),
    model.getHotGames(),
    model.getHotTools(),
    model.getMostViewedItems(),
  ]);
  
  return {
    allItems,
    hotGames,
    hotTools,
    mostViewed,
  };
}

export default async function HotPage() {
  const hotData = await getHotData();
  
  return <HotPageClient initialData={hotData} />;
}