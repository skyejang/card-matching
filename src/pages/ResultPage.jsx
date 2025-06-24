import React from "react";
import ResultRow from "../components/ResultRow";
import { AnimatePresence } from "framer-motion";
const ResultPage = ({ playerName, playerTime, onBackToStart }) => {
  //get rankings and sort by time
  const getRankings = () => {
    const data = JSON.parse(localStorage.getItem("rankings") || "[]");
    return data
      .sort((a, b) => a.time - b.time)
      .map((item, index) => ({ ...item, rank: index + 1 }));
  };
  const rankings = getRankings();
  //find current player
  const currentPlayer = rankings.find(
    (r) => r.name === playerName && r.time === playerTime
  );
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
      <div className="w-sm mt-12 mx-auto">
        <div className="w-full h-fit bg-white rounded-lg border-2 border-darkbrown p-4">
          {/* title */}
          <div className="w-full flex">
            <p className="font-roboto text-darkbrown text-lg text-center flex-1/4">
              Rank
            </p>
            <p className="font-roboto text-darkbrown text-lg text-center flex-1/2">
              Name
            </p>
            <p className="font-roboto text-darkbrown text-lg text-center flex-1/4">
              Time
            </p>
          </div>
          {/* rankins */}
          <AnimatePresence>
            {rankings.slice(0, 5).map((ranking, i) => (
              <ResultRow
                key={`${ranking.name}-${ranking.time}`}
                rank={i + 1}
                name={ranking.name}
                time={ranking.time}
                highlight={
                  currentPlayer.name === ranking.name &&
                  currentPlayer.time === ranking.time
                }
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="w-full text-center mt-12">
        <button
          type="button"
          onClick={onBackToStart}
          className="font-bungee text-shadow text-orange text-5xl cursor-pointer"
        >
          REPLAY
        </button>
      </div>
    </div>
  );
};
export default ResultPage;
