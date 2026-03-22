"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CiMenuFries } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { useRouter as useIntlRouter } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

const languages = [
  { code: "pt", flag: "/assets/flags/pt.png", alt: "Português" },
  { code: "en", flag: "/assets/flags/eng.png", alt: "Inglês" },
  { code: "es", flag: "/assets/flags/esp.png", alt: "Espanhol" },
];

const MobileNav = () => {
  const pathname = usePathname();
  const intlRouter = useIntlRouter();
  const t = useTranslations("tabs");
  const [open, setOpen] = useState(false);

  const links = [
    { name: t("home"), anchor: "hero" },
    { name: t("services"), anchor: "services" },
    { name: t("resume"), anchor: "resume" },
    { name: t("work"), anchor: "work" },
    { name: t("contact"), anchor: "contact" },
  ];

  const pathSegments = pathname.split("/");
  const currentLang = languages.some((l) => l.code === pathSegments[1])
    ? pathSegments[1]
    : "en";

  const changeLanguage = (lang) => {
    if (lang === currentLang) return;
    const cleanPath = pathname.replace(/^\/(en|es|pt)/, "") || "/";
    intlRouter.replace(cleanPath, { locale: lang });
  };

  return (
    <nav>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="flex justify-center items-center">
          <CiMenuFries className="text-[32px] text-accent" />
        </SheetTrigger>
        <SheetContent>
          <div className="mt-16 mb-12 text-center flex justify-center items-center">
            <Link href="/" onClick={() => setOpen(false)}>
              <Image
                alt="Logo"
                src="/assets/logo.png"
                width={80}
                height={70}
                className="object-cover"
                priority
              />
            </Link>
          </div>

          <SheetTitle />

          <nav className="flex flex-col justify-center items-center gap-8">
            {links.map((link, index) => (
              <a
                key={index}
                href={`#${link.anchor}`}
                onClick={() => setOpen(false)}
                className="text-xl capitalize hover:text-accent transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex gap-3 mt-20 items-center justify-center">
            {languages.map(({ code, flag, alt }) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`w-8 h-8 rounded-full transition-all flex items-center justify-center ${
                  currentLang === code
                    ? "bg-accent"
                    : "bg-gray-200 hover:bg-accent"
                }`}
              >
                <Image src={flag} alt={alt} width={28} height={28} />
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
