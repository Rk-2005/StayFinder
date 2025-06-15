import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ListingDetails({ msg }: any) {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/bulk/${msg}`);
        setListings(res.data?.results || []);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
      setLoading(false);
    };

    fetchListings();
  }, [msg]);

  return (
    <div className="p-6 pt-15">
      
      {loading ? (
        <div className="text-center text-gray-500">Loading listings...</div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">All Listings</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                onClick={()=>{
                  navigate(`/listing/${listing.id}`)
                }}
                className="bg-white cursor-pointer rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {listing.image ? (
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{listing.title}</h2>
                  <p className="text-gray-600 text-sm mt-1">{listing.location}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {listing.description?.substring(0, 80)}...
                  </p>
                  <p className="mt-2 font-bold text-blue-600">₹{listing.price}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ListingDetails;
