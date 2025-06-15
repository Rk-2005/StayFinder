import  { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FiHome, FiMapPin, FiDollarSign, FiUpload, FiPlusCircle } from "react-icons/fi";

function AddListings() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    if (!image) {
      setMessage({ text: "Please select an image", type: "error" });
      setIsSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("price", formData.price);
      data.append("image", image);

      const token = localStorage.getItem("token");
      if (!token) {
        setMessage({ text: "You need to login first", type: "error" });
        setIsSubmitting(false);
        return;
      }

        await axios.post("https://stayfinder-juli.onrender.com/api/listings", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      });

      setMessage({ 
        text: "Listing added successfully!", 
        type: "success" 
      });
      setFormData({ title: "", description: "", location: "", price: "" });
      setImage(null);
      setPreview("");
    } catch (error) {
      console.error(error);
      setMessage({ 
        text: "Failed to add listing", 
        type: "error" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
              <FiPlusCircle className="mr-2 text-rose-600" />
              Add New Listing
            </h2>
            <p className="text-gray-600 mt-2">
              Fill in the details of your property to list it on StayFinder
            </p>
          </div>

          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === "success" 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
                <div className="space-y-1 text-center">
                  {preview ? (
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="mx-auto h-48 w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 mt-2">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-rose-600 hover:text-rose-500 focus-within:outline-none">
                          <span>Upload an image</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                            className="sr-only" 
                            required 
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiHome className="mr-2 text-gray-500" />
                Property Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Beautiful Beachfront Villa"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Describe your property in detail..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiMapPin className="mr-2 text-gray-500" />
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="City, Country"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiDollarSign className="mr-2 text-gray-500" />
                Price per night (₹)
              </label>
              <input
                type="number"
                name="price"
                placeholder="2000"
                value={formData.price}
                onChange={handleChange}
                min="1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                  isSubmitting ? 'bg-rose-400' : 'bg-rose-600 hover:bg-rose-700'
                } transition-colors flex justify-center items-center`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Submit Listing'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddListings;