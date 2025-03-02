import dayjs from 'dayjs';

/**
 * 格式化日期
 * @param date 日期对象或日期字符串
 * @param format 格式化模式，默认为'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
  return dayjs(date).format(format);
}

/**
 * 计算两个日期之间的天数差
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @returns 天数差
 */
export function daysBetween(startDate: Date | string, endDate: Date | string): number {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  return end.diff(start, 'day');
}

/**
 * 向日期添加指定时间
 * @param date 原始日期
 * @param amount 添加的数量
 * @param unit 时间单位，可以是'day', 'month', 'year'等
 * @returns 新的日期对象
 */
export function addToDate(
  date: Date | string, 
  amount: number, 
  unit: 'day' | 'week' | 'month' | 'year' = 'day'
): Date {
  return dayjs(date).add(amount, unit).toDate();
}

/**
 * 判断日期是否在指定范围内
 * @param date 要检查的日期
 * @param startDate 范围开始日期
 * @param endDate 范围结束日期
 * @returns 是否在范围内
 */
export function isDateInRange(
  date: Date | string, 
  startDate: Date | string, 
  endDate: Date | string
): boolean {
  const checkDate = dayjs(date);
  return checkDate.isAfter(dayjs(startDate)) && checkDate.isBefore(dayjs(endDate));
}

/**
 * 获取当前日期的开始时间（00:00:00）
 * @param date 日期对象
 * @returns 日期开始时间
 */
export function startOfDay(date: Date | string = new Date()): Date {
  return dayjs(date).startOf('day').toDate();
}

/**
 * 获取当前日期的结束时间（23:59:59）
 * @param date 日期对象
 * @returns 日期结束时间
 */
export function endOfDay(date: Date | string = new Date()): Date {
  return dayjs(date).endOf('day').toDate();
}
