import React from 'react';
import { assets } from '../assets/assets';
import sahaj from '../assets/sahaj.png';

const Footer = () => {
  return (
    <div className='bg-gray-900 text-white py-10'>
      <div className='max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-10 text-sm'>
        
        {/* Logo and Description Section */}
        <div className='w-full md:w-1/3'>
          <img className='mb-4 w-36 mx-auto md:mx-0' src={sahaj} alt="Sahaj Logo" />
          <p className='text-gray-300'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum reiciendis fuga dolor ratione quam dicta, omnis quos laboriosam dolorem consectetur! Quam esse eligendi possimus officia fugiat repellendus tenetur incidunt quidem, similique nulla.
          </p>
        </div>

        {/* Company Links */}
        <div className='w-full md:w-1/3'>
          <p className='uppercase text-lg font-semibold mb-4'>Company</p>
          <ul className='space-y-2 text-gray-300'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div className='w-full md:w-1/3'>
          <p className='uppercase text-lg font-semibold mb-4'>Get In Touch</p>
          <ul className='space-y-2 text-gray-300'>
            <li>+91-98765-43210</li>
            <li>sahaj@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className='border-t border-gray-600 mt-10 pt-5'>
        <p className='text-center text-xs text-gray-400'>
          Copyright 2025@ SAHAJ - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
