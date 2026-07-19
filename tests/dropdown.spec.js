// Test suite cho tính năng Dropdown
// Target: https://the-internet.herokuapp.com/dropdown

const { test, expect } = require('@playwright/test');
const { DropdownPage } = require('../pages/DropdownPage');

test.describe('Dropdown Feature', () => {
  let dropdownPage;

  test.beforeEach(async ({ page }) => {
    dropdownPage = new DropdownPage(page);
    await dropdownPage.goto();
  });

  test('TC07 — Chọn Option 1 từ dropdown', async () => {
    // Chọn Option 1 theo value attribute
    await dropdownPage.selectByValue('1');
    
    // Verify value đã được chọn
    const selectedValue = await dropdownPage.getSelectedOption();
    expect(selectedValue).toBe('1');
    
    // Verify text hiển thị đúng
    const selectedText = await dropdownPage.getSelectedOptionText();
    expect(selectedText).toContain('Option 1');
  });

  test('TC08 — Chọn Option 2 từ dropdown', async () => {
    // Chọn Option 2 theo label text
    await dropdownPage.selectByLabel('Option 2');

    // Verify value đã được chọn
    const selectedValue = await dropdownPage.getSelectedOption();
    expect(selectedValue).toBe('2');
  });

  test('TC15 — Chọn Option 1 rồi đổi sang Option 2, verify Option 2 được chọn', async () => {
    // Chọn Option 1 trước
    await dropdownPage.selectByValue('1');
    let selectedValue = await dropdownPage.getSelectedOption();
    expect(selectedValue).toBe('1');

    // Đổi lựa chọn sang Option 2
    await dropdownPage.selectByValue('2');

    // Verify dropdown hiện đang chọn Option 2
    selectedValue = await dropdownPage.getSelectedOption();
    expect(selectedValue).toBe('2');
    const selectedText = await dropdownPage.getSelectedOptionText();
    expect(selectedText).toContain('Option 2');
  });
});