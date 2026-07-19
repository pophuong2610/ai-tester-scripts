class DropdownPage {
  constructor(page) {
    this.page = page;
    this.dropdownSelect = page.locator('#dropdown');
  }

  async goto() {
    await this.page.goto('/dropdown');
  }

  async selectByValue(value) {
    await this.dropdownSelect.selectOption({ value: value });
  }

  async selectByLabel(label) {
    await this.dropdownSelect.selectOption({ label: label });
  }

  async getSelectedOption() {
    return await this.dropdownSelect.inputValue();
  }

  async getSelectedOptionText() {
    const selectedValue = await this.dropdownSelect.inputValue();
    return await this.dropdownSelect.locator(`option[value="${selectedValue}"]`).innerText();
  }
}

module.exports = { DropdownPage };