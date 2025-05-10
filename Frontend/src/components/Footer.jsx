import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col md:flex-row justify-between gap-14 my-10 mt-40 text-sm'>

            <div className='md:w-1/2'>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full  text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum reiciendis fuga dolor ratione quam dicta, omnis quos laboriosam dolorem consectetur! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam esse eligendi possimus officia fugiat repellendus tenetur incidunt quidem, similique nulla.</p>
            </div>
            <div>
                <p className='uppercase text-xl font-medium mb-5'>company</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='uppercase text-xl font-medium mb-5'>get in touch</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91-98765-43210</li>
                    <li>gaurav.1222parmar@gmail.com</li>
                </ul>

            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ Prescripto - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer