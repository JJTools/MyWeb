'use client';

import { useState, useEffect } from 'react';
import { useReadBurnMessage } from '@/view-models/BurnViewModel';
import { FaLock, FaSpinner, FaExclamationTriangle, FaTrashAlt } from 'react-icons/fa';

interface ViewMessageComponentProps {
  messageId: string;
}

export default function ViewMessageComponent({ messageId }: ViewMessageComponentProps) {
  const { readMessage, loading, message, exists, error } = useReadBurnMessage(messageId);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [destructed, setDestructed] = useState(false);
  
  // 页面加载时尝试获取消息
  useEffect(() => {
    if (messageId) {
      readMessage(messageId);
    }
  }, [messageId]);
  
  // 消息读取后开始倒计时
  useEffect(() => {
    if (message && !destructed) {
      // 5秒倒计时
      setCountdown(5);
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timer);
            setDestructed(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [message]);

  // 渲染消息加载状态
  if (loading) {
    return (
      <div className="card p-8">
        <div className="flex flex-col items-center justify-center py-12">
          <FaSpinner className="animate-spin text-primary-600 text-4xl mb-4" />
          <p className="text-gray-600">正在加载消息...</p>
        </div>
      </div>
    );
  }
  
  // 渲染错误状态
  if (error) {
    return (
      <div className="card p-8">
        <div className="flex flex-col items-center justify-center py-12 text-red-600">
          <FaExclamationTriangle className="text-4xl mb-4" />
          <p className="font-medium text-lg mb-2">加载消息时发生错误</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }
  
  // 渲染消息不存在状态
  if (!exists) {
    return (
      <div className="card p-8">
        <div className="flex flex-col items-center justify-center py-12 text-yellow-600">
          <FaExclamationTriangle className="text-4xl mb-4" />
          <p className="font-medium text-lg mb-2">消息不存在或已被查看</p>
          <p className="text-gray-600">
            阅后即焚消息只能被查看一次，之后就会被销毁。
          </p>
        </div>
      </div>
    );
  }
  
  // 渲染已销毁状态
  if (destructed) {
    return (
      <div className="card p-8">
        <div className="flex flex-col items-center justify-center py-12 text-red-600">
          <FaTrashAlt className="text-4xl mb-4" />
          <p className="font-medium text-lg mb-2">消息已被销毁</p>
          <p className="text-gray-600">
            阅后即焚消息已被安全销毁，无法再次查看。
          </p>
        </div>
      </div>
    );
  }
  
  // 渲染消息内容
  return (
    <div className="card p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">阅后即焚消息</h2>
        <div className="text-primary-600">
          <FaLock size={20} />
        </div>
      </div>
      
      <div className="mb-8">
        <div className="p-4 bg-gray-50 rounded-lg mb-4">
          <p className="whitespace-pre-wrap">{message?.content}</p>
        </div>
        
        <div className="text-sm text-gray-500">
          <p>消息创建于: {message?.createdAt.toLocaleString()}</p>
          <p>消息过期于: {message?.expiresAt.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-center justify-between">
        <p className="text-red-700 text-sm">
          此消息将在{countdown}秒后永久销毁
        </p>
        <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
          {countdown}
        </div>
      </div>
    </div>
  );
} 
