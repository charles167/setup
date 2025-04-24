import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

// Axios config
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// Create context
export const AppContext = createContext();

// Provider component
export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₦";
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [Products, setProducts] = useState([]);
  const [cartitems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.post('/api/seller/is-auth');
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      toast.error("Failed to check seller status.");
    }
  };

  //Fetch User Auth Status , User Data and Cart Items
  const fetchUser = async () =>{
    try {
      const {data} = await axios.get ('api/user/is-auth');
      if (data.success){
        setUser(data.user)
        setCartItems(data.user.cartItems)
      }
      
    } catch (error) {
      setUser(null)
      
    }
  }

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/product/list');
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
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
    fetchUser()
    fetchProducts();
    fetchSeller();
  }, []);

  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", {
          userId: user._id, // or however you access it
          cartItems: cartitems, // match casing with backend
        });
        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };
  
    if (user && Object.keys(cartitems).length > 0) {
      updateCart();
    }
  }, [cartitems, user]);
  

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
    setProducts, // ✅ now included!
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartitems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios,
    fetchProducts,
    setCartItems
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook to use context
export const useAppContext = () => {
  return useContext(AppContext);
};
