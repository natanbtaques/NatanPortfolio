"use client";

import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const calcDuration = (start, end) => {
  const now = new Date();
  const e = end ?? { month: now.getMonth() + 1, year: now.getFullYear() };
  const total = (e.year - start.year) * 12 + (e.month - start.month);
  return { years: Math.floor(total / 12), months: total % 12, total };
};

/* ─── Experience card ─────────────────────────────────────────────────────── */
const ExperienceCard = ({ item, t }) => {
  const isCurrent = !item.endDate;
  const dur = item.startDate ? calcDuration(item.startDate, item.endDate) : null;

  const durLabel = dur
    ? [
        dur.years > 0 && `${dur.years} ${dur.years === 1 ? t("durationYr") : t("durationYrs")}`,
        dur.months > 0 && `${dur.months} ${dur.months === 1 ? t("durationMo") : t("durationMos")}`,
      ]
        .filter(Boolean)
        .join(" · ")
    : null;

  return (
    <div className="bg-[#1e1e28] border border-accent/30 rounded-xl overflow-hidden group hover:border-accent hover:bg-accent/5 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
      <div className="flex">
        {/* accent side bar — solid if current, muted if past */}
        <div className={`w-[3px] flex-shrink-0 ${isCurrent ? "bg-accent" : "bg-accent/30"}`} />

        <div className="flex-1 p-4 relative">
          {item.logo && (
            <div className="absolute top-3 right-3 w-9 h-9 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
              <Image src={item.logo} alt={item.company} width={36} height={36} className="object-contain p-1" />
            </div>
          )}

          {/* date range + current badge */}
          <div className="flex flex-wrap items-center gap-2 mb-1 pr-10">
            <span className="text-accent text-[11px] font-mono font-semibold tracking-wide">
              {item.duration}
            </span>
            {isCurrent && (
              <span className="px-2 py-0.5 bg-accent/15 text-accent text-[9px] font-bold uppercase tracking-widest rounded-full border border-accent/40">
                ● {t("current")}
              </span>
            )}
          </div>

          {/* calculated duration */}
          {durLabel && (
            <p className="text-white/30 text-[10px] mb-3">{durLabel}</p>
          )}

          <h4 className="text-sm font-semibold text-white leading-snug mb-1">{item.position}</h4>
          <p className="text-white/50 text-xs">{item.company}</p>

          {item.clients?.length > 0 && (
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/5">
              <span className="text-white/30 text-[10px]">clientes:</span>
              {item.clients.map((c, i) => (
                <TooltipProvider key={i} delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="w-6 h-6 rounded overflow-hidden bg-white/10 flex items-center justify-center">
                        <Image src={c.logo} alt={c.name} width={24} height={24} className="object-contain p-0.5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent><p>{c.name}</p></TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Education card ──────────────────────────────────────────────────────── */
const EducationCard = ({ item }) => (
  <div className="bg-[#1e1e28] border border-accent/30 rounded-xl p-4 relative group hover:border-accent hover:bg-accent/5 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
    {item.logo && (
      <div className="absolute top-3 right-3 w-9 h-9 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
        <Image src={item.logo} alt={item.institution} width={36} height={36} className="object-contain p-1" />
      </div>
    )}
    {item.itemType === "course" && (
      <span className="inline-block mb-2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest border border-accent/30 text-accent rounded-full">
        curso
      </span>
    )}
    <h4 className="text-sm font-semibold text-white leading-snug mb-1 pr-10">{item.degree}</h4>
    <p className="text-white/50 text-xs">{item.institution}</p>
  </div>
);

/* ─── Alternating Timeline ────────────────────────────────────────────────── */
const AlternatingTimeline = ({ items, type, t }) => (
  <div className="relative">
    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
    <ul className="flex flex-col gap-8">
      {items.map((item, i) => {
        const isLeft = i % 2 === 0;
        // show current year for active jobs, start year otherwise
        const isBadgeCurrent = type === "experience" && !item.endDate;
        const year = isBadgeCurrent
          ? String(new Date().getFullYear())
          : item.duration.match(/\d{4}/)?.[0] ?? "";
        const isCurrent = type === "experience" && !item.endDate;
        return (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-start"
            style={{ gridTemplateColumns: "1fr 48px 1fr" }}
          >
            <div className={isLeft ? "pr-3" : ""}>
              {isLeft && (type === "experience"
                ? <ExperienceCard item={item} t={t} />
                : <EducationCard item={item} />
              )}
            </div>

            {/* year marker */}
            <div className="flex justify-center pt-3 relative z-10">
              <span className={`font-mono text-xs font-bold tracking-wider rounded-full px-2 py-1.5 leading-none shadow-lg ${
                isCurrent
                  ? "text-white bg-accent shadow-accent/40"
                  : "text-white/80 bg-accent/50 shadow-accent/20"
              }`}>
                {year}
              </span>
            </div>

            <div className={!isLeft ? "pl-3" : ""}>
              {!isLeft && (type === "experience"
                ? <ExperienceCard item={item} t={t} />
                : <EducationCard item={item} />
              )}
            </div>
          </motion.li>
        );
      })}
    </ul>
  </div>
);

/* ─── Resume ──────────────────────────────────────────────────────────────── */
const Resume = () => {
  const t = useTranslations("resume");

  const tExp = (key) => t(`experience.${key}`);

  const experienceItems = [
    {
      company: t("experience.items.0.company"),
      position: t("experience.items.0.position"),
      duration: t("experience.items.0.duration"),
      logo: "/assets/companies/ene-solucoes.png",
      startDate: { month: 3, year: 2025 },
      endDate: null,
      clients: [
        { name: "WAP",    logo: "/assets/companies/clients/wap.png" },
        { name: "Movart", logo: "/assets/companies/clients/movart.png" },
      ],
    },
    {
      company: t("experience.items.1.company"),
      position: t("experience.items.1.position"),
      duration: t("experience.items.1.duration"),
      logo: "/assets/companies/guato-digital.png",
      startDate: { month: 6, year: 2024 },
      endDate: { month: 3, year: 2025 },
      clients: [],
    },
    {
      company: t("experience.items.2.company"),
      position: t("experience.items.2.position"),
      duration: t("experience.items.2.duration"),
      logo: "/assets/companies/automa.png",
      startDate: { month: 3, year: 2022 },
      endDate: { month: 9, year: 2024 },
      clients: [
        { name: "CPFLR",              logo: "/assets/companies/clients/CPFLR.png" },
        { name: "Athon Energia",      logo: "/assets/companies/clients/athon_energia.png" },
        { name: "Vale",               logo: "/assets/companies/clients/vale.png" },
        { name: "Pan America Energy", logo: "/assets/companies/clients/PAE.png" },
      ],
    },
  ];

  const educationItems = [
    // Masters primeiro — alinhado com ENE Soluções (ambos em 2026)
    {
      institution: t("education.academic.0.institution"),
      degree: t("education.academic.0.degree"),
      duration: t("education.academic.0.duration"),
      logo: "/assets/universities/ufmt.png",
      itemType: "academic",
    },
    {
      institution: t("education.academic.1.institution"),
      degree: t("education.academic.1.degree"),
      duration: t("education.academic.1.duration"),
      logo: "/assets/universities/unicamp.png",
      itemType: "academic",
    },
    {
      institution: t("education.courses.0.institution"),
      degree: t("education.courses.0.degree"),
      duration: t("education.courses.0.duration"),
      itemType: "course",
    },
    {
      institution: t("education.courses.1.institution"),
      degree: t("education.courses.1.degree"),
      duration: t("education.courses.1.duration"),
      itemType: "course",
    },
    {
      institution: t("education.academic.2.institution"),
      degree: t("education.academic.2.degree"),
      duration: t("education.academic.2.duration"),
      logo: "/assets/universities/ufmt.png",
      itemType: "academic",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className="py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16">

          {/* Experience */}
          <div>
            <div className="mb-8 text-center xl:text-left">
              <h3 className="text-2xl font-bold">{t("experience.title")}</h3>
            </div>
            <AlternatingTimeline items={experienceItems} type="experience" t={tExp} />
          </div>

          {/* Education */}
          <div>
            <div className="mb-8 text-center xl:text-left">
              <h3 className="text-2xl font-bold">{t("education.title")}</h3>
            </div>
            <AlternatingTimeline items={educationItems} type="education" t={tExp} />
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Resume;
