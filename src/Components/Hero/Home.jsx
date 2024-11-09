import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo/North_Signal.png";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/pages/Footer"; // Importing the Footer component

const Hero = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true, // Animation will happen only once
    });
  }, []);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page (ensure this matches your route)
  };

  return (
    <div className="dark:bg-black dark:text-white duration-300 relative z-20 flex flex-col min-h-screen"> {/* Set to flex column to fit footer */}
      <Navbar />
      <div className="container flex-grow flex"> {/* Use flex-grow to take remaining space */}
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2">
          {/* Image Section with AOS Animation */}
          <div 
            data-aos="slide-left" 
            className="order-1 sm:order-2 flex justify-center"
          >
            <img
              src={logo}
              alt="North Signal Logo"
              className="relative -z-10 max-h-[400px] w-full object-contain drop-shadow-[2px_20px_6px_rgba(0, 0, 0, 0.5)]"
            />
          </div>

          {/* Text Section */}
          <div className="order-2 sm:order-1 flex flex-col justify-center space-y-5 sm:pr-32">
            <p data-aos="fade-up" className="text-primary text-2xl font-serif">WELCOME TO THE</p>
            <h1 data-aos="fade-up" data-aos-delay="600" className="text-5xl lg:text-7xl font-semibold font-serif">North Signal</h1>
            <p data-aos="fade-up" data-aos-delay="1000" className="mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel sequi est inventore architecto eligendi enim officiis, eaque iure itaque eius error fugit eveniet magnam numquam.
            </p>
            <div className="flex items-center">
              <button 
                onClick={handleLoginClick}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded dark:bg-red-600 dark:hover:bg-red-800 transition-all duration-300"
                aria-label="Go to Login Page"
              >
                Online Service
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* Insert Footer here */}
    </div>
  );
};

export default Hero;
