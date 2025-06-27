import ViewMessageComponent from '@/components/burn-after-reading/ViewMessageComponent';

export const metadata = {
  title: '查看阅后即焚消息',
  description: '此消息只能被查看一次，之后将被永久删除',
};

interface ViewMessagePageProps {
  params: {
    id: string;
  };
}

export default function ViewMessagePage({ params }: ViewMessagePageProps) {
  const { id } = params;
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">查看阅后即焚消息</h1>
        <p className="text-gray-600">
          注意：此消息只能查看一次，之后将被永久删除
        </p>
      </div>
      
      <ViewMessageComponent messageId={id} />
    </div>
  );
}