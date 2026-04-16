import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddressesPage from './pages/AddressesPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import ProfilePage from './pages/ProfilePage';
import RestaurantPage from './pages/RestaurantPage';

//ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

//PublicRoute
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* PUBLICAS */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />

        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } 
        />

        {/* PROTEGIDAS */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/restaurant/:id" 
          element={
            <ProtectedRoute>
              <RestaurantPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/addresses" 
          element={
            <ProtectedRoute>
              <AddressesPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/cart" 
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/orders/:id" 
          element={
            <ProtectedRoute>
              <OrderDetailPage />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;