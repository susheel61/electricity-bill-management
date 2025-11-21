import { test, expect, Page } from '@playwright/test';

// Final verified mapping (from your table)
const ROOM_BY_USN: Record<string, string> = {
    "112779703": "1",
    "112779708": "2",
    "112779699": "3",
    "112779710": "4",
    "112779701": "5",
    "112779713": "6",
    "112779706": "7",
    "114564409": "8",
    "114571361": "9",
    "113263923": "10",
    "114564410": "11",
    "112779697": "12",
    "103711422": "13",
    "110930654": "14",
    "103711913": "15",
    "109937843": "Owner",
};

const USNS = Object.keys(ROOM_BY_USN);

type ExtractedMap = Record<string, string | undefined>;

type ExtractResult = {
    room: string;
    usn: string;
} & ExtractedMap;

type FinalRow = {
    room: string;
    usn: string;
    name?: string;
    serviceNo?: string;
    billDate?: string;
    dueDate?: string;
    paidDate?: string;
    amount?: number | null;
    error?: boolean;
};

test('extract all USN data including room → final JSON array', async ({ page }) => {
    // helper to normalize numeric strings into numbers
    function parseAmount(raw?: string): number | null {
        if (!raw) return null;
        // Remove commas, currency symbols, non-digit except dot and minus
        const cleaned = raw.replace(/[^\d.-]+/g, '');
        const n = parseFloat(cleaned);
        return Number.isFinite(n) ? n : null;
    }

    async function extractFor(page: Page, usn: string): Promise<ExtractResult> {
        await page.goto('https://tgsouthernpower.org/billinginfo');

        const textbox = page.getByRole('textbox', { name: 'Unique Service Number' });
        await textbox.fill(usn);
        await page.getByRole('button', { name: 'Submit' }).click();

        // Wait for the table to appear
        const table = page.locator('table').first();
        await expect(table).toBeVisible({ timeout: 15000 });

        // Evaluate inside browser context and return a simple map of key -> value (strings)
        const result = await table.evaluate((tbl: HTMLTableElement) => {
            // NOTE: This function runs in the browser. Use DOM APIs only.
            function parseRGB(rgbStr: string | null) {
                if (!rgbStr) return [0, 0, 0];
                const m = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (!m) return [0, 0, 0];
                return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
            }

            function isRedColor(rgbStr: string | null) {
                const [r, g, b] = parseRGB(rgbStr);
                return r >= 120 && r - Math.max(g, b) >= 60;
            }

            function normalizeKey(k: string) {
                return k.replace(/[:\u00A0]/g, '').trim();
            }

            // build rows as array of cells with text, color, colspan
            const rows = Array.from(tbl.querySelectorAll('tr')).map((tr) =>
                Array.from(tr.children).map((td) => {
                    const text = (td.textContent || '').trim();
                    // getComputedStyle requires the exact element
                    const style = window.getComputedStyle(td as Element);
                    const color = style ? style.color : '';
                    const colspan = parseInt((td as HTMLTableCellElement).getAttribute('colspan') || '1', 10);
                    return { text, color, colspan };
                })
            );

            const map: Record<string, string> = {};

            for (let ri = 0; ri < rows.length; ri++) {
                const row = rows[ri];
                for (let ci = 0; ci < row.length; ci++) {
                    const cell = row[ci];
                    if (!cell.text) continue;

                    const isHeading = isRedColor(cell.color) || cell.colspan >= 4;
                    if (!isHeading) continue;

                    const key = normalizeKey(cell.text);
                    let value = '';

                    // Same row lookup: find next non-heading cell in same row
                    for (let j = ci + 1; j < row.length; j++) {
                        const cand = row[j];
                        if (!cand.text) continue;
                        if (isRedColor(cand.color) || cand.colspan >= 4) break;
                        value = cand.text;
                        break;
                    }

                    // Downwards lookup if not in same row
                    if (!value) {
                        for (let r = ri + 1; r < rows.length; r++) {
                            const nr = rows[r];
                            const vCell = nr.find((c) => c.text && !(isRedColor(c.color) || c.colspan >= 4));
                            if (vCell) {
                                value = vCell.text;
                                break;
                            }
                        }
                    }

                    if (value) {
                        map[key] = value;
                    }
                }
            }

            return map;
        });

        return {
            room: ROOM_BY_USN[usn],
            usn,
            ...result,
        } as ExtractResult;
    }

    const finalResults: FinalRow[] = [];

    for (const usn of USNS) {
        try {
            const data = await extractFor(page, usn);

            const row: FinalRow = {
                room: data.room,
                usn: data.usn,
                name: data['Consumer Name'] ?? data['ConsumerName'] ?? undefined,
                serviceNo: data['Service Number'] ?? data['Unique Service Number'] ?? undefined,
                billDate: data['Current Month Bill'] ?? data['Current Month'] ?? undefined,
                dueDate: data['Due Date'] ?? undefined,
                paidDate: data['Paid Date'] ?? data['PaidDate'] ?? undefined,
                amount: parseAmount(data['Amount'] ?? data['Total Amount'] ?? undefined),
            };

            finalResults.push(row);
        } catch (err) {
            // Keep the error minimal in output — mark the row as errored
            finalResults.push({ usn, room: ROOM_BY_USN[usn], error: true });
        }
    }

    try {
        const res = await page.request.post(
            "https://api.susheel.dev/api/electricity/addData",
            {
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                data: JSON.stringify(finalResults)
            }
        );
        console.log("POST response status:", res.status());
        const text = await res.text();
        console.log("POST response body (text):", text);
    } catch (e) {
        console.error("Failed to POST data:", e);
    }
});
