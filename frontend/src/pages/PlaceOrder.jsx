import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const PlaceOrder = () => {

    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)

    const [method, setMethod] = useState('cod')

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })


    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value

        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {
                    const { data } = await axios.post(`${backendUrl}/api/order/verifyRazorpay`, response, { headers: { token } })
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        // console.log(formData)
        try {
            let orderItems = []
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }
            // console.log(orderItems)

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch (method) {
                case 'cod':
                    const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } })
                    // console.log(response.data)
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(`${backendUrl}/api/order/stripe`, orderData, { headers: { token } })
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }

                    break;

                case 'razorpay':
                    const responseRazorpay = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, { headers: { token } })
                    if (responseRazorpay.data.success) {
                        // console.log(responseRazorpay.data.order)
                        initPay(responseRazorpay.data.order)

                    }
                    break;

                default:
                    break;
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* Left Side */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={'Delivery'} text2={'Information'} />
                </div>
                <div className="flex gap-3">
                    <input onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First name' required />
                    <input onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last name' required />
                </div>
                <input onChange={onChangeHandler} name='email' value={formData.email} type="email" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Enter Email address' required />
                <input onChange={onChangeHandler} name='street' value={formData.street} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' required />
                <div className="flex gap-3">
                    <input onChange={onChangeHandler} name='city' value={formData.city} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' required />
                    <input onChange={onChangeHandler} name='state' value={formData.state} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' required />
                </div>
                <div className="flex gap-3">
                    <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zip Code' required />
                    <input onChange={onChangeHandler} name='country' value={formData.country} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' required />
                </div>
                <input onChange={onChangeHandler} name='phone' value={formData.phone} type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone' required />
            </div>
            {/* Right Side */}
            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <CartTotal />
                </div>
                <div className="mt-12">
                    <Title text1={'Payment'} text2={'Method'} />
                    {/* Payment Method Selection */}
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border border-gray-400 p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
                        </div>
                        <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border border-gray-400 p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
                        </div>
                        <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border border-gray-400 p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>Cash on Delivery</p>
                        </div>
                    </div>
                    <div className="w-full text-end mt-8">
                        <button type='submit' className='bg-black text-white px-16 py-3 text-sm uppercase cursor-pointer'>Place Order</button>
                        {/* <button type='submit' onClick={() => navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm uppercase cursor-pointer'>Place Order</button> */}
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder