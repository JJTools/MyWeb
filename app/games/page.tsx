import { GamesModel } from '@/models/GamesModel';
import GamesPageClient from '@/components/games/GamesPageClient';

// 服务端获取数据
async function getGamesData() {
  const model = new GamesModel();
  
  const [allGames, recommendedGames, popularGames] = await Promise.all([
    model.getAllGames(),
    model.getRecommendedGames(),
    model.getMostPopularGames(4),
  ]);
  
  // 获取所有游戏的类别和难度，用于筛选
  const categories = Array.from(new Set(allGames.map(game => game.category)));
  const difficulties = ['easy', 'medium', 'hard'] as const;
  
  return {
    allGames,
    recommendedGames,
    popularGames,
    categories,
    difficulties,
  };
}

export default async function GamesPage() {
  const gamesData = await getGamesData();
  
  return <GamesPageClient initialData={gamesData} />;
}