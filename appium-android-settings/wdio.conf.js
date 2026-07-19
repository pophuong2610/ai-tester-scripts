/**
 * wdio.conf.js
 * Cấu hình WebdriverIO để test app Settings trên Android Emulator thông qua Appium.
 *
 * Cách chạy:
 *   1. Khởi động Android Emulator (emulator-5554)
 *   2. Khởi động Appium Server: appium --port 4723
 *   3. Chạy test: npx wdio run wdio.conf.js
 */

exports.config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  runner: 'local',

  //
  // ==================
  // Appium Server Config
  // ==================
  // Appium server chạy local tại localhost:4723
  hostname: 'localhost',
  port: 4723,
  path: '/', // Appium 2.x dùng path gốc '/', Appium 1.x dùng '/wd/hub'

  //
  // ==================
  // Specs (file test spec sẽ chạy)
  // ==================
  specs: ['./test/specs/**/*.spec.js'],
  exclude: [],

  //
  // ============
  // Capabilities
  // ============
  maxInstances: 1,

  capabilities: [
    {
      // Chỉ định dùng driver UiAutomator2 cho Android
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',

      // Thông tin thiết bị - Android Emulator
      'appium:deviceName': 'emulator-5554',
      'appium:platformVersion': '17.0',

      // Không cần cài app vì Settings là app hệ thống có sẵn
      // Chỉ định package + activity để mở thẳng app Settings
      'appium:appPackage': 'com.android.settings',
      'appium:appActivity': 'com.android.settings.Settings',

      // Không reset app sau mỗi lần chạy để giữ trạng thái hệ thống Settings
      'appium:noReset': true,
'appium:newCommandTimeout': 240,
'appium:forceAppLaunch': true,
'appium:autoLaunch': true,
    },
  ],

  //
  // ===================
  // Test Configurations
  // ===================
  logLevel: 'info',
  bail: 0,

  // Thời gian chờ tối đa để tìm 1 element (ms)
  waitforTimeout: 10000,

  // Timeout kết nối tới Appium server
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  // Framework chạy test: Mocha
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  //
  // ========
  // Reporters
  // ========
  reporters: ['spec'],

  //
  // =====
  // Hooks
  // =====
  // before/after hook có thể bổ sung thêm nếu cần setup/teardown riêng
  before: function (capabilities, specs) {
    // Có thể thêm log hoặc thiết lập global ở đây nếu cần
  },
};
