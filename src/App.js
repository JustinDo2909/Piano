import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/dashboard";
import Customer from "./Pages/customer";
import Artist from "./Pages/artist";
import Profile from "./Pages/profile";
import TypeMusic from "./Pages/TypeMusic";
import Compose from "./Pages/compose";
import LayOut from "./Pages/layout/Layout";
import MyAlbum from "./Pages/album";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route element={<LayOut />}>
            <Route path="/" element={<Home />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="Customer" element={<Customer />} />
            <Route path="Artist" element={<Artist />} />
            <Route path="MyAlbum" element={<MyAlbum />} />
            <Route path="TypeMusic" element={<TypeMusic />} />
            <Route path="Compose" element={<Compose />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
