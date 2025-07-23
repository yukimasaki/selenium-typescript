export type Env = {
  GEMINI_API_URL: string;
  GEMINI_API_KEY: string;
  APPSHEET_API_URL: string;
  APPSHEET_APP_ID: string;
  APPSHEET_ACCESS_KEY: string;
};

export const getEnv = (): Env => {
  const scriptProperties = PropertiesService.getScriptProperties();
  const env = scriptProperties.getProperties();
  return env as Env;
};

export const buildHeaders = (env: Env) => ({
  "X-goog-api-key": env.GEMINI_API_KEY,
});
