import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            // console.log(email,password)
            const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password })
            console.log(response)
            if (response.data.success) {
                setToken(response.data.token)
                toast.success(response.data.message || 'Login successful!')
            } else {
                toast.error(response.data.message || 'Login failed, please try again.')
            }

        } catch (error) {
            console.error('Login error:', error)
            toast.error(error.response.data.message || 'Login failed, please check your credentials and try again.')
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md rounded-lg max-w-md px-8 py-6'>
                <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-3 min-w-72">
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' name="" id="" required />
                    </div>
                    <div className="mb-3 min-w-72">
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' name="" id="" required />
                    </div>
                    <button type='submit' className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black cursor-pointer'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login