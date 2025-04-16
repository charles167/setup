import React from 'react'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Footer from './component/Footer';
import { useAppContext } from './context/AppContext';
import Login from './component/Login';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const {showUserLgin} = useAppContext()
  return (
    <div>
      {/* Conditionally render Navbar only if not a "seller" path */}
      {!isSellerPath && <Navbar />}
      {showUserLgin && <Login />}

      <Toaster/>

      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={< ProductCategory />} />
          <Route path='/products/:category/:id' element={< ProductDetails/>} />
          <Route path='/Cart' element={<Cart/>} />
        </Routes>
      </div>
     {!isSellerPath && <Footer/>} 
    </div>
  )
}

export default App
