import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import ResultRow from "../components/ResultRow";
import { AnimatePresence } from "framer-motion";

const ResultPage = ({ playerName, playerTime, onBackToStart }) => {
  //   //get rankings and sort by time
  //   const getRankings = () => {
  //     const data = JSON.parse(localStorage.getItem("rankings") || "[]");
  //     return data
  //       .sort((a, b) => {
  //         if (b.level !== a.level) return b.level - a.level; // 높은 레벨 먼저
  //         return a.time - b.time; // 같은 레벨이면 시간 빠른 순
  //       })
  //       .map((item, index) => ({ ...item, rank: index + 1 }));
  //   };
  // const rankings = getRankings();
  const getRankings = async () => {
    try {
      const snapshot = await getDocs(collection(db, "rankings"));
      const data = snapshot.docs.map((doc) => doc.data());

      const sorted = data
        .sort((a, b) => {
          if (b.level !== a.level) return b.level - a.level;
          return a.time - b.time;
        })
        .map((item, index) => ({ ...item, rank: index + 1 }));

      return sorted;
    } catch (error) {
      console.error("Error getting rankings: ", error);
      return [];
    }
  };

  const [rankings, setRankings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getRankings();
      setRankings(data);
    };
    fetchData();
  }, []);
  //find current player
  const currentPlayer = rankings.find(
    (r) => r.name === playerName && r.time === playerTime
  );
  const resetRankings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "rankings"));
      const deletePromises = querySnapshot.docs.map((document) =>
        deleteDoc(doc(db, "rankings", document.id))
      );

      await Promise.all(deletePromises);

      alert("All Clear!");
      onBackToStart(); // 페이지 이동
    } catch (error) {
      console.error("Error clearing rankings:", error);
      alert("Failed to clear rankings.");
    }
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
      {/* For admin */}
      {/* <div className="w-full text-center mt-4">
        <button
          type="button"
          onClick={resetRankings}
          className="font-bungee text-shadow text-gray max-[431px]:text-2xl text-4xl cursor-pointer"
        >
          RESET ALL
        </button>
      </div> */}
    </div>
  );
};
export default ResultPage;
