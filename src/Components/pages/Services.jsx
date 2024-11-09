import { IoInformationCircleOutline } from "react-icons/io5";
import { MdDesignServices } from "react-icons/md";
import { TbMessageChatbotFilled } from "react-icons/tb";
import Navbar from "../Navbar";
import Footer from "./Footer"; // Import the Footer component

const skillsData = [
    {
        name: "Best Price",
        icon: (
            <MdDesignServices className="text-5xl text-black group-hover:text-black duration-300" />
        ),
        link: "#",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, laudantium!",
        aosDelay: "0"
    },
    {
        name: "Quality Service",
        icon: (
            <TbMessageChatbotFilled className="text-5xl text-black group-hover:text-black duration-300" />
        ),
        link: "#",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, laudantium!",
        aosDelay: "0"
    },
    {
        name: "Customer Support",
        icon: (
            <IoInformationCircleOutline className="text-5xl text-black group-hover:text-black duration-500" />
        ),
        link: "#",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, laudantium!",
        aosDelay: "0"
    },
];

const Contact = () => {
    return (
        <div className="py-20 dark:bg-black dark:text-white bg-slate-100 min-h-screen sm:grid">
            <Navbar />
            {/* Container */}
            <div className="container mx-auto px-4">
                <div className="p-1">
                    <h1 className="text-center text-3xl sm:text-4xl font-bold font-serif">Services</h1>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {skillsData.map((skill) => (
                        <div 
                            key={skill.name} 
                            data-aos="fade-up" 
                            data-aos-delay={skill.aosDelay} 
                            className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-yellow hover:bg-white border-2 border-yellow duration-300 text-white hover:text-black rounded-lg"
                        >
                            <div className="grid place-items-center">{skill.icon}</div>
                            <h1 className="mt-2 text-xl font-semibold">{skill.name}</h1>
                            <p className="mt-1">{skill.description}</p>
                            <a href={skill.link} className="mt-2 text-blue-500 underline hover:text-blue-700">Learn More</a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Insert Footer Here */}
            <Footer />
        </div>
    );
};

export default Contact;
