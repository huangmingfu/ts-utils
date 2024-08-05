// copy by https://github.com/element-plus/element-plus

import { isArray, isObject, isString, isDate, isFunction, isSymbol } from '@vue/shared'

export {
  isArray,
  isFunction,
  isObject,
  isString,
  isDate,
  isPromise,
  isSymbol,
} from '@vue/shared'

export {
  isArguments,
  isArrayBuffer,
  isArrayLike,
  isArrayLikeObject,
  isBuffer,
  isEqual,
  isEqualWith,
  isError,
  isFinite,
  isLength,
  isMap,
  isMatch,
  isMatchWith,
  isNative,
  isNil,
  isNull,
  isObjectLike,
  isPlainObject,
  isRegExp,
  isSafeInteger,
  isSet,
  isTypedArray,
  isWeakMap,
  isWeakSet,
} from 'lodash-es';

export const isUndefined = (val: any): val is undefined => val === undefined

export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

export const isNumber = (val: any): val is number => typeof val === 'number'

// 0不会被判为空的isEmpty
export const isEmptyWithZero = (val: unknown) =>
  (!val && val !== 0) ||
  (isArray(val) && val.length === 0) ||
  (isObject(val) && !Object.keys(val).length)

// 0会被判为空的isEmpty
export const isEmpty = (value: any) => {
  if (value === true || value === false) return true
  if (value === null || value === undefined) return true
  if (isNumber(value)) return value === 0
  if (isDate(value)) return isNaN(value.getTime())
  if (isFunction(value)) return false
  if (isSymbol(value)) return false
  const length = (value as any).length
  if (isNumber(length)) return length === 0
  const size = (value as any).size
  if (isNumber(size)) return size === 0
  const keys = Object.keys(value).length
  return keys === 0
}

export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false
  return e instanceof Element
}

export const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false
  }
  return !Number.isNaN(Number(val))
}

export const isWindow = (val: unknown): val is Window => {
  return val === window
}

export function isEmptyObject(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length === 0;
}

/**
 * @description 判断是否为整数
 */
export const isInt = (value: any): value is number => {
  return isNumber(value) && value % 1 === 0
}

/**
 * @description 判断是否为浮点数
 */
export const isFloat = (value: any): value is number => {
  return isNumber(value) && value % 1 !== 0
}