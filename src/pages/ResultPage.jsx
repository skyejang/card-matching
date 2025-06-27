import React from "react";
import ResultRow from "../components/ResultRow";
import { AnimatePresence } from "framer-motion";
const ResultPage = ({ playerName, playerTime, onBackToStart }) => {
  //get rankings and sort by time
  const getRankings = () => {
    const data = JSON.parse(localStorage.getItem("rankings") || "[]");
    return data
      .sort((a, b) => {
        if (b.level !== a.level) return b.level - a.level; // 높은 레벨 먼저
        return a.time - b.time; // 같은 레벨이면 시간 빠른 순
      })
      .map((item, index) => ({ ...item, rank: index + 1 }));
  };
  const rankings = getRankings();
  //find current player
  const currentPlayer = rankings.find(
    (r) => r.name === playerName && r.time === playerTime
  );
  const resetRankings = () => {
    localStorage.clear();
    console.log(getRankings());
    alert("All Clear!");
    onBackToStart();
  };
  return (
    <div className="pt-4 max-[431px]:pt-8 max-[431px]:px-4">
      <div className="max-[431px]:w-xs w-sm mx-auto relative max-[431px]:h-24 h-30">
        <h1 className="font-bungee text-shadow text-darkbrown max-[431px]:text-5xl text-6xl absolute">
          HANPAN
        </h1>
        <h1 className="font-bungee text-shadow text-darkbrown max-[431px]:text-5xl text-6xl absolute right-0 bottom-0">
          MATCH
        </h1>
      </div>
      <div className="max-[431px]:w-full w-sm mt-12 mx-auto">
        <div className="w-full h-fit bg-white rounded-lg border-2 border-darkbrown p-4">
          {/* title */}
          <div className="w-full flex">
            <p className="font-roboto text-darkbrown text-lg text-center flex-1/6">
              Rank
            </p>
            <p className="font-roboto text-darkbrown text-lg text-center flex-1/4">
              Level
            </p>
            <p className="font-roboto text-darkbrown text-lg text-center flex-1/2">
              Name
            </p>
            <p className="font-roboto text-darkbrown text-lg text-center flex-1/6">
              Time
            </p>
          </div>
          {/* rankins */}
          <AnimatePresence>
            {rankings.slice(0, 5).map((ranking, i) => (
              <ResultRow
                key={`${ranking.name}-${i}`}
                rank={i + 1}
                name={ranking.name}
                time={ranking.time}
                level={ranking.level}
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
          className="font-bungee text-shadow text-orange max-[431px]:text-4xl text-5xl cursor-pointer"
        >
          REPLAY
        </button>
      </div>
      <div className="w-full text-center mt-4">
        <button
          type="button"
          onClick={resetRankings}
          className="font-bungee text-shadow text-gray max-[431px]:text-2xl text-4xl cursor-pointer"
        >
          RESET ALL
        </button>
      </div>
    </div>
  );
};
export default ResultPage;
