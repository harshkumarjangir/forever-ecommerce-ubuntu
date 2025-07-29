import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

    const [list, setList] = useState([])

    const fetchList = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`)
            // console.log(response.data);
            if (response.data.success) {
                setList(response.data.products)
            } else {
                console.error('Failed to fetch list:', response.data.message)
                toast.error(response.data.message)
            }

        } catch (error) {
            console.error('Error fetching list:', error)
            toast.error(error.response.data.message)
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchList() // Refresh the list after removal
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error('Error removing product:', error)
            toast.error(error.message)

        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <>
            <p className='mb-2'>All Products List</p>
            <div className='flex flex-col gap-2'>
                {/* List Table Title */}
                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-200 bg-gray-100 text-sm'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    {/* <b>SubCategory</b> */}
                    <b>Price</b>
                    <b className='text-center'>Action</b>
                </div>

                {/* Product List */}
                {
                    list.length > 0 ? (
                        list.map((item, index) => (
                            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 rounded shadow-md hover:shadow-lg border border-gray-200 text-sm hover:bg-gray-100 cursor-pointer'>
                                <img src={item.image[0]} className='w-12 md:w-16 rounded' alt="" />
                                <p>{item.name}</p>
                                <p>{item.category}</p>
                                <p>{currency}{item.price}</p>
                                <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
                            </div>
                        ))
                    ) : (
                        <p className='text-center col-span-5 text-gray-500'>No products available.</p>
                    )
                }

            </div>
        </>
    )
}

export default List