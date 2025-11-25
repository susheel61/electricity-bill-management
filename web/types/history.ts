import { Bill } from './bill';

export interface MonthData {
    month: string; // e.g., "October"
    year: number; // e.g., 2023
    bills: Bill[];
}
