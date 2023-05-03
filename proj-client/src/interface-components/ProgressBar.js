import React, { useState, useEffect } from "react";

const ProgressBar = ({
  name,
  code,
  year,
  progress,
  award,
  score,
  height,
  active,
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const bgColors = [
    "#8a2845", //rose 0-20
    "#782585", //fuchsia 20-40
    "#282c82", //sky 40-60
    "#1d1f63", //cyan 60-80
    "#217047", //teal 80-100
    "#20784a", //lime 100
  ];
  const bgcolor = bgColors[Math.floor(progress / 20)] || "rgb(101 163 13)";

  const outerDiv = {
    width: "100%",
    height: height,
  };
  const innerDiv = {
    width: `${currentProgress}%`,
    height: "100%",
    backgroundColor: bgcolor,
  };

  useEffect(() => {
    let intervalId = null;
    if (document.hasFocus() && !active) {
      setCurrentProgress(0);
      clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
      if (currentProgress < progress) {
        setCurrentProgress((prev) => prev + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 18);
    return () => clearInterval(intervalId);
  }, [currentProgress, progress, active]);

  return (
    <React.Fragment>
      <div className="py-4 border-b-3 border-darkLGB">
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-full">
            <div className="">
              {name} ({code})
            </div>
            {award === null ? null : (
              <div className="text-pink-800">Award: {award}</div>
            )}
            <div className="flex flex-row w-full">
              <div className="flex-none">{year}</div>
              <div className="grow"></div>
              <div className="flex-none">
                {progress === 100 ? "Completed" : "Progressing"}
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col w-3/5 relative mt-1 bg-green-background"
          style={outerDiv}
        >
          <div className="flex absolute z-10 p-2 top-0 left-0 right-0 bottom-0 justify-end items-center text-white"></div>
          <div
            className="flex absolute z-0 top-0 left-0 right-0 bottom-0 justify-center items-center"
            style={innerDiv}
          >
            <div className="text-white text-base text-center">{`${currentProgress}%`}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProgressBar;
