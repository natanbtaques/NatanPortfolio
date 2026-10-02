"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import {
  FaHtml5, FaCss3, FaJs, FaReact, FaFigma,
  FaNodeJs, FaAws,
} from "react-icons/fa";
import {
  SiTailwindcss, SiRedux, SiNextdotjs, SiPython,
  SiDocker, SiPostgresql, SiTypescript, SiApacheairflow,
  SiVuedotjs, SiSupabase, SiNestjs, SiExpo,
} from "react-icons/si";
import { TbBrandReactNative, TbRoute } from "react-icons/tb";
import { GiBearFace } from "react-icons/gi";

const techs = [
  { icon: <FaHtml5 />,             name: "HTML5" },
  { icon: <FaCss3 />,              name: "CSS3" },
  { icon: <FaJs />,                name: "JavaScript" },
  { icon: <SiTypescript />,        name: "TypeScript" },
  { icon: <FaReact />,             name: "React.js" },
  { icon: <SiNextdotjs />,         name: "Next.js" },
  { icon: <SiVuedotjs />,          name: "Vue.js" },
  { icon: <SiTailwindcss />,       name: "Tailwind CSS" },
  { icon: <SiRedux />,             name: "Redux" },
  { icon: <FaFigma />,             name: "Figma" },
  { icon: <FaNodeJs />,            name: "Node.js" },
  { icon: <SiNestjs />,            name: "NestJS" },
  { icon: <SiPython />,            name: "Python" },
  { icon: <SiPostgresql />,        name: "PostgreSQL" },
  { icon: <SiSupabase />,          name: "Supabase" },
  { icon: <TbBrandReactNative />,  name: "React Native" },
  { icon: <SiExpo />,              name: "Expo" },
  { icon: <SiTailwindcss />,       name: "NativeWind" },
  { icon: <GiBearFace />,          name: "Zustand" },
  { icon: <TbRoute />,             name: "Expo Router" },
  { icon: <SiDocker />,            name: "Docker" },
  { icon: <FaAws />,               name: "AWS" },
  { icon: <SiApacheairflow />,     name: "Apache Airflow" },
];

const TechMarquee = () => {
  // solid bar everywhere; only at the very end of the page it turns transparent
  // so it blends into the contact band instead of covering it
  const [atEnd, setAtEnd] = useState(false);
  useEffect(() => {
    const check = () => {
      const { scrollHeight } = document.documentElement;
      setAtEnd(window.innerHeight + window.scrollY >= scrollHeight - 2);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 py-3 overflow-hidden border-t transition-colors duration-500 ${
        atEnd ? "bg-transparent border-transparent" : "bg-primary border-white/5"
      }`}
    >
      <Marquee gradient={false} speed={40} pauseOnHover>
        {techs.map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-2 mx-6 text-white/50 hover:text-accent transition-colors duration-300 cursor-default"
          >
            <span className="text-2xl">{tech.icon}</span>
            <span className="text-sm font-medium">{tech.name}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default TechMarquee;
