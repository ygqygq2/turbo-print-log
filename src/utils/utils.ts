/**
 * Sleep micro second
 * @param ms micro second to sleep
 */
export function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function processVariableName(variableName: string) {
  const count = (variableName.match(/\$/g) || []).length; // 统计字符串中的 $ 符号个数
  let escapedVariableName = variableName;
  if (count >= 2 && count % 2 === 0) {
    const halfCount = count / 2;
    let escapedCount = 0;
    escapedVariableName = variableName.replace(/\$/g, (match) => {
      if (escapedCount < halfCount) {
        escapedCount++;
        return '\\$';
      }
      return match;
    });
  }
  return escapedVariableName;
}

/**
 * 创建一个防抖函数
 * @param fn 要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 返回防抖后的函数和取消方法
 */
export function createDebounce<T extends (...args: never[]) => void>(
  fn: T,
  delay: number,
): { debounced: T; cancel: () => void } {
  let timer: NodeJS.Timeout | undefined;

  const debounced = ((...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
      timer = undefined;
    }, delay);
  }) as T;

  const cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  return { debounced, cancel };
}
