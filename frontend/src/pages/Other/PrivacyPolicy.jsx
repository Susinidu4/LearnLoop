import React from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import settingImage from "../../assets/images/settingimage.png";
import postGirl from "../../assets/images/girl3.png";

export const PrivacyPolicy = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div
          className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}
        >
          {/* Title and Image Row */}
          <div className="pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6 max-w-5xl mx-auto">
              <div className="text-center sm:text-left mb-6 sm:mb-0">
                <h1 className={GlobalStyle.headingLarge}>Privacy Policy</h1>
                <h1 className={`${GlobalStyle.headingSmall} text-gray-400`}>
                  Your privacy is important to us.
                </h1>
              </div>
              <img
                src={settingImage}
                alt="Settings"
                className="w-36 md:w-48 lg:w-60 opacity-80 ml-4"
              />
            </div>
          </div>

          {/* Page Content */}
          <div className="relative">
            <main className="max-w-5xl mx-auto z-20">
              <div className={`${GlobalStyle.cardContainer} w-full`}>
                <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none leading-relaxed">
                  <section className="space-y-4">
                    <h1 className={GlobalStyle.headingMedium}>
                      1. Information We Collect
                    </h1>
                    <p className={`${GlobalStyle.paragraph} pl-4 ml-5`}>
                      <strong>Personal Information:</strong> We collect details
                      such as your name, email address, and profile information
                      to personalize your experience on our platform.
                    </p>
                    <p className={`${GlobalStyle.paragraph} pl-4 ml-5`}>
                      <strong>User Content:</strong> This includes posts,
                      comments, and learning updates you share or interact with.
                    </p>
                    <p className={`${GlobalStyle.paragraph} pl-4 ml-5`}>
                      <strong>Usage Data:</strong> We track interactions with
                      courses, features, and other users to improve our
                      platform.
                    </p>
                    <p className={`${GlobalStyle.paragraph} pl-4 ml-5`}>
                      <strong>Cookies & Tracking:</strong> We use these to
                      enhance your user experience and ensure smooth
                      functionality.
                    </p>
                  </section>
                  <br />

                  <section>
                    <h1 className={GlobalStyle.headingMedium}>
                      2. How We Use Your Information
                    </h1>
                    <p className={`${GlobalStyle.paragraph} ml-9`}>
                      We use your information to improve Learnloop's features,
                      personalize your experience, enable communication between
                      users, enhance engagement, secure the platform, detect
                      fraudulent activities, and troubleshoot any technical
                      issues.
                    </p>
                  </section>
                  <br />

                  <section className="space-y-4 ">
                    <h1 className={GlobalStyle.headingMedium}>
                      3. How We Share Your Information
                    </h1>
                    <p className={`${GlobalStyle.paragraph} pl-4`}>
                      <strong className="ml-5">With consent:</strong> Your data
                      may be shared publicly or with other users only when you
                      give permission.
                    </p>
                    <p className={`${GlobalStyle.paragraph} pl-4`}>
                      <strong className="ml-5">For legal compliance:</strong> We
                      may share data when required by law or to comply with
                      legal obligations.
                    </p>
                    <p className={`${GlobalStyle.paragraph} pl-4`}>
                      <strong className="ml-5">With service providers:</strong>{" "}
                      Trusted third-party vendors help us operate and enhance
                      the Learnloop platform.
                    </p>
                  </section>
                  <br />

                  <section>
                    <h1 className={GlobalStyle.headingMedium}>
                      4. Your Privacy Choices
                    </h1>
                    <p className={`${GlobalStyle.paragraph} ml-9`}>
                      You have full control over your account. You can update or
                      delete your profile at any time, manage notification
                      preferences, and unsubscribe from emails and alerts as
                      needed.
                    </p>
                  </section>
                  <br />

                  <section>
                    <h1 className={GlobalStyle.headingMedium}>
                      5. Data Security
                    </h1>
                    <p className={`${GlobalStyle.paragraph} ml-9`}>
                      We implement strong measures to secure your data. However,
                      no system is 100% secure, so please be cautious when{" "}
                      <br />
                      sharing information publicly.
                    </p>
                  </section>
                  <br />

                  <section>
                    <h1 className={GlobalStyle.headingMedium}>
                      6. Changes to This Policy
                    </h1>
                    <p className={`${GlobalStyle.paragraph} ml-9`}>
                      We may occasionally update this Privacy Policy. Please
                      check back regularly to stay informed of changes.
                    </p>
                  </section>
                  <br />
                </div>
              </div>
            </main>
            {/* Bottom-right image fixed to page corner */}
            <img
              src={postGirl}
              alt="Girl Illustration"
              className="absolute right-0 bottom-0 w-60 md:w-72 lg:w-[28rem] opacity-60 z-10 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
