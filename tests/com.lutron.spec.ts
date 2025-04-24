//Import playwright module
import { test, expect } from '@playwright/test';

// write a test 
test('verify support link ', async ({ page }) => {

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
    await supportPage.getByText('ST-PRO-N').click();
    await supportPage.getByRole('link', { name: 'Installation Guide' }).click();
    await expect(supportPage.getByText('Sunnata PRO LED+ Dimmer -')).toHaveText('Sunnata PRO LED+ Dimmer - Installation Guide');

    // Click to open Sunnata PRO LED+ Dimmer - Installation Guide PDF.

    await supportPage.getByRole('list').filter({ hasText: 'Sunnata PRO LED+ Dimmer -' }).getByRole('link').click();



});
