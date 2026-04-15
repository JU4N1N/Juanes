import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AddressesPage from './pages/AddressesPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import OrderDetailPage from './pages/OrderDetailPage'
import ProfilePage from './pages/ProfilePage'

import RestaurantPage from './pages/RestaurantPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/restaurant" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/restaurant" element={<RestaurantPage />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/addresses" element={<AddressesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App