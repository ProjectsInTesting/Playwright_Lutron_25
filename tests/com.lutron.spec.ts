//Import playwright module
import { test, expect } from '@playwright/test';

// write a test 
//test('verify support link ', async ({ page }) => {

test('verify support link ', { tag: ['@Playwright_With_Jenkins_Practice'] }, async ({ page }) => {

    //navigating to the Website

    await page.goto('https://www.lutron.com/us/en');
    await expect(page).toHaveTitle('Lutron | Intelligent light. Automated Shades. Powerful Controls');
    await page.getByRole('link', { name: 'Support' }).click();

    // here a new page will be opened and we need to switch to that page

    const supportPage = await page.context().waitForEvent('page');
    await supportPage.waitForLoadState();
    await expect(supportPage.locator('h1')).toHaveText('Lutron Support Center');

    // search for Sunnata Dimmer and sellect Installation Guide

    await supportPage.getByRole('textbox', { name: 'Search model #s or products' }).fill('ST-PRO-N');
    await supportPage.getByRole('link', { name: 'ST-PRO-N Select suggestion' }).click();
    await supportPage.getByRole('link', { name: 'Open Search item Sunnata ST-' }).click();

    //  a nother page will be opened and we need to switch to that page
    const supportPage2 = await page.context().waitForEvent('page');
    await supportPage2.waitForLoadState();
    await expect(supportPage2).toHaveTitle('Sunnata ST-PRO-N Installation Instructions | Lutron');
    await supportPage2.getByRole('button', { name: 'Accept' }).click();

})

test('verify commercial link', { tag: ['@Playwright_With_Jenkins_Practice']}, async ({ page }) => {

    // navigate to the website 
    await page.goto('https://www.lutron.com/us/en');
    await expect(page.getByRole('tab', { name: 'Commercial' })).toContainText('Commercial');
    await page.getByRole('tab', { name: 'Commercial' }).click();
    await page.getByRole('tabpanel', { name: 'Commercial' }).click();
    await expect(page.getByRole('dialog', { name: 'Lighting' }).getByLabel('Open Explore Commercial link')).toHaveText('Explore Commercial');

})

test('Test about us link', { tag: ['@Playwright_With_Jenkins_Practice']}, async ({ page }) => {
    await page.goto('https://www.lutron.com/us/en');
    const aboutUs = page.getByLabel('Main navigation').getByRole('menuitem', { name: 'About Us' });
    await expect(aboutUs).toHaveText('About Us');
    await aboutUs.click();
    await page.getByLabel('Who We Are').click();
    await expect(page.getByRole('heading', { name: 'Who We Are' })).toHaveText('Who We Are');

})


