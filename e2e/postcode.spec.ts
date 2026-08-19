import { test, expect, Page } from '@playwright/test'
import path from 'node:path'

const FAKE_DATA = {
    zonecode: '13529',
    address: '경기 성남시 분당구 백현동',
    roadAddress: '경기 성남시 분당구 판교역로 166',
    jibunAddress: '경기 성남시 분당구 백현동 532',
    buildingName: '카카오 판교 아지트',
    query: '판교역로 166',
}

async function setup(page: Page) {
    await page.route('https://t1.kakaocdn.net/**', (route) => route.abort())
    await page.addInitScript({ path: path.join(__dirname, 'fake-daum.js') })
    await page.goto('/index.html')
}

test.beforeEach(async ({ page }) => {
    await setup(page)
})

test('embed mode: opening mounts the widget, completing an address forwards data and auto-closes', async ({ page }) => {
    const scenario = page.getByTestId('scenario-default')
    const area = scenario.locator('div[style]')

    await scenario.getByRole('button', { name: 'open' }).click()

    await expect(scenario.getByTestId('fake-embed-marker')).toBeVisible()
    await expect(area).toHaveCSS('display', 'block')

    await page.evaluate((data) => {
        const calls = (window as any).__postcodeCalls
        calls[calls.length - 1].triggerComplete(data)
    }, FAKE_DATA)

    await expect(scenario.getByTestId('scenario-default-result')).toContainText(FAKE_DATA.zonecode)

    await page.evaluate(() => {
        const calls = (window as any).__postcodeCalls
        calls[calls.length - 1].triggerClose('COMPLETE_CLOSE')
    })

    await expect(area).toHaveCSS('display', 'none')
})

test('embed mode: the built-in close button hides the widget manually', async ({ page }) => {
    const scenario = page.getByTestId('scenario-default')
    const area = scenario.locator('div[style]')

    await scenario.getByRole('button', { name: 'open' }).click()
    await expect(area).toHaveCSS('display', 'block')

    await scenario.getByRole('button', { name: 'close' }).click()
    await expect(area).toHaveCSS('display', 'none')
})

test('embed mode: reopening (double-click, or close then reopen) does not stack duplicate embeds', async ({ page }) => {
    const scenario = page.getByTestId('scenario-default')
    const area = scenario.locator('div[style]')
    const openButton = scenario.getByRole('button', { name: 'open' })

    // rapid double-open should not create a second Postcode instance/embed
    await openButton.click()
    await openButton.click({ force: true })

    const callsAfterDoubleOpen = await page.evaluate(() => (window as any).__postcodeCalls.length)
    expect(callsAfterDoubleOpen).toBe(1)
    await expect(scenario.getByTestId('fake-embed-marker')).toHaveCount(1)

    // close, then reopen: the container must be cleared, not appended to
    await scenario.getByRole('button', { name: 'close' }).click()
    await expect(area).toHaveCSS('display', 'none')

    await openButton.click()
    await expect(area).toHaveCSS('display', 'block')
    await expect(scenario.getByTestId('fake-embed-marker')).toHaveCount(1)
})

test('popup mode: only renders an open button and calls Postcode#open with openOptions', async ({ page }) => {
    const scenario = page.getByTestId('scenario-popup')

    await expect(scenario.getByRole('button')).toHaveCount(1)
    await scenario.getByRole('button', { name: 'open' }).click()

    const call = await page.evaluate(() => {
        const calls = (window as any).__postcodeCalls
        const last = calls[calls.length - 1]
        return { openOptions: last.openOpenOptions, embedded: Boolean(last.embedElement) }
    })

    expect(call.openOptions).toEqual({ q: 'seed-query', autoClose: false })
    expect(call.embedded).toBe(false)
})

test('hideDefaultButtons + ref: renders no built-in buttons and open()/close() work imperatively', async ({ page }) => {
    const scenario = page.getByTestId('scenario-ref')

    await expect(scenario.getByRole('button', { name: 'open', exact: true })).toHaveCount(0)
    await expect(scenario.getByRole('button', { name: 'close', exact: true })).toHaveCount(0)

    const area = scenario.locator('div[style]')

    await scenario.getByTestId('scenario-ref-trigger').click()
    await expect(area).toHaveCSS('display', 'block')

    await page.evaluate((data) => {
        const calls = (window as any).__postcodeCalls
        calls[calls.length - 1].triggerComplete(data)
    }, FAKE_DATA)
    await expect(scenario.getByTestId('scenario-ref-result')).toContainText(FAKE_DATA.zonecode)

    await scenario.getByTestId('scenario-ref-close').click()
    await expect(area).toHaveCSS('display', 'none')
})

test('postcodeOptions and openOptions are passed through to the Postcode constructor/embed call', async ({ page }) => {
    const scenario = page.getByTestId('scenario-options')

    await scenario.getByRole('button', { name: 'open' }).click()

    const captured = await page.evaluate(() => {
        const calls = (window as any).__postcodeCalls
        const last = calls[calls.length - 1]
        return { opts: last.opts, embedOpenOptions: last.embedOpenOptions }
    })

    expect(captured.opts.width).toBe(640)
    expect(captured.opts.height).toBe(480)
    expect(captured.opts.animation).toBe(false)
    expect(captured.opts.autoMappingRoad).toBe(false)
    expect(captured.opts.theme).toEqual({ bgColor: '#123456' })
    expect(captured.embedOpenOptions).toEqual({ q: 'options-query' })
})

test('embed mode without explicit sizing falls back to 100%/100%/animation defaults', async ({ page }) => {
    const scenario = page.getByTestId('scenario-default')

    await scenario.getByRole('button', { name: 'open' }).click()

    const opts = await page.evaluate(() => {
        const calls = (window as any).__postcodeCalls
        return calls[calls.length - 1].opts
    })

    expect(opts.width).toBe('100%')
    expect(opts.height).toBe('100%')
    expect(opts.animation).toBe(true)
})

test('onClose/onResize/onSearch callbacks are forwarded and internal resize styling is applied', async ({ page }) => {
    const scenario = page.getByTestId('scenario-callbacks')

    await scenario.getByRole('button', { name: 'open' }).click()

    await page.evaluate(() => {
        const calls = (window as any).__postcodeCalls
        calls[calls.length - 1].triggerResize({ width: 300, height: 555 })
    })
    await expect(scenario.getByTestId('scenario-callbacks-resize')).toContainText('555')

    const embedHeight = await page.evaluate(() => {
        const calls = (window as any).__postcodeCalls
        return calls[calls.length - 1].embedElement.style.height
    })
    expect(embedHeight).toBe('555px')

    await page.evaluate(() => {
        const calls = (window as any).__postcodeCalls
        calls[calls.length - 1].triggerSearch({ q: 'test query', count: 3 })
    })
    await expect(scenario.getByTestId('scenario-callbacks-search')).toContainText('test query')

    await page.evaluate(() => {
        const calls = (window as any).__postcodeCalls
        calls[calls.length - 1].triggerClose('FORCE_CLOSE')
    })
    await expect(scenario.getByTestId('scenario-callbacks-close')).toContainText('FORCE_CLOSE')
})

test('script lifecycle: the injected script tag is added on mount and removed on unmount', async ({ page }) => {
    const scenario = page.getByTestId('scenario-script')

    await expect(page.locator('script#e2e-script')).toHaveCount(1)

    await scenario.getByTestId('scenario-script-toggle').click()
    await expect(page.locator('script#e2e-script')).toHaveCount(0)

    await scenario.getByTestId('scenario-script-toggle').click()
    await expect(page.locator('script#e2e-script')).toHaveCount(1)
})
