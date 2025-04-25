import React from 'react'
import { PencilIcon, TrashIcon } from 'lucide-react'

export function PostCard({ title, author }) {
  return (
    <div className="mb-6 bg-[#d9c4a3] rounded-lg overflow-hidden">
      <div className="h-48 bg-[#d9c4a3]"></div>
      <div className="p-4 flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-gray-700">{title}</p>
        </div>
        <div className="flex space-x-2">
          <button className="p-1 hover:bg-[#c19e67] rounded">
            <PencilIcon size={18} />
          </button>
          <button className="p-1 hover:bg-[#c19e67] rounded">
            <TrashIcon size={18} />
          </button>
        </div>
      </div>
      <div className="px-4 pb-4 flex items-center justify-between">
        <div className="text-sm">{author}</div>
        <div className="w-8 h-8 bg-[#c19e67] rounded-full"></div>
      </div>
    </div>
  )
}
