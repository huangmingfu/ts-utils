import { isPhone } from './validate';
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

/**
 * 将手机号进行脱敏处理，显示前三位和后四位，中间用星号替换
 * @param phone - 要进行脱敏处理的手机号
 * @returns 脱敏处理后的手机号
 */
export function maskPhoneNumber(phone: string) {
  if (!isPhone(phone)) return
  return phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
};

/**
 * 获取链接的参数值或将所有参数解析为对象
 * @param key 参数键名，若为空则返回所有参数对象
 * @param urlStr 链接地址，默认为当前浏览器的地址
 * @returns 若提供了键名则返回对应的参数值，否则返回所有参数的对象
 */
export function getUrlParams(urlStr: string = window.location.href, key?: string): string | Record<string, string> {
  if (!urlStr) return key ? '' : {};

  const url = new URL(decodeURIComponent(urlStr));

  // 如果没有提供键名，则返回所有参数的对象
  if (!key) {
    const params = {};
    url.searchParams.forEach((value, paramKey) => {
      params[paramKey] = value;
    });
    return params;
  }

  // 如果提供了键名，则返回对应的参数值
  return url.searchParams.get(key) ?? '';
};

/**
 * 动态加载外部脚本
 * @param src - 要加载的脚本的源 URL。
 * @param options - 一个包含脚本属性的对象，例如 async、defer 等。默认 async 为 true。
 * @param target - 脚本添加的地方。默认是 'body'。
 * @returns 一个 Promise，当脚本成功加载时 resolve，在加载出错时 reject。
 */
export function loadScript(src: string, options?: Partial<HTMLScriptElement>, target = 'body'): Promise<void> {
  return new Promise((resolve, reject) => {
      // 检查脚本是否已存在于文档中，以避免重复加载
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
          resolve();
          return;
      }

      // 创建一个新的 script 元素
      const script = document.createElement('script');
      script.src = src;

      // 应用 options 中的所有属性
      Object.assign(script, options);

      // 默认 async 属性为 true
      if (options?.async === undefined) {
          script.async = true;
      }

      // 设置事件监听器以处理脚本加载和错误事件
      script.onload = () => resolve();
      script.onerror = (e) => {
          console.log(`加载脚本失败：error -->`, e);
          reject(new Error(`加载脚本失败: ${src}`))
      };

      // 将脚本添加到指定的 target 中以开始加载
      const targetElement = document.querySelector(target);
      if (targetElement) {
          targetElement.appendChild(script);
      }
  });
}