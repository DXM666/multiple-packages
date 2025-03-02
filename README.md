# Multiple Packages 子项目

这是一个使用Nx管理的子项目，包含两个包：

1. **utils** - 用于存放公共方法
2. **common** - 用于存放公共React组件

## 项目结构

```
multiple-packages/
├── common/               # 公共React组件包
│   ├── src/
│   │   ├── components/   # 组件目录
│   │   └── index.ts      # 导出文件
│   ├── package.json
│   └── tsconfig.json
├── utils/                # 公共方法包
│   ├── src/
│   │   ├── helpers/      # 辅助函数
│   │   └── index.ts      # 导出文件
│   ├── package.json
│   └── tsconfig.json
├── nx.json               # Nx配置
├── package.json          # 项目依赖
└── workspace.json        # 工作空间配置
```

## 使用方法

### 安装依赖

```bash
npm install
```

### 构建所有包

```bash
npm run build
```

### 运行测试

```bash
npm test
```

### 使用包

在主项目中，可以通过以下方式引用这些包：

```javascript
// 引用utils包中的方法
import { formatDate } from '@multiple-packages/utils';

// 引用common包中的组件
import { Button } from '@multiple-packages/common';
```
