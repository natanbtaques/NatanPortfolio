"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { BsArrowUpRight, BsGithub, BsXLg } from "react-icons/bs";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

/* ─── animation variants ──────────────────────────────────────────────────── */
const slideUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Project Detail Modal ────────────────────────────────────────────────── */
const ProjectDetail = ({ project, onClose, t, isMobile }) => {
  /* shared panel content */
  const panelContent = (
    <>
      {/* image */}
      <div className="relative h-56 bg-black/50 shrink-0" style={{ height: "14rem" }}>
        <Image src={project.image} alt={project.title} fill sizes="(max-width: 1280px) 100vw, 700px" className="object-contain" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a24] via-black/10 to-transparent" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white/70 hover:text-white transition-all"
        >
          <BsXLg size={12} />
        </button>
        {project.category && (
          <span className="absolute top-4 left-4 px-2 py-0.5 text-[9px] font-bold bg-accent text-primary rounded-full uppercase tracking-widest">
            {project.category}
          </span>
        )}
      </div>
      {/* body */}
      <div className="p-6">
        <span className="font-mono text-[11px] text-accent/50 tracking-widest">{project.num}</span>
        <h3 className="text-2xl font-bold text-white mt-1 mb-3">{project.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-5">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((s, i) => (
            <span key={i} className="px-2.5 py-1 text-[11px] border border-white/15 rounded-full bg-black/40 text-white/70">
              {s.name}
            </span>
          ))}
        </div>
        <div className="flex gap-3 pb-8">
          {project.live?.trim() && (
            <Link href={project.live} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-accent text-primary text-sm font-semibold rounded-xl hover:brightness-110 transition-all">
              <BsArrowUpRight /> {t("liveProject")}
            </Link>
          )}
          {project.github?.trim() && (
            <Link href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white/70 text-sm font-semibold rounded-xl hover:border-white/40 hover:text-white transition-all">
              <BsGithub /> GitHub
            </Link>
          )}
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        {/* mobile: dark backdrop + bottom sheet */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        />
        <motion.div
          key="sheet"
          initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-[#1a1a24] border-t border-x border-accent/20"
        >
          {panelContent}
        </motion.div>
      </>
    );
  }

  /* desktop: subtle backdrop (pointer-events-none so card hover keeps working) +
     centering wrapper using flexbox (avoids Framer Motion transform conflict with CSS translate) */
  return (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] pointer-events-none"
      />
      <motion.div
        key="centering"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      >
        <div className="pointer-events-auto w-[700px] max-h-[80vh] overflow-y-auto rounded-2xl bg-[#1a1a24] border border-accent/20">
          {panelContent}
        </div>
      </motion.div>
    </>
  );
};

/* ─── single project card ─────────────────────────────────────────────────── */
const ProjectCard = ({ project, isDragging, t, onExpand }) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (!isDragging) onExpand(project);
  };

  return (
    <motion.div
      onHoverStart={() => !isDragging && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      animate={{
        y: hovered ? -12 : 0,
        scale: hovered ? 1.025 : 1,
        boxShadow: hovered
          ? "0 32px 64px -16px rgba(0,0,0,0.7), 0 0 0 1px rgba(104,143,227,0.25)"
          : "0 4px 20px -4px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative w-[270px] xl:w-[310px] h-[420px] rounded-2xl overflow-hidden shrink-0 bg-[#1a1a24] select-none cursor-pointer"
    >
      {/* image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="310px"
          draggable={false}
          aria-hidden
          className="object-cover scale-110 blur-xl opacity-50 pointer-events-none"
        />
        <motion.div
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1280px) 270px, 310px"
            draggable={false}
            className="object-contain pointer-events-none"
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent"
      />

      {/* content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] text-accent/50 tracking-widest">{project.num}</span>
          {project.category && (
            <span className="px-2 py-0.5 text-[9px] font-bold bg-accent text-primary rounded-full uppercase tracking-widest">
              {project.category}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-white leading-snug mb-2">{project.title}</h3>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((item, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-[10px] border border-white/15 rounded-full bg-black/40 text-white/70 backdrop-blur-sm"
            >
              {item.name}
            </span>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

/* ─── work section ────────────────────────────────────────────────────────── */
const Work = () => {
  const t = useTranslations("work");
  const constraintsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  // isMobile is only used for the modal variant (bottom sheet vs centered) — safe after client mount
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
      <AnimatePresence>
        {activeProject && (
          <ProjectDetail
            key="detail"
            project={activeProject}
            onClose={() => setActiveProject(null)}
            t={t}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>

      {/* ── click hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
        className="flex items-center gap-2 px-4 mb-3"
        style={{ paddingLeft: "max(1rem, calc((100vw - 1200px) / 2 + 15px))" }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-40" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent/50" />
        </span>
        <span className="text-white/25 text-[11px] tracking-[0.15em] font-light xl:hidden">toque para explorar</span>
        <span className="text-white/25 text-[11px] tracking-[0.15em] font-light hidden xl:inline">clique para explorar</span>
      </motion.div>

      {/* ── Mobile: native smooth horizontal scroll (hidden on xl+) ── */}
      <div className="xl:hidden overflow-x-auto scrollbar-hide">
        <div className="flex gap-5 py-8" style={{ paddingLeft: "1rem", paddingRight: "1rem", width: "max-content" }}>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} isDragging={false} t={t} onExpand={setActiveProject} />
          ))}
        </div>
      </div>

      {/* ── Desktop: Framer Motion drag (hidden below xl) ── */}
      <div ref={constraintsRef} className="hidden xl:block overflow-hidden relative">
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#13131E] to-transparent z-10" />
        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.04}
          dragTransition={{ bounceStiffness: 250, bounceDamping: 28 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setTimeout(() => setIsDragging(false), 80)}
          className="flex gap-5 w-max py-8 cursor-grab active:cursor-grabbing"
          style={{ paddingLeft: "max(1rem, calc((100vw - 1200px) / 2 + 15px))", paddingRight: "8rem" }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} isDragging={isDragging} t={t} onExpand={setActiveProject} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Work;
