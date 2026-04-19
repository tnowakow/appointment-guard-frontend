import React from 'react';

const RiskBadge = ({ riskCategory }) => {
  const getBadgeStyle = (category) => {
    switch (category) {
      case 'HIGH':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getBadgeText = (category) => {
    switch (category) {
      case 'HIGH':
        return 'HIGH RISK';
      case 'MEDIUM':
        return 'MEDIUM RISK';
      case 'LOW':
        return 'LOW RISK';
      default:
        return category;
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getBadgeStyle(riskCategory)}`}>
      {getBadgeText(riskCategory)}
    </span>
  );
};

export default RiskBadge;