const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/__mocks__/(.*)$": "<rootDir>/src/__mocks__/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/layouts/(.*)$": "<rootDir>/src/layouts/$1",
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@/providers/(.*)$": "<rootDir>/src/providers/$1",
    "^@/public/(.*)$": "<rootDir>/public/$1",
    "^@/styles/(.*)$": "<rootDir>/src/styles/$1",
  },
  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
