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
          className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten absolute"
        >
          <Image
            src="/assets/photo.png"
            alt="Natan Taques"
            priority
            quality={100}
            sizes="50vh"
            fill
            className="object-contain opacity-8"
          ></Image>
        </motion.div>
        {/* circle */}
        <motion.svg
          className="w-[300px] xl:w-[510px] h-[300px] xl:h-[506px] "
          fill="tansparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="243"
            cy="243"
            r="220"
            stroke="#82A2FF"
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
