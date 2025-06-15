import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

function ListingDetailsPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`https://stayfinder-juli.onrender.com/api/listings/details/${id}`, {
          headers: {
            Authorization: `${token}`
          }
        });
        setListing(res.data);
      } catch (err:any) {
        setError(err.response?.data?.message || 'Failed to fetch listing details');
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchDetails();
    }
  }, [id, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">Loading listing details...</p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || "Listing not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">

        {listing.result?.length > 0 && (
  <>
    {/* Listing Info */}
    <h1 className="text-3xl font-bold text-gray-800 mb-4">{listing.result[0].listing.title}</h1>

    {listing.result[0].listing.image && (
      <img
        src={listing.result[0].listing.image}
        alt={listing.result[0].listing.title}
        className="w-full max-h-[400px] object-cover rounded-lg mb-4"
      />
    )}

    <p className="text-gray-600 mb-2">
      <span className="font-semibold">Location:</span> {listing.result[0].listing.location}
    </p>

    <p className="text-gray-600 mb-2">
      <span className="font-semibold">Price:</span> ₹{listing.result[0].listing.price} / night
    </p>

    <p className="text-gray-600  whitespace-pre-line">
      <span className="font-semibold">Description:</span> {listing.result[0].listing.description}
    </p>
  </>
)}


        {/* Booking Info */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bookings</h2>
        {listing.result?.length > 0 ? (
          <ul className="space-y-4">
            {listing.result.map((booking:any, index:any) => (
              <li key={index} className="bg-white border rounded-md p-4 shadow-sm">
                <p className="text-gray-800 font-medium">👤 {booking.user?.name || 'Unknown User'}</p>
                <p className="text-gray-600">📧 {booking.user?.email || 'N/A'}</p>
                <p className="text-gray-600">📅 Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                <p className="text-gray-600">📅 Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No bookings yet for this listing.</p>
        )}
      </div>
    </div>
  );
}

export default ListingDetailsPage;
