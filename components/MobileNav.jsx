"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

import { CiMenuFries } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

const languages = [
  { code: "pt", flag: "/assets/flags/pt.png", alt: "Português" },
  { code: "en", flag: "/assets/flags/eng.png", alt: "Inglês" },
  { code: "es", flag: "/assets/flags/esp.png", alt: "Espanhol" },
];

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("tabs");

  const links = [
    { name: t("home"), path: "" },
    { name: t("services"), path: "/services" },
    { name: t("resume"), path: "/resume" },
    { name: t("work"), path: "/work" },
    { name: t("contact"), path: "/contact" },
  ];

  // Função para trocar o idioma
  const changeLanguage = (lang) => {
    if (lang === currentLang) return;
    const newPath = pathname.replace(/^(\/(en|es|pt))+/g, ""); // Remove todos os códigos de idioma existentes na URL
    router.push(`/${lang}${newPath}`); // Redireciona para a nova URL com o idioma correto
    window.location.reload(); // Recarregar a página
  };
  // Pega o idioma atual da URL
  const pathSegments = pathname.split("/");
  const currentLang = languages.some((l) => l.code === pathSegments[1])
    ? pathSegments[1]
    : "en"; // Default para "en" se não houver idioma na URL

  return (
    <nav>
      <Sheet>
        <SheetTrigger className="flex justify-center items-center">
          <CiMenuFries className="text-[32px] text-accent" />
        </SheetTrigger>
        <SheetContent>
          {/*Logo */}
          <div className="mt-32 mb-40 text-center text-2xl flex justify-center items-center">
            <Link href="/">
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
          {/* Botões para troca de idioma */}

          <SheetTitle></SheetTitle>

          {/* Nav */}
          <nav className="flex flex-col justify-center items-center gap-8 ">
            {links.map((link, index) => {
              return (
                <Link
                  key={index}
                  href={link.path}
                  className={`${
                    link.path === pathname &&
                    "text-accent border-b-2 border-accent"
                  }text-xl capitalize hover:text-accent transition-all`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="flex gap-3 mt-20  items-center justify-center">
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
