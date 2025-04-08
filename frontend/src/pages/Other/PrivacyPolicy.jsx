import React from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import settingImage from "../../assets/images/settingimage.png";
import postGirl from "../../assets/images/girl3.png";

export const PrivacyPolicy = () => {
  return (
    <div className="flex relative bg-[#fefaf8]">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div className={`${GlobalStyle.fontPoppins} min-h-screen pt-24 relative overflow-hidden px-4 sm:px-8`}>

          {/* Title and Image Row */}
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6 max-w-5xl mx-auto">
              <div className="text-center sm:text-left mb-6 sm:mb-0">
                <h1 className={GlobalStyle.headingLarge}>Privacy Policy</h1>
                <h1 className={GlobalStyle.headingSmall}>Your privacy is important to us.</h1>
              </div>
              <img
                src={settingImage}
                alt="Settings"
                className="w-36 md:w-48 lg:w-60 opacity-80 ml-4"
              />
            </div>
          </div>

          {/* Page Content */}
          <main className="relative z-10 max-w-5xl mx-auto">
            <div className="bg-[#CFB397] p-6 sm:p-10 rounded-2xl shadow-lg text-gray-700 relative z-20 transition-all duration-300 ease-in-out mx-auto mb-6">
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-[#5c5c5c] leading-relaxed">
                <section>
                  <h1 className={GlobalStyle.headingMedium}>1. Information We Collect</h1>
                  <p className={GlobalStyle.paragraph}><strong>Personal Information:</strong> We collect details such as your name, email address, and profile information to personalize your experience on our platform.</p>
                  <p className={GlobalStyle.paragraph}><strong>User Content:</strong> This includes posts, comments, and learning updates you share or interact with.</p>
                  <p className={GlobalStyle.paragraph}><strong>Usage Data:</strong> We track interactions with courses, features, and other users to improve our platform.</p>
                  <p className={GlobalStyle.paragraph}><strong>Cookies & Tracking:</strong> We use these to enhance your user experience and ensure smooth functionality.</p>
                </section>

                <section>
                  <h1 className={GlobalStyle.headingMedium}>2. How We Use Your Information</h1>
                  <p className={GlobalStyle.paragraph}>We use your information to improve Learnloop's features, personalize your experience, enable communication between users, enhance engagement, secure the platform, detect fraudulent activities, and troubleshoot any technical issues.</p>
                </section>

                <section>
                  <h1 className={GlobalStyle.headingMedium}>3. How We Share Your Information</h1>
                  <p className={GlobalStyle.paragraph}><strong>With consent:</strong> Your data may be shared publicly or with other users only when you give permission.</p>
                  <p className={GlobalStyle.paragraph}><strong>For legal compliance:</strong> We may share data when required by law or to comply with legal obligations.</p>
                  <p className={GlobalStyle.paragraph}><strong>With service providers:</strong> Trusted third-party vendors help us operate and enhance the Learnloop platform.</p>
                </section>

                <section>
                  <h1 className={GlobalStyle.headingMedium}>4. Your Privacy Choices</h1>
                  <p className={GlobalStyle.paragraph}>You have full control over your account. You can update or delete your profile at any time, manage notification preferences, and unsubscribe from emails and alerts as needed.</p>
                </section>

                <section>
                  <h1 className={GlobalStyle.headingMedium}>5. Data Security</h1>
                  <p className={GlobalStyle.paragraph}>
                    We implement strong measures to secure your data. However, no system is 100% secure, so please be cautious when sharing information publicly.
                  </p>
                </section>

                <section>
                  <h1 className={GlobalStyle.headingMedium}>6. Changes to This Policy</h1>
                  <p className={GlobalStyle.paragraph}>
                    We may occasionally update this Privacy Policy. Please check back regularly to stay informed of changes.
                  </p>
                </section>
              </div>
            </div>
          </main>
        </div>

        {/* Bottom-right girl image with increased size */}
        <img
          src={postGirl}
          alt="Girl Illustration"
          className="absolute bottom-0 right-0 w-80 md:w-96 lg:w-[30rem] z-30 opacity-90"
          style={{ marginRight: '20px' }}
        />
      </div>
    </div>
  );
};
