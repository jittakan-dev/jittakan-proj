import React from "react";
import Wave from "../proj-images/wave.png";
function Logo() {
  return (
    <div className="flex flex-col justify-start items-center w-auto h-full text-darkLGB absolute">
      <div
        className="animate-filling py-3 border-4 border-gray-900 border-t-0 bg-repeat-x bg-center bg-whiteG mb-6"
        style={{
          backgroundImage: `url(${Wave})`,
          backgroundPositionY: "350px",
        }}
      >
        <div className="flex flex-col justify-center items-center relative h-full p-6 sx:p-3 smr:p-4 sm:p-5 md:p-5 lg:p-6 xl:p-6 2xl:p-6">
          <span className="w-full pl-1 text-xl sx:text-lg smr:text-lg sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-xl font-semibold">
            JITTAKAN
          </span>
          <span className="pt-1 mt-2 text-5xl sx:text-5xl smr:text-5xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl font-bold border-t-4 border-darkLGB">
            ProJ
          </span>
        </div>
      </div>
    </div>
  );
}
export default Logo;
