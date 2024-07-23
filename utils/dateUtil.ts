import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

/**
 * 日期时间格式化工具。
 */
export const dateUtil = dayjs;

/**
 * 将日期时间格式化为指定格式的字符串。
 * @param date 要格式化的日期时间。如果未提供，则默认为当前时间。
 * @param format 要格式化的目标格式，默认为 DATE_TIME_FORMAT。
 * @returns 格式化后的日期时间字符串。
 */
export function formatToDateTime(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format);
}

/**
 * 将日期格式化为指定格式的字符串。
 * @param date 要格式化的日期。如果未提供，则默认为当前日期。
 * @param format 要格式化的目标格式，默认为 DATE_FORMAT。
 * @returns 格式化后的日期字符串。
 */
export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}

/**
 * 获取指定日期的时间戳
 * @param {string} [time] 要获取的日期，默认为当前日期，格式为 'YYYY-MM-DD' 或其他 dayjs 支持的格式
 * @param {'milliseconds' | 'seconds'} [unit='milliseconds'] 时间戳单位，默认为毫秒，可选值为 'milliseconds' 或 'seconds'
 * @returns {number} 返回该日期对应的时间戳，默认返回毫秒
 */
export function getTimeStamp(time?: string, unit: 'milliseconds' | 'seconds' = 'milliseconds'): number {
  const dateString = time ? dayjs(time).toDate() : new Date();
  const timeStamp = dayjs(dateString).valueOf();

  if (unit === 'seconds') {
    return Math.floor(timeStamp / 1000); // 转换为秒单位的时间戳
  }

  return timeStamp;
};


/**
 * 判断两个时间之间的间隔是否超过指定天数
 * @param {string} startTime 开始时间
 * @param {string} endTime 结束时间
 * @param {number} maxDays 最大天数，默认为7天（需要包括endTime内时，请将maxDays数-1）
 * @returns {boolean} 如果差距不超过指定天数，返回 true，否则返回 false
 */
export function isWithinMaxDays(startTime: string, endTime: string, maxDays: number = 6) {
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  const difference = end.diff(start, 'day');// 计算两个日期之间的差异，+1即包括起始那一天
  return Math.abs(difference) <= maxDays;
}


/**
 * 判断给定时间是否在指定时间段内，默认为当前时间
 * @param {string} [targetTime] 要检查的时间，默认为当前时间，格式为 'YYYY-MM-DD HH:mm:ss'。
 * @param {string} startTime 时间段的开始时间，格式为 'YYYY-MM-DD HH:mm:ss'。
 * @param {string} endTime 时间段的结束时间，格式为 'YYYY-MM-DD HH:mm:ss'。
 * @returns {boolean} 如果给定时间在指定时间段内，则返回 true，否则返回 false。
 */
export function isBetween(targetTime: string = dayjs().format(DATE_TIME_FORMAT), startTime: string, endTime: string): boolean {
  // 将字符串转换为 dayjs 对象
  const target = dayjs(targetTime);
  const start = dayjs(startTime);
  const end = dayjs(endTime);

  return target.isBetween(start, end);
}

/**
 * 判断指定时间是否在某个时间之前。
 * @param {string | dayjs.ConfigType} [specifiedTime] 要比较的指定时间，默认为当前时间。格式为 'YYYY-MM-DD HH:mm:ss' 或 dayjs 对象。
 * @param {string} targetTime 要比较的目标时间，格式为 'YYYY-MM-DD HH:mm:ss'。
 * @returns {boolean} 如果指定时间在目标时间之前，则返回 true，否则返回 false。
 */
export function isTimeBefore(specifiedTime: dayjs.ConfigType = dayjs(), targetTime: string): boolean {
  // 将指定时间转换为 dayjs 对象
  const specified = dayjs(specifiedTime);

  // 将目标时间转换为 dayjs 对象
  const target = dayjs(targetTime);

  return specified.isBefore(target);
}
