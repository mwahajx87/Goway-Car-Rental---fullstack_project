import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const CarCards = ({ car }) => {
  const {currency,navigate} = useAppContext()
  return (
    <div 
      onClick={() => { 
        navigate(`/car-details/${car._id}`); 
        scrollTo(0, 0) 
      }} 
      className='group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer bg-white'
    >
      {/* Image Section */}
      <div className='relative h-48 sm:h-56 md:h-64 overflow-hidden'>
        <img 
          src={car.Image} 
          alt={`${car.brand} ${car.model}`} 
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' 
        />
        
        {car.isAvailable && (
          <p className='absolute top-3 left-3 bg-primaey/90 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm'>
            Available Now
          </p>
        )}
        
        <div className='absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg'>
          <span className='font-semibold text-sm sm:text-base'>{currency}{car.pricePerDay}</span>
          <span className='text-xs sm:text-sm text-white/80'> / day</span>
        </div>
      </div>

      {/* Content Section */}
      <div className='p-4 sm:p-5'>
        {/* Car Info */}
        <div className='mb-4'>
          <h3 className='text-lg sm:text-xl font-semibold text-gray-900 line-clamp-1'>
            {car.brand} {car.model}
          </h3>
          <p className='text-muted-foreground text-sm sm:text-base'>
            {car.category} • {car.year}
          </p>
        </div>

        {/* Car Features Grid */}
        <div className='grid grid-cols-2 gap-3 text-sm'>
          <div className='flex items-center gap-2 text-gray-600'>
            <img 
              src={assets.users_icon} 
              alt="Seats" 
              className='h-4 w-4 flex-shrink-0'
            />
            <span className='truncate'>{car.seating_capacity} Seats</span>
          </div>
          
          <div className='flex items-center gap-2 text-gray-600'>
            <img 
              src={assets.fuel_icon} 
              alt="Fuel" 
              className='h-4 w-4 flex-shrink-0'
            />
            <span className='truncate'>{car.fuel_type}</span>
          </div>
          
          <div className='flex items-center gap-2 text-gray-600'>
            <img 
              src={assets.car_icon} 
              alt="Transmission" 
              className='h-4 w-4 flex-shrink-0'
            />
            <span className='truncate'>{car.transmission}</span>
          </div>
          
          <div className='flex items-center gap-2 text-gray-600'>
            <img 
              src={assets.location_icon} 
              alt="Location" 
              className='h-4 w-4 flex-shrink-0'
            />
            <span className='truncate'>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarCards
