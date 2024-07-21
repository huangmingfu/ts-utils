import { isClient } from './browser';

/**
 * 请求动画帧的函数，用于在浏览器环境下执行动画。
 * @param {FrameRequestCallback} fn 要执行的动画函数。
 */
export function raf(fn: FrameRequestCallback) {
  return   isClient
  ? window.requestAnimationFrame(fn)
  : (setTimeout(fn, 16) as unknown as number)
}

/**
 * 取消动画帧的函数，用于在浏览器环境下取消动画。
 * @param {number} id 要取消的动画帧的 ID。
 */
export function cancelRaf(id: number) {
  return isClient ? window.cancelAnimationFrame(id) : clearTimeout(id)
}

/**
 * 双倍请求动画帧的函数，用于在浏览器环境下执行连续的动画。
 * @param {FrameRequestCallback} fn 要执行的动画函数。
 */
export function doubleRaf(fn: FrameRequestCallback): void {
  // 在请求动画帧的回调函数中再次请求动画帧，以确保连续执行动画。
  raf(() => raf(fn));
}
