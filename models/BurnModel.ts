// 阅后即焚模块的数据模型
import { nanoid } from 'nanoid';

export interface BurnMessage {
  id: string;
  content: string;
  createdAt: Date;
  expiresAt: Date;
  isRead: boolean;
}

// 模拟数据存储
const messages = new Map<string, BurnMessage>();

export class BurnModel {
  // 创建阅后即焚消息
  async createMessage(content: string, expirationHours: number = 24): Promise<string> {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const id = nanoid(10); // 生成短ID
    const now = new Date();
    const expiresAt = new Date(now.getTime() + expirationHours * 60 * 60 * 1000);
    
    const message: BurnMessage = {
      id,
      content,
      createdAt: now,
      expiresAt,
      isRead: false,
    };
    
    messages.set(id, message);
    return id;
  }
  
  // 读取消息
  async readMessage(id: string): Promise<BurnMessage | null> {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const message = messages.get(id) || null;
    
    if (message) {
      // 检查消息是否过期
      if (new Date() > message.expiresAt) {
        // 消息已过期，删除它
        messages.delete(id);
        return null;
      }
      
      // 如果是第一次读取，标记为已读并删除
      if (!message.isRead) {
        message.isRead = true;
        
        // 设置定时删除
        setTimeout(() => {
          messages.delete(id);
        }, 5000); // 5秒后删除
      }
      
      return message;
    }
    
    return null;
  }
  
  // 检查消息是否存在
  async checkMessageExists(id: string): Promise<boolean> {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const exists = messages.has(id);
    const message = messages.get(id);
    
    // 如果消息存在但已过期，删除它并返回false
    if (exists && message && new Date() > message.expiresAt) {
      messages.delete(id);
      return false;
    }
    
    return exists;
  }
}