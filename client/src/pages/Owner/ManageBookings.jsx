import React, { useEffect, useState } from 'react'
import Title from '../../components/Owner/Title'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ManageBookings = () => {

  const { currency, axios } = useAppContext();

  const [bookings, setBookings] = useState([])

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/owner');
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch bookings.');
    }
  }

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status', { bookingId, status });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        toast.error(data.message || 'Failed to change booking status.');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to change booking status.');
    }
  }

  useEffect(() => {
    fetchOwnerBookings()
  }, [])

  return (
    <div className='px-4 pt-10 md:py-10 w-full'>
      <Title title="Manage Bookings" subtitle="Track all customer bookings, approve or cancel requests, and manage bookings statuses." />

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-bordercolor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-500'>
          <thead className='text-gray-500 bg-gray-50'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-md:hidden'>Date Range</th>
              <th className='p-3 font-medium'>Total</th>
              <th className='p-3 font-medium max-md:hidden'>Payment</th>
              <th className='p-3 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking._id} className='border-t border-bordercolor text-gray-500 hover:bg-gray-50'>
                  <td className='p-3 flex items-center gap-3'>
                    <img 
                      src={booking.car?.Image || '/placeholder-car.jpg'} 
                      alt={booking.car?.brand || 'Car'} 
                      className='h-12 w-12 aspect-square rounded-md object-cover'
                      onError={(e) => {
                        e.target.src = '/placeholder-car.jpg';
                      }}
                    />
                    <div>
                      <p className='font-medium max-md:hidden'>
                        {booking.car?.brand} {booking.car?.model}
                      </p>
                      <p className='text-xs text-gray-400 md:hidden'>
                        {booking.car?.brand} {booking.car?.model}
                      </p>
                    </div>
                  </td>
                  <td className='p-3 max-md:hidden'>
                    {new Date(booking.pickupDate).toLocaleDateString()} to {new Date(booking.returnDate).toLocaleDateString()}
                  </td>
                  <td className='p-3 font-medium'>{currency}{booking.price}</td>
                  <td className='p-3 max-md:hidden'>
                    <span className='bg-gray-100 px-3 py-1 rounded-full text-xs'>
                      {booking.paymentStatus || 'offline'}
                    </span>
                  </td>
                  <td className='p-3'>
                    {booking.status === 'pending' ? (
                      <select 
                        onChange={(e) => changeBookingStatus(booking._id, e.target.value)} 
                        value={booking.status} 
                        className='px-2 py-1 text-gray-700 border border-bordercolor rounded-md outline-none focus:border-primary'
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-600' 
                          : booking.status === 'cancelled'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageBookings
