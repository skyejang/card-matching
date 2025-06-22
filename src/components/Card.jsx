import React from "react";
const Card = ({ cardSet, card, onClick, isFlipped }) => {
  const findColor = (obj, val) => {
    return Object.keys(obj).find((key) => obj[key].includes(val));
  };
  const emojiMap = {
    clover: "🍀",
    flower: "🌼",
    sunflower: "🌻",
    cherryblossom: "🌸",
  };
  const colorMap = {
    //tailwind css에서 동적클래스 인식 안됨
    yellow: "bg-yellow",
    pink: "bg-pink",
    green: "bg-green",
  };
  const emoji = (card) => emojiMap[card] || "";
  return (
    <div className={`card-wrap ${isFlipped ? "flip" : ""}`} onClick={onClick}>
      <div className="card front"></div>
      <div className={`card back ${colorMap[findColor(cardSet, card)]}`}>
        <p className="text-4xl">{emoji(card)}</p>
      </div>
    </div>
  );
};

export default Card;
