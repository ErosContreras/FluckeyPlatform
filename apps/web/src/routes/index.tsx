import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { AuthLayout } from '../components/layouts/AuthLayout';
import { SignInForm } from '../components/auth/SignInForm';
import { SignUpForm } from '../components/auth/SignUpForm';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { LoadingScreen } from '../components/common/LoadingScreen';

export const AppRoutes = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route
          path="/signin"
          element={!user ? <SignInForm /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpForm /> : <Navigate to="/dashboard" replace />}
        />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
      </Route>

      {/* Default Route */}
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/signin"} replace />}
      />
    </Routes>
  );
};