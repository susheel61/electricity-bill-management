import { test, expect } from '@playwright/test';

const USNS = [
    "114571361",
    "112779713",
    "114564409",
    "112779697",
    "112779708",
    "103711913",
    "109937843",
    "112779701",
    "103711422",
    "110930654",
    "112779699",
    "114564410",
    "112779703",
    "112779710",
    "112779706",
    "113263923"
];

test('extract all USN data → array of JSON', async ({ page }) => {

    async function extractFor(usn) {
        await page.goto("https://tgsouthernpower.org/billinginfo");

        const textbox = page.getByRole('textbox', { name: 'Unique Service Number' });
        await textbox.click();
        await textbox.fill(usn);
        await page.getByRole('button', { name: 'Submit' }).click();

        // Wait for the table
        const table = page.locator('table').first();
        await expect(table).toBeVisible({ timeout: 15000 });

        // Evaluate extraction logic inside the browser
        const result = await table.evaluate(() => {
            function parseRGB(rgbStr) {
                const m = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (!m) return [0, 0, 0];
                return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
            }

            function isRedColor(rgbStr) {
                const [r, g, b] = parseRGB(rgbStr);
                return r >= 120 && r - Math.max(g, b) >= 60;
            }

            const tbl = document.querySelector('table');
            const rows = Array.from(tbl.querySelectorAll("tr")).map(tr =>
                Array.from(tr.children).map(td => {
                    const style = getComputedStyle(td);
                    return {
                        text: td.textContent.trim(),
                        color: style.color,
                        colspan: parseInt(td.getAttribute("colspan") || "1")
                    };
                })
            );

            function normalizeKey(k) {
                return k.replace(/[:\u00A0]/g, "").trim();
            }

            const map = {};

            for (let ri = 0; ri < rows.length; ri++) {
                const row = rows[ri];
                for (let ci = 0; ci < row.length; ci++) {
                    const cell = row[ci];
                    if (!cell.text) continue;

                    const isHeading =
                        isRedColor(cell.color) || cell.colspan >= 4;

                    if (!isHeading) continue;

                    const key = normalizeKey(cell.text);
                    let value = "";

                    // Search same row first
                    for (let j = ci + 1; j < row.length; j++) {
                        const cand = row[j];
                        if (!cand.text) continue;
                        if (isRedColor(cand.color) || cand.colspan >= 4) break;
                        value = cand.text;
                        break;
                    }

                    // Search downwards if still empty
                    if (!value) {
                        for (let r = ri + 1; r < rows.length; r++) {
                            const nr = rows[r];
                            const v = nr.find(c => c.text && !(isRedColor(c.color) || c.colspan >= 4));
                            if (v) {
                                value = v.text;
                                break;
                            }
                        }
                    }

                    if (value) map[key] = value;
                }
            }

            return map;
        });

        return { usn, ...result };
    }

    const finalResults = [];

    for (const usn of USNS) {
        try {
            const data = await extractFor(usn);
            finalResults.push(data);
        } catch (err) {
            console.log(`FAILED USN: ${usn}`, err);
            finalResults.push({ usn, error: true });
        }
    }

    // 🔥 PRINT FINAL ARRAY
    console.log("FINAL_JSON_ARRAY:", JSON.stringify(finalResults, null, 2));
});
