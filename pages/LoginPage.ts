// LoginPage — Page Object đại diện cho trang đăng nhập (/login)
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  // Lưu instance của page để dùng trong toàn bộ class
  readonly page: Page;

  // URL của trang login
  readonly url: string = 'https://the-internet.herokuapp.com/login';

  // Các selectors của trang login
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorFlashMessage: Locator;
  readonly successFlashMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Khai báo locators — chỉ cần sửa 1 chỗ nếu selector thay đổi
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorFlashMessage = page.locator('.flash.error');
    this.successFlashMessage = page.locator('.flash.success');
  }

  // Điều hướng đến trang login
  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  // Nhập username vào form
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  // Nhập password vào form
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  // Click nút Login
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  // Hàm tổng hợp: thực hiện toàn bộ flow đăng nhập
  // Nếu username hoặc password để trống (undefined), sẽ bỏ qua bước fill tương ứng
  async login(username?: string, password?: string): Promise<void> {
    if (username !== undefined) {
      await this.fillUsername(username);
    }
    if (password !== undefined) {
      await this.fillPassword(password);
    }
    await this.clickLogin();
  }

  // Kiểm tra vẫn đang ở trang login (dùng cho các test case đăng nhập thất bại)
  async expectStillOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(this.url);
  }

  // Kiểm tra flash error message hiển thị đúng nội dung
  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.errorFlashMessage).toBeVisible();
    await expect(this.errorFlashMessage).toContainText(message);
  }
}
