import React from "react";
import Wave from "../proj-images/wave.png";
function Logo() {
  return (
    <>
      <div className="flex flex-col justify-start items-center w-auto h-full text-darkLGB absolute">
        <div
          className="animate-filling py-3 border-4 border-solid border-gray-900 border-t-0 bg-repeat-x bg-center bg-whiteY mb-6"
          style={{
            backgroundImage: `url(${Wave})`,
            backgroundPositionY: "350px",
          }}
        >
          <div className="flex flex-col justify-center items-center relative h-full p-6 sx:p-3 smr:p-4 sm:p-5 md:p-5 lg:p-6 xl:p-6 2xl:p-6">
            <span className="text-2xl font-semibold">JITTAKAN</span>
            <span className="pt-2 mt-1 text-5xl sx:text-4xl smr:text-5xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl font-bold border-t-4 border-darkLGB">
              PROJ
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
export default Logo;
