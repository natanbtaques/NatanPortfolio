"use client";

import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { BsArrowUpRight, BsGithub, BsXLg, BsBriefcase, BsChevronDown, BsCheck2 } from "react-icons/bs";
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
  // Esc closes; page behind stays locked while the dialog is open
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  /* shared panel content */
  const panelContent = (
    <>
      {/* image */}
      <div className="relative h-56 bg-black/50 shrink-0" style={{ height: "14rem" }}>
        <Image src={project.image} alt={project.title} fill sizes="(max-width: 1280px) 100vw, 700px" className="object-contain" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a24] via-black/10 to-transparent" />
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
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
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          className="fixed bottom-0 left-0 right-0 z-50 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-[#1a1a24] border-t border-x border-accent/20"
        >
          {panelContent}
        </motion.div>
      </>
    );
  }

  /* desktop: backdrop catches clicks (closes the dialog, blocks the cards behind) +
     centering wrapper using flexbox (avoids Framer Motion transform conflict with CSS translate) */
  return (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]"
      />
      <motion.div
        key="centering"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          className="pointer-events-auto w-[700px] max-h-[80vh] overflow-y-auto rounded-2xl bg-[#1a1a24] border border-accent/20">
          {panelContent}
        </div>
      </motion.div>
    </>
  );
};

/* ─── single project card ─────────────────────────────────────────────────── */
// `ref` is forwarded so AnimatePresence "popLayout" can measure exiting cards (React 19 ref-as-prop)
const ProjectCard = ({ ref, project, isDragging, t, onExpand, activeTech, onTechClick }) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (!isDragging) onExpand(project);
  };

  // Enter / Space open the card — only when the card itself is focused, not one of its tag buttons
  const handleKeyDown = (e) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onExpand(project);
    }
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      onHoverStart={() => !isDragging && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={project.title}
      animate={{
        opacity: 1,
        y: hovered ? -12 : 0,
        scale: hovered ? 1.025 : 1,
        boxShadow: hovered
          ? "0 32px 64px -16px rgba(0,0,0,0.7), 0 0 0 1px rgba(104,143,227,0.25)"
          : "0 4px 20px -4px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative w-[270px] xl:w-[310px] h-[420px] rounded-2xl overflow-hidden shrink-0 bg-[#1a1a24] select-none cursor-pointer flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {/* image — framed, fills the box */}
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden border-b border-white/5">
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
            className="object-cover pointer-events-none"
          />
        </motion.div>
        {project.category && (
          <span className="absolute top-3 right-3 px-2 py-0.5 text-[9px] font-bold bg-accent text-primary rounded-full uppercase tracking-widest shadow-md">
            {project.category}
          </span>
        )}
      </div>

      {/* content */}
      <div className="flex-1 p-5 flex flex-col">
        <span className="font-mono text-[11px] text-accent/50 tracking-widest mb-1">{project.num}</span>
        <h3 className="text-base font-bold text-white leading-snug mb-3">{project.title}</h3>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((item, i) => {
            const isActive = activeTech === item.name;
            return (
              <button
                key={i}
                type="button"
                title={t("filters.byTech", { tech: item.name })}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isDragging) onTechClick(isActive ? null : item.name);
                }}
                className={`px-2 py-0.5 text-[10px] border rounded-full transition-colors duration-200 ${
                  isActive
                    ? "border-accent bg-accent text-primary font-semibold"
                    : "border-white/15 bg-black/40 text-white/70 hover:border-accent/60 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── filter bar ──────────────────────────────────────────────────────────────
   Uma linha: abas de categoria (pílula deslizante) + interruptor
   "só profissionais". O filtro por tecnologia vem das tags dos cards.
   No mobile as abas viram um dropdown, para caber tudo em uma linha.       */
const CATEGORIES = ["all", "Frontend", "FullStack", "Mobile", "API"];
const PillButton = ({ active, onClick, layoutId, disabled, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 whitespace-nowrap ${
      active ? "text-primary" : disabled ? "text-white/20 cursor-not-allowed" : "text-white/60 hover:text-white"
    }`}
  >
    {active && (
      <motion.span
        layoutId={layoutId}
        className="absolute inset-0 rounded-full bg-accent"
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
      />
    )}
    <span className="relative z-10">{children}</span>
  </button>
);

/* companies behind the professional projects — shown in the toggle when it is on */
const COMPANIES = [
  { name: "Move Agro",    logo: "/assets/companies/logo-ma.png" },
  { name: "eNe Soluções", logo: "/assets/companies/clients/ene.logo.png" },
  // clientes — ocultos por enquanto
  // { name: "WAP",       logo: "/assets/companies/clients/wap.png" },
  // { name: "Movart",    logo: "/assets/companies/clients/movart.png" },
  { name: "Automa",       logo: "/assets/companies/automa.png" },
];

const LogoStack = ({ companies }) => (
  <motion.span
    initial={{ opacity: 0, width: 0 }}
    animate={{ opacity: 1, width: "auto" }}
    exit={{ opacity: 0, width: 0 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-center pl-1 overflow-hidden"
  >
    {companies.map((c, i) => (
      <motion.span
        key={c.name}
        title={c.name}
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.05 * i, duration: 0.25 }}
        className={`relative w-[18px] h-[18px] rounded-full bg-white ring-2 ring-[#1a1a24] overflow-hidden shrink-0 ${i ? "-ml-0.5" : ""}`}
        style={{ zIndex: companies.length - i }}
      >
        <Image src={c.logo} alt={c.name} fill sizes="18px" className="object-contain p-[2px]" />
      </motion.span>
    ))}
  </motion.span>
);

/* pill-shaped toggle that matches the tab bar — mini switch + icon + label.
   Off: shows the count. On: the count gives way to the companies logo stack. */
const ToggleChip = ({ on, onToggle, disabled, icon, label, count, compact }) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    onClick={onToggle}
    disabled={disabled}
    className={`flex items-center gap-2 md:gap-2.5 h-[38px] pl-2 pr-3 md:pr-4 shrink-0 rounded-full border text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
      on
        ? "border-accent/60 bg-accent/10 text-white shadow-[0_0_24px_-6px_rgba(104,143,227,0.6)]"
        : disabled
          ? "border-white/5 bg-white/[0.04] text-white/20 cursor-not-allowed"
          : "border-white/5 bg-white/[0.04] text-white/60 hover:text-white hover:border-white/15"
    }`}
  >
    <span className={`relative w-8 h-[18px] rounded-full transition-colors duration-300 ${on ? "bg-accent" : "bg-white/15"}`}>
      <motion.span
        className="absolute top-[3px] w-3 h-3 rounded-full bg-white shadow"
        animate={{ left: on ? 17 : 3 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      />
    </span>
    <span className={on ? "text-accent" : ""}>{icon}</span>
    <span className="hidden min-[380px]:inline">{label}</span>
    <AnimatePresence mode="wait" initial={false}>
      {on && !compact ? (
        <LogoStack key="logos" companies={COMPANIES} />
      ) : (
        <motion.span
          key="count"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="font-mono"
        >
          {count}
        </motion.span>
      )}
    </AnimatePresence>
  </button>
);

/* mobile category picker — same pill look, opens a small list below */
const CategorySelect = ({ t, category, setCategory, catCount }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const label = (cat) => (cat === "all" ? t("filters.all") : cat);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (e.type === "keydown" ? e.key === "Escape" : !ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center w-full h-[38px] gap-2 pl-4 pr-3 rounded-full border text-xs font-semibold transition-colors duration-200 ${
          open ? "border-accent/60 bg-accent/10 text-white" : "border-white/5 bg-white/[0.04] text-white"
        }`}
      >
        <span className="truncate">{label(category)}</span>
        <span className="opacity-60 font-mono">{catCount(category)}</span>
        <BsChevronDown
          size={11}
          className={`ml-auto shrink-0 text-accent transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 p-1 rounded-2xl bg-[#1a1a24] border border-accent/20 shadow-xl shadow-black/40 origin-top"
          >
            {CATEGORIES.map((cat) => {
              const count = catCount(cat);
              const active = category === cat;
              const disabled = count === 0 && !active;
              return (
                <li key={cat} role="option" aria-selected={active}>
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => { setCategory(cat); setOpen(false); }}
                    className={`flex items-center w-full gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      active ? "bg-accent/15 text-accent" : disabled ? "text-white/20" : "text-white/70 active:bg-white/5"
                    }`}
                  >
                    {label(cat)}
                    <span className="opacity-60 font-mono">{count}</span>
                    {active && <BsCheck2 size={14} className="ml-auto" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterBar = ({ t, projects, category, setCategory, onlyPro, setOnlyPro, tech, setTech }) => {
  // counts reflect the other active filters, so an option never promises results it can't show
  const matches = (p, { cat = category, pro = onlyPro } = {}) =>
    (cat === "all" || p.category === cat) &&
    (!pro || p.origin === "pro") &&
    (!tech || p.stack.some((s) => s.name === tech));

  const catCount = (cat) => projects.filter((p) => matches(p, { cat })).length;
  const proCount = projects.filter((p) => matches(p, { pro: true })).length;

  return (
    <div
      className="flex flex-wrap items-center gap-2 md:gap-3 px-4 mb-6"
      style={{ paddingLeft: "max(1rem, calc((100vw - 1200px) / 2 + 15px))", paddingRight: "1rem" }}
    >
      {/* mobile: category dropdown + toggle share one row */}
      <div className="flex md:hidden items-center gap-2 w-full">
        <CategorySelect t={t} category={category} setCategory={setCategory} catCount={catCount} />
        <ToggleChip
          compact
          on={onlyPro}
          onToggle={() => setOnlyPro(!onlyPro)}
          disabled={!onlyPro && proCount === 0}
          icon={<BsBriefcase size={13} />}
          label={t("filters.onlyPro")}
          count={proCount}
        />
      </div>

      <div className="hidden md:flex gap-1 p-1 rounded-full bg-white/[0.04] border border-white/5 w-max max-w-full overflow-x-auto scrollbar-hide">
        {CATEGORIES.map((cat) => {
          const count = catCount(cat);
          return (
            <PillButton
              key={cat}
              layoutId="work-category-pill"
              active={category === cat}
              disabled={count === 0 && category !== cat}
              onClick={() => setCategory(cat)}
            >
              {cat === "all" ? t("filters.all") : cat}
              <span className="ml-1.5 opacity-60 font-mono">{count}</span>
            </PillButton>
          );
        })}
      </div>

      <div className="hidden md:block">
        <ToggleChip
          on={onlyPro}
          onToggle={() => setOnlyPro(!onlyPro)}
          disabled={!onlyPro && proCount === 0}
          icon={<BsBriefcase size={13} />}
          label={t("filters.onlyPro")}
          count={proCount}
        />
      </div>

      {/* tech filter (set from card tags) */}
      <AnimatePresence>
        {tech && (
          <motion.button
            key="tech"
            type="button"
            initial={{ opacity: 0, scale: 0.8, x: -8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setTech(null)}
            className="flex items-center gap-1.5 h-[38px] px-4 rounded-full bg-accent/15 border border-accent/40 text-accent text-xs font-semibold hover:bg-accent/25 transition-colors"
          >
            {tech} <BsXLg size={9} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── work section ────────────────────────────────────────────────────────── */
const Work = () => {
  const t = useTranslations("work");
  const constraintsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [category, setCategory] = useState("all");
  const [onlyPro, setOnlyPro] = useState(false);
  const [tech, setTech] = useState(null);
  // drag offset — reset when the filtered list changes so cards never sit off-screen
  const dragX = useMotionValue(0);
  useEffect(() => {
    animate(dragX, 0, { type: "spring", stiffness: 260, damping: 32 });
  }, [category, onlyPro, tech, dragX]);
  // isMobile is only used for the modal variant (bottom sheet vs centered) — safe after client mount
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const projects = [
    {
      num: "01", category: "Frontend", origin: "pro",
      title: t("projects.0.title"), description: t("projects.0.description"),
      stack: [{ name: "Next.js" }, { name: "React" }, { name: "TypeScript" }, { name: "Tailwind CSS" }, { name: "Framer Motion" }, { name: "React Hook Form" }, { name: "Zod" }, { name: "Azure Static Web Apps" }],
      image: "/assets/moveagro.png", live: "https://www.moveagro.com.br/", github: "",
    },
    {
      num: "02", category: "FullStack", origin: "pro",
      title: t("projects.1.title"), description: t("projects.1.description"),
      stack: [{ name: "Next.js" }, { name: "React" }, { name: "TypeScript" }, { name: "Tailwind CSS" }, { name: "NestJS" }, { name: "TypeORM" }, { name: "PostgreSQL" }, { name: "JWT" }, { name: "Azure Blob Storage" }, { name: "Docker" }, { name: "Azure DevOps" }],
      image: "/assets/moveagro-portal.png", live: "https://consultoria.moveagro.com.br/login?redirect=%2F", github: "",
    },
    {
      num: "03", category: "Frontend", origin: "pro",
      title: t("projects.2.title"), description: t("projects.2.description"),
      stack: [{ name: "Next.js" }, { name: "React" }, { name: "TypeScript" }, { name: "Tailwind CSS" }, { name: "shadcn/ui" }, { name: "Recharts" }, { name: "next-intl" }, { name: "JWT" }, { name: "Docker" }, { name: "Azure Pipelines" }],
      image: "/assets/colheitamais.png", live: "https://colheitamais.moveagro.com.br/login", github: "",
    },
    {
      num: "04", category: "Mobile", origin: "pro",
      title: t("projects.3.title"), description: t("projects.3.description"),
      stack: [{ name: "Flutter" }, { name: "Dart" }, { name: "MVVM" }, { name: "Drift (SQLite)" }, { name: "Firebase" }, { name: "go_router" }, { name: "i18n" }, { name: "Azure DevOps" }],
      image: "/assets/colheitamais-app.png", live: "https://play.google.com/store/apps/details?id=br.com.moveagro.colheita_mais&hl=pt_BR", github: "",
    },
    {
      num: "05", category: "FullStack", origin: "pro",
      title: t("projects.4.title"), description: t("projects.4.description"),
      stack: [{ name: "Next.js" }, { name: "NestJS" }, { name: "Tailwind CSS" }, { name: "TypeScript" }, { name: "Crawlers" }],
      image: "/assets/coolhunting-cover.png", live: "https://coolhunting.wap.com.br/login", github: "",
    },
    {
      num: "06", category: "Mobile", origin: "pro",
      title: t("projects.5.title"), description: t("projects.5.description"),
      stack: [{ name: "React Native" }, { name: "NestJS" }, { name: "Expo Go" }, { name: "Reanimated" }, { name: "NativeWind" }],
      image: "/assets/conecthunt-cover.png", live: "https://play.google.com/store/apps/details?id=com.tiwap.connecthunt&hl=pt_BR", github: "",
    },
    {
      num: "07", category: "Frontend", origin: "pro",
      title: t("projects.6.title"), description: t("projects.6.description"),
      stack: [{ name: "Next.js" }, { name: "Tailwind CSS" }, { name: "Supabase" }, { name: "BFF" }],
      image: "/assets/movart-express.png", live: "", github: "",
    },
    {
      num: "08", category: "FullStack", origin: "pro",
      title: t("projects.7.title"), description: t("projects.7.description"),
      stack: [{ name: "Vue.js" }, { name: "Python" }, { name: "Apache Airflow" }, { name: "Docker" }, { name: "Node.js" }],
      image: "/assets/saas-automa.png", live: "", github: "",
    },
    {
      num: "09", category: "Frontend", origin: "personal",
      title: t("projects.8.title"), description: t("projects.8.description"),
      stack: [{ name: "TypeScript" }, { name: "React" }, { name: "Redux" }, { name: "Tailwind CSS" }, { name: "Stripe" }, { name: "Next Auth" }, { name: "Vercel" }],
      image: "/assets/goshopImage.png",
      live: "https://go-shop-ecommerce.vercel.app/",
      github: "https://github.com/natanbtaques/goSHOP_Ecommerce",
    },
    // Ink and Ideas Blog — oculto, não utilizado no portfólio
    // {
    //   num: "--", category: "Frontend",
    //   title: t("projects.9.title"), description: t("projects.9.description"),
    //   stack: [{ name: "JavaScript" }, { name: "Jest" }, { name: "Next.js" }, { name: "Tailwind CSS" }],
    //   image: "/assets/ink_and_ideas.png",
    //   live: "https://inknideas-natanbtaques-projects.vercel.app/home",
    //   github: "https://github.com/natanbtaques/blog-entre-linhas",
    // },
    {
      num: "10", category: "Frontend", origin: "personal",
      title: t("projects.10.title"), description: t("projects.10.description"),
      stack: [{ name: "JavaScript" }, { name: "Next.js" }, { name: "Tailwind CSS" }],
      image: "/assets/portfolio.png",
      live: "https://natan-portfolio-chi.vercel.app/",
      github: "https://github.com/natanbtaques/NatanPortfolio",
    },
    // Dashboard Next — oculto, não utilizado no portfólio
    // {
    //   num: "--", category: "Frontend",
    //   title: t("projects.11.title"), description: t("projects.11.description"),
    //   stack: [{ name: "Tailwind CSS" }, { name: "Chart.js" }, { name: "Vercel" }],
    //   image: "/assets/dashboard.png",
    //   live: "https://next-dashboard-flame-five.vercel.app/",
    //   github: "https://github.com/natanbtaques/NextDashboard",
    // },
    {
      num: "11", category: "FullStack", origin: "personal",
      title: t("projects.12.title"), description: t("projects.12.description"),
      stack: [{ name: "Next.js" }, { name: "Tailwind CSS" }, { name: "Node.js" }, { name: "MongoDB" }],
      image: "/assets/saborsocial.png",
      live: "", github: "https://github.com/natanbtaques/SaborSocial_Plataform",
    },
    {
      num: "12", category: "API", origin: "personal",
      title: t("projects.13.title"), description: t("projects.13.description"),
      stack: [{ name: "Node.js" }, { name: "Express" }, { name: "JavaScript" }],
      image: "/assets/api.png",
      live: "", github: "https://github.com/natanbtaques/tickets---API",
    },
  ];

  const closeProject = useCallback(() => setActiveProject(null), []);

  const visibleProjects = projects.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (!onlyPro || p.origin === "pro") &&
      (!tech || p.stack.some((s) => s.name === tech))
  );

  const showMobileList = !mounted || isMobile;
  const showDesktopList = !mounted || !isMobile;

  const renderCards = (dragging) => (
    <AnimatePresence mode="popLayout">
      {visibleProjects.map((project) => (
        <ProjectCard
          key={project.num}
          project={project}
          isDragging={dragging}
          t={t}
          onExpand={setActiveProject}
          activeTech={tech}
          onTechClick={setTech}
        />
      ))}
    </AnimatePresence>
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-80px" }}
      variants={slideUp}
      className="py-12"
    >
      {mounted && createPortal(
        <AnimatePresence>
          {activeProject && (
            <ProjectDetail
              key="detail"
              project={activeProject}
              onClose={closeProject}
              t={t}
              isMobile={isMobile}
            />
          )}
        </AnimatePresence>,
        document.body
      )}

      <FilterBar
        t={t}
        projects={projects}
        category={category}
        setCategory={setCategory}
        onlyPro={onlyPro}
        setOnlyPro={setOnlyPro}
        tech={tech}
        setTech={setTech}
      />

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
        <span className="text-white/25 text-[11px] tracking-[0.15em] font-light xl:hidden">{t("hintTap")}</span>
        <span className="text-white/25 text-[11px] tracking-[0.15em] font-light hidden xl:inline">{t("hintClick")}</span>
      </motion.div>

      {/* ── Mobile: native smooth horizontal scroll (hidden on xl+) ── */}
      <div className="xl:hidden overflow-x-auto scrollbar-hide">
        <div className="relative flex gap-5 py-8" style={{ paddingLeft: "1rem", paddingRight: "1rem", width: "max-content" }}>
          {showMobileList && renderCards(false)}
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
          style={{ x: dragX, paddingLeft: "max(1rem, calc((100vw - 1200px) / 2 + 15px))", paddingRight: "8rem" }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setTimeout(() => setIsDragging(false), 80)}
          className="relative flex gap-5 w-max py-8 cursor-grab active:cursor-grabbing"
        >
          {showDesktopList && renderCards(isDragging)}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Work;
