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
 * 进行脱敏处理，显示前指定位数和后指定位数，中间用星号替换
 * @param val - 要进行脱敏处理的数据（如手机号、身份证号）
 * @param frontLen - 前面保留的位数，默认为3
 * @param endLen - 后面保留的位数，默认为4
 * @returns 脱敏处理后的字符串
 */
export function maskSensitiveInfo(val: string | number, frontLen: number = 3, endLen: number = 4): string {
  const str = val.toString();
  const totalLen = frontLen + endLen;
  if (str.length <= totalLen) {
    throw new Error('Input is too short to mask with the given lengths');
  }
  const visibleStart = str.slice(0, frontLen);
  const visibleEnd = str.slice(-endLen);
  const masked = '*'.repeat(str.length - totalLen);
  return `${visibleStart}${masked}${visibleEnd}`;
}

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
    const params: Record<string, string> = {};
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

/**
 * 平滑滚动到页面上的指定元素
 * @param el 要滚动到的目标元素
 * @param block 滚动到元素的哪个位置，可选值包括'start', 'center', 'end'等，默认为'start'
 */
export function scrollTo(el: HTMLElement, block: ScrollLogicalPosition = 'start') {
  el.scrollIntoView({
    behavior: 'smooth',
    block,
  })
}

/**
 * 从对象中省略不需要的属性
 * @param obj 
 * @param keys 
 */
export const omit = <T, TKeys extends keyof T>(
  obj: T,
  keys: TKeys[]
): Omit<T, TKeys> => {
  if (!obj) return {} as Omit<T, TKeys>
  if (!keys || keys.length === 0) return obj as Omit<T, TKeys>
  return keys.reduce(
    (acc, key) => {
      delete acc[key]
      return acc
    },
    { ...obj }
  )
}

/**
 * 从对象中仅选择所需的属性
 * @param obj 
 * @param keys 
 */
export const pick = <T extends object, TKeys extends keyof T>(
  obj: T,
  keys: TKeys[]
): Pick<T, TKeys> => {
  if (!obj) return {} as Pick<T, TKeys>
  return keys.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) acc[key] = obj[key]
    return acc
  }, {} as Pick<T, TKeys>)
}

/**
 * 移除对象中满足特定条件的属性
 * @param {T} obj 要处理的对象
 * @param {(value: any) => boolean} filter 判断属性值是否需要移除的函数，默认移除值为undefined的属性
 * @returns {Omit<T, RemovedKeys>} 返回一个新的对象，该对象中移除了满足filter条件的属性
 */
export const shake = <RemovedKeys extends string, T>(
  obj: T,
  filter: (value: any) => boolean = x => x === undefined
): Omit<T, RemovedKeys> => {
  if (!obj) return {} as T
  const keys = Object.keys(obj) as (keyof T)[]
  return keys.reduce((acc, key) => {
    if (filter(obj[key])) {
      return acc
    } else {
      acc[key] = obj[key]
      return acc
    }
  }, {} as T)
}