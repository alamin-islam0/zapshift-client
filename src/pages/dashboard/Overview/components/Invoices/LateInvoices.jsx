import React from 'react';
import { Filter, MoreVertical } from 'lucide-react';

const LateInvoices = () => {
    const invoices = [
        { no: '#PTD 145142547', price: '4500.00', date: '10 day ago' },
        { no: '#PTD 145142547', price: '9800.00', date: '1 day ago' },
        { no: '#PTD 145142547', price: '2000.00', date: '1h ago' },
        { no: '#PTD 145142547', price: '2700.00', date: '2h ago' },
        { no: '#PTD 145142547', price: '1500.00', date: '3h ago' },
        { no: '#PTD 145142547', price: '8500.00', date: '4h ago' },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Late Invoices</h3>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-lime-400 text-white text-xs font-medium rounded-full hover:bg-lime-500">
                        View All Invoices
                    </button>
                    <button className="p-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                        <Filter className="w-3 h-3" />
                    </button>
                    <button className="p-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                        <MoreVertical className="w-3 h-3" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs text-gray-500 border-b border-gray-100">
                            <th className="py-2 font-medium">No</th>
                            <th className="py-2 font-medium">Price</th>
                            <th className="py-2 font-medium">Date</th>
                            <th className="py-2 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice, index) => (
                            <tr key={index} className="text-xs text-gray-700 border-b border-gray-50 hover:bg-gray-50">
                                <td className="py-3 text-gray-500">{invoice.no}</td>
                                <td className="py-3 font-medium">{invoice.price}</td>
                                <td className="py-3 text-gray-500">{invoice.date}</td>
                                <td className="py-3 text-right">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreVertical className="w-3 h-3 ml-auto" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LateInvoices;
