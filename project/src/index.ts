import { Builder } from "selenium-webdriver";

(async function runTest() {
  console.log("テストスクリプトを開始します...");
  let driver;

  try {
    // Docker Compose内のhubサービスに接続
    driver = await new Builder()
      .usingServer("http://selenium-hub:4444/wd/hub")
      .forBrowser("chrome")
      .build();

    console.log("WebDriverセッションを確立しました。");

    // ウィンドウサイズを指定
    await driver.manage().window().setRect({ width: 1280, height: 800 });

    await driver.get("https://www.google.com/search?q=VNC");
    console.log("ページにアクセスしました。");

    // 5秒待機して操作を確認しやすくする
    await driver.sleep(5000);

    console.log("テストスクリプトが正常に完了しました。");
  } catch (err) {
    console.error("テスト中にエラーが発生しました:", err);
  } finally {
    if (driver) {
      await driver.quit();
      console.log("WebDriverセッションを終了しました。");
    }
  }
})();
