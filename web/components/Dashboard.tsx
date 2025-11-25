'use client';

import { useState, useMemo } from 'react';
import { Bill } from '../types/bill';
import { BillCard } from './BillCard';

interface DashboardProps {
    bills: Bill[];
}

type FilterStatus = 'All' | 'Paid' | 'Unpaid';
type SortOption = 'DateDesc' | 'DateAsc' | 'AmountDesc' | 'AmountAsc';

export function Dashboard({ bills }: DashboardProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('All');
    const [sortBy, setSortBy] = useState<SortOption>('DateDesc');

    const filteredBills = useMemo(() => {
        return bills
            .filter((bill) => {
                const matchesSearch =
                    bill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    bill.usn.includes(searchQuery) ||
                    bill.serviceNo.includes(searchQuery);

                const isPaid = !!bill.paidDate || bill.amount === 0;
                const matchesStatus =
                    filterStatus === 'All'
                        ? true
                        : filterStatus === 'Paid'
                            ? isPaid
                            : !isPaid;

                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case 'DateDesc':
                        return new Date(b.billDate).getTime() - new Date(a.billDate).getTime();
                    case 'DateAsc':
                        return new Date(a.billDate).getTime() - new Date(b.billDate).getTime();
                    case 'AmountDesc':
                        return b.amount - a.amount;
                    case 'AmountAsc':
                        return a.amount - b.amount;
                    default:
                        return 0;
                }
            });
    }, [bills, searchQuery, filterStatus, sortBy]);

    const totalDue = filteredBills
        .filter(b => !b.paidDate && b.amount > 0)
        .reduce((sum, b) => sum + b.amount, 0);

    const paidCount = filteredBills.filter(b => !!b.paidDate || b.amount === 0).length;
    const unpaidCount = filteredBills.length - paidCount;

    const regularBills = filteredBills.filter(bill => bill.amount > 0);
    const subsidizedBills = filteredBills.filter(bill => bill.amount === 0);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <header className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-2">
                            Electricity Bill Manager
                        </h1>
                        <p className="text-lg text-gray-600">
                            A project by <a href="https://susheel.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Susheel Singh</a>
                        </p>
                    </div>
                    <div className="hidden md:block">
                        {/* Placeholder for a logo if available, or just a styled text badge */}
                        <div className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold tracking-widest border-2 border-gray-800 shadow-lg">
                            SUSHEEL.DEV
                        </div>
                    </div>
                </header>


                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col items-center md:items-start">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Due</span>
                        <span className="text-3xl font-bold text-red-600 mt-2">₹{totalDue.toFixed(2)}</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col items-center md:items-start">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Paid Bills</span>
                        <span className="text-3xl font-bold text-green-600 mt-2">{paidCount}</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col items-center md:items-start">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Unpaid Bills</span>
                        <span className="text-3xl font-bold text-orange-500 mt-2">{unpaidCount}</span>
                    </div>
                </div>

                {/* Controls Toolbar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-4 z-10 backdrop-blur-md bg-white/90">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                            placeholder="Search by Name, USN, or Service No..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <select
                            className="block w-full md:w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-gray-50"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                        >
                            <option value="All">All Status</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                        </select>

                        <select
                            className="block w-full md:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-gray-50"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                        >
                            <option value="DateDesc">Newest First</option>
                            <option value="DateAsc">Oldest First</option>
                            <option value="AmountDesc">Highest Amount</option>
                            <option value="AmountAsc">Lowest Amount</option>
                        </select>
                    </div>
                </div>

                {/* Regular Bills Grid */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        Regular Bills
                        <span className="ml-3 px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {regularBills.length}
                        </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularBills.map((bill) => (
                            <BillCard key={bill._id} bill={bill} />
                        ))}
                    </div>
                    {regularBills.length === 0 && (
                        <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                            <p className="text-gray-500">No regular bills found matching your criteria.</p>
                        </div>
                    )}
                </div>

                {/* Subsidized Bills Grid */}
                {subsidizedBills.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            Subsidized Bills
                            <span className="ml-3 px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                {subsidizedBills.length}
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-75 hover:opacity-100 transition-opacity">
                            {subsidizedBills.map((bill) => (
                                <BillCard key={bill._id} bill={bill} />
                            ))}
                        </div>
                    </div>
                )}

                {filteredBills.length === 0 && (
                    <div className="text-center py-20">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No bills found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

