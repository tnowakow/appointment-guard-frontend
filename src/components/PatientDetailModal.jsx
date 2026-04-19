import React from 'react';
import { X, Calendar, Clock, Phone, User, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';
import RiskBadge from './RiskBadge';

const PatientDetailModal = ({ appointment, isOpen, onClose, onSendIntervention }) => {
  if (!isOpen || !appointment) return null;

  const handleSendIntervention = (action) => {
    onSendIntervention(appointment, action);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-900">Appointment Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <span className="font-semibold">{appointment.patient_name}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" />
              <span>{appointment.patient_phone}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>{appointment.appointment_date}</span>
              <Clock className="w-5 h-5 text-gray-500 ml-2" />
              <span>{appointment.appointment_time}</span>
            </div>
            
            {appointment.provider && (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span>Provider: {appointment.provider}</span>
              </div>
            )}
            
            <div>
              <h3 className="font-semibold mb-2">Risk Assessment</h3>
              <div className="flex items-center gap-2">
                <RiskBadge riskCategory={appointment.risk_category} />
                <span className="ml-2 text-sm">{appointment.recommendation}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-3">Intervention Actions</h3>
              <div className="space-y-2">
                {appointment.risk_category === 'HIGH' && (
                  <button
                    onClick={() => handleSendIntervention('confirmation')}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Send Confirmation SMS
                  </button>
                )}
                
                {appointment.risk_category === 'HIGH' && (
                  <button
                    onClick={() => handleSendIntervention('call')}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </button>
                )}
                
                {appointment.risk_category === 'MEDIUM' && (
                  <button
                    onClick={() => handleSendIntervention('reminder')}
                    className="w-full flex items-center justify-center gap-2 bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Send Reminder SMS
                  </button>
                )}
                
                <button
                  onClick={() => handleSendIntervention('mark_completed')}
                  className="w-full flex items-center justify-center gap-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark as Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailModal;