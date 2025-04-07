import React from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { Pencil, Trash2 } from "lucide-react";

export const HomePost = () => {
  const handleLikeClick = () => {
    alert("Like button clicked");
  };

  const handleCommentClick = () => {
    alert("Comment button clicked");
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}>
          <main className="p-6 flex justify-center items-center min-h-[calc(100vh-6rem)]">
            <div className="bg-[#C69F80] rounded-xl p-6 w-[932px] h-[630px] relative flex flex-col">
              {/* Top row with profile and icons */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8B6F5A]"></div>
                  <span className="text-black font-semibold">Kavishka Perera</span>
                </div>
              </div>
              <br/>
              {/* Description */}
              <p className="text-sm text-black mb-4 leading-5 max-w-[600px]">
                riptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDriptionDescriptionDe<br/>scriptionDescriptionDescriptionDescriptionDescriptionDDescriptionDescriptionD
              </p>
              <br/><br/>
              {/* Image grid - Centered */}
              <div className="flex justify-center gap-6 mb-4">
                <div className="w-[300px] h-[300px] bg-[#E6D4C5] rounded-xl"></div>
                <div className="flex flex-col gap-6">
                  <div className="w-[300px] h-[140px] bg-[#E6D4C5] rounded-xl"></div>
                  <div className="w-[300px] h-[140px] bg-[#E6D4C5] rounded-xl"></div>
                </div>
              </div>

              {/* Like & Comment Section - Right side vertically centered and clickable */}
              <div className="absolute top-1/2 right-15 transform -translate-y-1/2 flex flex-col items-center gap-4 cursor-pointer">
                <div className="flex flex-col items-center" onClick={handleLikeClick}>
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
                      d="M21.752 6.318a5.753 5.753 0 00-9.317-1.618L12 5.06l-.435-.36A5.753 5.753 0 002.248 6.318c-1.272 2.232-.38 5.104 1.523 6.947L12 21.75l8.23-8.485c1.903-1.843 2.795-4.715 1.522-6.947z"
                    />
                  </svg>
                  <span className="text-sm">100</span>
                </div>
                <div className="flex flex-col items-center" onClick={handleCommentClick}>
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
                  <span className="text-sm">80</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
