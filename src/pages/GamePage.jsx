import React, { useEffect, useMemo, useRef, useState } from "react";
import Card from "../components/Card";

const GamePage = ({ level, onReStart, onNextLevel, onComplete }) => {
  //Pre-specified : dynamic class creation is not possible in tailwind
  const colClass =
    level === 6
      ? "min-[540px]:grid-cols-3"
      : level === 8
      ? "min-[540px]:grid-cols-4"
      : "min-[540px]:grid-cols-5";
  const cardSet = {
    yellow: ["sunflower", "flower", "bouquet"],
    pink: ["cherryblossom", "hibiscus", "tulip", "rose"],
    green: ["clover", "bamboo", "leaves", "palm"],
  };
  //Draw a Card & Make a Pair
  const color = Object.keys(cardSet);
  const PickCards = useMemo(() => {
    const rand = (max) => Math.floor(Math.random() * max);

    //copy arrays
    const copy_cardSet = {
      yellow: [...cardSet.yellow],
      pink: [...cardSet.pink],
      green: [...cardSet.green],
    };
    const copy_color = [...color];
    //mininum pairs for each color
    const loop_num = Math.floor(level / color.length);
    const remain_loop = level % color.length;
    const picked = [];

    //Number of repetitions: total pairs/colours
    const RandomLoop = (bg) => {
      for (var i = 0; i < loop_num; i++) {
        //Random num: to randomly place the index value of the array
        //doesn't matter if the random number is different for each color
        //push the value corresponding to the random index of each color array and subtract it from copy arr
        //Continuous Return from the subtract Array
        //re-select max value of random digits after adjusting the copy arrangement, put into the rand function
        //End when the copy array length is 0 when the repeat statement is turned
        const arr = copy_cardSet[bg];
        const card = arr[rand(arr.length)];
        if (arr.length !== 0) {
          picked.push(card, card);
          arr.splice(arr.indexOf(card), 1);
          if (!arr.length) copy_color.splice(copy_color.indexOf(bg), 1);
        }
      }
    };
    //loop for each color
    // color.forEach(RandomLoop);
    color.forEach(RandomLoop);
    //
    if (remain_loop) {
      for (var i = 0; i < remain_loop; i++) {
        let bg = copy_color[rand(copy_color.length)];
        const arr = copy_cardSet[bg]; //arr = [flower]
        const card = arr[rand(arr.length)]; //[]
        if (arr.length !== 0) {
          picked.push(card, card);
          arr.splice(arr.indexOf(card), 1);
          if (!arr.length) copy_color.splice(copy_color.indexOf(bg), 1);
        }
      }
    }
    //final shuffle
    return picked.sort(() => Math.random() - 0.5);
  }, [level]);

  const [flipped, setFlipped] = useState(Array(PickCards.length).fill(true));
  const [paired, setPaired] = useState(Array(PickCards.length).fill(false));
  const [popping, setPopping] = useState(Array(PickCards.length).fill(false));
  const [firstIdx, setFirstIdx] = useState(null);
  const [isPaired, setIsPaired] = useState(0);
  const [canClick, setCanClick] = useState(false); // prevent click event conflict
  const isPairedRef = useRef(0);
  // isPaired 상태랑 ref 같이 업데이트하는 함수
  const updateIsPaired = (newCount) => {
    setIsPaired(newCount);
    isPairedRef.current = newCount;
  };
  // 레벨 변경 시 카드 상태 초기화
  useEffect(() => {
    setFlipped(Array(PickCards.length).fill(true));
    setPaired(Array(PickCards.length).fill(false));
    setPopping(Array(PickCards.length).fill(false));
    setIsPaired(0);
    setFirstIdx(null);
    setCanClick(false);
  }, [PickCards]);

  useEffect(() => {
    if (PickCards.length === 0) return;

    setCanClick(false); // 초기엔 클릭 비활성화
    const timeout = setTimeout(() => {
      setFlipped(Array(PickCards.length).fill(false));
      setCanClick(true); // 0.3초 후 클릭 가능
    }, 1500);

    return () => clearTimeout(timeout);
  }, [PickCards]); // start when pickcards is ready

  const markIndices = (incides, setter, value = true) => {
    setter((prev) => {
      const copy = [...prev];
      incides.forEach((ele) => (copy[ele] = value));
      return copy;
    });
    return;
  };
  const flipHandler = (index) => {
    //Ignore if it's already flipped or paired
    if (!canClick || flipped[index] || paired[index]) return;
    //When changing the useState state,
    //get the previous value as a prev factor when getting the latest prev
    setFlipped((prev) => {
      const copy_prev = [...prev];
      copy_prev[index] = true;
      return copy_prev;
    });
    //the first choice card
    if (firstIdx === null) {
      setFirstIdx(index);
      return;
    }
    //the second choice card
    const first = firstIdx; //snapshot
    const second = index;

    const matchedIndices = [first, second];
    setFirstIdx(null); //Initialize for next turn
    setCanClick(false);
    if (PickCards[first] === PickCards[second]) {
      // matching success
      const newPairedCount = isPairedRef.current + 1;
      updateIsPaired(newPairedCount);
      markIndices(matchedIndices, setPaired);
      setTimeout(() => {
        markIndices(matchedIndices, setPopping);
        setCanClick(true);
        // remove when poping animation is finished
        setTimeout(() => {
          markIndices(matchedIndices, setPopping, false);
          if (newPairedCount === PickCards.length / 2 && level === 10) {
            setTimeout(() => {
              onComplete(elapsed);
            }, 1500);
          } else {
            setCanClick(true);
          }
        }, 150); // pop animation
      }, 500); // flip animation
      return;
    }
    setTimeout(() => {
      markIndices(matchedIndices, setFlipped, false);
      setCanClick(true);
    }, 600);
  };

  //timer
  const [elapsed, setElapsed] = useState(0);
  const startTimeRef = useRef(null);
  const frameRef = useRef(null);
  // timer start
  useEffect(() => {
    if (level === isPaired) {
      cancelAnimationFrame(frameRef.current);
      return;
    }
    startTimeRef.current = performance.now(); // start time(ms)
    const update = () => {
      const now = performance.now(); //current time
      setElapsed(((now - startTimeRef.current) / 1000).toFixed(2));
      frameRef.current = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frameRef.current);
  }, [isPaired, level]);

  return (
    <>
      {level === isPaired && (
        <div className="w-full h-screen bg-white/50 fixed left-0 top-0 z-10 flex items-center justify-center px-4">
          <div className="p-6 bg-gray-50 border-2 border-darkbrown">
            <h1 className="block font-bungee text-darkbrown max-[400px]:text-3xl max-[600px]:text-4xl text-6xl text-shadow">
              COMPLETE!
            </h1>
            {level !== 10 && (
              <div className="flex justify-between mt-12">
                <button
                  onClick={() => onComplete(elapsed)}
                  className="font-bungee cursor-pointer text-shadow text-orange max-[400px]:text-3xl text-4xl"
                >
                  STOP
                </button>

                <button
                  onClick={() => onNextLevel(level)}
                  className="font-bungee cursor-pointer text-shadow text-orange max-[400px]:text-3xl text-4xl"
                >
                  NEXT
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="pt-4 ">
        <div className="w-full flex justify-between mt-12 max-[501px]:mt-6 max-[500px]:px-6">
          <div className="flex">
            <p className="text-lg text-darkbrown font-roboto font-medium mr-4">
              Matched Pairs
            </p>
            <p className="text-lg text-darkbrown font-roboto font-medium">
              {isPaired}/{level}
            </p>
          </div>
          <div className="flex">
            <p className="text-lg text-darkbrown font-roboto font-medium mr-8">
              Time
            </p>
            <p className="text-lg text-darkbrown font-roboto font-medium">
              {elapsed}s
            </p>
          </div>
        </div>
        <div className="w-full h-12 max-[501px]:h-8"></div>
        <div
          className={`w-fit grid gap-2 m-auto max-[541px]:grid-cols-4 ${colClass}`}
        >
          {PickCards.map((card, i) => (
            <Card
              key={i}
              card={card}
              cardSet={cardSet}
              isFlipped={flipped[i] || paired[i]}
              popping={popping[i]}
              onClick={() => flipHandler(i)}
            />
          ))}
        </div>
        <div className="w-full text-center mt-16 max-[501px]:mt-8">
          <button
            onClick={onReStart}
            className="font-bungee text-shadow text-orange max-[501px]:text-4xl text-5xl cursor-pointer"
          >
            BACK
          </button>
        </div>
      </div>
    </>
  );
};
export default GamePage;
