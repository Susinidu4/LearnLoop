import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PrototypeA } from "./assets/prototype/PrototypeA";
import { MdAddToPhotos } from "react-icons/md";

//Oshi
import{ AddPost } from "./pages/PostAndInteraction/AddPost"
import{UserViewPost} from "./pages/PostAndInteraction/UserViewPost"
import { HomePost } from "./pages/PostAndInteraction/HomePost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prototypeA" element={<PrototypeA/>} />

        {/* oshi */}
        <Route path="/addpost" element={<AddPost/>}/>
        <Route path="/userviewpost" element={<UserViewPost/>}/>
        <Route path="/homepost" element={<HomePost/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
