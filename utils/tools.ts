/**
 * 获取图片宽高
 * @export
 * @param {File} file 图片
 * @return {*}  {Promise<{ w: number; h: number }>} 宽高
 */
export function getImageSize(file: File): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      image.src = reader.result as string;
    };
    image.onload = function () {
      resolve({ w: image.naturalWidth, h: image.naturalHeight });
    };
    reader.onerror = reject;
    image.onerror = reject;
  });
}


/**
 * 复制文本到剪贴板
 * 注意: `navigator.clipboard` 可能受浏览器设置或兼容性影响。
 * @param {string} text 要复制的文本
 * @param {string | null} [prompt='已成功复制到剪切板!'] 复制成功时的提示文本，默认为 '已成功复制到剪切板!'
 * @returns {Promise<void>} 返回一个 Promise，表示复制操作的结果。如果复制成功，Promise 将被解析；如果失败，Promise 将被拒绝，带有错误信息。
 */
export function copyText(text: string, prompt: string | null = '已成功复制到剪切板!') {
  if (navigator.clipboard) {
    return navigator.clipboard
      .writeText(text)
      .then(() => {
        // prompt && message.success(prompt);
      })
      .catch((error) => {
        // message.error('复制失败!' + error.message);
        return error;
      });
  }
  if (Reflect.has(document, 'execCommand')) {
    return new Promise<void>((resolve, reject) => {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        // 在手机 Safari 浏览器中，点击复制按钮，整个页面会跳动一下
        textArea.style.width = '0';
        textArea.style.position = 'fixed';
        textArea.style.left = '-999px';
        textArea.style.top = '10px';
        textArea.setAttribute('readonly', 'readonly');
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        // prompt && message.success(prompt);
        resolve();
      } catch (error) {
        // message.error('复制失败!' + error.message);
        reject(error);
      }
    });
  }
  return Promise.reject(`"navigator.clipboard" 或 "document.execCommand" 中存在API错误, 拷贝失败!`);
}

/**
 * 获取 CSS 变量的值
 * @param cssVariableName - CSS 变量的名称
 * @returns 返回 CSS 变量的值，如果获取失败则返回空字符串
 */
export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = ""
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
  } catch (error) {
    console.error(error)
  }
  return cssVariableValue
}

/**
 * 用 JavaScript 设置全局 CSS 变量
 * @param cssVariableName - CSS 变量的名称
 * @param cssVariableValue - 要设置的 CSS 变量的值
 */
export const setCssVariableValue = (cssVariableName: string, cssVariableValue: string) => {
  try {
    document.documentElement.style.setProperty(cssVariableName, cssVariableValue)
  } catch (error) {
    console.error(error)
  }
}

/**
 * 比较两个值是否相同
 * @param newValue - 新值
 * @param oldValue - 旧值
 * @returns 如果两个值相同，返回 true；否则返回 false
 */
export const isSameValue = (newValue: unknown, oldValue: unknown) =>
  JSON.stringify(newValue) === JSON.stringify(oldValue);

/**
 * 将单个元素或数组转换为数组
 * @param item - 单个元素或数组
 * @returns 如果输入是数组，则返回输入；否则将单个元素转换为数组并返回
 */
export const toArray = <T>(item: T | T[]): T[] =>
  Array.isArray(item) ? item : [item];