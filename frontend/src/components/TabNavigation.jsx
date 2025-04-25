import React from 'react';
import PropTypes from 'prop-types';

export function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = ['Posts', 'Learning Plans', 'Learning Progress'];
  
  return (
    <div className="border-b border-gray-300 mb-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 px-1 ${
              activeTab === tab 
                ? 'border-b-2 border-[#3a2a15] font-medium' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

TabNavigation.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};