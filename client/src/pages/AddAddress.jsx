import React from 'react'
import { assets } from '../assets/assets'

//Input Field Component

const inputField = (()=>(
    <input type="text" />
))

const AddAddress = () => {

  return (
    <div className='mt-16 pb-16'>
        <p className='text-2x1 md:text-3x1 text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span> </p>
      
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
      <div>

      </div>
      <img className='md:mr-16 md-16 md:mt-0' src={assets.add_address_iamge} alt="" AddAddress />

      </div>
    </div>
  )
}

export default AddAddress
