import React, { useEffect, useRef } from "react";
const DemoPlay = () => {
  const demoArr = ["p", "y", "g", "y", "g", "p", "o", "o"];

  const cardRefs = useRef([]);
  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add("flip");
      }, i * 150);
    });
  }, []);

  return (
    <div className="w-[424px] h-[208px] fixed bottom-2 left-1/2 -translate-x-1/2 grid grid-cols-4 gap-2">
      {demoArr.map((d, i) => (
        <div
          className={`card-wrap`}
          key={i}
          ref={(el) => (cardRefs.current[i] = el)}
        >
          <div className="card front"></div>
          <div
            className={`card back ${
              d === "p"
                ? "bg-pink"
                : d === "y"
                ? "bg-yellow"
                : d === "g"
                ? "bg-green"
                : "bg-coral"
            }`}
          >
            <p className="text-4xl">
              {d === "p" ? "🌸" : d === "y" ? "🌼" : d === "g" ? "🎋" : "🍂"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default DemoPlay;
