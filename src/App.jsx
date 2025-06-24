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
  const [level, setLevel] = useState("easy");
  const [name, setName] = useState("");
  const [elapsed, setElapsed] = useState(0);
  //save game result at localstorage
  const saveResult = (name, time) => {
    const oldData = JSON.parse(localStorage.getItem("rankings") || "[]");
    const newData = [...oldData, { name, time }];
    localStorage.setItem("rankings", JSON.stringify(newData));
  };

  return (
    <div className="bg-ivory w-full h-screen">
      <div className="w-3xl h-full m-auto">
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
            level={level === "easy" ? 6 : level === "normal" ? 8 : 10}
            onClick={() => setPage("level")}
            onComplete={(time) => {
              setElapsed(time);
              saveResult(name, time);
              setPage("result");
            }}
          />
        )}
        {page === "result" && (
          <ResultPage
            playerName={name}
            playerTime={elapsed}
            onBackToStart={() => setPage("intro")}
          />
        )}
        {/* <Card /> */}
      </div>
    </div>
  );
}

export default App;
