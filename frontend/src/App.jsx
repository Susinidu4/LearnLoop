import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PrototypeA } from "./assets/prototype/PrototypeA";
import '@fontsource/poppins'; 

//Susinidu
import { Notification } from "./pages/Comments,Likes & Notification Management/Notification";
import { FAQ } from "./pages/Other/FAQ";
import { AboutUs } from "./pages/Other/AboutUs";
import { PostDetailPage } from "./pages/PostAndInteraction/PostDetailPage"; 

//Oshi
import { AddPost } from "./pages/PostAndInteraction/AddPost"
import { HomePost } from "./pages/PostAndInteraction/HomePost";
import { PrivacyPolicy } from "./pages/Other/PrivacyPolicy";

//Ishara
import { LeraningPlansExistingUser } from"./pages/LearningPlans&ProgressTracking/LearningPlansExistingUser";
import { LearningPlansSelectExcistingUser } from "./pages/LearningPlans&ProgressTracking/LearningPlansSelectExcictingUser";
import { AddLearningPlans } from "./pages/LearningPlans&ProgressTracking/AddLearningPlans";
import { Explore } from "./pages/Other/Explore";

//yasindu
import { User_Login } from "./pages/Profile & Followers Management/User_Login";
import { User_Register } from "./pages/Profile & Followers Management/User_Register";
import { User_Profile } from "./pages/Profile & Followers Management/User_Profile";

import { HomeSignOut } from "./pages/HomeSignOut";
import { UsersPage } from "./pages/Profile & Followers Management/UsersPage";
import { PostsGallery } from "./pages/Other/PostsGallery";
import { MyFollowers } from "./pages/Profile & Followers Management/MyFollowers";
import { MyFollowings } from "./pages/Profile & Followers Management/MyFollowings";
import { UserUpdatePage } from "./pages/Profile & Followers Management/UserUpdatePage";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prototypeA" element={<PrototypeA/>} />

        {/* Susinidu */}
        <Route path="/notification" element={<Notification/>}/>
        <Route path="/FAQ" element={<FAQ/>}/>
        <Route path="/aboutUs" element={<AboutUs/>}/>
        <Route path="/postdetails/:postId" element={<PostDetailPage />} />

        {/* oshini */}
        <Route path="/addpost" element={<AddPost/>}/>
        <Route path="/homepost" element={<HomePost/>}/>
        <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>  
        <Route path="/homesignout" element={<HomeSignOut/>}/>  

        {/* yasindu */}
        <Route path="/userlogin" element={<User_Login/>}/>
        <Route path="/userregister" element={<User_Register/>}/>
        <Route path="/userprofile" element={<User_Profile/>}/>
        <Route path="/users" element={<UsersPage/>}/>
        <Route path="/posts" element={<PostsGallery/>}/>
        <Route path="/myfollowers" element={<MyFollowers/>}/>
        <Route path="/myfollowings" element={<MyFollowings/>}/>
        <Route path="/updateuser" element={<UserUpdatePage/>}/>
        
        {/* Ishara */}
        <Route path="/LeaningPlansExistingUser" element={<LeraningPlansExistingUser/>}/>
        <Route path="/LearningPlansSelectExcistingUser/:userId" element={<LearningPlansSelectExcistingUser/>}/>
        <Route path="/AddLearningPlans" element={<AddLearningPlans/>}/>
        <Route path="/Explore" element={<Explore/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
