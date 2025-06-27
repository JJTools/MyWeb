'use client';

import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">多功能网站</h3>
            <p className="text-gray-600">
              提供热门推荐、游戏、工具和阅后即焚功能的全能平台。
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary-600">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/hot" className="text-gray-600 hover:text-primary-600">
                  热门模块
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-gray-600 hover:text-primary-600">
                  游戏模块
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-600 hover:text-primary-600">
                  工具模块
                </Link>
              </li>
              <li>
                <Link href="/burn-after-reading" className="text-gray-600 hover:text-primary-600">
                  阅后即焚
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">关于</h3>
            <p className="text-gray-600 mb-4">
              这是一个基于Next.js和Tailwind CSS构建的多功能网站平台，采用MVVM架构设计。
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>© {year} 多功能网站平台. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
} 