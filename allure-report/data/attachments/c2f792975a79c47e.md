# Test info

- Name: Test about us link
- Location: C:\Users\herra\Desktop\Playwright_Lutron.com\tests\com.lutron.spec.ts:57:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)

Locator: getByRole('heading', { name: 'Who We Are' })
Expected string: "Who We Are***"
Received string: "Who We Are"
Call log:
  - expect.toHaveText with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Who We Are' })
    5 × locator resolved to <h1 class="hero__tagline">Who We Are</h1>
      - unexpected value "Who We Are"

    at C:\Users\herra\Desktop\Playwright_Lutron.com\tests\com.lutron.spec.ts:63:69
```

# Test source

```ts
   1 | //Import playwright module
   2 | import { test, expect } from '@playwright/test';
   3 | import { TIMEOUT } from 'dns';
   4 |
   5 | // test#1 verify "Support" link
   6 | test('verify support link', { tag: ['@Playwright_With_Jenkins_Practice'] }, async ({ page }) => {
   7 |     test.setTimeout(60000); // Increase timeout for this test
   8 |
   9 |     // Clear cookies and storage
   10 |     await page.context().clearCookies();
   11 |     await page.context().clearPermissions();
   12 |     await page.goto('about:blank');
   13 |
   14 |     // Navigate to the website
   15 |     await page.goto('https://www.lutron.com/us/en', { waitUntil: 'domcontentloaded' });
   16 |     await expect(page).toHaveTitle('Lutron | Intelligent light. Automated Shades. Powerful Controls');
   17 |
   18 |     // Click on the Support link
   19 |     await page.getByRole('link', { name: 'Support' }).click();
   20 |
   21 |     // Wait for the new page to load
   22 |     const supportPage = await page.context().waitForEvent('page');
   23 |     await supportPage.waitForLoadState('domcontentloaded');
   24 |     await expect(supportPage.locator('h1')).toHaveText('Lutron Support Center');
   25 |
   26 |     // Search for Sunnata Dimmer and select Installation Guide
   27 |     await supportPage.getByRole('textbox', { name: 'Search model #s or products' }).fill('ST-PRO-N');
   28 |     await supportPage.getByRole('link', { name: 'ST-PRO-N Select suggestion' }).click();
   29 |     await supportPage.getByRole('link', { name: 'Open Search item Sunnata ST-' }).click();
   30 |
   31 |     // Handle the second page
   32 |     const supportPage2 = await page.context().waitForEvent('page');
   33 |     await supportPage2.waitForLoadState('domcontentloaded');
   34 |     await expect(supportPage2).toHaveTitle('Sunnata ST-PRO-N Installation Instructions | Lutron');
   35 |
   36 |     // Accept cookies
   37 |     const acceptButton = supportPage2.getByRole('button', { name: 'Accept' });
   38 |     await acceptButton.waitFor({ state: 'visible' });
   39 |     await acceptButton.click();
   40 | });
   41 |
   42 |
   43 | // test#2 verify "Commercial" link
   44 | test('verify commercial link', { tag: ['@Playwright_With_Jenkins_Practice'] }, async ({ page }) => {
   45 |
   46 |     // navigate to the website 
   47 |     await page.goto('https://www.lutron.com/us/en');
   48 |     await expect(page.getByRole('tab', { name: 'Commercial' })).toContainText('Commercial');
   49 |     await page.getByRole('tab', { name: 'Commercial' }).click();
   50 |     await page.getByRole('tabpanel', { name: 'Commercial' }).click();
   51 |     await expect(page.getByRole('dialog', { name: 'Lighting' }).getByLabel('Open Explore Commercial link')).toHaveText('Explore Commercial');
   52 |
   53 | })
   54 |
   55 |
   56 | // test#3 Test "About Us" link
   57 | test('Test about us link', { tag: ['@Playwright_With_Jenkins_Practice'] }, async ({ page }) => {
   58 |     await page.goto('https://www.lutron.com/us/en');
   59 |     const aboutUs = page.getByLabel('Main navigation').getByRole('menuitem', { name: 'About Us' });
   60 |     await expect(aboutUs).toHaveText('About Us');
   61 |     await aboutUs.click();
   62 |     await page.getByLabel('Who We Are').click();
>  63 |     await expect(page.getByRole('heading', { name: 'Who We Are' })).toHaveText('Who We Are***');
      |                                                                     ^ Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)
   64 |
   65 | })
   66 |
   67 |
   68 |
   69 |
   70 |
   71 | // ************************************ First version Code ***************************************
   72 |
   73 |
   74 | //First version Code.
   75 |
   76 | // write a test
   77 | //test('verify support link ', async ({ page }) => {
   78 |
   79 | /*
   80 | test('verify support link ', { tag: ['@Playwright_With_Jenkins_Practice'] }, async ({ page }) => {
   81 |
   82 |     //navigating to the Website
   83 |
   84 |     await page.goto('https://www.lutron.com/us/en');
   85 |     await expect(page).toHaveTitle('Lutron | Intelligent light. Automated Shades. Powerful Controls');
   86 |     await page.getByRole('link', { name: 'Support' }).click();
   87 |
   88 |     // here a new page will be opened and we need to switch to that page
   89 |
   90 |     const supportPage = await page.context().waitForEvent('page');
   91 |     await supportPage.waitForLoadState();
   92 |     await expect(supportPage.locator('h1')).toHaveText('Lutron Support Center');
   93 |
   94 |     // search for Sunnata Dimmer and sellect Installation Guide
   95 |
   96 |     await supportPage.getByRole('textbox', { name: 'Search model #s or products' }).fill('ST-PRO-N');
   97 |     await supportPage.getByRole('link', { name: 'ST-PRO-N Select suggestion' }).click();
   98 |     await supportPage.getByRole('link', { name: 'Open Search item Sunnata ST-' }).click();
   99 |
  100 |     //  a nother page will be opened and we need to switch to that page
  101 |     const supportPage2 = await page.context().waitForEvent('page');
  102 |     await supportPage2.waitForLoadState();
  103 |     await expect(supportPage2).toHaveTitle('Sunnata ST-PRO-N Installation Instructions | Lutron');
  104 |     await supportPage2.getByRole('button', { name: 'Accept' }).click();
  105 |
  106 | })
  107 |
  108 | */
```