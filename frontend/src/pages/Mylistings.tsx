import  { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { FiHome, FiEdit, FiTrash2, FiPlus, FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://stayfinder-juli.onrender.com/api/listings/getUserListings', {
          headers: {
            Authorization: `${token}`
          }
        });
        setListings(response.data.listings);
      } catch (err:any) {
        setError(err.response?.data?.message || 'Failed to fetch listings');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchListings();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`https://stayfinder-juli.onrender.com/api/listings/${id}`, {
        headers: {
          Authorization: `${token}`
        }
      });
      setListings(listings.filter((listing:any) => listing.id !== id));
    } catch (err:any) {
      setError(err.response?.data?.message || 'Failed to delete listing');
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
          <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
          <button
            onClick={() => navigate('/addlisting')}
            className="flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
          >
            <FiPlus className="mr-2" />
            Add New Listing
          </button>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-12">
            <FiHome className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No listings found</h3>
            <p className="text-gray-500 mt-2">You haven't created any listings yet</p>
            <button
              onClick={() => navigate('/addlisting')}
              className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              Create your first listing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing:any) => (
              <div
                key={listing.id}
                onClick={() => navigate(`/listing/${listing.id}/details`)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  {listing.image?.[0] && (
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{listing.title}</h3>
                      <p className="text-gray-600">{listing.location}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      listing.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-lg font-semibold text-rose-600">
                      ${listing.price}<span className="text-gray-500 text-sm"> / night</span>
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/edit-listing/${listing.id}`);
                        }}
                        className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(listing.id);
                        }}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyListings;
