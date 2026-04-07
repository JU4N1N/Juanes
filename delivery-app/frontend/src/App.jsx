import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AddressesPage from './pages/AddressesPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import OrderDetailPage from './pages/OrderDetailPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Si entra a "/" lo manda al login (o a home si ya está logueado) */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Públicas */}
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Privadas — envueltas en ProtectedRoute */}
        <Route path="/home"      element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/addresses" element={<AddressesPage />} />
        <Route path="/cart"      element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/checkout"  element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/orders"    element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App