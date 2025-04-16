import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../component/ProductCard';

const AllProducts = () => {
  const { Products, searchQuery } = useAppContext(); // Use "Products" from context
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (Products && Products.length > 0) {
      const filtered = Products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [Products, searchQuery]);

  return (
    <div className='mt-16 flex flex-col'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All Products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
          {filteredProducts
            .filter(product => product.inStock)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
      ) : (
        <div className="mt-6 text-gray-500 text-center">No products found.</div>
      )}
    </div>
  ); 
};

export default AllProducts;
