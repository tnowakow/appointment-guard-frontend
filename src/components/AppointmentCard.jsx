import React from 'react';
import RiskBadge from './RiskBadge';
import { Calendar, Clock, Phone, User } from 'lucide-react';

const AppointmentCard = ({ appointment, onClick }) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick(appointment);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-gray-500" />
            <h3 className="font-semibold text-gray-900">{appointment.patient_name}</h3>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Phone className="w-4 h-4" />
            <span>{appointment.patient_phone}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Calendar className="w-4 h-4" />
            <span>{appointment.appointment_date}</span>
            <Clock className="w-4 h-4 ml-2" />
            <span>{appointment.appointment_time}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Provider:</span>
              <span className="ml-1 text-sm text-gray-600">{appointment.provider_name || 'N/A'}</span>
            </div>
            <RiskBadge riskCategory={appointment.risk_category} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;