import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

function BestSeller() {
    const { Products } = useAppContext(); // ✅ use parentheses and the correct variable name

    return (
        <div className='mt-16'>
            <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
            <div className='flex gap-4 flex-wrap'>
                {Products && Products.length > 0 ? (
                    Products.slice(0, 4).map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                ) : (
                    <p className='text-gray-500'>Loading best sellers...</p>
                )}
            </div>
        </div>
    )
}

export default BestSeller
