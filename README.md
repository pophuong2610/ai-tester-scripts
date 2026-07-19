# Internet Automation — Playwright Test Suite

[![Playwright Tests](https://github.com/pophuong2610/ai-tester-scripts/actions/workflows/playwright.yml/badge.svg?branch=d28-automation-suite)](https://github.com/pophuong2610/ai-tester-scripts/actions/workflows/playwright.yml)

## Mô tả
Automation test suite cho [the-internet.herokuapp.com](https://the-internet.herokuapp.com) sử dụng Playwright.

## Tính năng được test
- Login (TC01–TC05)
- Checkboxes (TC04–TC06, TC14)
- Dropdown (TC07–TC08, TC15)
- File Upload (TC09–TC10, TC16)
- Drag and Drop (TC11)

## Chạy test local
```bash
npm install
npx playwright test
npx playwright show-report
```

## CI/CD
Workflow tự động chạy mỗi khi push lên branch `d28-automation-suite` hoặc `main`.