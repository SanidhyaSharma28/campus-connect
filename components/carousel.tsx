// components/CustomCarousel.tsx
import React, { useState, useEffect } from 'react';

const CustomCarousel = () => {
  const items = [
    {
      url: "/Discover_Path.jpg",
      title: "Discover Your Path",
      desc: "Explore resources and tools tailored to help you land your dream job!"
    },
    {
      url: "/alumni-connect.jpg",
      title: "Alumni Connect",
      desc: "Strengthening ties, sharing experiences, and building networks!"
    },
    {
      url: "/success-stories.jpg",
      title: "Success Stories",
      desc: "Real journeys from campus to career—be inspired by your peers!"
    },
    {
      url: "/placement-update.jpg",
      title: "Placement Update",
      desc: "Stay updated with the latest placement news to enhance your career journey!"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${(currentIndex * 100) / 3}%)`
        }}
      >
        {/* Show three items at a time with duplicates for seamless looping */}
        {[...items.slice(-2), ...items, ...items.slice(0, 2)].map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-1/3 mx-1 bg-white rounded-lg shadow-lg overflow-hidden p-1"
          >
            <img
              src={item.url}
              alt={item.title}
              className="h-48 w-full object-contain" // Keep image fitting
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-1 text-black">{item.title}</h2>
              <div className="text-gray-700 w-full px-[135px] ">{item.desc}</div> {/* Ensure full width for the description */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;
