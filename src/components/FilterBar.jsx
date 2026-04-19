import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
  const handleRiskLevelChange = (e) => {
    onFilterChange('riskLevel', e.target.value);
  };

  const handleDateChange = (e) => {
    onFilterChange('date', e.target.value);
  };

  const handleProviderChange = (e) => {
    onFilterChange('provider', e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
          <select
            value={filters.riskLevel}
            onChange={handleRiskLevelChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Levels</option>
            <option value="LOW">Low Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={filters.date}
            onChange={handleDateChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
          <input
            type="text"
            value={filters.provider}
            onChange={handleProviderChange}
            placeholder="Enter provider name"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;