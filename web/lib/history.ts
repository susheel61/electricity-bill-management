import { MonthData } from '../types/history';
import { dummyHistory } from '../data/dummyHistory';

export async function getHistory(): Promise<MonthData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return dummyHistory;
}
