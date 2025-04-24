import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'

const Orders = () => {
  const { currency, axios } = useAppContext()
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller')
      if (data.success) {
        setOrders(data.orders)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || 'Something went wrong'
      toast.error(errorMessage)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id} // Prefer using a unique identifier from the order
              className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
            >
              <div className="flex gap-5 max-w-80">
                <img
                  className="w-12 h-12 object-cover"
                  src={assets.box_icon}
                  alt="box icon"
                />
                <div className="flex flex-col gap-1">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item) => (
                      <p key={item.product?._id || item.product?.name} className="font-medium">
                        {item.product?.name || 'Unnamed Product'}
                        <span className="text-primary"> x {item.quantity}</span>
                      </p>
                    ))
                  ) : (
                    <p>No items in this order</p>
                  )}
                </div>
              </div>

              <div className="text-sm md:text-base text-black/60">
                <p className="text-black/80">
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                <p>
                  {order.address?.street}, {order.address?.city}
                </p>
                <p>
                  {order.address?.state}, {order.address?.zipcode}, {order.address?.country}
                </p>
                <p>{order.address?.phone}</p>
              </div>

              <p className="font-medium text-lg my-auto">
                {currency}
                {order.amount}
              </p>

              <div className="flex flex-col text-sm md:text-base text-black/60">
                <p>Method: {order.paymentType}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Payment: {order.ispaid ? 'Paid' : 'Pending'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders
