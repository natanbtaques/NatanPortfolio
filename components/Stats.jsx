"use client";

import CountUp from "react-countup";
import { useTranslations } from "next-intl";

const Stats = () => {
  const t = useTranslations(); // Hook do Next-Intl para tradução
  const stats = [
    { num: 4, text: t("stats.experience") },
    { num: 12, text: t("stats.projects") },
    { num: 35, text: t("stats.technologies") },
    { num: 367, text: t("stats.commits") },
  ];

  return (
    <section className="pt-2 pb-3 xl:pt-0 xl:pb-3">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 xl:flex xl:justify-between items-start xl:items-center w-full">
          {stats.map((item, index) => (
            <div
              className="flex flex-col xl:flex-row gap-1 xl:gap-3 items-center text-center xl:text-left"
              key={index}
            >
              <CountUp
                end={item.num}
                duration={5}
                delay={2}
                className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold leading-none"
              />
              <p
                className={`${
                  item.text.length < 15 ? "xl:max-w-[100px]" : "xl:max-w-[120px]"
                } leading-tight xl:leading-snug text-white/80 text-[11px] sm:text-xs md:text-sm xl:text-base`}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
