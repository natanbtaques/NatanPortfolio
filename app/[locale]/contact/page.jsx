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

const Contact = () => {
  const t = useTranslations("contact");

  const info = [
    {
      icon: <FaPhoneAlt />,
      title: t("info.phone"),
      description: "+55 65 99693-8569",
    },
    {
      icon: <FaEnvelope />,
      title: t("info.email"),
      description: "natanbtaques@gmail.com",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: t("info.location"),
      description: "Brazil",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.5, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* Formulário */}
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h3 className="text-4xl text-accent">{t("title")}</h3>
              <p className="text-white/60">{t("description")}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input type="text" placeholder={t("firstname")} />
                <Input type="text" placeholder={t("lastname")} />
                <Input type="email" placeholder={t("email")} />
                <Input type="tel" placeholder={t("phone")} />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectService")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t("selectService")}</SelectLabel>
                    <SelectItem value="webDev">
                      {t("services.webDev")}
                    </SelectItem>
                    <SelectItem value="uxUi">{t("services.uxUi")}</SelectItem>
                    <SelectItem value="apiDev">
                      {t("services.apiDev")}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Textarea className="h-[200px]" placeholder={t("message")} />
              <Button size="md" className="max-w-40" type="submit">
                {t("submit")}
              </Button>
            </form>
          </div>
          {/* Informações de contato */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => (
                <li className="flex items-center gap-6" key={index}>
                  <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60">{item.title}</p>
                    <h3 className="text-xl">{item.description}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
