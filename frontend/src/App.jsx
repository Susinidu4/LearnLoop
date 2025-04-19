import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PrototypeA } from "./assets/prototype/PrototypeA";

//Susinidu
import { Notification } from "./pages/Comments,Likes & Notification Management/Notification";
import { FAQ } from "./pages/Other/FAQ";
import { AboutUs } from "./pages/Other/AboutUs";

//Oshi
import { AddPost } from "./pages/PostAndInteraction/AddPost"
import { UserViewPost } from "./pages/PostAndInteraction/UserViewPost"
import { HomePost } from "./pages/PostAndInteraction/HomePost";
import { PrivacyPolicy } from "./pages/Other/PrivacyPolicy";

//Ishara
import { LeraningPlansExistingUser } from"./pages/LearningPlans&ProgressTracking/LearningPlansExistingUser";
import { LearningPlansSelectExcistingUser } from "./pages/LearningPlans&ProgressTracking/LearningPlansSelectExcictingUser";
import { AddLearningPlans } from "./pages/LearningPlans&ProgressTracking/AddLearningPlans";

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

        {/* oshi */}
        <Route path="/addpost" element={<AddPost/>}/>
        <Route path="/userviewpost" element={<UserViewPost/>}/>
        <Route path="/homepost" element={<HomePost/>}/>
        <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>
        
        {/* Ishara */}
        <Route path="/LeaningPlansExistingUser" element={<LeraningPlansExistingUser/>}/>
        <Route path="/LearningPlansSelectExcistingUser" element={<LearningPlansSelectExcistingUser/>}/>
        <Route path="/AddLearningPlans" element={<AddLearningPlans/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
