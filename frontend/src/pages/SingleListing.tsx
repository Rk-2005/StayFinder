import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { FiStar, FiMapPin, FiHome, FiCheckCircle } from 'react-icons/fi';
import dayjs from 'dayjs';

function SingleListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingDates, setBookingDates] = useState({
    startDate: '',
    endDate: ''
  });
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/listings/${id}`);
        setListing(res.data.GetallListings[0]);
      } catch (err) {
        setError('Failed to fetch listing details');
        console.error("Error fetching listing:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const handleBookNow = async () => {
    if (!bookingDates.startDate || !bookingDates.endDate) {
      setError('Please select both start and end dates');
      return;
    }
    

    try {
      setIsBooking(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

       await axios.post(
        `http://localhost:3000/api/bookings`,
        {
          listingId: id,
          checkIn: bookingDates.startDate,
          checkOut: bookingDates.endDate
        },
        {
          headers: {
            Authorization: `${token}`
          }
        }
      );

      setBookingSuccess(true);
      setTimeout(() => {
        navigate('/my-bookings');
      }, 2000);
    } catch (err:any) {
      setError(err.response?.data?.message || 'Failed to create booking');
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-12 w-12"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Listing not found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
          >
            Browse other listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Main Image */}
          <div className="relative h-96 w-full">
            {listing.image ? (
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                <FiHome className="text-4xl" />
              </div>
            )}
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Listing Details */}
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
              
              <div className="flex items-center mb-4">
                <FiStar className="text-amber-400 mr-1" />
                <span className="text-gray-700 font-medium">{listing.rating || 'New'}</span>
                <span className="mx-2 text-gray-400">•</span>
                <FiMapPin className="text-gray-500 mr-1" />
                <span className="text-gray-700">{listing.location}</span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <FiHome className="mr-2 text-rose-600" />
                  About this place
                </h3>
                <p className="text-gray-700">{listing.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-500 mb-1">Type</h4>
                  <p className="font-medium">{listing.type || 'Entire place'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-500 mb-1">Guests</h4>
                  <p className="font-medium">{listing.guestCount || 2} guests</p>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="border border-gray-200 rounded-xl p-6 h-fit sticky top-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{listing.price}
                    <span className="text-base font-normal text-gray-500"> / night</span>
                  </p>
                </div>
                {listing.rating && (
                  <div className="flex items-center">
                    <FiStar className="text-amber-400 mr-1" />
                    <span>{listing.rating}</span>
                  </div>
                )}
              </div>

              {bookingSuccess ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-4 flex items-center">
                  <FiCheckCircle className="mr-2 text-green-600" />
                  Booking confirmed! Redirecting...
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                        <input
                          type="date"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={bookingDates.startDate}
                          onChange={(e) => setBookingDates({...bookingDates, startDate: e.target.value})}
                          min={dayjs().format('YYYY-MM-DD')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                        <input
                          type="date"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={bookingDates.endDate}
                          onChange={(e) => setBookingDates({...bookingDates, endDate: e.target.value})}
                          min={bookingDates.startDate || dayjs().format('YYYY-MM-DD')}
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleBookNow}
                    disabled={isBooking}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white ${isBooking ? 'bg-rose-400' : 'bg-rose-600 hover:bg-rose-700'} transition-colors flex justify-center items-center`}
                  >
                    {isBooking ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Book Now'
                    )}
                  </button>

                  <div className="mt-4 text-center text-sm text-gray-500">
                    You won't be charged yet
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleListing;