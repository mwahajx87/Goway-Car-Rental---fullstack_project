import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { delay, motion } from 'motion/react'

const MyBookings = () => {
  const { axios, user, currency } = useAppContext()


  const [bookings, setBookings] = useState([])

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user')
      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    user && fetchMyBookings()
  }, [user])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-18 mt-16 text-sm max-w-7xl mx-auto'>
      <Title
        title='My Bookings'
        subtitle='View and manage your all car booking'
        align="left"
      />
      <div className='space-y-4 mt-8'>
        {bookings.map((booking, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            key={booking._id} className='bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden'>
            {/* Mobile Layout */}
            <div className='md:hidden'>
              <div className='p-4'>
                {/* Car Image */}
                <div className='relative'>
                  <img
                    src={booking.car.Image}
                    alt={`${booking.car.brand} ${booking.car.model}`}
                    className='w-full h-48 object-cover rounded-lg'
                  />
                  <div className='absolute top-3 right-3'>
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>

                {/* Car Info */}
                <div className='mt-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    {booking.car.brand} {booking.car.model}
                  </h3>
                  <p className='text-sm text-gray-600 mt-1'>
                    {booking.car.year} • {booking.car.category} • {booking.car.location}
                  </p>
                </div>

                {/* Booking Details */}
                <div className='mt-4 space-y-3'>
                  <div className='flex items-start gap-3'>
                    <img src={assets.calendar_icon_colored} alt="" className='w-5 h-5 mt-0.5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Rental Period</p>
                      <p className='text-sm font-medium text-gray-900'>
                        {booking.pickupDate.split('T')[0]} → {booking.returnDate.split('T')[0]}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <img src={assets.location_icon_colored} alt="" className='w-5 h-5 mt-0.5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Pick-up Location</p>
                      <p className='text-sm font-medium text-gray-900'>{booking.car.location}</p>
                    </div>
                  </div>
                </div>

                {/* Price & Booking Info */}
                <div className='mt-4 pt-4 border-t border-gray-100'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <p className='text-xs text-gray-500'>Booking #{index + 1}</p>
                      <p className='text-xs text-gray-500'>Booked on {booking.createdAt.split('T')[0]}</p>
                    </div>
                    <div className='text-right'>
                      <p className='text-xs text-gray-500'>Total Price</p>
                      <p className='text-xl font-bold text-primary'>{currency}{booking.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop/Tablet Layout */}
            <div className='hidden md:grid md:grid-cols-12 gap-6 p-6'>
              {/* Car Image & Info - Left Column */}
              <div className='md:col-span-4'>
                <div className='rounded-lg overflow-hidden'>
                  <img
                    src={booking.car.Image}
                    alt={`${booking.car.brand} ${booking.car.model}`}
                    className='w-full h-40 object-cover'
                  />
                </div>
                <div className='mt-3'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    {booking.car.brand} {booking.car.model}
                  </h3>
                  <p className='text-sm text-gray-600 mt-1'>
                    {booking.car.year} • {booking.car.category} • {booking.car.location}
                  </p>
                </div>
              </div>

              {/* Booking Details - Middle Column */}
              <div className='md:col-span-5'>
                <div className='flex items-center gap-3 mb-4'>
                  <span className='px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg'>
                    Booking #{index + 1}
                  </span>
                  <span className={`px-3 py-1.5 text-sm font-medium rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {booking.status}
                  </span>
                </div>

                <div className='space-y-3'>
                  <div className='flex items-start gap-3'>
                    <img src={assets.calendar_icon_colored} alt="" className='w-5 h-5 mt-0.5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Rental Period</p>
                      <p className='text-sm font-medium text-gray-900'>
                        {booking.pickupDate.split('T')[0]} → {booking.returnDate.split('T')[0]}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <img src={assets.location_icon_colored} alt="" className='w-5 h-5 mt-0.5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Pick-up Location</p>
                      <p className='text-sm font-medium text-gray-900'>{booking.car.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Booking Info - Right Column */}
              <div className='md:col-span-3'>
                <div className='text-right'>
                  <p className='text-sm text-gray-500'>Total Price</p>
                  <p className='text-2xl font-bold text-primary'>{currency}{booking.price}</p>
                  <p className='text-sm text-gray-500 mt-1'>
                    Booked on {booking.createdAt.split('T')[0]}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {bookings.length === 0 && (
        <div className='text-center py-12'>
          <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <img src={assets.car_icon} alt="" className='w-8 h-8 text-gray-400' />
          </div>
          <h3 className='text-lg font-medium text-gray-900 mb-2'>No bookings yet</h3>
          <p className='text-gray-600'>Start exploring and book your first car!</p>
        </div>
      )}
    </motion.div>
  )
}

export default MyBookings
