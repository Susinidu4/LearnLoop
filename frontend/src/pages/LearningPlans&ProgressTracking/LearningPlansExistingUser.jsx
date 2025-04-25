import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";

const Card = ({ title, description, author, cardData }) => {
  return (
    <Link
      to={{
        pathname: "/LearningPlansSelectExcistingUser", // The route to the detail page
        state: { cardData }, // Passing the card data to the detail page
      }}
    >
      <div className="rounded-2xl overflow-hidden shadow-md bg-[#CFB397]">
        <div className="h-48 bg-[#CFB397]"></div>
        <div className="bg-[#d9d9d9] p-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-sm sm:text-base">{title}</h2>
            <p className="text-xs sm:text-sm text-gray-700 mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#9f7f50]"></div>
            <span className={"text-sm font-semibold text-black"}>{author}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const LeraningPlansExistingUser = () => {
    const data = [
        {
          title: "Boost Your Skills : Explore and Learn more coding skills",
          description: "Boost Your Skills : Explore and Learn more coding skills",
          author: "Kavishka Perera",
        },
        {
          title: "Boost Your Skills : Explore and Learn more coding skills",
          description: "Boost Your Skills : Explore and Learn more coding skills",
          author: "Kavishka Perera",
        },
        {
          title: "Boost Your Skills : Explore and Learn more coding skills",
          description: "Boost Your Skills : Explore and Learn more coding skills",
          author: "Kavishka Perera",
        },
        {
          title: "Boost Your Skills : Explore and Learn more coding skills",
          description: "Boost Your Skills : Explore and Learn more coding skills",
          author: "Kavishka Perera",
        },
        {
          title: "Boost Your Skills : Explore and Learn more coding skills",
          description: "Boost Your Skills : Explore and Learn more coding skills",
          author: "Kavishka Perera",
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
            <div className="flex ">
              <button className={`${GlobalStyle.buttonSecondary} ml-auto`}>
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
                  cardData={item} // Pass the entire card data to the Card component
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
