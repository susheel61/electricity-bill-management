'use client';

import { useState } from 'react';
import { MonthData } from '../types/history';
import { BillCard } from './BillCard';

interface HistoryViewProps {
    history: MonthData[];
}

export function HistoryView({ history }: HistoryViewProps) {
    const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

    const toggleMonth = (monthKey: string) => {
        if (expandedMonth === monthKey) {
            setExpandedMonth(null);
        } else {
            setExpandedMonth(monthKey);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Billing History</h1>

                <div className="space-y-6">
                    {history.map((monthData) => {
                        const monthKey = `${monthData.month}-${monthData.year}`;
                        const isExpanded = expandedMonth === monthKey;
                        const totalAmount = monthData.bills.reduce((sum, bill) => sum + bill.amount, 0);
                        const paidAmount = monthData.bills
                            .filter(b => !!b.paidDate || b.amount === 0)
                            .reduce((sum, b) => sum + b.amount, 0);
                        const unpaidAmount = totalAmount - paidAmount;

                        return (
                            <div key={monthKey} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div
                                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex flex-col md:flex-row justify-between items-center gap-4"
                                    onClick={() => toggleMonth(monthKey)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${isExpanded ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                                            <svg className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">{monthData.month} {monthData.year}</h2>
                                            <p className="text-sm text-gray-500">{monthData.bills.length} Bills Generated</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 text-sm">
                                        <div className="text-center md:text-right">
                                            <p className="text-gray-500">Total Billed</p>
                                            <p className="font-bold text-gray-900">₹{totalAmount.toFixed(2)}</p>
                                        </div>
                                        <div className="text-center md:text-right">
                                            <p className="text-gray-500">Collected</p>
                                            <p className="font-bold text-green-600">₹{paidAmount.toFixed(2)}</p>
                                        </div>
                                        <div className="text-center md:text-right">
                                            <p className="text-gray-500">Pending</p>
                                            <p className="font-bold text-red-600">₹{unpaidAmount.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="border-t border-gray-200 bg-gray-50 p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {monthData.bills.map((bill) => (
                                                <BillCard key={bill._id} bill={bill} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
