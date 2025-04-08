import React from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import aboutImg1 from "../../assets/images/aboutImg1.png";
import aboutImg2 from "../../assets/images/aboutImg2.png";
import aboutImg3 from "../../assets/images/aboutImg3.png";
import aboutImg4 from "../../assets/images/aboutImg4.png";

export const AboutUs = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div
          className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}
        >
          <main className="p-6">
            <div className="flex items-center justify-center mb-8 gap-4 flex-wrap ">
              <div>
                <h1 className={`${GlobalStyle.headingLarge}`}>About Us</h1>
                <p className={`${GlobalStyle.headingSmall} text-gray-400`}>
                  Empowering minds, sharing skills—because learning never stops
                </p>
              </div>
              <img
                src={aboutImg1}
                alt="Celebrating Character"
                className="w-80 h-auto"
              />
            </div>

            <div className="flex flex-col gap-4 items-center">
              <div className="flex items-center gap-8 justify-center">
                <img
                  src={aboutImg2}
                  alt="Character 1"
                  className="w-70 h-auto"
                />
                <div className={GlobalStyle.cardContainer}>
                  <p className={GlobalStyle.paragraph} style={{ textAlign: 'center' }}>
                    Welcome to LearnLoop, where learning never stops! We believe
                    that knowledge grows best when shared, and our platform is
                    built to connect learners, mentors, and enthusiasts in a
                    dynamic and engaging environment. Whether you're here to
                    explore a new passion or refine your skills, LearnLoop
                    provides the perfect space to learn, teach, and grow
                    together.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-center">
                <div className={GlobalStyle.cardContainer}>
                  <p className={GlobalStyle.paragraph} style={{ textAlign: 'center' }}>
                    Our platform offers structured learning plans in cooking,
                    coding, photography, DIY crafts, and many more areas of
                    interest. Anyone can share their progress, post updates, and
                    inspire others. Plus, you can follow your friends, engage
                    with mentors, and build a network that supports your
                    journey.
                  </p>
                </div>
                <img
                  src={aboutImg3}
                  alt="Speaker Character"
                  className="w-70 h-auto order-3"
                />
              </div>

              <div className="flex items-center gap-4 justify-center">
                <img
                  src={aboutImg4}
                  alt="Celebrating Character"
                  className="w-70 h-auto"
                />
                <div className={GlobalStyle.cardContainer}>
                  <p className={GlobalStyle.paragraph} style={{ textAlign: 'center' }}>
                    At LearnLoop, we turn learning into a shared adventure. No
                    matter where you are on your path, there's always a new
                    skill to master and a community to cheer you on. Let's
                    learn, share, and grow—together! 🎓
                  </p>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};
