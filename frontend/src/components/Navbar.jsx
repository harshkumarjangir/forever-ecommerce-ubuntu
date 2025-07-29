import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import toast from 'react-hot-toast'

const Navbar = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    const logout = () => {
        setToken('')
        localStorage.removeItem('token')
        setCartItems({})
        navigate('/login')
        toast.success('Logged out successfully')
        // setDropdownOpen(false)
    }

    // const login = true

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to="/">
                <img src={assets.logo} className='w-36' alt="logo" />
            </Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <li className='uppercase'>Home</li>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/collection" className="flex flex-col items-center gap-1">
                    <li className='uppercase'>Collection</li>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <li className='uppercase'>About</li>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/contact" className="flex flex-col items-center gap-1">
                    <li className='uppercase'>Contact</li>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className="flex items-center max-sm:gap-3 gap-6">
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="search icon" />

                {
                    token ? <div className="relative">
                        <img onClick={() => setDropdownOpen(!dropdownOpen)} src={assets.profile_icon} className='w-5 cursor-pointer' alt="profile icon" />
                        {
                            dropdownOpen && (
                                <div div className="absolute dropdown-menu right-0 pt-4">
                                    <div className="flex flex-col gap-2 w-36 py-1 px-1 bg-slate-100 text-gray-500 rounded">
                                        <p className='hover:text-black hover:bg-gray-200 p-2 cursor-pointer'>My Profile</p>
                                        <p onClick={()=>navigate('/orders')} className='hover:text-black hover:bg-gray-200 p-2 cursor-pointer'>Orders</p>
                                        <p onClick={logout} className='hover:text-black hover:bg-gray-200 p-2 cursor-pointer'>Logout</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                        :
                        <Link to="/login">
                            <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="profile icon" />
                        </Link>
                }




                <Link to="/cart" className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart icon" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setMenuOpen(true)} src={assets.menu_icon} className='w-5 sm:hidden  cursor-pointer' alt="menu icon" />
            </div>

            {/* Sidebar Mobile Menu */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${menuOpen ? 'w-full' : 'w-0'}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={() => setMenuOpen(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setMenuOpen(false)} className="py-2 pl-6 border" to="/">Home</NavLink>
                    <NavLink onClick={() => setMenuOpen(false)} className="py-2 pl-6 border" to="/collection">Collection</NavLink>
                    <NavLink onClick={() => setMenuOpen(false)} className="py-2 pl-6 border" to="/about">About</NavLink>
                    <NavLink onClick={() => setMenuOpen(false)} className="py-2 pl-6 border" to="/contact">Contact</NavLink>
                </div>
            </div>

        </div >
    )
}

export default Navbar