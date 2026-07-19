class CheckboxesPage {
  constructor(page) {
    this.page = page;
    this.checkbox1 = page.locator('input[type="checkbox"]').nth(0);
    this.checkbox2 = page.locator('input[type="checkbox"]').nth(1);
  }

  async goto() {
    await this.page.goto('/checkboxes');
  }

  async isChecked(checkboxLocator) {
    return await checkboxLocator.isChecked();
  }

  async check(checkboxLocator) {
    const checked = await checkboxLocator.isChecked();
    if (!checked) {
      await checkboxLocator.click();
    }
  }

  async uncheck(checkboxLocator) {
    const checked = await checkboxLocator.isChecked();
    if (checked) {
      await checkboxLocator.click();
    }
  }
}

module.exports = { CheckboxesPage };