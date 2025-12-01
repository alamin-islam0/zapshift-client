import React from 'react';
import { Calendar, MoreVertical } from 'lucide-react';

const RevenueChart = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Overall Statistics</h3>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                        <Calendar className="w-4 h-4" />
                        This Week
                    </button>
                    <button className="p-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Placeholder for Chart - In a real app, use Recharts or Chart.js */}
            <div className="h-64 w-full bg-gradient-to-b from-green-50/50 to-transparent relative border-b border-l border-gray-100">
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-between px-4 pb-0">
                    {/* Mock Chart Lines */}
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                        <path d="M0,200 C50,200 100,100 150,100 C200,100 250,150 300,150 C350,150 400,180 450,180 C500,180 550,100 600,100 C650,100 700,100 750,100 C800,100 850,200 900,200 L900,250 L0,250 Z" fill="url(#gradient)" opacity="0.2" />
                        <path d="M0,200 C50,200 100,100 150,100 C200,100 250,150 300,150 C350,150 400,180 450,180 C500,180 550,100 600,100 C650,100 700,100 750,100 C800,100 850,200 900,200" fill="none" stroke="#84cc16" strokeWidth="2" />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#84cc16" />
                                <stop offset="100%" stopColor="#ffffff" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Y-Axis Labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-8 py-2">
                    <span>$25k</span>
                    <span>$20k</span>
                    <span>$15k</span>
                    <span>$10k</span>
                    <span>$5k</span>
                    <span>$1k</span>
                </div>

                {/* X-Axis Labels */}
                <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-400 pt-2 translate-y-full">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                </div>

                {/* Tooltip Mock */}
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-white p-2 shadow-lg rounded-lg border border-gray-100 z-10">
                    <p className="text-xs text-gray-500">Sun, Jul 13, 2025</p>
                    <p className="text-sm font-bold text-gray-800">● $15210.00</p>
                </div>
            </div>
        </div>
    );
};

export default RevenueChart;
