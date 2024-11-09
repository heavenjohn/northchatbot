import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginForm from './Components/From/Loginform';
import Signupform from "./Components/From/Signupform";
import Home from './Components/Hero/Home';
import NotFound from './Components/Notfound/NotFound'; // Create this component
import About from './Components/pages/About';
import Security from './Components/pages/Security';
import Contact from './Components/pages/Services';
import Chatbot from "../public/chatbot/Chatbot/chatbot"

const App = () => {
  // AOS initialization
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Contact />} />
          <Route path="/security" element={<Security />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path='/signup' element={<Signupform/>}/>
          <Route path="*" element={<NotFound />} /> {/* Catch all unmatched routes */}
          <Route path="/chatbot" element={<Chatbot />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
