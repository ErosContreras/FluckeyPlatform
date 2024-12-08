import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

export const Dashboard = () => {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user?.displayName}!
        </h1>
        <div className="mt-6">
          <p className="text-gray-600">Your creative journey starts here.</p>
        </div>
      </div>
    </div>
  );
};