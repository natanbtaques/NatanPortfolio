"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";

const languages = [
  { code: "pt", flag: "/assets/flags/pt.png", alt: "Português" },
  { code: "en", flag: "/assets/flags/eng.png", alt: "Inglês" },
  { code: "es", flag: "/assets/flags/esp.png", alt: "Espanhol" },
];

const Nav = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("hero");

  const links = [
    { name: t("tabs.home"), anchor: "hero" },
    { name: t("tabs.services"), anchor: "services" },
    { name: t("tabs.resume"), anchor: "resume" },
    { name: t("tabs.work"), anchor: "work" },
    { name: t("tabs.contact"), anchor: "contact" },
  ];

  const pathSegments = pathname.split("/");
  const currentLang = languages.some((l) => l.code === pathSegments[1])
    ? pathSegments[1]
    : "en";

  const changeLanguage = (lang) => {
    if (lang === currentLang) return;
    router.push("/", { locale: lang });
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="flex gap-8 items-center">
      {links.map((link, index) => (
        <a
          href={`#${link.anchor}`}
          key={index}
          className={`capitalize font-medium transition-all hover:text-accent ${
            activeSection === link.anchor
              ? "text-accent border-b-2 border-accent"
              : ""
          }`}
        >
          {link.name}
        </a>
      ))}

      <div className="flex gap-3 ml-8">
        {languages.map(({ code, flag, alt }) => (
          <button
            key={code}
            onClick={() => changeLanguage(code)}
            className={`w-8 h-8 rounded-full transition-all flex items-center justify-center ${
              currentLang === code ? "bg-accent" : "bg-gray-200 hover:bg-accent"
            }`}
          >
            <Image src={flag} alt={alt} width={28} height={28} />
          </button>
        ))}
      </div>

      <a href="#contact">
        <Button>{t("tabs.hire")}</Button>
      </a>
    </nav>
  );
};

export default Nav;
