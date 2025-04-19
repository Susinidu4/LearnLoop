import React, { useState } from 'react'
import { Header } from '../../components/Header'
import { ProfileHeader } from '../../components/ProfileHeader'
import { TabNavigation } from '../../components/TabNavigation'
import { PostCard } from '../../components/PostCard'
import { SideBar } from '../../components/SideBar'
import GlobalStyle from "../../assets/prototype/GlobalStyle";


export const User_Profile = () => {
  const [activeTab, setActiveTab] = useState('Posts')
  return (
    <div className="flex h-screen w-full bg-[#F7EDE5]">
      <SideBar />
      <div className={`flex flex-col flex-1 overflow-y-auto ${GlobalStyle.fontPoppins}`}>
        <Header />
        <main className="flex-1 bg-[#F7EDE5] p-4 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <ProfileHeader />
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'Posts' && (
              <PostCard
                title="Boost Your Skills : Explore and Learn more coding skills"
                author="Kavishka Perera"
              />
            )}
            {activeTab === 'Learning Plans' && (
              <div className="mt-4 p-6 bg-[#d9c4a3] rounded-lg">
                <p className="text-gray-700">
                  Your learning plans will appear here.
                </p>
              </div>
            )}
            {activeTab === 'Learning Progress' && (
              <div className="mt-4 p-6 bg-[#d9c4a3] rounded-lg">
                <p className="text-gray-700">
                  Your learning progress will appear here.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
