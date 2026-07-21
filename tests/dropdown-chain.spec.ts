import { test, expect } from '@playwright/test';
import dropdownData from '../test-data/dropdown-test-data.json';

const BASE_URL = process.env.BASE_URL || 'https://the-internet.herokuapp.com';

const { defaultOption, scenarios } = dropdownData;
const { happyPath, switchOption, outline } = scenarios;

test.describe('Dropdown — Chọn option từ danh sách', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/dropdown`);
    await page.waitForSelector('#dropdown', { state: 'visible' });
  });

  test('TC-DROP-01 — Trạng thái mặc định khi trang load', async ({ page }) => {
    const dropdown = page.locator('#dropdown');
    await expect(dropdown).toBeVisible();
    const selectedValue = await dropdown.inputValue();
    expect(selectedValue).toBe(defaultOption.value);
  });

  test('TC-DROP-02 — Chọn Option 1 thành công', async ({ page }) => {
    const dropdown = page.locator('#dropdown');
    const { input, expectedValue } = happyPath.selectOption1;
    await dropdown.selectOption({ value: input });
    await expect(dropdown).toHaveValue(expectedValue);
  });

  test('TC-DROP-03 — Chọn Option 2 thành công', async ({ page }) => {
    const dropdown = page.locator('#dropdown');
    const { input, expectedValue } = happyPath.selectOption2;
    await dropdown.selectOption({ label: input });
    await expect(dropdown).toHaveValue(expectedValue);
  });

  test('TC-DROP-04 — Đổi từ Option 1 sang Option 2', async ({ page }) => {
    const dropdown = page.locator('#dropdown');
    const { firstSelect, secondSelect, expectedFinal } = switchOption.from1to2;
    await dropdown.selectOption({ value: firstSelect });
    await expect(dropdown).toHaveValue(firstSelect);
    await dropdown.selectOption({ value: secondSelect });
    await expect(dropdown).toHaveValue(expectedFinal);
  });

  test('TC-DROP-05 — Đổi từ Option 2 sang Option 1', async ({ page }) => {
    const dropdown = page.locator('#dropdown');
    const { firstSelect, secondSelect, expectedFinal } = switchOption.from2to1;
    await dropdown.selectOption({ value: firstSelect });
    await expect(dropdown).toHaveValue(firstSelect);
    await dropdown.selectOption({ value: secondSelect });
    await expect(dropdown).toHaveValue(expectedFinal);
  });

  test('TC-DROP-06 — Giữ nguyên option sau khi không tương tác', async ({ page }) => {
    const dropdown = page.locator('#dropdown');
    const { input, expectedValue } = happyPath.selectOption1;
    await dropdown.selectOption({ value: input });
    await expect(dropdown).toHaveValue(expectedValue);
  });

  for (const option of outline.options) {
    test(`TC-DROP-07 — Chọn ${option.label} verify value=${option.value}`, async ({ page }) => {
      const dropdown = page.locator('#dropdown');
      await dropdown.selectOption({ label: option.label });
      await expect(dropdown).toHaveValue(option.value);
    });
  }

});
