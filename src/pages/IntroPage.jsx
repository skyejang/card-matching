import React from "react";
import DemoPlay from "../components/DemoPlay";
const Intropage = ({ onStart }) => {
  return (
    <div className="pt-12">
      <div className="w-sm mx-auto relative h-36">
        <h1 className="font-bungee text-shadow text-darkbrown text-7xl absolute">
          HANPAN
        </h1>
        <h1 className="font-bungee text-shadow text-darkbrown text-7xl absolute right-0 bottom-0">
          MATCH
        </h1>
      </div>
      <div className="w-full text-center">
        <button
          onClick={onStart}
          className="font-bungee text-shadow text-orange text-5xl cursor-pointer mt-32"
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
