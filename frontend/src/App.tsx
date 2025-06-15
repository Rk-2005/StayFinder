import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddListings from "./pages/AddListings";
import ListingDetails from "./pages/ListingDetails";
import SingleListing from "./pages/SingleListing";
import Mylistings from "./pages/Mylistings";
import Mybookings from "./pages/Mybookings";
import ListingDetailsPage from "./pages/ListingDetailsPage";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Register/>}></Route>
        <Route path="/addlisting" element={<AddListings/>}></Route>
        <Route path="/getlistings" element={<ListingDetails/>}></Route>
        <Route path="/listing/:id" element={<SingleListing />} />
        <Route path="/my-listings" element={<Mylistings/>}></Route>
        <Route path="/my-bookings" element={<Mybookings/>}></Route>
        <Route path="/listing/:id/details" element={<ListingDetailsPage />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
