import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { useAppointmentStore } from '../store/appointmentStore';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setAuth = useAppointmentStore(state => state.setAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For MVP, accept any password
    if (password.length > 0) {
      setAuth(true);
      setError('');
    } else {
      setError('Please enter a password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto bg-blue-600 p-3 rounded-lg w-16 h-16 flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">AppointmentGuard</h2>
          <p className="text-gray-600 mt-2">Sign in to your dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter password"
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;