import React from "react";
import DemoPlay from "../components/DemoPlay";
const Intropage = ({ onStart }) => {
  return (
    <div className="pt-24">
      <div className="max-[431px]:w-xs w-sm mx-auto relative max-[431px]:h-28 h-36">
        <h1 className="font-bungee text-shadow text-darkbrown max-[431px]:text-6xl text-7xl absolute">
          HANPAN
        </h1>
        <h1 className="font-bungee text-shadow text-darkbrown max-[431px]:text-6xl text-7xl absolute right-0 bottom-0">
          MATCH
        </h1>
      </div>
      <div className="w-full text-center">
        <button
          onClick={onStart}
          className="font-bungee text-shadow text-orange text-5xl cursor-pointer max-[431px]:mt-24 mt-32"
        >
          START
        </button>
      </div>
      {/* demo card wrap */}
      <DemoPlay />
    </div>
  );
};
export default Intropage;
