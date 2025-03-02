// 导出所有日期工具函数
import * as dateUtilsModule from './helpers/dateUtils';
export const dateUtils = dateUtilsModule;
export const { 
  formatDate, 
  daysBetween, 
  addToDate, 
  isDateInRange, 
  startOfDay, 
  endOfDay 
} = dateUtilsModule;

// 导出所有字符串工具函数
import * as stringUtilsModule from './helpers/stringUtils';
export const stringUtils = stringUtilsModule;
export const { 
  truncate, 
  capitalize, 
  camelToKebab, 
  kebabToCamel, 
  stripHtml, 
  randomString 
} = stringUtilsModule;

// 导出所有对象工具函数
import * as objectUtilsModule from './helpers/objectUtils';
export const objectUtils = objectUtilsModule;
export const { 
  deepClone, 
  deepMerge, 
  pickProps, 
  omitProps, 
  isEmptyObject, 
  arrayToObject 
} = objectUtilsModule;

// 导出类型
export type { 
  // 可以在这里导出类型定义
};
