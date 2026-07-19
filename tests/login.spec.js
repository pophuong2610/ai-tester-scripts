const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login Feature', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC01 — Đăng nhập thành công với thông tin hợp lệ', async ({ page }) => {
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
    const flash = await loginPage.getFlashMessage();
    expect(flash).toContain('You logged into a secure area!');
  });

  test('TC02 — Đăng nhập thất bại với mật khẩu sai', async () => {
    await loginPage.login('tomsmith', 'wrongpassword');
    const flash = await loginPage.getFlashMessage();
    expect(flash).toContain('Your password is invalid!');
  });

  test('TC03 — Đăng nhập thất bại với username sai', async () => {
    await loginPage.login('wronguser', 'SuperSecretPassword!');
    const flash = await loginPage.getFlashMessage();
    expect(flash).toContain('Your username is invalid!');
  });
});