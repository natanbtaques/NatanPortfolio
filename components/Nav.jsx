"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";

const languages = [
  { code: "pt", flag: "/assets/flags/pt.png", alt: "Português" },
  { code: "en", flag: "/assets/flags/eng.png", alt: "English" },
  { code: "es", flag: "/assets/flags/esp.png", alt: "Español" },
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
    const lastSection = sections[sections.length - 1]?.id;
    // the contact band is short and sits at the very end, so it never reaches the
    // observer's detection band — at page bottom we force it, otherwise we follow the observer
    let observed = "hero";
    let atBottom = false;
    const sync = () => setActiveSection(atBottom && lastSection ? lastSection : observed);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) observed = entry.target.id;
        });
        sync();
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    const onScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (bottom !== atBottom) {
        atBottom = bottom;
        sync();
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
