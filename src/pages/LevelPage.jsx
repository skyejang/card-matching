import React from "react";
const LevelPage = () => {
  return (
    <div className="pt-4">
      <div className="w-sm mx-auto relative h-30">
        <h1 className="font-bungee text-shadow text-darkbrown text-6xl absolute">
          HANPAN
        </h1>
        <h1 className="font-bungee text-shadow text-darkbrown text-6xl absolute right-0 bottom-0">
          MATCH
        </h1>
      </div>
      <div className="w-md mx-auto mt-12">
        <span className="font-roboto text-darkbrown text-2xl font-medium">
          Level
        </span>
        <div className="mt-4">
          <button className="font-bungee text-4xl text-shadow cursor-pointer text-orange">
            EASY
          </button>
          <button className="font-bungee text-4xl text-shadow cursor-pointer text-gray ml-8">
            NORMAL
          </button>
          <button className="font-bungee text-4xl text-shadow cursor-pointer text-gray ml-8">
            EASY
          </button>
        </div>
        <div className="w-md mx-auto mt-8">
          <span className="font-roboto text-darkbrown text-2xl font-medium">
            Name
          </span>
          <div className="mt-4">
            <input
              className="bg-white border-darkbrown border-1 rounded-md p-2 w-full focus:outline-0"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="w-full text-center mt-6">
        <button className="font-bungee text-shadow text-orange text-5xl cursor-pointer">
          NEXT
        </button>
      </div>
      {/* demo card wrap */}
      <div className="w-[424px] h-[208px] bg-amber-400 fixed bottom-0 left-1/2 -translate-x-1/2"></div>
    </div>
  );
};
export default LevelPage;
