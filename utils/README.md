# Utils 公共方法库

这个包包含了项目中使用的各种公共方法和辅助函数。

## 安装

```bash
npm install @multiple-packages/utils
```

## 使用方法

```javascript
// 导入特定方法
import { formatDate, stringUtils } from '@multiple-packages/utils';

// 使用方法
const formattedDate = formatDate(new Date(), 'YYYY-MM-DD');
const truncatedString = stringUtils.truncate('这是一个很长的字符串', 10);
```

## 可用方法

- **日期处理**：格式化日期、日期比较、日期计算等
- **字符串处理**：截断、格式化、验证等
- **数据处理**：深拷贝、合并、过滤等
- **验证工具**：表单验证、数据验证等
