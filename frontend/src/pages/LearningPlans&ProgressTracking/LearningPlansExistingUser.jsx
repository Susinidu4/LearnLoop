import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Added useNavigate
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";

// Card Component
const Card = ({ title, description, author, cardData }) => {
  return (
    <Link
      to={{
        pathname: "/LearningPlansSelectExcistingUser", // Route to detail page
        state: { cardData }, // Pass card data
      }}
    >
      <div className="rounded-2xl overflow-hidden shadow-md bg-[#CFB397]">
        <div className="h-48 bg-[#CFB397]"></div>
        <div className="bg-[#d9d9d9] p-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-sm sm:text-base">{title}</h2>
            <p className="text-xs sm:text-sm text-gray-700 mt-1">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#9f7f50]"></div>
            <span className="text-sm font-semibold text-black">{author}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Main Component
export const LeraningPlansExistingUser = () => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate("/AddLearningPlans"); 
  };

  const data = [
    {
      title: "Boost Your Skills : Explore and Learn more coding skills",
      description: "Boost Your Skills : Explore and Learn more coding skills",
      author: "Kavishka Perera",
    },
    {
      title: "Master Frontend Frameworks",
      description: "React, Angular, and Vue – pick your path",
      author: "Nimashi Silva",
    },
    {
      title: "Backend Magic: From Node to Spring Boot",
      description: "Dive deep into server-side development",
      author: "Sahan Dias",
    },
    {
      title: "Data Science Journey",
      description: "Learn Python, Pandas, and machine learning basics",
      author: "Tharushi Fernando",
    },
    {
      title: "UI/UX Design Fundamentals",
      description: "Design thinking and prototyping tools",
      author: "Pasindu Weerasinghe",
    },
  ];

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div
          className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}
        >
          <main className="p-6">
            <div className="flex">
              <button
                onClick={handleClick}
                className={`${GlobalStyle.buttonSecondary} ml-auto`}
              >
                Add a learning Plan
              </button>
            </div>

            <div className="flex flex-col gap-8 max-w-4xl mx-auto mt-8">
              {data.map((item, index) => (
                <Card
                  key={index}
                  title={item.title}
                  description={item.description}
                  author={item.author}
                  cardData={item}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
