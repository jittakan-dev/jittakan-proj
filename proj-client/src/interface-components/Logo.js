import React from "react";
import Wave from "../proj-images/wave.png";
function Logo() {
  return (
    <>
      <div className="logo flex flex-col justify-start items-center w-full h-full text-darkLGB border-4 sx:border-3 smr:border-3 sm:border-4 md:border-4 lg:border-4 xl:border-4 2xl:border-4  border-t-0 sx:border-t-0 smr:border-t-0 sm:border-t-0 md:border-t-0 lg:border-t-0 xl:border-t-0 2xl:border-t-0 border-solid border-gray-900">
        <div
          className="animate-filling py-3  border-t-0 bg-repeat-x bg-center"
          style={{
            backgroundImage: `url(${Wave})`,
            backgroundPositionY: "350px",
          }}
        >
          <div className="flex flex-col justify-center items-center relative h-full p-6 sx:p-3 smr:p-4 sm:p-5 md:p-5 lg:p-6 xl:p-6 2xl:p-6">
            <span className="text-xl font-semibold">JITTAKAN !</span>
            <span className="font-Mulish font-extrabold pt-1 sx:pt-3 smr:pt-2 sm:pt-2 md:pt-2 lg:pt-2 xl:pt-1 2xl:pt-1 mt-1 text-6xl sx:text-5xl smr:text-5xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl border-t-4 border-darkLGB">
              ProJ
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
export default Logo;
