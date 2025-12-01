import React from 'react';
import { Ship, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const Stats = () => {
    const stats = [
        { title: 'To Pay', count: '129', icon: Ship, color: 'text-gray-600' },
        { title: 'Ready Pick UP', count: '1,325', icon: Package, color: 'text-gray-600' },
        { title: 'In Transit', count: '50', icon: Truck, color: 'text-gray-600' },
        { title: 'Ready to Deliver', count: '50', icon: Clock, color: 'text-gray-600' },
        { title: 'Delivered', count: '50', icon: CheckCircle, color: 'text-gray-600' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                    <div className='flex flex-col'>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-gray-100 rounded-full">
                                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                            <span className="text-sm text-gray-500 font-medium">{stat.title}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 ml-1">{stat.count}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Stats;
