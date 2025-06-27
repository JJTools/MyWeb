import { ToolsModel } from '@/models/ToolsModel';
import ToolsPageClient from '@/components/tools/ToolsPageClient';

// 服务端获取数据
async function getToolsData() {
  const model = new ToolsModel();
  
  const [allTools, popularTools] = await Promise.all([
    model.getAllTools(),
    model.getMostUsedTools(4),
  ]);
  
  // 获取所有工具的类别，用于筛选
  const categories = Array.from(new Set(allTools.map(tool => tool.category)));
  
  return {
    allTools,
    popularTools,
    categories,
  };
}

export default async function ToolsPage() {
  const toolsData = await getToolsData();
  
  return <ToolsPageClient initialData={toolsData} />;
} 