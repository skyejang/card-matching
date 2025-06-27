import React from "react";
import { motion } from "framer-motion";

const ResultRow = ({ rank, name, level, time, highlight }) => {
  return (
    <motion.div
      layout // animation for location moving
      {...(highlight && {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { type: "spring", stiffness: 500, damping: 30 },
      })}
      className={`w-full py-2 flex ${highlight ? "bg-yellow-100" : ""}`}
    >
      <p className="font-roboto text-darkbrown text-center text-sm flex-1/6">
        {rank}
      </p>
      <p className="font-roboto text-darkbrown text-center text-sm flex-1/4">
        {level === 6 ? "Easy" : level === 8 ? "Normal" : "Hard"}
      </p>
      <p className="font-roboto text-darkbrown text-center text-sm flex-1/2 truncate whitespace-nowrap overflow-hidden">
        {name}
      </p>
      <p className="font-roboto text-darkbrown text-center text-sm flex-1/6">
        {time}
      </p>
    </motion.div>
  );
};

export default ResultRow;
