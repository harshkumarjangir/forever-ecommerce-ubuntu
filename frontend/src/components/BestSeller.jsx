import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {

    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])

    // console.log(products)
    // console.log(bestSeller)

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller))
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])

    return (
        <div className='my-10'>
            <div className="text-center text-3xl py-8">
                <Title text1={'Best'} text2={'Sellers'} />
                <p className='w-3/4 m-auto text-sm sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, vitae explicabo voluptatem quos molestias at!
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller