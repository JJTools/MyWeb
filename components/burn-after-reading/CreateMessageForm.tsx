'use client';

import { useState, FormEvent } from 'react';
import { FaLock, FaSpinner, FaCopy, FaCheck } from 'react-icons/fa';
import { useCreateBurnMessage } from '@/view-models/BurnViewModel';

export default function CreateMessageForm() {
  const [content, setContent] = useState('');
  const [expirationHours, setExpirationHours] = useState(24);
  const [copied, setCopied] = useState(false);
  const { createMessage, loading, error, messageLink, resetState } = useCreateBurnMessage();

  // 处理表单提交
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      return;
    }
    
    try {
      await createMessage(content, expirationHours);
      setContent('');
    } catch (error) {
      // 错误已在hook中处理
    }
  };
  
  // 复制链接到剪贴板
  const copyToClipboard = async () => {
    if (messageLink) {
      try {
        await navigator.clipboard.writeText(messageLink);
        setCopied(true);
        
        // 3秒后重置复制状态
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error('无法复制到剪贴板', err);
      }
    }
  };
  
  // 创建新消息
  const handleCreateNew = () => {
    resetState();
    setContent('');
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">创建阅后即焚消息</h2>
        <div className="text-primary-600">
          <FaLock size={20} />
        </div>
      </div>
      
      {!messageLink ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              消息内容
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="输入你想要分享的秘密消息..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="expiration" className="block text-sm font-medium text-gray-700 mb-1">
              过期时间
            </label>
            <select
              id="expiration"
              className="w-full border rounded-md py-2 px-3"
              value={expirationHours}
              onChange={(e) => setExpirationHours(parseInt(e.target.value))}
            >
              <option value={1}>1小时</option>
              <option value={6}>6小时</option>
              <option value={12}>12小时</option>
              <option value={24}>24小时</option>
              <option value={48}>48小时</option>
              <option value={168}>7天</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              链接将在指定时间后自动过期
            </p>
          </div>
          
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className={`w-full py-2 rounded-md font-medium ${
              loading || !content.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" /> 
                创建中...
              </span>
            ) : (
              '创建阅后即焚链接'
            )}
          </button>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </form>
      ) : (
        <div>
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
            阅后即焚链接创建成功！分享此链接，接收者阅读后消息将自动销毁。
          </div>
          
          <div className="relative mb-6">
            <input
              type="text"
              readOnly
              value={messageLink}
              className="w-full border rounded-md py-3 px-3 pr-12 bg-gray-50"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-600"
              title="复制链接"
            >
              {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
            </button>
          </div>
          
          <div className="text-center">
            <button
              onClick={handleCreateNew}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              创建新的消息
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-center text-xs text-gray-500">
        阅后即焚消息在首次查看后将被立即删除，请确保接收者准备好查看。
      </div>
    </div>
  );
} 