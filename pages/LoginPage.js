class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.flashMessage = page.locator('#flash');
    this.logoutButton = page.locator('a[href="/logout"]');
    this.pageHeading = page.locator('h2');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getFlashMessage() {
    await this.flashMessage.waitFor({ state: 'visible' });
    return await this.flashMessage.innerText();
  }

  async isLoggedIn() {
    return this.page.url().includes('/secure');
  }

  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = { LoginPage };