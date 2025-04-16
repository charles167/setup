import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext =  createContext();

export const AppContextProvider = ({children})=>{
    
    const currency = import.meta.VITE_CURRENCY;
    
    const navigate = useNavigate()
     const [user,setUser] = useState(null);
     const [isSeller,setIsSeller] = useState(false);
     const [showUserLgin,setShowUserLogin] = useState(false); 
     const [Products,setProducts] = useState([]);  
     
     
     const [cartitems,setCartItems] = useState({});
     const [searchQuery, setSearchQuery] = useState('');

     
     // Fetch All Products
     const fetchProducts = async ()=>{
        setProducts(dummyProducts)
     }

     //Add Product to Cart
     const addToCart = (itemId)=>{
        let cartData = structuredClone(cartitems);

        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success('Added to Cart')
     }

     //update Cart Item Quantity
     const updateCartItem=(itemId,Quantity)=>{
         let cartData = structuredClone(cartitems);
         cartData[itemId]=Quantity;
         setCartItems(cartData)
         toast.success("Cart Updated")
     }

     //Remove Product from Cart
     const removeFromCart =(itemId)=>{
        let cartData = structuredClone(cartitems);
        if(cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId] === 0){
                delete cartData[itemId];
            }
        }
        toast.success("Removed from Cart")
        setCartItems(cartData)
        
     }

     //Get Cart Item Count
     const getCartCount = ()=>{
        let totalCount = 0;
        for(const item in cartitems){
            totalCount += cartitems[item]

        }
        return totalCount;
     }
     //Get Cart Total Amount 
     const getCartAmount =() =>{
        let totalAmount =0;
        for (const items in cartitems){
          let itemInfo = Products.find((product)=> product._id === items);
          if(cartitems[items]>0){
            totalAmount += itemInfo.offerPrice * cartitems[item]
          }  
        }
        return Math.floor(totalAmount *100)/ 100;
     }

     useEffect(()=>{
         fetchProducts()
     },[])
     
     

    const value = {navigate,user,setUser,setIsSeller,isSeller,showUserLgin,setShowUserLogin,Products,currency,addToCart,updateCartItem,removeFromCart,cartitems, searchQuery,
        setSearchQuery, getCartCount,getCartAmount}
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}