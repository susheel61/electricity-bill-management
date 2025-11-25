import { MonthData } from '../types/history';
import { Bill } from '../types/bill';
import { tenantMap } from './tenants';

// Helper to generate dummy bills
const generateBills = (month: string, year: number): Bill[] => {
    const bills: Bill[] = [];
    // Generate for 12 rooms + owner
    for (let i = 1; i <= 12; i++) {
        bills.push({
            _id: `${year}-${month}-room-${i}`,
            name: tenantMap[i] || `Tenant ${i}`,
            usn: `USN${year}${month}${i}`,
            serviceNo: `SERV${year}${month}${i}`,
            amount: Math.floor(Math.random() * 1000) + 200, // Random amount 200-1200
            billDate: new Date(year, getMonthIndex(month), 5).toISOString(),
            dueDate: new Date(year, getMonthIndex(month), 20).toISOString(),
            paidDate: Math.random() > 0.2 ? new Date(year, getMonthIndex(month), 15).toISOString() : null, // 80% paid
            roomNumber: i,
            room: i.toString(),
            tenantName: tenantMap[i]
        });
    }
    // Owner bill
    bills.push({
        _id: `${year}-${month}-owner`,
        name: 'Susheel Singh',
        usn: `USN${year}${month}OWNER`,
        serviceNo: `SERV${year}${month}OWNER`,
        amount: Math.floor(Math.random() * 2000) + 1000,
        billDate: new Date(year, getMonthIndex(month), 5).toISOString(),
        dueDate: new Date(year, getMonthIndex(month), 20).toISOString(),
        paidDate: new Date(year, getMonthIndex(month), 15).toISOString(),
        roomNumber: 16,
        room: '16',
        tenantName: 'Owner'
    });

    return bills;
};

const getMonthIndex = (month: string): number => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.indexOf(month);
}

export const dummyHistory: MonthData[] = [
    {
        month: 'October',
        year: 2023,
        bills: generateBills('October', 2023)
    },
    {
        month: 'September',
        year: 2023,
        bills: generateBills('September', 2023)
    },
    {
        month: 'August',
        year: 2023,
        bills: generateBills('August', 2023)
    }
];
