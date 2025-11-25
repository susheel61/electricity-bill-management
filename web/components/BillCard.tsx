import { Bill } from '../types/bill';

interface BillCardProps {
    bill: Bill;
}

export function BillCard({ bill }: BillCardProps) {
    const isPaid = !!bill.paidDate || bill.amount === 0;

    return (
        <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
            {/* Status Bar */}
            <div className={`h-1.5 w-full ${isPaid ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-rose-500'}`} />

            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1" title={bill.name}>
                            {bill.name}
                        </h3>
                        <div className="flex items-center mt-1 space-x-2">
                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">
                                Room {bill.roomNumber}
                            </span>
                            {bill.tenantName && (
                                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                                    {bill.tenantName}
                                </span>
                            )}
                            <span className="text-xs text-gray-400 font-mono">{bill.usn}</span>
                        </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${isPaid
                        ? 'bg-green-50 text-green-700 border border-green-100'
                        : 'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                        {isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                </div>

                <div className="space-y-3 flex-1">
                    <div className="flex justify-between items-center text-sm group/item">
                        <span className="text-gray-500 group-hover/item:text-gray-700 transition-colors">Bill Date</span>
                        <span className="font-semibold text-gray-700">{bill.billDate}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm group/item">
                        <span className="text-gray-500 group-hover/item:text-gray-700 transition-colors">Due Date</span>
                        <span className="font-semibold text-gray-700">{bill.dueDate}</span>
                    </div>
                    {bill.paidDate && (
                        <div className="flex justify-between items-center text-sm group/item">
                            <span className="text-gray-500 group-hover/item:text-gray-700 transition-colors">Paid On</span>
                            <span className="font-semibold text-emerald-600">{bill.paidDate}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center text-sm group/item pt-2 border-t border-dashed border-gray-100">
                        <span className="text-gray-500 text-xs">Service No</span>
                        <span className="text-gray-400 text-xs font-mono">{bill.serviceNo}</span>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Amount</span>
                        <span className={`text-2xl font-extrabold ${isPaid ? 'text-gray-900' : 'text-red-600'}`}>
                            ₹{(bill.amount ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                    {!isPaid && (
                        <button className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors shadow-lg shadow-gray-200">
                            Pay Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
