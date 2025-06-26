import React, { useState } from "react";
import DemoPlay from "../components/DemoPlay";
const LevelPage = ({ onSubmit }) => {
  const [level, setLevel] = useState("easy");
  const [name, setName] = useState("");
  const [warning, setWaring] = useState(false);

  //send user name to app.jsx(parent component)
  const submitHandler = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("You should input your name");
      setWaring(true);
      return;
    }
    onSubmit(level, name.toUpperCase());
  };
  return (
    <div className="pt-4 max-[431px]:pt-8">
      <div className="max-[431px]:w-xs w-sm mx-auto relative max-[431px]:h-24 h-30">
        <h1 className="font-bungee text-shadow text-darkbrown max-[431px]:text-5xl text-6xl absolute">
          HANPAN
        </h1>
        <h1 className="font-bungee text-shadow text-darkbrown max-[431px]:text-5xl text-6xl absolute right-0 bottom-0">
          MATCH
        </h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className="w-full max-[431px]:px-3 mx-auto mt-12">
          <span className="font-roboto text-darkbrown text-2xl font-medium">
            Level
          </span>
          <div className="w-full mt-4 flex justify-around">
            <button
              type="button"
              onClick={() => setLevel("easy")}
              className={`font-bungee max-[431px]:text-3xl text-4xl text-shadow cursor-pointer ${
                level === "easy" ? "text-orange" : "text-gray"
              }`}
            >
              EASY
            </button>
            <button
              type="button"
              onClick={() => setLevel("normal")}
              className={`font-bungee max-[431px]:text-3xl text-4xl text-shadow cursor-pointer ${
                level === "normal" ? "text-orange" : "text-gray"
              }`}
            >
              NORMAL
            </button>
            <button
              type="button"
              onClick={() => setLevel("hard")}
              className={`font-bungee max-[431px]:text-3xl text-4xl text-shadow cursor-pointer ${
                level === "hard" ? "text-orange" : "text-gray"
              }`}
            >
              HARD
            </button>
          </div>
          <div className="w-full mt-8">
            <span className="font-roboto text-darkbrown text-2xl font-medium">
              Name
            </span>
            <div className="mt-4">
              <input
                className={`bg-white ${
                  warning ? "border-red-600" : "border-darkbrown"
                } border-1 rounded-md p-2 w-full focus:outline-0`}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {warning && (
                <p className="text-red-600 text-sm">Type your name.</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full text-center mt-6">
          <button
            type="submit"
            className="font-bungee text-shadow text-orange max-[431px]:text-4xl text-5xl cursor-pointer"
          >
            NEXT
          </button>
        </div>
      </form>

      {/* demo card wrap */}
      <DemoPlay />
    </div>
  );
};
export default LevelPage;
