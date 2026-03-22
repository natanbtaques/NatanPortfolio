"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useRef } from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { MdDragIndicator } from "react-icons/md";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

/* ─── animation variants ──────────────────────────────────────────────────── */
const slideUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── single project card ─────────────────────────────────────────────────── */
const ProjectCard = ({ project, isDragging, t }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => !isDragging && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        y: hovered ? -12 : 0,
        scale: hovered ? 1.025 : 1,
        boxShadow: hovered
          ? "0 32px 64px -16px rgba(0,0,0,0.7), 0 0 0 1px rgba(104,143,227,0.25)"
          : "0 4px 20px -4px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative w-[270px] xl:w-[310px] h-[420px] rounded-2xl overflow-hidden shrink-0 bg-[#1a1a24] select-none"
    >
      {/* ── image ─────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* blurred fill — same image scaled + blurred as background */}
        <Image
          src={project.image}
          alt=""
          fill
          draggable={false}
          aria-hidden
          className="object-cover scale-110 blur-xl opacity-50 pointer-events-none"
        />
        {/* actual image — fully visible, centered */}
        <motion.div
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            draggable={false}
            className="object-contain pointer-events-none"
          />
        </motion.div>
      </div>

      {/* ── base gradient ─────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* ── accent glow on hover ──────────────────── */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent"
      />

      {/* ── content ───────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {/* number + category */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] text-accent/50 tracking-widest">
            {project.num}
          </span>
          {project.category && (
            <span className="px-2 py-0.5 text-[9px] font-bold bg-accent text-primary rounded-full uppercase tracking-widest">
              {project.category}
            </span>
          )}
        </div>

        {/* title */}
        <h3 className="text-base font-bold text-white leading-snug mb-2">
          {project.title}
        </h3>

        {/* stack tags — all shown */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.stack.map((item, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-[10px] border border-white/15 rounded-full bg-black/40 text-white/70 backdrop-blur-sm"
            >
              {item.name}
            </span>
          ))}
        </div>

        {/* description + links — reveal on hover */}
        <motion.div
          animate={{
            height: hovered ? "auto" : 0,
            opacity: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <p className="text-white/55 text-[11px] leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>
          <div className="flex gap-5">
            {project.live?.trim() && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => isDragging && e.preventDefault()}
                className="flex items-center gap-1.5 text-[11px] text-accent hover:brightness-125 transition-all"
              >
                <BsArrowUpRight />
                {t("liveProject")}
              </Link>
            )}
            {project.github?.trim() && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => isDragging && e.preventDefault()}
                className="flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white transition-all"
              >
                <BsGithub />
                GitHub
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─── work section ────────────────────────────────────────────────────────── */
const Work = () => {
  const t = useTranslations("work");
  const constraintsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const projects = [
    {
      num: "01", category: "FullStack",
      title: t("projects.0.title"), description: t("projects.0.description"),
      stack: [{ name: "Next.js" }, { name: "Nest.js" }, { name: "Tailwind CSS" }, { name: "TypeScript" }, { name: "Crawlers" }],
      image: "/assets/coolhunting.png", live: "", github: "",
    },
    {
      num: "02", category: "Mobile",
      title: t("projects.1.title"), description: t("projects.1.description"),
      stack: [{ name: "React Native" }, { name: "Nest.js" }, { name: "Expo Go" }, { name: "Reanimated" }, { name: "NativeWind" }],
      image: "/assets/conecthunt.png", live: "", github: "",
    },
    {
      num: "03", category: "Frontend",
      title: t("projects.2.title"), description: t("projects.2.description"),
      stack: [{ name: "Next.js" }, { name: "Tailwind CSS" }, { name: "Supabase" }, { name: "BFF" }],
      image: "/assets/movart-express.png", live: "", github: "",
    },
    {
      num: "04", category: "FullStack",
      title: t("projects.3.title"), description: t("projects.3.description"),
      stack: [{ name: "Vue.js" }, { name: "Python" }, { name: "Apache Airflow" }, { name: "Docker" }, { name: "Node.js" }],
      image: "/assets/saas-automa.png", live: "", github: "",
    },
    {
      num: "05", category: "Frontend",
      title: t("projects.4.title"), description: t("projects.4.description"),
      stack: [{ name: "TypeScript" }, { name: "React" }, { name: "Redux" }, { name: "Tailwind CSS" }, { name: "Stripe" }, { name: "Next Auth" }, { name: "Vercel" }],
      image: "/assets/goshopImage.png",
      live: "https://go-shop-ecommerce.vercel.app/",
      github: "https://github.com/natanbtaques/goSHOP_Ecommerce",
    },
    {
      num: "06", category: "Frontend",
      title: t("projects.5.title"), description: t("projects.5.description"),
      stack: [{ name: "JavaScript" }, { name: "Jest" }, { name: "Next.js" }, { name: "Tailwind CSS" }],
      image: "/assets/ink_and_ideas.png",
      live: "https://inknideas-natanbtaques-projects.vercel.app/home",
      github: "https://github.com/natanbtaques/blog-entre-linhas",
    },
    {
      num: "07", category: "Frontend",
      title: t("projects.6.title"), description: t("projects.6.description"),
      stack: [{ name: "JavaScript" }, { name: "Next.js" }, { name: "Tailwind CSS" }],
      image: "/assets/portfolio.png",
      live: "https://natan-portfolio-chi.vercel.app/",
      github: "https://github.com/natanbtaques/NatanPortfolio",
    },
    {
      num: "08", category: "Frontend",
      title: t("projects.7.title"), description: t("projects.7.description"),
      stack: [{ name: "Tailwind CSS" }, { name: "Chart.js" }, { name: "Vercel" }],
      image: "/assets/dashboard.png",
      live: "https://next-dashboard-flame-five.vercel.app/",
      github: "https://github.com/natanbtaques/NextDashboard",
    },
    {
      num: "09", category: "FullStack",
      title: t("projects.8.title"), description: t("projects.8.description"),
      stack: [{ name: "Next.js" }, { name: "Tailwind CSS" }, { name: "Node.js" }, { name: "MongoDB" }],
      image: "/assets/saborsocial.png",
      live: "", github: "https://github.com/natanbtaques/SaborSocial_Plataform",
    },
    {
      num: "10", category: "API",
      title: t("projects.9.title"), description: t("projects.9.description"),
      stack: [{ name: "Node.js" }, { name: "Express" }, { name: "JavaScript" }],
      image: "/assets/api.png",
      live: "", github: "https://github.com/natanbtaques/tickets---API",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-80px" }}
      variants={slideUp}
      className="py-12"
    >
      {/* slider */}
      <div ref={constraintsRef} className="overflow-hidden relative">
        {/* right fade — hints at more cards */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#13131E] to-transparent z-10" />

        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.04}
          dragTransition={{ bounceStiffness: 250, bounceDamping: 28 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setTimeout(() => setIsDragging(false), 80)}
          className="flex gap-5 w-max py-8 cursor-grab active:cursor-grabbing"
          style={{
            paddingLeft: "max(1rem, calc((100vw - 1200px) / 2 + 15px))",
            paddingRight: "8rem",
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              isDragging={isDragging}
              t={t}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Work;
