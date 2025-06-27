import CreateMessageForm from '@/components/burn-after-reading/CreateMessageForm';

export const metadata = {
  title: '阅后即焚 - 秘密消息传递',
  description: '创建阅后即焚的临时链接，分享后消息将自动销毁',
};

export default function BurnAfterReadingPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">阅后即焚</h1>
        <p className="text-gray-600">
          创建安全的临时消息，对方查看后消息将立即销毁
        </p>
      </div>
      
      <CreateMessageForm />
      
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-medium mb-4">如何使用</h2>
        <ol className="space-y-3 text-gray-700">
          <li>
            <span className="font-medium">1.</span> 输入您想分享的消息内容
          </li>
          <li>
            <span className="font-medium">2.</span> 设置消息的过期时间（最长可设置7天）
          </li>
          <li>
            <span className="font-medium">3.</span> 点击创建按钮生成临时链接
          </li>
          <li>
            <span className="font-medium">4.</span> 将链接分享给您想要的接收者
          </li>
          <li>
            <span className="font-medium">5.</span> 接收者打开链接后，消息内容将立即显示并销毁
          </li>
        </ol>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-700 text-sm">
            重要提示：消息在首次查看后将被自动删除，无法恢复。
            请确保接收者了解这一点并已准备好查看内容。
          </p>
        </div>
      </div>
    </div>
  );
} 