import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    reporter: process.env.CI ? 'github' : 'list',
    use: {
        baseURL: 'http://localhost:4321',
    },
    webServer: {
        command: 'node e2e/server.mjs',
        url: 'http://localhost:4321/index.html',
        reuseExistingServer: !process.env.CI,
    },
})
