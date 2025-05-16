import React, { useEffect, useState } from "react";
import progres from "../assets/images/progres.png";

export function LearningProgress() {
  // State for storing learning progress stats
  const [progressStats, setProgressStats] = useState({
    activated: 0,
    completed: 0,
    inProgress: 0,
  });

  // Fetch the learning progress stats from the backend
  useEffect(() => {
    const fetchProgressStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/learning-plans/progress/stats");  // Adjust the API URL if needed
        if (response.ok) {
          const data = await response.json();
          setProgressStats(data);
        } else {
          console.error("Failed to fetch progress stats");
        }
      } catch (error) {
        console.error("Error fetching progress stats:", error);
      }
    };

    fetchProgressStats();
  }, []); // Empty array means it runs only once when the component mounts

  // Destructure stats for easier usage
  const { activated, completed, inProgress } = progressStats;
  const total = activated + completed + inProgress;

  const pieData = [
    { value: activated, color: "#3c1f0d" },
    { value: completed, color: "#5c3c2a" },
    { value: inProgress, color: "#7b5a45" },
  ];

  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent) * 100 + 100;
    const y = Math.sin(2 * Math.PI * percent) * 100 + 100;
    return [x, y];
  };

  const getPieSegments = () => {
    let cumulativePercent = 0;
    return pieData.map((slice, index) => {
      const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
      cumulativePercent += slice.value / total;
      const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
      const largeArcFlag = slice.value / total > 0.5 ? 1 : 0;

      return (
        <path
          key={index}
          d={`M 100 100 L ${startX} ${startY} A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
          fill={slice.color}
        />
      );
    });
  };

  return (
    <div className="bg-[#F0E0D1] rounded-3xl p-10 w-full max-w-5xl relative">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Stats */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#3c1f0d] rounded-lg p-4 text-center text-white">
            <p className="text-sm">Activated plan count</p>
            <p className="text-3xl font-bold">{activated}</p>
          </div>
          <div className="bg-[#5c3c2a] rounded-lg p-4 text-center text-white">
            <p className="text-sm">Completed plan count</p>
            <p className="text-3xl font-bold">{completed}</p>
          </div>
          <div className="bg-[#7b5a45] rounded-lg p-4 text-center text-white">
            <p className="text-sm">InProgress plan count</p>
            <p className="text-3xl font-bold">{inProgress}</p>
          </div>
        </div>

        {/* Pie chart - moved slightly left */}
        <div className="ml-60">
          <svg width="250" height="250" viewBox="0 0 200 200">
            {getPieSegments()}
          </svg>
        </div>
      </div>

      {/* Bottom Illustration - moved slightly up */}
      <div className="absolute right-6 -mt-10 flex gap-6">
        <img src={progres} alt="Chart" className="w-64" />
      </div>
    </div>
  );
}
