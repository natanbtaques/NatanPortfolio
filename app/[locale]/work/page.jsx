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
      category: "FullStack",
      title: t("projects.0.title"),
      description: t("projects.0.description"),
      stack: [
        { name: "Next.js" },
        { name: "Nest.js" },
        { name: "Tailwind CSS" },
        { name: "TypeScript" },
        { name: "Crawlers" },
      ],
      image: "/assets/coolhunting.png",
      // live: "https://coolhunting.wap.com.br/login", // Verifique NDA/contrato com a WAP antes de ativar
      live: "",
      github: "",
    },
    {
      num: "02",
      category: "Mobile",
      title: t("projects.1.title"),
      description: t("projects.1.description"),
      stack: [
        { name: "React Native" },
        { name: "Nest.js" },
        { name: "Expo Go" },
        { name: "Reanimated" },
        { name: "NativeWind" },
      ],
      image: "/assets/conecthunt.png",
      live: "",
      github: "",
    },
    {
      num: "03",
      category: "Frontend",
      title: t("projects.2.title"),
      description: t("projects.2.description"),
      stack: [
        { name: "Next.js" },
        { name: "Tailwind CSS" },
        { name: "Supabase" },
        { name: "BFF" },
      ],
      image: "/assets/movart-express.png",
      live: "",
      github: "",
    },
    {
      num: "04",
      category: "FullStack",
      title: t("projects.3.title"),
      description: t("projects.3.description"),
      stack: [
        { name: "Vue.js" },
        { name: "Python" },
        { name: "Apache Airflow" },
        { name: "Docker" },
        { name: "Node.js" },
      ],
      image: "/assets/saas-automa.png",
      live: "",
      github: "",
    },
    {
      num: "05",
      category: "Frontend",
      title: t("projects.4.title"),
      description: t("projects.4.description"),
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
      num: "06",
      title: t("projects.5.title"),
      description: t("projects.5.description"),
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
      num: "07",
      category: "Frontend",
      title: t("projects.6.title"),
      description: t("projects.6.description"),
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
      num: "08",
      category: "Frontend",
      title: t("projects.7.title"),
      description: t("projects.7.description"),
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
      num: "09",
      category: "FullStack",
      title: t("projects.8.title"),
      description: t("projects.8.description"),
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
      num: "10",
      category: "API",
      title: t("projects.9.title"),
      description: t("projects.9.description"),
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
          {/* Left panel */}
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-5">
              {/* Number + Category badge */}
              <div className="flex items-center justify-between">
                <span className="text-8xl leading-none font-extrabold text-outline opacity-40">
                  {project.num}
                </span>
                {project.category && (
                  <span className="px-3 py-1 text-xs font-semibold border border-accent/50 text-accent rounded-full bg-accent/5 uppercase tracking-widest">
                    {project.category}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-white/10" />

              {/* Title + Action buttons */}
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-3xl xl:text-[36px] font-bold leading-tight text-white">
                  {project.title}
                </h2>
                <div className="flex items-center gap-3 shrink-0">
                  {project.live && project.live.trim() !== "" && (
                    <Link href={project.live}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-[52px] h-[52px] rounded-full bg-white/5 border border-white/10 flex justify-center items-center group hover:border-accent transition-all duration-300">
                            <BsArrowUpRight className="text-white text-xl group-hover:text-accent" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("liveProject")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Link>
                  )}
                  {project.github && project.github.trim() !== "" && (
                    <Link href={project.github}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-[52px] h-[52px] rounded-full bg-white/5 border border-white/10 flex justify-center items-center group hover:border-accent transition-all duration-300">
                            <BsGithub className="text-white text-xl group-hover:text-accent" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("githubRepo")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Link>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium border border-white/10 rounded-full bg-white/5 text-white/70"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel — image slider */}
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
                    <div className="h-[460px] relative group rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
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
