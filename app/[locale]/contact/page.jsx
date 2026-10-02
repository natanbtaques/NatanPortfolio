"use client";

import { FaLinkedinIn, FaWhatsapp, FaRegEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Logo mark (vetorial, nítido em qualquer tamanho) ─────────────────────── */
const LogoMark = ({ className }) => (
  <svg viewBox="0 140 500 250" className={className} aria-hidden>
    <defs>
      <linearGradient id="lm-a" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#7B8FF0" />
        <stop offset="1" stopColor="#8E54E0" />
      </linearGradient>
      <linearGradient id="lm-b" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#8E54E0" />
        <stop offset="1" stopColor="#7FA0F5" />
      </linearGradient>
    </defs>
    <g fill="none" strokeLinecap="round" strokeWidth="46">
      <line x1="152" y1="213" x2="35" y2="272" stroke="url(#lm-a)" />
      <line x1="35" y1="275" x2="155" y2="327" stroke="url(#lm-b)" />
      <line x1="278" y1="180" x2="232" y2="355" stroke="#7FA0F5" />
      <line x1="342" y1="215" x2="468" y2="265" stroke="url(#lm-a)" />
      <line x1="468" y1="268" x2="350" y2="322" stroke="#7FA0F5" />
    </g>
  </svg>
);

/* ─── Contact band ────────────────────────────────────────────────────────────
   Faixa compacta com o logo "sangrando" para a seção anterior,
   frase empilhada à esquerda e links diretos à direita.                     */
const Contact = () => {
  const t = useTranslations("contact");

  const links = [
    {
      icon: <FaLinkedinIn />,
      title: "LinkedIn",
      description: "in/natantaques",
      href: "https://www.linkedin.com/in/natantaques/",
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      description: "+55 65 99693-8469",
      href: "https://wa.me/5565996938469",
    },
    {
      icon: <FaRegEnvelope />,
      title: t("info.email"),
      description: "natanbtaques@gmail.com",
      href: "mailto:natanbtaques@gmail.com",
    },
  ];

  return (
    <div className="relative overflow-hidden border-t border-accent/15 bg-primary">

      {/* logo watermark — bigger than the band, clipped at its edges */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <LogoMark className="absolute -left-24 xl:-left-16 top-1/2 -translate-y-1/2 w-[600px] xl:w-[1000px] max-w-none h-auto opacity-[0.10]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-60px" }}
        variants={container}
        className="w-full px-6 xl:px-12 relative z-20 pt-14 pb-24 xl:pt-16 xl:pb-28 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10"
      >
        {/* headline */}
        <div className="text-center xl:text-left">
          {/* eyebrow oculto: <motion.p variants={slideUp} className="text-accent text-sm mb-2">{t("eyebrow")}</motion.p> */}
          <motion.h2 variants={slideUp} className="uppercase font-extrabold leading-[0.95] tracking-tight">
            <span className="block text-white/60 text-xl xl:text-[28px] tracking-[0.12em]">{t("lineTop")}</span>
            <span className="block text-white text-4xl xl:text-6xl my-1">{t("lineMain")}</span>
            <span className="block text-accent text-xl xl:text-[28px] tracking-[0.12em]">{t("lineBottom")}</span>
          </motion.h2>
        </div>

        {/* links */}
        <ul className="flex flex-col gap-5 mx-auto xl:mx-0">
          {links.map((item) => (
            <motion.li key={item.title} variants={slideUp}>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-4"
              >
                <span className="w-14 h-14 rounded-full border border-accent/40 bg-accent/10 flex items-center justify-center text-accent text-xl transition-all duration-300 group-hover:bg-accent group-hover:text-primary">
                  {item.icon}
                </span>
                <span>
                  <span className="block text-sm font-bold text-white">{item.title}</span>
                  <span className="block text-sm text-white/60 group-hover:text-white transition-colors">
                    {item.description}
                  </span>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default Contact;
