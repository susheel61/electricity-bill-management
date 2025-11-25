import { Bill } from '../types/bill';

import { tenantMap } from '../data/tenants';

export async function getBills(): Promise<Bill[]> {
    const res = await fetch('https://api.susheel.dev/api/electricity', { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('Failed to fetch bills');
    }

    const bills: Bill[] = await res.json();

    return bills.map(bill => ({
        ...bill,
        tenantName: tenantMap[bill.roomNumber]
    }));
}
