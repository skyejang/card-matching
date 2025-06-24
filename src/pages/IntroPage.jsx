import React from "react";
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
      <div className="w-[424px] h-[208px] bg-amber-400 fixed bottom-0 left-1/2 -translate-x-1/2"></div>
    </div>
  );
};
export default Intropage;
