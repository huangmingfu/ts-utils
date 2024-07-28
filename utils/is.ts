// copy by https://github.com/element-plus/element-plus

import { isArray, isObject, isString } from '@vue/shared'

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
export const isEmpty = (val: unknown) =>
  (!val && val !== 0) ||
  (isArray(val) && val.length === 0) ||
  (isObject(val) && !Object.keys(val).length)

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