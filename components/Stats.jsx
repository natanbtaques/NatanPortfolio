"use client";

import CountUp from "react-countup";
import { useTranslations } from "next-intl";

const Stats = () => {
  const t = useTranslations(); // Hook do Next-Intl para tradução
  const stats = [
    { num: 3, text: t("stats.experience") },
    { num: 6, text: t("stats.projects") },
    { num: 16, text: t("stats.technologies") },
    { num: 246, text: t("stats.commits") },
  ];

  return (
    <section className="pt-4 pb-12 xl:pt-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] xl:max-w-none">
          {stats.map((item, index) => {
            return (
              <div
                className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
                key={index}
              >
                <CountUp
                  end={item.num}
                  duration={5}
                  delay={2}
                  className="text-4xl xl:text-6xl font-extrabold"
                />
                <p
                  className={`${
                    item.text.length < 15 ? " max-w-[100px]" : "max-w-150px"
                  } leading-snug text-white/80`}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
