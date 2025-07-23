export type FetcherParams = {
  url: string;
  params?: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
};

export type FetcherError = {
  status: number;
  statusText: string;
  message: string;
  url: string;
};

export const fetcher = <T = any>({ url, params }: FetcherParams): T => {
  const response = UrlFetchApp.fetch(url, params ?? {});
  const responseCode = response.getResponseCode();

  // HTTPエラーステータスコードの場合
  if (responseCode >= 400) {
    const errorText = response.getContentText();
    let errorMessage: string;

    try {
      // JSONエラーレスポンスの場合
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.message || errorData.error || errorText;
    } catch {
      // プレーンテキストエラーレスポンスの場合
      errorMessage = errorText || `HTTP ${responseCode}`;
    }

    const error: FetcherError = {
      status: responseCode,
      statusText: `HTTP ${responseCode}`,
      message: errorMessage,
      url,
    };

    throw error;
  }

  const data = response.getContentText();

  // デバッグ用：レスポンス内容をログ出力
  console.log("API レスポンス内容:", data);
  console.log("レスポンス長:", data.length);
  console.log("レスポンス種別:", typeof data);

  // 空のレスポンスの場合
  if (!data || data.trim().length === 0) {
    console.error("空のレスポンスを受信しました");
    const error: FetcherError = {
      status: responseCode,
      statusText: "Empty Response",
      message: `API returned empty response. This might indicate API authentication issues, rate limiting, or server-side problems.`,
      url,
    };
    throw error;
  }

  try {
    return JSON.parse(data) as T;
  } catch (parseError) {
    // JSONパースエラーの場合
    console.error("JSON パースエラー詳細:", parseError);
    console.error("パース対象データ:", data);
    const error: FetcherError = {
      status: responseCode,
      statusText: "JSON Parse Error",
      message: `Failed to parse response as JSON: ${parseError}`,
      url,
    };
    throw error;
  }
};
