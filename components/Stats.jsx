"use client";

import CountUp from "react-countup";
import { useTranslations } from "next-intl";

const Stats = () => {
  const t = useTranslations(); // Hook do Next-Intl para tradução
  const stats = [
    { num: 3, text: t("stats.experience") },
    { num: 10, text: t("stats.projects") },
    { num: 23, text: t("stats.technologies") },
    { num: 246, text: t("stats.commits") },
  ];

  return (
    <section className="pt-2 pb-3 xl:pt-0 xl:pb-3">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] xl:max-w-none xl:justify-between items-center w-full">
          {stats.map((item, index) => (
            <div
              className="flex gap-3 items-center justify-center xl:justify-start"
              key={index}
            >
              <CountUp
                end={item.num}
                duration={5}
                delay={2}
                className="text-5xl xl:text-6xl font-extrabold"
              />
              <p
                className={`${
                  item.text.length < 15 ? "max-w-[100px]" : "max-w-[120px]"
                } leading-snug text-white/80 text-sm xl:text-base`}
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
