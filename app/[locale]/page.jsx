"use client";

import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import TechMarquee from "@/components/TechMarquee";
import { useTranslations } from "next-intl";

import Services from "./services/page";
import Resume from "./resume/page";
import Work from "./work/page";
import Contact from "./contact/page";

/* ── Section backgrounds ────────────────────────────────────────────────────
   Dark palette que complementa o accent #688FE3
   hero     → #1F1F26  (primary — default do body)
   services → #1C1B2E  (violet-navy)
   resume   → #171726  (indigo profundo)
   work     → #13131E  (quase-preto azulado)
   contact  → #1A1929  (roxo escuro)                                         */

/* ── Section divider ────────────────────────────────────────────────────────
   Number badge  •  pulsing dot  •  label  •  gradient line                  */
const SectionDivider = ({ label, number }) => (
  <div className="container mx-auto py-14">
    <div className="flex items-center gap-4">
      <span className="font-mono text-[11px] text-accent/40 tracking-widest select-none">
        {number}
      </span>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-40 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/40">
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-accent/30 via-accent/10 to-transparent" />
    </div>
  </div>
);

const Locale = () => {
  const t = useTranslations();

  return (
    <main>
      {/* ── Hero — bg: #1F1F26 (primary) ─────────────────────────────── */}
      <section id="hero" className="pb-24">
        <div className="container mx-auto h-full">
          <div className="flex flex-col items-center justify-between xl:flex-row xl:pt-10 xl:pb-2">
            <div className="text-center xl:text-left order-2 xl:order-none">
              <span className="text-lg">{t("softwareDeveloper")}</span>
              <h1 className="h1 mt-2">
                {t("hello")} <br />
                <span className="text-accent">Natan Taques</span>
              </h1>
              <p className="max-w-[500px] mb-5 mt-2 text-white/80 text-sm xl:text-base">
                {t("description")}
              </p>
              <div className="flex flex-col xl:flex-row items-center gap-5">
                <a
                  href="/assets/Curriculo Natan.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase flex items-center gap-2 font-bold border text-accent border-accent rounded-full px-8 p-3 hover:bg-accent hover:text-black transition"
                >
                  <span>{t("downloadCV")}</span>
                  <FiDownload className="text-xl" />
                </a>
                <div className="mb-4 xl:mb-0">
                  <Social
                    containerStyles="flex gap-6"
                    iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary transition-all duration-500"
                  />
                </div>
              </div>
            </div>
            <div>
              <Photo className="order-1 xl:order-none mb-8 xl:mb-0" />
            </div>
          </div>
        </div>
        <Stats />
        <TechMarquee />
      </section>

      {/* ── Services — bg: #1C1B2E (violet-navy) ─────────────────────── */}
      <section id="services" className="pb-32 bg-[#1C1B2E]">
        <SectionDivider label={t("tabs.services")} number="01" />
        <Services />
      </section>

      {/* ── Resume — bg: #171726 (indigo profundo) ───────────────────── */}
      <section id="resume" className="pb-32 bg-[#171726]">
        <SectionDivider label={t("tabs.resume")} number="02" />
        <Resume />
      </section>

      {/* ── Work — bg: #13131E (quase-preto azulado) ─────────────────── */}
      <section id="work" className="pb-32 bg-[#13131E]">
        <SectionDivider label={t("tabs.work")} number="03" />
        <Work />
      </section>

      {/* ── Contact — bg: #1A1929 (roxo escuro) ──────────────────────── */}
      <section id="contact" className="pb-40 bg-[#1A1929]">
        <SectionDivider label={t("tabs.contact")} number="04" />
        <Contact />
      </section>
    </main>
  );
};

export default Locale;
