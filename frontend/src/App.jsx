import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PrototypeA } from "./assets/prototype/PrototypeA";
import { MdAddToPhotos } from "react-icons/md";

// oshini
import { AddPost } from "./pages/PostAndInteraction/AddPost";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prototypeA" element={<PrototypeA/>} />

         {/* oshini */}
        <Route path="/addpost" element={<AddPost/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
