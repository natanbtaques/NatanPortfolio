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
import { useTranslations } from "next-intl";

import Link from "next/link";
import Image from "next/image";

const Work = () => {
  const t = useTranslations("work");
  const projects = [
    {
      num: "01",
      category: "Frontend",
      title: t("projects.0.title"),
      description: t("projects.0.description"),
      stack: [
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "TypeScript" },
        { name: "React" },
        { name: "Redux" },
        { name: "Tailwind CSS" },
        { name: "Stripe" },
        { name: "Next Auth" },
        { name: "Vercel" },
      ],
      image: "/assets/goshopImage.png",
      live: "https://go-shop-ecommerce.vercel.app/",
      github: "https://github.com/natanbtaques/goSHOP_Ecommerce",
    },
    {
      num: "02",
      title: t("projects.1.title"),
      description: t("projects.1.description"),
      stack: [
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "JavaScript" },
        { name: "Jest" },
        { name: "Next.js" },
        { name: "Tailwind CSS" },
      ],
      image: "/assets/ink_and_ideas.png",
      live: "https://inknideas-natanbtaques-projects.vercel.app/home",
      github: "https://github.com/natanbtaques/blog-entre-linhas",
    },
    {
      num: "03",
      category: "Frontend",
      title: t("projects.2.title"),
      description: t("projects.2.description"),
      stack: [
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "JavaScript" },
        { name: "Next.js" },
        { name: "Tailwind CSS" },
      ],
      image: "/assets/portfolio.png",
      live: "https://natan-portfolio-chi.vercel.app/",
      github: "https://github.com/natanbtaques/NatanPortfolio",
    },
    {
      num: "04",
      category: "Frontend",
      title: t("projects.3.title"),
      description: t("projects.3.description"),
      stack: [
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "JavaScript" },
        { name: "Tailwind CSS" },
        { name: "Chart.js" },
        { name: "Vercel" },
      ],
      image: "/assets/dashboard.png",
      live: "https://next-dashboard-flame-five.vercel.app/",
      github: "https://github.com/natanbtaques/NextDashboard",
    },
    {
      num: "05",
      category: "FullStack",
      title: t("projects.4.title"),
      description: t("projects.4.description"),
      stack: [
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "JavaScript" },
        { name: "Next.js" },
        { name: "Tailwind CSS" },
        { name: "Node.js" },
        { name: "MongoDB" },
      ],
      image: "/assets/saborsocial.png",
      live: "",
      github: "https://github.com/natanbtaques/SaborSocial_Plataform",
    },
    {
      num: "06",
      category: "API",
      title: t("projects.5.title"),
      description: t("projects.5.description"),
      stack: [{ name: "Node.js" }, { name: "Express" }, { name: "JavaScript" }],
      image: "/assets/api.png",
      live: "",
      github: "https://github.com/natanbtaques/tickets---API",
    },
  ];
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
        transition: { delay: 0.5, duration: 0.4, ease: "easeIn" },
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
              <div className="flex align-center justify-between">
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                  {project.title}
                </h2>
                <div className="flex items-center gap-4 ">
                  {/* Live Project Button */}
                  {project.live && project.live.trim() !== "" && (
                    <Link href={project.live}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                            <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("liveProject")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Link>
                  )}
                  {/* GitHub Project Button */}
                  <Link href={project.github}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-[70px] h-[70px] rounded-full items-center bg-white/5 flex justify-center intems-center group">
                          <BsGithub className="text-white text-3xl group-hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t("githubRepo")}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                </div>
              </div>
              <p className="text-white/60 ">{project.description}</p>
              <ul className=" gap-4 grid grid-cols-3">
                {project.stack.map((itens, index) => {
                  return (
                    <li key={index} className="text-xl text-accent flex">
                      {itens.name}
                      {/* {index !== project.stack.length - 1 && ","} */}
                    </li>
                  );
                })}
              </ul>
              {/* <div className="border border-white/20"></div> */}
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
