import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import List from "./pages/List/List";
import Hotel from "./pages/Hotel/Hotel";
import Login from "./pages/Login/Login";
import Register from "./pages/register/Register";
import RegisterHotel from "./pages/register hotel/RegisterHotel";
import Page404 from "./pages/404/Page404";
import Success from "./pages/success/Success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerHotel" element={<RegisterHotel />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
