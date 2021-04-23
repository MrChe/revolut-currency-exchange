// eslint-disable-next-line no-undef
module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  globals: {},
  transform: {
    "^.+\\.css$": "<rootDir>/tests/configs/cssTransform.ts",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)":
      "<rootDir>/tests/configs/fileTransform.ts",
    ".+\\.(png|jpg|gif)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-svg-transformer",
  },
  // roots: ['<rootDir>/src'],
  rootDir: "..",
  verbose: true,
  // setupFiles: ["react-app-polyfill/jsdom"],
  // setupFilesAfterEnv: ["<rootDir>/tests/configs/setupTests.ts"],
  testMatch: ["<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}"],
  // testEnvironment: "jsdom",
  // testRunner: "<rootDir>/node_modules/jest-circus/runner.js",
  transformIgnorePatterns: ["/node_modules/"],
  moduleDirectories: ["node_modules"],
  modulePaths: [],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  moduleFileExtensions: ["js", "ts", "tsx", "json", "jsx", "node"],
  // watchPlugins: [
  //   "jest-watch-typeahead/filename",
  //   "jest-watch-typeahead/testname",
  // ],
  resetMocks: true,
  bail: true,
  // snapshotSerializers: ["enzyme-to-json/serializer"],
  // reporters: [
  //   "default",
  //   [
  //     "./node_modules/jest-junit",
  //     {
  //       suiteName: "jest tests",
  //       outputDirectory: ".",
  //       outputName: "junit.xml",
  //       uniqueOutputName: "false",
  //       classNameTemplate: "{classname}-{title}",
  //       titleTemplate: "{classname}-{title}",
  //       ancestorSeparator: " › ",
  //       usePathForSuiteName: "true",
  //     },
  //   ],
  //   [
  //     "./node_modules/jest-html-reporters",
  //     {
  //       pageTitle: "Test Report",
  //       publicPath: "./",
  //       filename: "test-report.html",
  //       expand: true,
  //     },
  //   ],
  // ],
  // testResultsProcessor: "jest-junit",
};
