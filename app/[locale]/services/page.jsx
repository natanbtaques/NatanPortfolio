"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  FaHtml5, FaCss3, FaJs, FaReact, FaFigma, FaNodeJs, FaAws,
} from "react-icons/fa";
import {
  SiTailwindcss, SiRedux, SiNextdotjs, SiPython, SiDocker,
  SiPostgresql, SiTypescript, SiApacheairflow, SiVuedotjs,
  SiSupabase, SiNestjs, SiExpo,
} from "react-icons/si";
import { TbBrandReactNative, TbRoute } from "react-icons/tb";
import { GiBearFace } from "react-icons/gi";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";

/* ─── skills data ─────────────────────────────────────────────────────────── */
const skillCategories = [
  {
    key: "frontend", label: "Frontend",
    skills: [
      { icon: <FaHtml5 />, name: "HTML5" },      { icon: <FaCss3 />, name: "CSS3" },
      { icon: <FaJs />, name: "JavaScript" },    { icon: <SiTypescript />, name: "TypeScript" },
      { icon: <FaReact />, name: "React.js" },   { icon: <SiNextdotjs />, name: "Next.js" },
      { icon: <SiVuedotjs />, name: "Vue.js" },  { icon: <SiTailwindcss />, name: "Tailwind CSS" },
      { icon: <SiRedux />, name: "Redux" },      { icon: <FaFigma />, name: "Figma" },
    ],
  },
  {
    key: "backend", label: "Backend",
    skills: [
      { icon: <FaNodeJs />, name: "Node.js" },   { icon: <SiNestjs />, name: "Nest.js" },
      { icon: <SiPython />, name: "Python" },    { icon: <SiPostgresql />, name: "PostgreSQL" },
      { icon: <SiSupabase />, name: "Supabase" },
    ],
  },
  {
    key: "mobile", label: "Mobile",
    skills: [
      { icon: <TbBrandReactNative />, name: "React Native" }, { icon: <FaReact />, name: "React.js" },
      { icon: <FaJs />, name: "JavaScript" },                 { icon: <SiTypescript />, name: "TypeScript" },
      { icon: <SiExpo />, name: "Expo" },                     { icon: <SiTailwindcss />, name: "NativeWind" },
      { icon: <GiBearFace />, name: "Zustand" },              { icon: <TbRoute />, name: "Expo Router" },
    ],
  },
  {
    key: "devops", label: "DevOps",
    skills: [
      { icon: <SiDocker />, name: "Docker" }, { icon: <FaAws />, name: "AWS" },
      { icon: <SiApacheairflow />, name: "Apache Airflow" },
    ],
  },
];

/* service index → skill category key */
const serviceToCategory = ["frontend", "backend", "mobile", "devops"];

/* ─── animation variants ──────────────────────────────────────────────────── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const slideUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Services ────────────────────────────────────────────────────────────── */
const Services = () => {
  const t = useTranslations();
  const [activeService, setActiveService] = useState(0);

  const services = [
    { num: "01", title: t("services.webDevelopment"), description: t("services.webDevelopmentDesc") },
    { num: "02", title: t("services.uxUiDesign"),     description: t("services.uxUiDesignDesc") },
    { num: "03", title: t("services.apiDevelopment"), description: t("services.apiDevelopmentDesc") },
    { num: "04", title: t("services.devOps"),         description: t("services.devOpsDesc") },
  ];

  const activeCategoryKey = serviceToCategory[activeService];
  const activeSkills = skillCategories.find((c) => c.key === activeCategoryKey)?.skills ?? [];

  return (
    <section className="py-12 xl:py-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start">

          {/* ── Services list (accordion) ───────────────────────────── */}
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={container}
            className="flex flex-col"
          >
            {services.map((service, index) => {
              const isOpen = activeService === index;
              return (
                <motion.li
                  key={index}
                  variants={slideUp}
                  onClick={() => setActiveService(index)}
                  className="group flex items-start gap-4 py-5 border-b border-white/8 last:border-none hover:bg-white/[0.02] transition-colors duration-300 px-2 rounded-lg cursor-pointer"
                >
                  {/* number */}
                  <span className={`font-mono text-sm font-bold border rounded-full px-2.5 py-1.5 shrink-0 transition-all duration-300 ${
                    isOpen
                      ? "bg-accent text-white border-accent"
                      : "text-accent bg-accent/10 border-accent/25 group-hover:bg-accent group-hover:text-white"
                  }`}>
                    {service.num}
                  </span>

                  {/* content */}
                  <div className="flex flex-col gap-1 w-full">
                    <h3 className={`text-base font-semibold transition-colors duration-300 leading-snug ${
                      isOpen ? "text-accent" : "text-white group-hover:text-accent"
                    }`}>
                      {service.title}
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.p
                          key="desc"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="text-white/45 text-sm leading-relaxed overflow-hidden"
                        >
                          {service.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* ── Skills ───────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={container}
            className="flex flex-col gap-6"
          >
            {/* category filter */}
            <motion.div variants={slideUp} className="flex flex-wrap gap-2">
              {skillCategories.map((cat, i) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveService(serviceToCategory.indexOf(cat.key))}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
                    activeCategoryKey === cat.key
                      ? "bg-accent text-white border-accent"
                      : "text-white/50 border-white/15 hover:border-accent hover:text-accent"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>

            {/* skills grid */}
            <AnimatePresence mode="wait">
              <motion.ul
                key={activeCategoryKey}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 gap-3"
              >
                {activeSkills.map((skill, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-20px" }}
                    transition={{ duration: 0.3, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-full h-[80px] bg-[#1e1e28] border border-white/5 rounded-xl flex justify-center items-center group hover:border-accent/30 transition-colors duration-300">
                          <div className="text-3xl group-hover:text-accent transition-all duration-300">
                            {skill.icon}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="capitalize">{skill.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Services;
