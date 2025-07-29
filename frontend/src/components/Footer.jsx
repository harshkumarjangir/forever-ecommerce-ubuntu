import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div className="">
                    <img src={assets.logo} className='mb-5 w-32' alt="logo" />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, error accusamus alias aut velit blanditiis recusandae sit officia ipsum, maxime illo. Distinctio obcaecati tenetur labore, quam maiores suscipit maxime, error eius doloribus rerum.
                    </p>
                </div>
                <div className="">
                    <p className="text-xl font-medium mb-5 uppercase">Company</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li className="">Home</li>
                        <li className="">About us</li>
                        <li className="">Delivery</li>
                        <li className="">Privacy policy</li>
                    </ul>
                </div>
                <div className="">
                    <p className='text-xl font-medium mb-5 uppercase'>Get In Touch</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+1-212-456-7890</li>
                        <li>contact@foreverone.com</li>
                    </ul>
                </div>
            </div>

            <div className="">
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025 @forever.com - All Rights Reserved</p>
            </div>

        </div>
    )
}

export default Footer