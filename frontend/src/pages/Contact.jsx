import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
    return (
        <div>
            <div className='text-center text-2xl pt-10 border-t'>
                <Title text1={'Contact'} text2={'Us'} />
            </div>

            <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
                <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
                <div className="flex flex-col justify-center items-start gap-6">
                    <p className='font-semibold text-xl text-gray-600'>Our Store</p>
                    <p className='text-gray-500'>54709 Willms Station <br /> Suite 790, Dashington, DSA</p>
                    <p className='text-gray-500'>Tel: (415) 555-0132 <br /> Email: admin@forever.com</p>
                    <p className='font-semibold text-xl text-gray-600'>Careers at forever</p>
                    <p className='text-gray-500'>Learn more about our teams and job openings.</p>
                    <button className='border px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'>Explore Jobs</button>
                </div>
            </div>
            <NewsLetterBox />
        </div>
    )
}

export default Contact