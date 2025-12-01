import React from 'react';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';

const ShipmentAlerts = () => {
    const alerts = [
        { type: 'Damaged', id: '#SP11251C', time: '2 Hours ago', icon: AlertCircle, color: 'text-cyan-500', bg: 'bg-cyan-100' },
        { type: 'Damaged', id: '#SP11251C', time: '2 Hours ago', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-100' },
        { type: 'Damaged', id: '#SP11251C', time: '2 Hours ago', icon: AlertCircle, color: 'text-cyan-500', bg: 'bg-cyan-100' },
        { type: 'Damaged', id: '#SP11251C', time: '2 Hours ago', icon: AlertCircle, color: 'text-gray-500', bg: 'bg-gray-100' },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Shipment Alerts</h3>
                <button className="px-3 py-1 bg-lime-400 text-white text-xs font-medium rounded-full hover:bg-lime-500">
                    View All Invoices
                </button>
            </div>

            <div className="flex gap-4 mb-6">
                <div className="flex-1 bg-gray-50 p-3 rounded-lg text-center">
                    <h4 className="text-lg font-bold text-gray-800">2</h4>
                    <p className="text-xs text-gray-500">Damaged</p>
                </div>
                <div className="flex-1 bg-gray-50 p-3 rounded-lg text-center">
                    <h4 className="text-lg font-bold text-gray-800">10</h4>
                    <p className="text-xs text-gray-500">Weather Delays</p>
                </div>
            </div>

            <div className="space-y-4">
                {alerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                        <div className={`p-2 rounded-full ${alert.bg}`}>
                            <alert.icon className={`w-4 h-4 ${alert.color}`} />
                        </div>
                        <div className="flex-1">
                            <h5 className="text-sm font-bold text-gray-800">{alert.type}</h5>
                            <p className="text-xs text-gray-500 mt-0.5">
                                Shipment <span className="font-medium text-gray-700">{alert.id}</span> • {alert.time}
                            </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <Clock className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShipmentAlerts;
