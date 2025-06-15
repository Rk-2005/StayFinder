import  { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { FiCalendar, FiCheckCircle, FiXCircle, FiLoader, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

function Mybookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://stayfinder-juli.onrender.com/api/bookings/getallbooking', {
          headers: {
            Authorization: `${token}`
          }
        });
        setBookings(response.data.bookings);
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchBookings();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const cancelBooking = async (bookingId:any) => {
    try {
      await axios.delete(`https://stayfinder-juli.onrender.com/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `${token}`
        }
      });
      
    } catch (err:any) {
      setError(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const getBookingStatus = (startDate:any, endDate:any) => {
    const now = dayjs();
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (now.isBefore(start)) {
      return 'Upcoming';
    } else if (now.isAfter(start) && now.isBefore(end)) {
      return 'Ongoing';
    } else {
      return 'Completed';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <FiLoader className="animate-spin text-rose-600 text-4xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FiCalendar className="mr-2 text-rose-600" />
            My Bookings
          </h1>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <FiCalendar className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No bookings found</h3>
            <p className="text-gray-500 mt-2">You haven't made any bookings yet</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              Browse listings
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking:any) => {
              const status = getBookingStatus(booking.startDate, booking.endDate);
              const listing = booking.listing;

              return (
                <div key={booking._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 h-24 w-24 bg-gray-200 rounded-lg overflow-hidden">
                            {listing?.image ? (
                              <img 
                                src={listing.image} 
                                alt={listing.title} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                                No Image
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">{listing?.title}</h3>
                            <p className="text-gray-600">{listing?.location}</p>
                            <p className="text-gray-500 text-sm mt-1">
                              {dayjs(booking.startDate).format('MMM D, YYYY')} - {dayjs(booking.endDate).format('MMM D, YYYY')}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="flex items-center mb-2">
                          <span className={`px-2 py-1 text-xs rounded-full flex items-center ${
                            status === 'Upcoming' 
                              ? 'bg-blue-100 text-blue-800' 
                              : status === 'Ongoing'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {status === 'Upcoming' && <FiClock className="mr-1" />}
                            {status === 'Ongoing' && <FiLoader className="mr-1 animate-spin" />}
                            {status === 'Completed' && <FiCheckCircle className="mr-1" />}
                            {status}
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-rose-600">
                          ${listing.price}
                          <span className="text-gray-500 text-sm font-normal"> total</span>
                        </p>
                        {status === 'Upcoming' && (
                          <button 
                            onClick={() => cancelBooking(booking._id)}
                            className="mt-3 flex items-center px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <FiXCircle className="mr-1" />
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Mybookings;
