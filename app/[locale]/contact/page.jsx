"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const Contact = () => {
  const t = useTranslations("contact");

  const info = [
    { icon: <FaPhoneAlt />, title: t("info.phone"), description: "+55 65 99693-8569" },
    { icon: <FaEnvelope />, title: t("info.email"), description: "natanbtaques@gmail.com" },
    { icon: <FaMapMarkedAlt />, title: t("info.location"), description: "Brazil" },
  ];

  return (
    <section className="py-6">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">

          {/* Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={container}
            className="xl:w-[54%] order-2 xl:order-none"
          >
            <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <motion.h3 variants={slideUp} className="text-4xl text-accent">
                {t("title")}
              </motion.h3>
              <motion.p variants={slideUp} className="text-white/60">
                {t("description")}
              </motion.p>
              <motion.div variants={slideUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input type="text" placeholder={t("firstname")} />
                <Input type="text" placeholder={t("lastname")} />
                <Input type="email" placeholder={t("email")} />
                <Input type="tel" placeholder={t("phone")} />
              </motion.div>
              <motion.div variants={slideUp}>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectService")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t("selectService")}</SelectLabel>
                      <SelectItem value="webDev">{t("services.webDev")}</SelectItem>
                      <SelectItem value="uxUi">{t("services.uxUi")}</SelectItem>
                      <SelectItem value="apiDev">{t("services.apiDev")}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </motion.div>
              <motion.div variants={slideUp}>
                <Textarea className="h-[200px]" placeholder={t("message")} />
              </motion.div>
              <motion.div variants={slideUp}>
                <Button size="md" className="max-w-40" type="submit">
                  {t("submit")}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={container}
            className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0"
          >
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => (
                <motion.li key={index} variants={slideUp} className="flex items-center gap-6">
                  <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60">{item.title}</p>
                    <h3 className="text-xl">{item.description}</h3>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
