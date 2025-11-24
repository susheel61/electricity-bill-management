import { Bill } from '../types/bill';

interface BillCardProps {
    bill: Bill;
}

export function BillCard({ bill }: BillCardProps) {
    const isPaid = !!bill.paidDate || bill.amount === 0;
    const statusColor = isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    const statusText = isPaid ? 'Paid' : 'Unpaid';

    return (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{bill.name}</h3>
                    <p className="text-sm text-gray-500">USN: {bill.usn}</p>
                    <p className="text-xs text-gray-400">Service No: {bill.serviceNo}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                    {statusText}
                </span>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bill Date:</span>
                    <span className="font-medium">{bill.billDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Due Date:</span>
                    <span className="font-medium">{bill.dueDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Room:</span>
                    <span className="font-medium">{bill.room} (No. {bill.roomNumber})</span>
                </div>
                {bill.paidDate && (
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Paid Date:</span>
                        <span className="font-medium">{bill.paidDate}</span>
                    </div>
                )}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-gray-900 font-bold">Total Amount</span>
                    <span className="text-xl font-bold text-blue-600">₹{(bill.amount ?? 0).toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}
