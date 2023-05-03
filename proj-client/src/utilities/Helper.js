import React, { memo } from "react";

export const ProjectProgress = memo(({ progress, arrow }) => {
  return (
    <div className="flex flex-row w-full h-full items-center justify-center">
      <div className="flex w-fit h-full items-center justify-center text-2xl sx:text-xl smr:text-xl sm:text-1.5xl md:text-1.5xl lg:text-xl xl:text-xl 2xl:text-2xl">
        Progress : <p className="font-semibold">{progress}</p>%
      </div>
    </div>
  );
});
