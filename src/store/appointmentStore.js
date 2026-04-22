import { create } from 'zustand';

const useAppointmentStore = create((set, get) => ({
  appointments: [],
  selectedAppointment: null,
  filters: {
    riskLevel: 'all',
    date: '',
    provider: ''
  },
  isLoading: false,
  error: null,
  
  // Actions
  setAppointments: (appointments) => set({ appointments }),
  setSelectedAppointment: (appointment) => set({ selectedAppointment: appointment }),
  setFilters: (filters) => set({ filters }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  // Filter appointments based on current filters
  filteredAppointments: () => {
    const { appointments, filters } = get();
    return appointments.filter(appointment => {
      if (filters.riskLevel !== 'all' && appointment.risk_category !== filters.riskLevel) {
        return false;
      }
      if (filters.date && appointment.appointment_date !== filters.date) {
        return false;
      }
      // Note: provider filter not implemented yet - backend returns provider_name
      return true;
    });
  },
  
  // Sort appointments by risk level (HIGH first, then MEDIUM, then LOW)
  sortedAppointments: () => {
    const filtered = get().filteredAppointments();
    return [...filtered].sort((a, b) => {
      const riskOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
      return riskOrder[b.risk_category] - riskOrder[a.risk_category];
    });
  },
  
  // Get high-risk appointments for intervention queue
  highRiskAppointments: () => {
    const { appointments } = get();
    return appointments.filter(appointment => appointment.risk_category === 'HIGH');
  }
}));

export default useAppointmentStore;