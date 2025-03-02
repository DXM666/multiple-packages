import { cloneDeep, merge, pick, omit } from 'lodash';

/**
 * 深拷贝对象
 * @param obj 要拷贝的对象
 * @returns 拷贝后的对象
 */
export function deepClone<T>(obj: T): T {
  return cloneDeep(obj);
}

/**
 * 深度合并对象
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的对象
 */
export function deepMerge<T extends object, U extends object>(target: T, source: U): T & U {
  return merge({}, target, source);
}

/**
 * 从对象中提取指定属性
 * @param obj 源对象
 * @param keys 要提取的属性名数组
 * @returns 提取后的新对象
 */
export function pickProps<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return pick(obj, keys) as Pick<T, K>;
}

/**
 * 从对象中排除指定属性
 * @param obj 源对象
 * @param keys 要排除的属性名数组
 * @returns 排除后的新对象
 */
export function omitProps<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  return omit(obj, keys) as Omit<T, K>;
}

/**
 * 检查对象是否为空（没有自身属性）
 * @param obj 要检查的对象
 * @returns 是否为空对象
 */
export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * 将对象数组按指定键值转换为对象
 * @param array 对象数组
 * @param key 作为新对象键的属性名
 * @returns 转换后的对象
 */
export function arrayToObject<T extends object, K extends keyof T>(
  array: T[], 
  key: K
): Record<string, T> {
  return array.reduce((acc, item) => {
    const keyValue = String(item[key]);
    acc[keyValue] = item;
    return acc;
  }, {} as Record<string, T>);
}
