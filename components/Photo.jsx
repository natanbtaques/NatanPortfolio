"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const photo = () => {
  return (
    <div className="w-full h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.8, duration: 0.4, ease: "easeIn" },
        }}
      >
        {/* Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.6, duration: 0.4, ease: "easeIn" },
          }}
          className="w-[260px] h-[260px] xl:w-[390px] xl:h-[390px] mix-blend-lighten absolute"
        >
          <Image
            src="/assets/photo.png"
            alt="Natan Taques"
            priority
            quality={100}
            sizes="50vh"
            fill
            className="object-contain opacity-8 xl:mt-4 pr-4 mt-2"
          ></Image>
        </motion.div>
        {/* circle */}
        <motion.svg
          className="w-[260px] xl:w-[400px] h-[260px] xl:h-[400px]"
          fill="tansparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="243"
            cy="243"
            r="220"
            stroke="#688FE3"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate
          ></motion.circle>
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default photo;
