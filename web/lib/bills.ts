import { Bill } from '../types/bill';

export async function getBills(): Promise<Bill[]> {
    const res = await fetch('https://api.susheel.dev/api/electricity', { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('Failed to fetch bills');
    }

    const bills: Bill[] = await res.json();
    return bills;
}
