import React from "react";
const Card = ({ cardSet, card, onClick, isFlipped, popping }) => {
  const findColor = (obj, val) => {
    return Object.keys(obj).find((key) => obj[key].includes(val));
  };
  const emojiMap = {
    clover: "🍀",
    bamboo: "🎋",
    leaves: "🌿",
    palm: "🌴",
    flower: "🌼",
    sunflower: "🌻",
    bouquet: "💐",
    cherryblossom: "🌸",
    hibiscus: "🌺",
    tulip: "🌷",
    rose: "🌹",
  };
  const colorMap = {
    //tailwind css에서 동적클래스 인식 안됨
    yellow: "bg-yellow",
    pink: "bg-pink",
    green: "bg-green",
  };
  const emoji = (card) => emojiMap[card] || "";
  return (
    <div className={`card-group ${popping ? "pop" : ""}`}>
      <div
        className={`card-wrap ${isFlipped ? "flip" : ""}`}
        onPointerDown={onClick}
      >
        <div className="card front"></div>
        <div className={`card back ${colorMap[findColor(cardSet, card)]}`}>
          <p className="text-4xl">{emoji(card)}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
