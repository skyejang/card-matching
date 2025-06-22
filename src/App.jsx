import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/Card";
import Intropage from "./pages/IntroPage";
import LevelPage from "./pages/LevelPage";
import GamePage from "./pages/GamePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-ivory w-full h-screen">
      <div className="w-3xl h-full m-auto">
        {/* <Intropage /> */}
        {/* <LevelPage /> */}
        <GamePage />
        {/* <Card /> */}
      </div>
    </div>
  );
}

export default App;
