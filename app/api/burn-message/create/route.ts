import { NextRequest, NextResponse } from 'next/server';
import { BurnModel } from '@/models/BurnModel';

// 创建一个新的阅后即焚消息
export async function POST(req: NextRequest) {
  try {
    const { content, expirationHours = 24 } = await req.json();
    
    // 验证输入
    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: '消息内容不能为空' },
        { status: 400 }
      );
    }
    
    const model = new BurnModel();
    const messageId = await model.createMessage(content, expirationHours);
    
    return NextResponse.json({ 
      success: true, 
      messageId,
    });
  } catch (error) {
    console.error('创建阅后即焚消息失败:', error);
    
    return NextResponse.json(
      { error: '创建消息时发生错误' },
      { status: 500 }
    );
  }
} 