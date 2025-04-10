import React from 'react';
import { Link } from 'react-router-dom'; // You forgot this import
import { assets } from '../assets/assets';

function MainBanner() {
  return (
    <div className='relative'>
      {/* Desktop and mobile banner images */}
      <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block' />
      <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden' />

      {/* Text Content */}
      <div className='absolute top-1/4 left-6 md:left-16 text-white w-full max-w-[700px]'>
        <h1 className='text-4xl md:text-5xl font-extrabold leading-tight md:leading-normal'>
          Freshness You Can Trust, Savings You Will Love!
        </h1>
      </div>

      {/* Buttons */}
      <div className='absolute top-1/2 left-6 md:left-16 flex flex-col gap-4 md:flex-row'>
        <Link
          to="/products"
          className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'
        >
          Show Now
          <img className='transition group-hover:translate-x-1' src={assets.white_arrow_icon} alt='arrow' />
        </Link>

        <Link
          to="/products"
          className='group hidden md:flex items-center gap-2 px-9 py-3 bg-white text-black hover:bg-gray-100 transition rounded-full'
        >
          Explore Deals
          <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt='arrow' />
        </Link>
      </div>
    </div>
  );
}

export default MainBanner;
