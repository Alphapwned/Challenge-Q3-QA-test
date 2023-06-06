import { test, expect } from '@playwright/test';

test("Able to perform a simple calculation correctly", async ({ page }) => {
  await page.goto("https://www.desmos.com/scientific?lang=fr");

  let result: number = 0;

  for (let i = 1; i <= 9; i++) {
    const numberButton = `${i}`;
    result = parseInt(numberButton) + parseInt(numberButton);

    await page.getByRole('button', { name: numberButton }).click();
    await page.getByRole('button', { name: 'Plus' }).click();
    await page.getByRole('button', { name: numberButton }).click();
    await page.getByRole("button", { name: "Entrée", exact: true }).click();

    const expectedResult = new RegExp(`equals ${result}`, "i");

    await expect(page.getByRole('region', { name: 'Expression List' })).toHaveText(expectedResult);
  }
});


