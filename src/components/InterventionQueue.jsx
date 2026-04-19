import React from 'react';
import AppointmentCard from './AppointmentCard';
import { AlertTriangle, Phone, CheckCircle } from 'lucide-react';

const InterventionQueue = ({ appointments, onSendIntervention, onAppointmentClick }) => {
  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No High-Risk Appointments</h3>
        <p className="text-gray-500">All high-risk appointments have been addressed.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <AppointmentCard 
          key={appointment.patient_id} 
          appointment={appointment} 
          onClick={() => onAppointmentClick(appointment)}
        />
      ))}
    </div>
  );
};

export default InterventionQueue;