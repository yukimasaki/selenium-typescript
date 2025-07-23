/**
 * ログ出力用のヘルパー関数
 */
export const logStart = (functionName: string, params?: any) => {
  console.log(
    `[START] ${functionName}`,
    params ? `params: ${JSON.stringify(params)}` : ""
  );
  return Date.now();
};

export const logEnd = (
  functionName: string,
  startTime: number,
  result?: any
) => {
  const endTime = Date.now();
  const duration = endTime - startTime;
  console.log(
    `[END] ${functionName} - 処理時間: ${duration}ms`,
    result ? `result: ${JSON.stringify(result)}` : ""
  );
};

/**
 * 関数の実行前後にログを出力するデコレーター
 * @param fn ログを出力したい関数
 * @returns ログ出力機能付きの関数
 */
export const withLogging = <T extends (...args: any[]) => any>(fn: T) => {
  return (...args: Parameters<T>): ReturnType<T> => {
    const startTime = logStart(fn.name, args);
    const result = fn(...args);
    logEnd(fn.name, startTime, result);
    return result;
  };
};

/**
 * クラスメソッド用のロギングデコレーター
 * @param target クラスのプロトタイプ
 * @param propertyKey メソッド名
 * @param descriptor プロパティディスクリプター
 */
export function Logged(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const startTime = logStart(propertyKey, args);
    const result = originalMethod.apply(this, args);
    logEnd(propertyKey, startTime, result);
    return result;
  };

  return descriptor;
}
