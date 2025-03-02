/**
 * 截断字符串到指定长度，并添加省略号
 * @param str 原始字符串
 * @param maxLength 最大长度
 * @param suffix 省略符号，默认为'...'
 * @returns 截断后的字符串
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (!str || str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}

/**
 * 将字符串首字母大写
 * @param str 原始字符串
 * @returns 首字母大写的字符串
 */
export function capitalize(str: string): string {
  if (!str || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 将驼峰命名转换为短横线命名
 * @param str 驼峰命名的字符串
 * @returns 短横线命名的字符串
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * 将短横线命名转换为驼峰命名
 * @param str 短横线命名的字符串
 * @returns 驼峰命名的字符串
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * 移除字符串中的HTML标签
 * @param html 包含HTML标签的字符串
 * @returns 移除HTML标签后的字符串
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * 生成指定长度的随机字符串
 * @param length 字符串长度
 * @returns 随机字符串
 */
export function randomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
