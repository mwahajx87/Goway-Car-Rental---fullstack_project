import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import CarCards from '../components/CarCard.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {motion } from 'motion/react'


const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');

  const { cars, axios } = useAppContext();
  const [searchInput, setSearchInput] = useState('');
  const isSearchData = pickupDate && pickupLocation && returnDate;

  const [filteredCars, setFilteredCars] = useState([]);
  const [displayedCars, setDisplayedCars] = useState([]);
  const [carsToShow, setCarsToShow] = useState(9999)
  const [isLoading, setIsLoading] = useState(false);

  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post('/api/bookings/check-availability', {
        location: pickupLocation,
        pickupDate: pickupDate,
        returnDate: returnDate
      });
      if (data.success) {
        setFilteredCars(data.availableCars || data.availabeCars || []);
      } else {
        toast.error(data.message || 'Failed to fetch available cars.');
        setFilteredCars([]);
      }
    } catch (error) {
      toast.error('Error checking car availability: ' + (error.response?.data?.message || error.message));
      setFilteredCars([]);
    }
  };

  // Effect to fetch cars based on search parameters or load all cars
  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    } else {
      setFilteredCars(cars || []);
    }
  }, [isSearchData, pickupLocation, pickupDate, returnDate, axios, cars]);

  // Effect to filter cars based on the search input
  useEffect(() => {
    const lowerCaseInput = searchInput.toLowerCase();
    const currentFiltered = filteredCars.filter(car =>
      car?.brand?.toLowerCase().includes(lowerCaseInput) ||
      car?.model?.toLowerCase().includes(lowerCaseInput) ||
      car?.location?.toLowerCase().includes(lowerCaseInput)
    );
    setDisplayedCars(currentFiltered);
  }, [filteredCars, searchInput]);

  // Load more functionality
  const loadMore = () => {
    setCarsToShow(prev => prev + 6);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title='Available Cars' subtitle='Browse our selection of premium vehicles available for your next adventure' />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 border border-bordercolor focus-within:border-primary/60 rounded-full shadow'>
          <img src={assets.search_icon} alt="" className='w-4.5 h-4 mr-2' />
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            type="text"
            placeholder='Search by make, model, or location'
            className='w-full h-full outline-none text-gray-500'
          />
          <img src={assets.filter_icon} alt="" className='w-4.5 h-4 ml-2' />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className='px-2 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {displayedCars.length} Cars</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {displayedCars.slice(0, carsToShow).map((car,index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{delay: index * 0.1  ,duration: 0.4,  }}
              key={car._id}>
              <CarCards car={car} />
            </motion.div>
          ))}
        </div>

        {displayedCars.length > carsToShow && (
          <div className='text-center mt-8'>
            <button
              onClick={loadMore}
              className='bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors'
            >
              Load More Cars
            </button>
          </div>
        )}

        {displayedCars.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>No cars match your criteria.</p>
            {isSearchData && (
              <p className='text-gray-400 text-sm mt-2'>
                Try adjusting your search dates or location.
              </p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cars;
