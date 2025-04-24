import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

function Navbar() {
    const [open, setOpen] = React.useState(false);
    const {
        user,
        setUser,
        setShowUserLogin,
        navigate,
        setSearchQuery,
        searchQuery,
        getCartCount,
        axios
    } = useAppContext();

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout');
            if (data.success) {
                toast.success(data.message);
                setUser(null);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate('/products');
        }
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products");
        }
    }, [searchQuery]);

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            <NavLink to='/' onClick={() => setOpen(false)}>
                <img className="h-9" src={assets.logo} alt="dummyLogoColored" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-6">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All Products</NavLink>
                <NavLink to='/'>Contact</NavLink>
                <NavLink to='/seller'>Seller</NavLink>

                {/* Search bar (desktop) */}
                <div className="hidden lg:flex items-center border border-gray-300 rounded-full px-3 gap-2 bg-white transition-all duration-300 focus-within:ring-2 ring-indigo-200 shadow-sm focus-within:shadow-lg">
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500 text-sm transition-all duration-300 focus:w-64"
                        type="text"
                        placeholder="Search products"
                    />
                    <button onClick={handleSearch} className="transition-transform duration-200 hover:scale-110">
                        <img src={assets.search_icon} alt="Search" className="w-4 h-4" />
                    </button>
                </div>

                {/* Cart */}
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
                        {getCartCount()}
                    </button>
                </div>

                {/* Login/Profile */}
                {!user ? (
                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white rounded-full hover:scale-105"
                    >
                        Login
                    </button>
                ) : (
                    <div className='relative group'>
                        <img src={assets.profile_icon} className='w-10 cursor-pointer' alt='profile' />
                        <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-40 rounded-md text-sm z-40 transition-all duration-300'>
                            <li
                                onClick={() => navigate('/my-orders')}
                                className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'
                            >
                                My Orders
                            </li>
                            <li
                                onClick={logout}
                                className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Cart Icon for Mobile */}
            <div className="sm:hidden absolute top-4 right-16 z-50">
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
                        {getCartCount()}
                    </button>
                </div>
            </div>

            {/* Menu Toggle for Mobile */}
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden z-50 transition-transform duration-200 hover:scale-110">
                <img src={assets.menu_icon} alt='menu' />
            </button>

            {/* Overlay for mobile */}
            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300" onClick={() => setOpen(false)}></div>
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-[75%] max-w-xs bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'} sm:hidden`}
            >
                <div className="p-6 flex flex-col gap-4 text-base">
                    <NavLink to="/" onClick={() => setOpen(false)} className="hover:text-indigo-600 transition">Home</NavLink>
                    <NavLink to="/products" onClick={() => setOpen(false)} className="hover:text-indigo-600 transition">All Products</NavLink>
                    {user && (
                        <NavLink to="/my-orders" onClick={() => setOpen(false)} className="hover:text-indigo-600 transition">My Orders</NavLink>
                    )}
                    <NavLink to="/" onClick={() => setOpen(false)} className="hover:text-indigo-600 transition">Contact</NavLink>
                    <NavLink to="/seller" onClick={() => setOpen(false)} className="hover:text-indigo-600 transition">Seller</NavLink>

                    {/* Mobile search input */}
                    <div className="flex items-center border border-gray-300 rounded-full px-3 mt-4 gap-2 bg-white transition-all duration-300 focus-within:ring-2 ring-indigo-200 shadow-sm focus-within:shadow-lg">
                        <input
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="py-1.5 w-full bg-transparent outline-none text-sm transition-all duration-300 focus:w-56"
                            type="text"
                            placeholder="Search products"
                        />
                        <button onClick={() => {
                            handleSearch();
                            setOpen(false);
                        }} className="transition-transform duration-200 hover:scale-110">
                            <img src={assets.search_icon} alt="Search" className="w-4 h-4" />
                        </button>
                    </div>

                    {!user ? (
                        <button
                            onClick={() => {
                                setOpen(false);
                                setShowUserLogin(true);
                            }}
                            className="mt-6 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white text-center transition-all duration-300 hover:scale-105"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setOpen(false);
                                logout();
                            }}
                            className="mt-6 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white text-center transition-all duration-300 hover:scale-105"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
