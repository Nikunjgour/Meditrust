import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProductListingPage from './pages/pharmacy/ProductListingPage';
import DoctorListingPage from './pages/doctors/DoctorListingPage';
import LabTestListingPage from './pages/lab/LabTestListingPage';
import AiHubPage from './pages/ai/AiHubPage';
import UserDashboardPage from './pages/dashboard/UserDashboardPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import PrivateComponent from './components/PrivateComponent';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import { useSelector } from 'react-redux';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminDoctorsPage from './pages/admin/AdminDoctorsPage';
import AdminPathologistsPage from './pages/admin/AdminPathologistsPage';
import AdminAllUsersPage from './pages/admin/AdminAllUsersPage';

// Single shared client (must not be recreated on every render).
const queryClient = new QueryClient()

export default function App() {

  const { user } = useSelector(state => state.auth)
  const isAdmin = user?.userType === "ADMIN"

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {!isAdmin && <Navbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/pharmacy" element={<ProductListingPage />} />
          <Route path="/doctors" element={<DoctorListingPage />} />
          <Route path="/lab" element={<LabTestListingPage />} />
          <Route path='/auth' element={<PrivateComponent />}>
            <Route path="dashboard" element={<UserDashboardPage />} />
            <Route path="ai-hub" element={<AiHubPage />} />
          </Route>
          <Route path='/auth/admin' element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="doctors" element={<AdminDoctorsPage />} />
              <Route path="pathologists" element={<AdminPathologistsPage />} />
              <Route path="users" element={<AdminAllUsersPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {!isAdmin && <Footer />}
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}
