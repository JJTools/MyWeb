# 现代化多功能网站平台

这个项目是一个基于Next.js和Tailwind CSS的现代化多功能网站平台，采用MVVM架构设计，包含四个核心模块。

## 功能模块

- **热门模块**: 展示最受欢迎的游戏和工具内容
- **游戏模块**: 提供多种Web游戏，包含游戏推荐功能
- **工具模块**: 提供各种实用Web工具
- **阅后即焚**: 创建阅后即焚的临时链接，用于安全传递信息

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **架构**: MVVM (Model-View-ViewModel)
- **部署**: Vercel

## 项目结构

```
/app                   # Next.js App Router页面
  /api                 # API路由
  /hot                 # 热门模块页面
  /games               # 游戏模块页面
  /tools               # 工具模块页面
  /burn-after-reading  # 阅后即焚页面
/components            # UI组件
  /common              # 通用组件
  /hot                 # 热门模块组件
  /games               # 游戏模块组件
  /tools               # 工具模块组件
  /burn-after-reading  # 阅后即焚组件
/models                # 数据模型和API调用
/view-models           # 状态管理和业务逻辑
/lib                   # 工具函数
```

## MVVM架构

项目采用MVVM架构分层设计：

- **Model层**: 负责数据结构定义和API请求处理
- **ViewModel层**: 负责业务逻辑和状态管理，连接Model和View
- **View层**: 负责UI展示，包括页面和组件

## 本地开发

1. 克隆仓库:
   ```
   git clone <仓库URL>
   ```

2. 安装依赖:
   ```
   npm install
   ```

3. 启动开发服务器:
   ```
   npm run dev
   ```

4. 在浏览器中访问 `http://localhost:3000`

## 构建与部署

本项目设计为在Vercel上无缝部署:

1. 构建项目:
   ```
   npm run build
   ```

2. 推送到GitHub，将自动在Vercel上部署

## 许可证

MIT

---

© 2023 多功能网站平台. 保留所有权利.