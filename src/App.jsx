import React, { useState, useEffect } from 'react';
import useAppointmentStore from './store/appointmentStore';
import AppointmentCard from './components/AppointmentCard';
import FilterBar from './components/FilterBar';
import PatientDetailModal from './components/PatientDetailModal';
import InterventionQueue from './components/InterventionQueue';
import AnalyticsOverview from './components/AnalyticsOverview';
import Login from './components/Login';
import { fetchAppointments, scoreAppointment, sendIntervention } from './lib/api';
import { AlertTriangle, BarChart3, Home, Shield } from 'lucide-react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  const {
    appointments,
    setAppointments,
    setError,
    filteredAppointments,
    sortedAppointments,
    highRiskAppointments,
    isLoading,
    error
  } = useAppointmentStore();

  // Check for existing session on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('appointmentGuardAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem('appointmentGuardAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  // Fetch real appointments from backend
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        console.log('Fetching appointments from backend...');
        const response = await fetchAppointments();
        console.log('Received appointments:', response);
        
        // Axios returns { data: {...} }, so we need response.data
        if (response && response.data && response.data.appointments) {
          setAppointments(response.data.appointments);
        } else {
          console.warn('No appointments found in response');
          setAppointments([]);
        }
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError(`Failed to load appointments: ${err.message}`);
      }
    };

    loadAppointments();
  }, [setAppointments, setError]);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleSendIntervention = async (appointment, action) => {
    try {
      // Prepare appointment data for API
      const appointmentData = {
        patient_id: appointment.patient_id,
        patient_name: appointment.patient_name,
        patient_phone: appointment.patient_phone,
        appointment_date: appointment.appointment_date,
        appointment_time: appointment.appointment_time,
        provider_name: appointment.provider,
        action_type: action
      };
      
      // Call the real API
      const response = await sendIntervention(appointmentData);
      console.log('Intervention sent successfully:', response);
      
      // Show success message (you can add toast notifications here)
      alert(`✅ ${action} sent to ${appointment.patient_name}`);
    } catch (error) {
      console.error('Error sending intervention:', error);
      alert('❌ Failed to send intervention. Please try again.');
    }
  };

  const handleFilterChange = (filterType, value) => {
    // This would update filters in the store
    console.log(`Filter changed: ${filterType} = ${value}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <div className="text-red-400 mb-2">⚠️</div>
          <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Data</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AppointmentGuard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">TN</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Tom Nowakowski</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Dashboard
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('queue')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'queue'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Intervention Queue
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointment Dashboard</h2>
            
            <FilterBar 
              filters={{ riskLevel: 'all', date: '', provider: '' }}
              onFilterChange={handleFilterChange}
            />
            
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Appointments</h3>
              <span className="text-sm text-gray-500">
                {sortedAppointments().length} appointments
              </span>
            </div>
            
            <div className="space-y-4">
              {sortedAppointments().map((appointment) => (
                <AppointmentCard 
                  key={appointment.patient_id} 
                  appointment={appointment} 
                  onClick={handleAppointmentClick}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'queue' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Intervention Queue</h2>
            
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">High-Risk Appointments</h3>
              <span className="text-sm text-gray-500">
                {highRiskAppointments().length} appointments needing action
              </span>
            </div>
            
            <InterventionQueue 
              appointments={highRiskAppointments()} 
              onSendIntervention={handleSendIntervention}
              onAppointmentClick={handleAppointmentClick}
            />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics Overview</h2>
            
            <AnalyticsOverview 
              analytics={{
                revenueAtRisk: 12500,
                interventionsSent: 42,
                noShowRate: 18
              }}
            />
          </div>
        )}
      </main>

      {/* Patient Detail Modal */}
      <PatientDetailModal
        appointment={selectedAppointment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSendIntervention={handleSendIntervention}
      />
    </div>
  );
};

export default App;