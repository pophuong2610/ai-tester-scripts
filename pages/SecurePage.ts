// SecurePage — Page Object đại diện cho trang bảo mật sau khi đăng nhập thành công (/secure)
import { Page, Locator, expect } from '@playwright/test';

export class SecurePage {
  // Lưu instance của page để dùng trong toàn bộ class
  readonly page: Page;

  // URL của trang secure
  readonly url: string = 'https://the-internet.herokuapp.com/secure';

  // Selector flash message thành công
  readonly successFlashMessage: Locator;

  // Selector link Logout
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successFlashMessage = page.locator('.flash.success');
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }

  // Kiểm tra đã redirect đúng đến trang secure
  async expectOnSecurePage(): Promise<void> {
    await expect(this.page).toHaveURL(this.url);
  }

  // Kiểm tra flash success message hiển thị đúng nội dung
  async expectSuccessMessage(message: string): Promise<void> {
    await expect(this.successFlashMessage).toBeVisible();
    await expect(this.successFlashMessage).toContainText(message);
  }

  // Click link Logout để đăng xuất khỏi trang secure
  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}
