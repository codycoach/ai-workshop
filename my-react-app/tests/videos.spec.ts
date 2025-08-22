import { test, expect } from '@playwright/test';

test.describe('mikelopster.dev Video section', () => {
  test('should render exactly 12 video items', async ({ page }) => {
    await page.goto('https://mikelopster.dev/');

    // Locate the Video list region by accessible name
    const videoRegion = page.getByRole('region', { name: 'Video list' });
    await expect(videoRegion).toBeVisible();

    // Each video card is an <a> that contains a <h3> heading
    const videoItems = videoRegion.locator('a:has(h3)');
    await expect(videoItems).toHaveCount(12);
  });
});


