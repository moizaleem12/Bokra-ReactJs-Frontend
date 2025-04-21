import { Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Login"; 
import Wishlist from "./Pages/Wishlist";
import Track from "./Pages/Track";

const App = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fixed to the left */}
      <div className="w-64 h-full">
        <Sidebar />
      </div>

      {/* Main content scrolls independently */}
      <div className="flex-1 overflow-y-auto p-6 ">
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/track" element={<Track />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
