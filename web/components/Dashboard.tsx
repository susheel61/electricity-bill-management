import { Bill } from '../types/bill';
import { BillCard } from './BillCard';

interface DashboardProps {
    bills: Bill[];
}

export function Dashboard({ bills }: DashboardProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Electricity Bill Management</h1>
                <p className="text-gray-600 mt-2">View and track your electricity bills</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bills.map((bill) => (
                    <BillCard key={bill._id} bill={bill} />
                ))}
            </div>

            {bills.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No bills found.
                </div>
            )}
        </div>
    );
}
