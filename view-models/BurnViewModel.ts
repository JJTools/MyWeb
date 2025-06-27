'use client';

import { useState } from 'react';
import { BurnModel, BurnMessage } from '@/models/BurnModel';

export class BurnViewModel {
  private model: BurnModel;
  
  constructor() {
    this.model = new BurnModel();
  }
  
  // 创建阅后即焚消息
  async createMessage(content: string, expirationHours: number = 24): Promise<string> {
    if (!content.trim()) {
      throw new Error('消息内容不能为空');
    }
    
    return await this.model.createMessage(content, expirationHours);
  }
  
  // 读取消息
  async readMessage(id: string): Promise<BurnMessage | null> {
    if (!id) {
      throw new Error('消息ID不能为空');
    }
    
    return await this.model.readMessage(id);
  }
  
  // 检查消息是否存在
  async checkMessageExists(id: string): Promise<boolean> {
    if (!id) {
      return false;
    }
    
    return await this.model.checkMessageExists(id);
  }
}

// React Hook，用于创建阅后即焚消息
export function useCreateBurnMessage() {
  const [viewModel] = useState(new BurnViewModel());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageId, setMessageId] = useState<string | null>(null);
  const [messageLink, setMessageLink] = useState<string | null>(null);
  
  const createMessage = async (content: string, expirationHours: number = 24) => {
    try {
      setLoading(true);
      setError(null);
      
      const id = await viewModel.createMessage(content, expirationHours);
      
      setMessageId(id);
      // 生成消息链接，根据实际部署环境调整
      const link = `${window.location.origin}/burn-after-reading/${id}`;
      setMessageLink(link);
      
      return { id, link };
    } catch (err) {
      setError(err instanceof Error ? err.message : '创建消息时发生错误');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const resetState = () => {
    setMessageId(null);
    setMessageLink(null);
    setError(null);
  };
  
  return {
    createMessage,
    resetState,
    loading,
    error,
    messageId,
    messageLink,
  };
}

// React Hook，用于读取阅后即焚消息
export function useReadBurnMessage(messageId: string | null) {
  const [viewModel] = useState(new BurnViewModel());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<BurnMessage | null>(null);
  const [exists, setExists] = useState<boolean | null>(null);
  
  const readMessage = async (id: string = messageId || '') => {
    try {
      setLoading(true);
      setError(null);
      
      // 先检查消息是否存在
      const messageExists = await viewModel.checkMessageExists(id);
      setExists(messageExists);
      
      if (messageExists) {
        const result = await viewModel.readMessage(id);
        setMessage(result);
      }
      
      return { exists: messageExists, message };
    } catch (err) {
      setError(err instanceof Error ? err.message : '读取消息时发生错误');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    readMessage,
    loading,
    error,
    message,
    exists,
  };
}