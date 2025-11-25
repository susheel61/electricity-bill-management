import { Bill } from '../types/bill';

export async function getBills(): Promise<Bill[]> {
    const res = await fetch('https://api.susheel.dev/api/electricity', { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('Failed to fetch bills');
    }

    const bills: Bill[] = await res.json();

    const tenantMap: Record<number, string> = {
        1: "Ramdev",
        2: "Dharmendar",
        3: "Swamy",
        4: "Sarita",
        5: "Anil",
        6: "Raghu",
        7: "Vikas",
        8: "Dharamveer",
        9: "Karamveer",
        10: "Rocky",
        11: "Ashok",
        12: "Riya"
    };

    return bills.map(bill => ({
        ...bill,
        tenantName: tenantMap[bill.roomNumber]
    }));
}
