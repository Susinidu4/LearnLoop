import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PrototypeA } from "./assets/prototype/PrototypeA";

//Susinidu
import { Notification } from "./pages/Comments,Likes & Notification Management/Notification";
import { FAQ } from "./pages/Other/FAQ";
import { AboutUs } from "./pages/Other/AboutUs";

//Oshi
import{ AddPost } from "./pages/PostAndInteraction/AddPost"
import{UserViewPost} from "./pages/PostAndInteraction/UserViewPost"
import { HomePost } from "./pages/PostAndInteraction/HomePost";
import { PrivacyPolicy } from "./pages/Other/PrivacyPolicy";
import { User_Login } from "./pages/Profile & Followers Management/User_Login";

//yasindu



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prototypeA" element={<PrototypeA/>} />


        {/* Susinidu */}
        <Route path="/notification" element={<Notification/>}/>
        <Route path="/FAQ" element={<FAQ/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>

        {/* oshi */}
        <Route path="/addpost" element={<AddPost/>}/>
        <Route path="/userviewpost" element={<UserViewPost/>}/>
        <Route path="/homepost" element={<HomePost/>}/>
        <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>

        {/* yasindu */}
        <Route path="/userlogin" element={<User_Login/>}/>
        

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
