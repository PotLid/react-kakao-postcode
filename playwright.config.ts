import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    reporter: 'list',
    use: {
        baseURL: 'http://localhost:4321',
    },
    webServer: {
        command: 'node e2e/server.mjs',
        url: 'http://localhost:4321/index.html',
        reuseExistingServer: !process.env.CI,
    },
})
