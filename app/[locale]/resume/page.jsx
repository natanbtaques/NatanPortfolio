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
} from "react-icons/si";

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

//skills data
const skills = {
  title: "My Skills",
  description:
    "I have experience working with a variety of technologies, including React, Redux, Node.js, and MongoDB. I am comfortable working with both front-end and back-end technologies and have experience building web applications from scratch. I am always looking to learn new technologies and improve my skills.",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "HTML5",
    },
    {
      icon: <FaCss3 />,
      name: "CSS3",
    },
    {
      icon: <FaJs />,
      name: "JavaScript",
    },
    {
      icon: <SiTypescript />,
      name: "TypeScript",
    },
    {
      icon: <FaReact />,
      name: "React.js",
    },
    {
      icon: <SiNextdotjs />,
      name: "Next.js",
    },
    {
      icon: <SiVuedotjs />,
      name: "Vue.js",
    },
    {
      icon: <FaFigma />,
      name: "Figma",
    },
    {
      icon: <FaNodeJs />,
      name: "Node.js",
    },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind CSS",
    },
    {
      icon: <SiRedux />,
      name: "Redux",
    },

    {
      icon: <SiPython />,
      name: "Python",
    },
    {
      icon: <SiDocker />,
      name: "Docker",
    },
    {
      icon: <SiPostgresql />,
      name: "PostgreSQL",
    },
    {
      icon: <FaAws />,
      name: "AWS",
    },
    {
      icon: <SiApacheairflow />,
      name: "Apache Airflow",
    },
  ],
};

const Resume = () => {
  const t = useTranslations("resume");
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
      },
      {
        company: t("experience.items.1.company"),
        position: t("experience.items.1.position"),
        duration: t("experience.items.1.duration"),
      },
    ],
  };

  //education data
  const education = {
    icon: "/assets/resume/cap.svg",
    title: t("education.title"),
    description: t("education.description"),
    items: [
      {
        institution: t("education.items.0.institution"),
        degree: t("education.items.0.degree"),
        duration: t("education.items.0.duration"),
      },
      {
        institution: t("education.items.1.institution"),
        degree: t("education.items.1.degree"),
        duration: t("education.items.1.duration"),
      },
      {
        institution: t("education.items.2.institution"),
        degree: t("education.items.2.degree"),
        duration: t("education.items.2.duration"),
      },
      {
        institution: t("education.items.3.institution"),
        degree: t("education.items.3.degree"),
        duration: t("education.items.3.duration"),
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
                          className=" bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          {" "}
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {item.position}
                          </h3>
                          <div className="flex items-center">
                            <span className=" h-[6px] rounded-full"></span>
                            <p className="text-white/60">{item.company}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="education" className="w-full">
              <div className=" flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-2xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {education.description}
                </p>
                <ScrollArea className="h-[480px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className=" bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          {" "}
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[280px] min-h-[60px] text-center lg:text-left">
                            {item.degree}
                          </h3>
                          <div className="flex items-center ">
                            <span className="h-[10px] rounded-full"></span>
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap[30px] gap-4">
                  {skills.skillList.map((skill, index) => {
                    return (
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
                    );
                  })}
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
