import React, { useState } from 'react'
import { assets } from '../assets/assets'

// Input Field Component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className='w-full px-2 py-2.5 border border-gray-300 rounded outline-none text-gray-700 focus:border-indigo-500 transition'
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
)

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAddress(prevAddres => ({
      ...prevAddres,
      [name]: value,
    }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    // handle submit logic here (e.g., send to backend)
    console.log('Address submitted:', address)
  }

  return (
    <div className='mt-16 pb-16 px-4'>
      <p className='text-2xl md:text-3xl text-gray-700'>
        Add Shipping <span className='font-semibold text-indigo-500'>Address</span>
      </p>

      <div className='flex flex-col-reverse md:flex-row justify-between mt-10 gap-10'>
        <div className='flex-1 max-w-md'>
          <form onSubmit={onSubmitHandler} className='space-y-4 mt-6 text-sm'>

            <div className='grid grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address}
                name='firstName' type="text" placeholder="First Name" />
              <InputField handleChange={handleChange} address={address}
                name='lastName' type="text" placeholder="Last Name" />
            </div>

            <InputField handleChange={handleChange} address={address}
              name='email' type="email" placeholder="Email Address" />

            <InputField handleChange={handleChange} address={address}
              name='street' type="text" placeholder="Street Address" />

            <div className='grid grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address}
                name='city' type="text" placeholder="City" />
              <InputField handleChange={handleChange} address={address}
                name='state' type="text" placeholder="State" />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address}
                name='zipcode' type="text" placeholder="Zip Code" />
              <InputField handleChange={handleChange} address={address}
                name='country' type="text" placeholder="Country" />
            </div>

            <InputField handleChange={handleChange} address={address}
              name='phone' type="tel" placeholder="Phone Number" />

            <button
              type='submit'
              className='w-full mt-4 py-2 bg-indigo-500 text-white font-medium rounded hover:bg-indigo-600 transition'
            >
              Save Address
            </button>

          </form>
        </div>

        <img
          className='md:mr-10 md:w-96 max-md:mb-8'
          src={assets.add_address_iamge}
          alt="Add Address"
        />
      </div>
    </div>
  )
}

export default AddAddress
