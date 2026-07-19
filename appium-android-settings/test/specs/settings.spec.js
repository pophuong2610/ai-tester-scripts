/**
 * settings.spec.js
 * Test scenario: Mở app Settings -> vào "Network & internet" -> kiểm tra "Internet" và "SIMs"
 *
 * Selector strategy: dùng UiSelector (Android UiAutomator) lấy từ Appium Inspector.
 * Trong WebdriverIO, selector kiểu này được truyền dạng string với prefix "android="
 */

describe('Android Settings App', () => {
  // Các selector lấy từ Appium Inspector (theo đề bài)
  //
  // Lưu ý: "Airplane mode" thực tế nằm bên trong màn hình "Network & internet"
  // (cùng danh sách với "Internet" và "SIMs"), KHÔNG phải item trên màn hình Settings home.
  // Đã xác nhận qua Appium Inspector -> chuyển việc verify "Airplane mode" sang Bước 4.
  const MENU_ITEM_NETWORK_INTERNET =
    'android=new UiSelector().text("Network & internet")';
  const MENU_ITEM_INTERNET = 'android=new UiSelector().text("Internet")';
  const MENU_ITEM_SIMS = 'android=new UiSelector().text("SIMs")';
  const AIRPLANE_MODE = 'android=new UiSelector().text("Airplane mode")';

  before(async () => {
    // App Settings đã được mở sẵn thông qua appPackage/appActivity trong wdio.conf.js
    // Nên không cần thao tác mở app thủ công ở đây.
    // Nếu app chưa mở, có thể gọi lại activity bằng driver.startActivity(...)
    await driver.startActivity('com.android.settings', '.Settings');
  });

  it('Bước 2: Verify màn hình Settings hiển thị (item "Network & internet" visible)', async () => {
    const networkInternetItem = await $(MENU_ITEM_NETWORK_INTERNET);

    // Chờ tối đa 10s (theo waitforTimeout trong config) để item "Network & internet" xuất hiện
    await networkInternetItem.waitForDisplayed({ timeout: 10000 });

    const isDisplayed = await networkInternetItem.isDisplayed();
    expect(isDisplayed).toBe(true);
  });

  it('Bước 3: Click vào "Network & internet"', async () => {
    const networkInternetItem = await $(MENU_ITEM_NETWORK_INTERNET);

    await networkInternetItem.waitForDisplayed({ timeout: 10000 });
    await networkInternetItem.click();
  });

  it('Bước 4: Verify màn hình mở ra có item "Internet", "SIMs" và "Airplane mode"', async () => {
    const internetItem = await $(MENU_ITEM_INTERNET);
    const simsItem = await $(MENU_ITEM_SIMS);
    const airplaneModeItem = await $(AIRPLANE_MODE);

    // Chờ và verify item "Internet" hiển thị
    await internetItem.waitForDisplayed({ timeout: 10000 });
    expect(await internetItem.isDisplayed()).toBe(true);

    // Chờ và verify item "SIMs" hiển thị
    await simsItem.waitForDisplayed({ timeout: 10000 });
    expect(await simsItem.isDisplayed()).toBe(true);

    // Chờ và verify item "Airplane mode" hiển thị (nằm trong màn Network & internet)
    await airplaneModeItem.waitForDisplayed({ timeout: 10000 });
    expect(await airplaneModeItem.isDisplayed()).toBe(true);
  });
});
