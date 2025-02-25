"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import WordSliderBtns from "@/components/WordSliderBtns";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    num: "01",
    category: "Frontend",
    title: "Project 01",
    description: "Loren ipsum dolor sit amet",
    stack: [{ name: "html5" }, { name: "css3" }, { name: "javascript" }],
    image: "/assets/test.image.png",
    live: "",
    github: "",
  },
  {
    num: "02",
    category: "FullStack",
    title: "Project 02",
    description: "Loren ipsum dolor sit amet",
    stack: [{ name: "html5" }, { name: "css3" }, { name: "javascript" }],
    image: "/assets/test.image.png",
    live: "",
    github: "",
  },
  {
    num: "03",
    category: "API",
    title: "Project 01",
    description: "Loren ipsum dolor sit amet",
    stack: [{ name: "html5" }, { name: "css3" }, { name: "javascript" }],
    image: "/assets/test.image.png",
    live: "",
    github: "",
  },
  {
    num: "04",
    category: "UX/UI",
    title: "Project 02",
    description: "Loren ipsum dolor sit amet",
    stack: [{ name: "html5" }, { name: "css3" }, { name: "javascript" }],
    image: "/assets/test.image.png",
    live: "",
    github: "",
  },
];
const Work = () => {
  const [project, setProject] = useState(projects[0]);
  const handleSlideChange = (swiper) => {
    // Get Current Slider Index
    const currentIndex = swiper.activeIndex;
    // update state
    setProject(projects[currentIndex]);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              <div className="text-8xl leading-none font-extrabold  text-outline">
                {project.num}
              </div>
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.category} Project
              </h2>
              <p className="text-white/60 ">{project.description}</p>
              <ul className="flex gap-4">
                {project.stack.map((itens, index) => {
                  return (
                    <li key={index} className="text-xl text-accent">
                      {itens.name}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
              <div className="border border-white/20"></div>

              <div className="flex items-center gap-4">
                {/* Live Project Button */}
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full items-center bg-white/5 flex justify-center intems-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                {/* GitHub Project Button */}
                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full items-center bg-white/5 flex justify-center intems-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github Repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide className="w-full" key={index}>
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      <div className=" absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              <WordSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Work;
