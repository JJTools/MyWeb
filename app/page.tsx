import Link from 'next/link';
import { FaFire, FaGamepad, FaTools, FaLink } from 'react-icons/fa';

export default function Home() {
  const features = [
    {
      title: '热门模块',
      description: '探索最受欢迎的游戏和工具',
      icon: <FaFire className="text-orange-500" size={24} />,
      link: '/hot',
    },
    {
      title: '游戏模块',
      description: '发现有趣的Web游戏集合',
      icon: <FaGamepad className="text-blue-500" size={24} />,
      link: '/games',
    },
    {
      title: '工具模块',
      description: '实用的在线工具集合',
      icon: <FaTools className="text-green-500" size={24} />,
      link: '/tools',
    },
    {
      title: '阅后即焚',
      description: '创建阅后即焚的临时链接',
      icon: <FaLink className="text-purple-500" size={24} />,
      link: '/burn-after-reading',
    },
  ];

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">欢迎来到多功能网站平台</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          探索我们的热门推荐、游戏、工具和阅后即焚功能，满足您的各种需求。
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Link 
            href={feature.link} 
            key={index}
            className="card group p-6 flex flex-col items-center text-center"
          >
            <div className="mb-4 p-3 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </Link>
        ))}
      </section>

      <section className="bg-primary-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">今日推荐</h2>
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="font-medium text-lg mb-2">消消乐游戏</h3>
          <p className="text-gray-600 mb-4">
            我们最受欢迎的游戏之一，挑战您的记忆力和策略思维。
          </p>
          <Link 
            href="/games/match-three" 
            className="btn btn-primary inline-block"
          >
            立即体验
          </Link>
        </div>
      </section>
    </div>
  );
} 