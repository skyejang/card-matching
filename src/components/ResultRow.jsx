import React from "react";
import { motion } from "framer-motion";

const ResultRow = ({ rank, name, time, highlight }) => {
  return (
    <motion.div
      layout // ⭐ 위치 이동 애니메이션
      {...(highlight && {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { type: "spring", stiffness: 500, damping: 30 },
      })}
      className={`w-full py-2 flex ${highlight ? "bg-yellow-100" : ""}`}
    >
      <p className="font-roboto text-darkbrown text-center text-sm flex-1/4">
        {rank}
      </p>
      <p className="font-roboto text-darkbrown text-center text-sm flex-1/2 truncate whitespace-nowrap overflow-hidden">
        {name}
      </p>
      <p className="font-roboto text-darkbrown text-center text-sm flex-1/4">
        {time}
      </p>
    </motion.div>
  );
};

export default ResultRow;
