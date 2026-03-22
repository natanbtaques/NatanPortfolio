"use client";

import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

/* ─── Timeline card ───────────────────────────────────────────────────────── */
const TimelineCard = ({ item, type }) => (
  <div className="bg-[#1e1e28] border border-accent/30 rounded-xl p-4 relative group hover:border-accent hover:bg-accent/5 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
    {item.logo && (
      <div className="absolute top-3 right-3 w-9 h-9 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
        <Image
          src={item.logo}
          alt={item.institution ?? item.company}
          width={36} height={36}
          className="object-contain p-1"
        />
      </div>
    )}

    {item.itemType === "course" && (
      <span className="inline-block mb-2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest border border-accent/30 text-accent rounded-full">
        curso
      </span>
    )}

    <h4 className="text-sm font-semibold text-white leading-snug mb-1 pr-10">
      {type === "experience" ? item.position : item.degree}
    </h4>

    <p className="text-white/50 text-xs">
      {type === "experience" ? item.company : item.institution}
    </p>

    {type === "experience" && item.clients?.length > 0 && (
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
);

/* ─── Alternating Timeline ────────────────────────────────────────────────── */
const AlternatingTimeline = ({ items, type }) => (
  <div className="relative">
    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
    <ul className="flex flex-col gap-8">
      {items.map((item, i) => {
        const isLeft = i % 2 === 0;
        const year = item.duration.match(/\d{4}/g)?.pop() ?? "";
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
              {isLeft && <TimelineCard item={item} type={type} />}
            </div>

            {/* year marker */}
            <div className="flex justify-center pt-3 relative z-10">
              <span className="font-mono text-xs font-bold text-white tracking-wider bg-accent rounded-full px-2 py-1.5 leading-none shadow-lg shadow-accent/30">
                {year}
              </span>
            </div>

            <div className={!isLeft ? "pl-3" : ""}>
              {!isLeft && <TimelineCard item={item} type={type} />}
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

  const experienceItems = [
    {
      company: t("experience.items.0.company"),
      position: t("experience.items.0.position"),
      duration: t("experience.items.0.duration"),
      logo: "/assets/companies/ene-solucoes.png",
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
      clients: [],
    },
    {
      company: t("experience.items.2.company"),
      position: t("experience.items.2.position"),
      duration: t("experience.items.2.duration"),
      logo: "/assets/companies/automa.png",
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
            <AlternatingTimeline items={experienceItems} type="experience" />
          </div>

          {/* Education */}
          <div>
            <div className="mb-8 text-center xl:text-left">
              <h3 className="text-2xl font-bold">{t("education.title")}</h3>
            </div>
            <AlternatingTimeline items={educationItems} type="education" />
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Resume;
