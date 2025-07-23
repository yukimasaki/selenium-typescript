/**
 * 時間をフォーマットする（副作用のない純粋関数）
 * @param time - フォーマット対象の時間
 * @returns フォーマットされた時間文字列
 */
export const formatTime = (time: Date): string => {
  const date = new Date(time);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

/**
 * 日付をフォーマットする（副作用のない純粋関数）
 * @param date - フォーマット対象の日付
 * @returns フォーマットされた日付文字列
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
