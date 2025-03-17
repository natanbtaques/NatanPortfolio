"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BsArrowDownRight } from "react-icons/bs";
import { useTranslations } from "next-intl"; // Importando o hook correto

const Services = () => {
  const t = useTranslations(); // Usando o hook

  const services = [
    {
      num: "01",
      title: t("services.webDevelopment"),
      description: t("services.webDevelopmentDesc"),
      href: "",
    },
    {
      num: "02",
      title: t("services.uxUiDesign"),
      description: t("services.uxUiDesignDesc"),
      href: "",
    },
    {
      num: "03",
      title: t("services.devOps"),
      description: t("services.devOpsDesc"),
      href: "",
    },
    {
      num: "04",
      title: t("services.apiDevelopment"),
      description: t("services.apiDevelopmentDesc"),
      href: "",
    },
  ];

  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4, ease: "easeIn" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col justify-center gap-6 group"
            >
              <div className="w-full flex items-center justify-between">
                <div className="text-5xl font-extrabold text-outline group-hover:text-outline-hover">
                  {service.num}
                </div>
                <Link
                  href={service.href}
                  className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
                >
                  <BsArrowDownRight className="text-primary text-3xl" />
                </Link>
              </div>
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
                {service.title}
              </h2>
              <p>{service.description}</p>
              <div className="border-b border-white/20 w-full"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
