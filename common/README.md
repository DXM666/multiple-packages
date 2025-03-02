# Common 公共React组件库

这个包包含了项目中使用的各种公共React组件。

## 安装

```bash
pnpm add @multiple-packages/common
```

## 使用方法

```jsx
// 导入组件
import { Button, Card, Modal } from '@multiple-packages/common';

// 使用组件
function MyComponent() {
  return (
    <div>
      <Button variant="primary" onClick={() => console.log('点击了按钮')}>
        点击我
      </Button>
      
      <Card title="卡片标题">
        <p>卡片内容</p>
      </Card>
    </div>
  );
}
```

## 可用组件

- **Button**: 按钮组件，支持多种样式和尺寸
- **Card**: 卡片组件，用于内容展示
- **Modal**: 模态框组件
- **Input**: 输入框组件
- **Dropdown**: 下拉菜单组件
- **Tabs**: 标签页组件
