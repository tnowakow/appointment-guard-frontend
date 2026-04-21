import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://appointment-guard-production.up.railway.app',
});

export const fetchAppointments = (daysAhead = 7) => 
  api.get(`/appointments?days_ahead=${daysAhead}`);

export const scoreAppointment = (appointment) => api.post('/risk/score', appointment);
export const sendIntervention = (appointment) => api.post('/intervention/send', appointment);
// Add other endpoints as needed

export default api;