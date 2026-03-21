"use client";

import { Info } from "lucide-react";
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs,
  FaAws,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiRedux,
  SiNextdotjs,
  SiPython,
  SiDocker,
  SiPostgresql,
  SiTypescript,
  SiApacheairflow,
  SiVuedotjs,
  SiSupabase,
  SiNestjs,
  SiExpo,
} from "react-icons/si";
import { TbBrandReactNative, TbRoute } from "react-icons/tb";
import { GiBearFace } from "react-icons/gi";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

//skills data
const skillCategories = [
  {
    key: "frontend",
    label: "Frontend",
    skills: [
      { icon: <FaHtml5 />, name: "HTML5" },
      { icon: <FaCss3 />, name: "CSS3" },
      { icon: <FaJs />, name: "JavaScript" },
      { icon: <SiTypescript />, name: "TypeScript" },
      { icon: <FaReact />, name: "React.js" },
      { icon: <SiNextdotjs />, name: "Next.js" },
      { icon: <SiVuedotjs />, name: "Vue.js" },
      { icon: <SiTailwindcss />, name: "Tailwind CSS" },
      { icon: <SiRedux />, name: "Redux" },
      { icon: <FaFigma />, name: "Figma" },
    ],
  },
  {
    key: "backend",
    label: "Backend",
    skills: [
      { icon: <FaNodeJs />, name: "Node.js" },
      { icon: <SiNestjs />, name: "Nest.js" },
      { icon: <SiPython />, name: "Python" },
      { icon: <SiPostgresql />, name: "PostgreSQL" },
      { icon: <SiSupabase />, name: "Supabase" },
    ],
  },
  {
    key: "mobile",
    label: "Mobile",
    skills: [
      { icon: <TbBrandReactNative />, name: "React Native" },
      { icon: <FaReact />, name: "React.js" },
      { icon: <FaJs />, name: "JavaScript" },
      { icon: <SiTypescript />, name: "TypeScript" },
      { icon: <SiExpo />, name: "Expo" },
      { icon: <SiTailwindcss />, name: "NativeWind" },
      { icon: <GiBearFace />, name: "Zustand" },
      { icon: <TbRoute />, name: "Expo Router" },
    ],
  },
  {
    key: "devops",
    label: "DevOps",
    skills: [
      { icon: <SiDocker />, name: "Docker" },
      { icon: <FaAws />, name: "AWS" },
      { icon: <SiApacheairflow />, name: "Apache Airflow" },
    ],
  },
];

const Resume = () => {
  const t = useTranslations("resume");
  const [activeCategory, setActiveCategory] = useState("frontend");
  //about data
  const about = {
    title: t("about.title"),
    description: t("about.description"),
    info: [
      {
        fieldName: t("about.info.FieldName"),
        fieldValue: t("about.info.name"),
      },
      {
        fieldName: t("about.info.FieldPhone"),
        fieldValue: t("about.info.phone"),
      },
      {
        fieldName: t("about.info.FieldExperience"),
        fieldValue: t("about.info.experience"),
      },
      {
        fieldName: t("about.info.FieldNationality"),
        fieldValue: t("about.info.nationality"),
      },
      {
        fieldName: t("about.info.email"),
        fieldValue: "natanbtaques@gmail.com",
      },
      {
        fieldName: t("about.info.fieldLanguages"),
        fieldValue: t("about.info.languages"),
      },
    ],
  };

  //experience data
  const experience = {
    icon: "/assets/resume/badge.svg",
    title: t("experience.title"),
    description: t("experience.description"),
    items: [
      {
        company: t("experience.items.0.company"),
        position: t("experience.items.0.position"),
        duration: t("experience.items.0.duration"),
        logo: "/assets/companies/ene-solucoes.png",
        clients: [
          { name: "WAP", logo: "/assets/companies/clients/wap.png" },
          { name: "Movart", logo: "/assets/companies/clients/movart.png" },
        ],
      },
      {
        company: t("experience.items.1.company"),
        position: t("experience.items.1.position"),
        duration: t("experience.items.1.duration"),
        logo: "/assets/companies/guato-digital.png",
        clients: [],
      },
      {
        company: t("experience.items.2.company"),
        position: t("experience.items.2.position"),
        duration: t("experience.items.2.duration"),
        logo: "/assets/companies/automa.png",
        clients: [
          { name: "CPFLR", logo: "/assets/companies/clients/CPFLR.png" },
          {
            name: "Athon Energia",
            logo: "/assets/companies/clients/athon_energia.png",
          },
          { name: "Vale", logo: "/assets/companies/clients/vale.png" },
          {
            name: "Pan America Energy",
            logo: "/assets/companies/clients/PAE.png",
          },
        ],
      },
    ],
  };

  //education data
  const education = {
    title: t("education.title"),
    description: t("education.description"),
    academicTitle: t("education.academicTitle"),
    coursesTitle: t("education.coursesTitle"),
    academic: [
      {
        institution: t("education.academic.0.institution"),
        degree: t("education.academic.0.degree"),
        duration: t("education.academic.0.duration"),
        logo: "/assets/universities/ufmt.png",
      },
      {
        institution: t("education.academic.1.institution"),
        degree: t("education.academic.1.degree"),
        duration: t("education.academic.1.duration"),
        logo: "/assets/universities/unicamp.png",
      },
      {
        institution: t("education.academic.2.institution"),
        degree: t("education.academic.2.degree"),
        duration: t("education.academic.2.duration"),
        logo: "/assets/universities/ufmt.png",
      },
    ],
    courses: [
      {
        institution: t("education.courses.0.institution"),
        degree: t("education.courses.0.degree"),
        duration: t("education.courses.0.duration"),
      },
      {
        institution: t("education.courses.1.institution"),
        degree: t("education.courses.1.degree"),
        duration: t("education.courses.1.duration"),
      },
    ],
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.5, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0">
            <TabsTrigger value="experience">{t("tabs.experience")}</TabsTrigger>
            <TabsTrigger value="education"> {t("tabs.education")}</TabsTrigger>
            <TabsTrigger value="skills"> {t("tabs.skills")}</TabsTrigger>
            <TabsTrigger value="about"> {t("tabs.about")}</TabsTrigger>
          </TabsList>
          <div className="min-h-[80vh] w-full">
            <TabsContent value="experience" className="w-full">
              <div className=" flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {experience.description}
                </p>
                <ScrollArea className="h-[480px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] min-h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 relative"
                        >
                          {item.logo && (
                            <div className="absolute top-4 right-4 w-10 h-10 rounded-md overflow-hidden bg-white/5 flex items-center justify-center">
                              <Image
                                src={item.logo}
                                alt={item.company}
                                width={40}
                                height={40}
                                className="object-contain p-1"
                              />
                            </div>
                          )}
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-2">
                            <p className="text-white/60">{item.company}</p>
                          </div>
                          {item.clients && item.clients.length > 0 && (
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-white/40 text-xs">
                                Clientes:
                              </span>
                              <div className="flex items-center gap-2">
                                {item.clients.map((client, i) => (
                                  <TooltipProvider key={i} delayDuration={100}>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <div className="w-8 h-8 rounded-md overflow-hidden bg-white/10 flex items-center justify-center">
                                          <Image
                                            src={client.logo}
                                            alt={client.name}
                                            width={32}
                                            height={32}
                                            className="object-contain p-1"
                                          />
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{client.name}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                ))}
                              </div>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-2xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {education.description}
                </p>
                <ScrollArea className="h-[480px]">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Academic column */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-accent text-sm font-semibold uppercase tracking-widest text-center xl:text-left">
                        {education.academicTitle}
                      </h4>
                      <ul className="flex flex-col gap-4">
                        {education.academic.map((item, index) => (
                          <li
                            key={index}
                            className="bg-[#232329] min-h-[120px] py-5 px-8 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 relative"
                          >
                            {item.logo && (
                              <div className="absolute top-3 right-3 w-10 h-10 rounded-md overflow-hidden bg-white/5 flex items-center justify-center">
                                <Image
                                  src={item.logo}
                                  alt={item.institution}
                                  width={40}
                                  height={40}
                                  className="object-contain p-1"
                                />
                              </div>
                            )}
                            <span className="text-accent text-sm">{item.duration}</span>
                            <h3 className="text-base max-w-[240px] text-center lg:text-left font-medium">
                              {item.degree}
                            </h3>
                            <p className="text-white/60 text-sm">{item.institution}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Courses column */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-accent text-sm font-semibold uppercase tracking-widest text-center xl:text-left">
                        {education.coursesTitle}
                      </h4>
                      <ul className="flex flex-col gap-4">
                        {education.courses.map((item, index) => (
                          <li
                            key={index}
                            className="bg-[#232329] min-h-[120px] py-5 px-8 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                          >
                            <span className="text-accent text-sm">{item.duration}</span>
                            <h3 className="text-base max-w-[240px] text-center lg:text-left font-medium">
                              {item.degree}
                            </h3>
                            <p className="text-white/60 text-sm">{item.institution}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{t("skills.title")}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {t("skills.description")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center xl:justify-start">
                  {skillCategories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                        activeCategory === cat.key
                          ? "bg-accent text-white border-accent"
                          : "bg-transparent text-white/60 border-white/20 hover:border-accent hover:text-accent"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {skillCategories
                    .find((cat) => cat.key === activeCategory)
                    ?.skills.map((skill, index) => (
                      <li key={index}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-lg flex justify-center items-center group">
                              <div className="text-6xl group-hover:text-accent transition-all duration-300">
                                {skill.icon}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize">{skill.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left "
            >
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[800px] text-white/60 mx-auto xl:mx-0">
                  {about.description}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[6700px] mx-auto xl:mx-0">
                  {about.info.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-center xl:justify-start gap-4"
                      >
                        <span className="text-white/60">{item.fieldName}</span>
                        <span className="text-xl">{item.fieldValue}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
