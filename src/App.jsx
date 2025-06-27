import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/Card";
import Intropage from "./pages/IntroPage";
import LevelPage from "./pages/LevelPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";

function App() {
  const [page, setPage] = useState("intro");
  const [level, setLevel] = useState(6);
  const [name, setName] = useState("");
  const [elapsed, setElapsed] = useState(0);
  //save game result at localstorage
  const saveResult = (name, time, level) => {
    const oldData = JSON.parse(localStorage.getItem("rankings") || "[]");
    const newData = [...oldData, { name, time, level }];
    localStorage.setItem("rankings", JSON.stringify(newData));
  };

  return (
    <div className="bg-ivory w-full h-screen">
      <div className="max-[431px]:w-full w-md md:w-3xl h-screen m-auto">
        {page === "intro" && <Intropage onStart={() => setPage("level")} />}
        {page === "level" && (
          <LevelPage
            onSubmit={(level, name) => {
              setLevel(level);
              setName(name);
              setPage("game");
            }}
          />
        )}
        {page === "game" && (
          <GamePage
            key={level}
            level={level}
            onReStart={() => setPage("intro")}
            onNextLevel={() => setLevel((prev) => prev + 2)}
            onComplete={(time) => {
              setElapsed(time);
              saveResult(name, time, level);
              setPage("result");
            }}
          />
        )}
        {page === "result" && (
          <ResultPage
            playerName={name}
            playerTime={elapsed}
            playerLevel={level}
            onBackToStart={() => setPage("intro")}
          />
        )}
        {/* <Card /> */}
      </div>
    </div>
  );
}

export default App;
