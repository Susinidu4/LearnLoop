import React, { useState } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle";

const postData = [
  {
    id: 1,
    name: "Kavishka Perera",
    description:
      "Description 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 100,
    comments: 80,
  },
  {
    id: 2,
    name: "Sahan Fernando",
    description:
      "Description 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    likes: 245,
    comments: 65,
  },
  {
    id: 3,
    name: "Nadeesha Madushani",
    description:
      "Description 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    likes: 330,
    comments: 120,
  },
];

export const HomePost = () => {
  const [likedStates, setLikedStates] = useState(postData.map(() => false));

  const handleLikeClick = (index) => {
    const updatedLikes = [...likedStates];
    updatedLikes[index] = !updatedLikes[index];
    setLikedStates(updatedLikes);
  };

  const handleCommentClick = () => {
    alert("Comment button clicked");
  };

  return (

    <div className={`${GlobalStyle.countBarSubTopicContainer} pt-20`}>
      {postData.map((post, index) => (
        <div
          key={post.id}
          className={`${GlobalStyle.cardContainer} w-[932px] h-[630px] relative mb-12 p-10`}
        >
          {/* Top row with profile and name */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8B6F5A]"></div>
              <h1 className={GlobalStyle.headingMedium}>{post.name}</h1>
            </div>
          </div>

          {/* Description */}
          <p className={GlobalStyle.paragraph}>{post.description}</p>
          <br />
          <br />

          {/* Image grid */}
          <div className="flex justify-center gap-6 mb-4">
            <div className="w-[400px] h-[400px] bg-[#E6D4C5] rounded-xl"></div>
            <div className="flex flex-col gap-6">
              <div className="w-[300px] h-[185px] bg-[#E6D4C5] rounded-xl"></div>
              <div className="w-[300px] h-[185px] bg-[#E6D4C5] rounded-xl"></div>
            </div>
          </div>

          {/* Like & Comment buttons */}
          <div className="absolute right-4 top-3/4 transform -translate-y-1/2 flex flex-col gap-6 cursor-pointer">
            <div
              className="flex flex-col items-center"
              onClick={() => handleLikeClick(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={likedStates[index] ? "red" : "none"}
                stroke={likedStates[index] ? "none" : "currentColor"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className={`w-8 h-8 transition-all duration-300 ease-in-out ${
                  likedStates[index] ? "scale-125" : "scale-100"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 6.318a5.753 5.753 0 00-9.317-1.618L12 5.06l-.435-.36A5.753 5.753 0 002.248 6.318c-1.272 2.232-.38 5.104 1.523 6.947L12 21.75l8.23-8.485c1.903-1.843 2.795-4.715 1.522-6.947z"
                />
              </svg>
              <span className="text-sm">
                {likedStates[index] ? post.likes + 1 : post.likes}
              </span>
            </div>


            <div
              className="flex flex-col items-center"
              onClick={handleCommentClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l.084-.376a9.016 9.016 0 011.676-3.093A9.015 9.015 0 0112 3.75c4.478 0 8.214 3.29 8.91 7.583.066.4.09.808.09 1.217 0 4.28-3.53 7.75-7.89 7.75a8.09 8.09 0 01-2.939-.557c-.387-.144-.823-.083-1.146.158l-2.178 1.61a.75.75 0 01-1.18-.63v-2.614c0-.292-.115-.572-.318-.78a8.963 8.963 0 01-2.289-4.53L2.25 12z"
                />
              </svg>
              <span className="text-sm">{post.comments}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
