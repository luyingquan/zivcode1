import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../views/home'
import Login from '../views/login'
import Products from '../views/products'
import ProductDetail from '../views/product-detail'
import IdValidator from '../views/id-validator'
import EmailValidator from '../views/email-validator'
import SupplierManagement from '../views/supplier-management'
import Profile from '../views/profile'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/id-validator" element={<IdValidator />} />
        <Route path="/email-validator" element={<EmailValidator />} />
        <Route path="/supplier" element={<SupplierManagement />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
