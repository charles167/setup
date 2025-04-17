import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

// Create context
export const AppContext = createContext();

// Provider component
export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₦";
  const navigate = useNavigate();

  const [user, setUser] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [Products, setProducts] = useState([]);
  const [cartitems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all products
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // Add product to cart
  const addToCart = (itemId) => {
    const cartData = structuredClone(cartitems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  // Update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    const cartData = structuredClone(cartitems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  // Remove product from cart
  const removeFromCart = (itemId) => {
    const cartData = structuredClone(cartitems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("Removed from Cart");
  };

  // Get total cart item count
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartitems) {
      totalCount += cartitems[item];
    }
    return totalCount;
  };

  // Get cart total amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartitems) {
      const itemInfo = Products.find((product) => product._id === itemId);
      if (itemInfo && cartitems[itemId] > 0) {
        totalAmount += itemInfo.offerPrice * cartitems[itemId];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Context value
  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    Products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartitems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook to use context
export const useAppContext = () => {
  return useContext(AppContext);
};
