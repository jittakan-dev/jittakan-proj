import React, { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = document.documentElement.clientHeight;
      const fullHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = scrollY / fullHeight;
      setScrollPercentage(scrolled * 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-full w-4 fixed left-0 bottom-0 bg-red-700">
      <div
        style={{ height: `${scrollPercentage}%` }}
        className="fixed left-0 bottom-0 w-4 bg-black z-0 transition-height duration-200 ease-out"
      ></div>
    </div>
  );
};

export default ScrollIndicator;
