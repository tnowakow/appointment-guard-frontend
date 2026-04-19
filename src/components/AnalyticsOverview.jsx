import React from 'react';
import { TrendingUp, Calendar, Users, AlertTriangle } from 'lucide-react';

const AnalyticsOverview = ({ analytics }) => {
  // Default values if no analytics data
  const data = analytics || {
    revenueAtRisk: 0,
    interventionsSent: 0,
    noShowRate: 0
  };

  const getBarWidth = (value, maxValue = 100) => {
    return `${Math.min((value / maxValue) * 100, 100)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue at Risk</p>
              <p className="text-2xl font-bold text-gray-900">${data.revenueAtRisk.toLocaleString()}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interventions Sent</p>
              <p className="text-2xl font-bold text-gray-900">{data.interventionsSent}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">No-Show Rate</p>
              <p className="text-2xl font-bold text-gray-900">{data.noShowRate}%</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Trend Analysis</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">This Week</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: getBarWidth(75, 100) }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700">75%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">This Month</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: getBarWidth(40, 100) }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700">40%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Last 3 Months</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-yellow-600 h-2.5 rounded-full" 
                style={{ width: getBarWidth(60, 100) }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700">60%</span>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Time Range</h3>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
            Today
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200">
            This Week
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200">
            This Month
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;