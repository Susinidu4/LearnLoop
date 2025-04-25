import React from 'react'
import { PencilIcon } from 'lucide-react'
import yasindu from '../assets/images/yasindu.jpg'
export function ProfileHeader() {
  return (
    <div className="mb-6 py-28">
      {/* Cover image */}
      <div className="h-48 bg-[#d9c4a3] rounded-lg mb-16 relative">
        {/* Profile image */}
        <div className="absolute -bottom-14 left-12">
          <div className="w-28 h-28 rounded-full border-4 border-[#c19e67] overflow-hidden">
            <img
              src={yasindu}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Edit button */}
        <button className="absolute bottom-4 right-4 bg-[#c19e67] p-2 rounded-full">
          <PencilIcon size={20} color="white" />
        </button>
      </div>
      {/* Profile stats */}
      <div className="flex justify-center space-x-8 mb-6">
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mb-1">
            <span className="font-bold">12</span>
          </div>
          <span className="text-sm">Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mb-1">
            <span className="font-bold">12</span>
          </div>
          <span className="text-sm">Posts</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mb-1">
            <span className="font-bold">12</span>
          </div>
          <span className="text-sm">Likes</span>
        </div>
      </div>
      {/* Profile info */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Yasindu Pasanjith</h1>
        <p className="text-gray-600">Developer</p>
      </div>
    </div>
  )
}
