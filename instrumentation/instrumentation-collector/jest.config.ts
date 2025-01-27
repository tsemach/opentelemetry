import { defaults as tsjPreset } from "ts-jest/presets";
import type { InitialOptionsTsJest } from "ts-jest/dist/types";

const config: InitialOptionsTsJest = {
    cacheDirectory: "<rootDir>/tmp/jest_cache",
    collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
    coveragePathIgnorePatterns: ["<rootDir>/src/routes.ts"],
    testEnvironment: "node",
    testMatch: ["**/test/**/*.test.ts"],
    verbose: true,
    forceExit: true,
    reporters: ["jest-summary-reporter", "jest-silent-reporter"],
    coverageThreshold: {
        global: {
            lines: 80,
        },
    },
    transform: {
        ...tsjPreset.transform,
    },
    setupFilesAfterEnv: ["<rootDir>/test/config/env.ts"],
    setupFiles: ["jest-date-mock"],
    globalSetup: "<rootDir>/test/config/setup.ts",
    globalTeardown: "<rootDir>/test/config/teardown.ts",
};

export default config;
