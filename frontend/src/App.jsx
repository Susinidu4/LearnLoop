import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PrototypeA } from "./assets/prototype/PrototypeA";
import { Notification } from "./pages/Comments,Likes & Notification Management/Notification";
import { FAQ } from "./pages/Other/FAQ";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prototypeA" element={<PrototypeA/>} />

        {/* Susinidu */}
        <Route path="/notification" element={<Notification/>}/>
        <Route path="/FAQ" element={<FAQ/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
