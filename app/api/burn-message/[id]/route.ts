import { NextRequest, NextResponse } from 'next/server';
import { BurnModel } from '@/models/BurnModel';

// 获取阅后即焚消息
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: '消息ID不能为空' },
        { status: 400 }
      );
    }
    
    const model = new BurnModel();
    const exists = await model.checkMessageExists(id);
    
    if (!exists) {
      return NextResponse.json(
        { error: '消息不存在或已被查看' },
        { status: 404 }
      );
    }
    
    const message = await model.readMessage(id);
    
    if (!message) {
      return NextResponse.json(
        { error: '消息不存在或已被查看' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: {
        id: message.id,
        content: message.content,
        createdAt: message.createdAt,
        expiresAt: message.expiresAt
      }
    });
  } catch (error) {
    console.error('获取阅后即焚消息失败:', error);
    
    return NextResponse.json(
      { error: '读取消息时发生错误' },
      { status: 500 }
    );
  }
} 