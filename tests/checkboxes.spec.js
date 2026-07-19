// Test suite cho tính năng Checkboxes
// Target: https://the-internet.herokuapp.com/checkboxes

const { test, expect } = require('@playwright/test');
const { CheckboxesPage } = require('../pages/CheckboxesPage');

test.describe('Checkboxes Feature', () => {
  let checkboxesPage;

  test.beforeEach(async ({ page }) => {
    checkboxesPage = new CheckboxesPage(page);
    await checkboxesPage.goto();
  });

  test('TC04 — Verify trạng thái mặc định của checkboxes', async () => {
  const cb1 = await checkboxesPage.isChecked(checkboxesPage.checkbox1);
  // Cố tình sai expected value
  expect(cb1).toBe(true); // thực tế là false
});

  test('TC05 — Check checkbox 1 thành công', async () => {
    // Checkbox 1 mặc định unchecked — check nó
    await checkboxesPage.check(checkboxesPage.checkbox1);
    
    // Verify đã được check
    const isChecked = await checkboxesPage.isChecked(checkboxesPage.checkbox1);
    expect(isChecked).toBe(true);
  });

  test('TC06 — Uncheck checkbox 2 thành công', async () => {
    // Checkbox 2 mặc định checked — uncheck nó
    await checkboxesPage.uncheck(checkboxesPage.checkbox2);

    // Verify đã được uncheck
    const isChecked = await checkboxesPage.isChecked(checkboxesPage.checkbox2);
    expect(isChecked).toBe(false);
  });

  test('TC14 — Check cả 2 checkboxes và verify cả 2 đều checked', async () => {
    // Check checkbox 1 (mặc định unchecked)
    await checkboxesPage.check(checkboxesPage.checkbox1);
    // Check checkbox 2 (mặc định đã checked, nhưng vẫn gọi để đảm bảo trạng thái)
    await checkboxesPage.check(checkboxesPage.checkbox2);

    // Verify cả 2 checkbox đều đang checked
    const cb1Checked = await checkboxesPage.isChecked(checkboxesPage.checkbox1);
    const cb2Checked = await checkboxesPage.isChecked(checkboxesPage.checkbox2);
    expect(cb1Checked).toBe(true);
    expect(cb2Checked).toBe(true);
  });
});