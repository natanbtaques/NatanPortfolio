"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const languages = [
  { code: "pt", flag: "/assets/flags/pt.png", alt: "Português" },
  { code: "en", flag: "/assets/flags/eng.png", alt: "Inglês" },
  { code: "es", flag: "/assets/flags/esp.png", alt: "Espanhol" },
];

const links = [
  { name: "home", path: "" },
  { name: "services", path: "/services" },
  { name: "resume", path: "/resume" },
  { name: "work", path: "/work" },
  { name: "contact", path: "/contact" },
];

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Pega o idioma atual da URL
  const pathSegments = pathname.split("/");
  const currentLang = languages.some((l) => l.code === pathSegments[1])
    ? pathSegments[1]
    : "en"; // Default para "en" se não houver idioma na URL

  // Função para trocar o idioma
  const changeLanguage = (lang) => {
    if (lang === currentLang) return;

    // Remove todos os códigos de idioma existentes na URL
    const newPath = pathname.replace(/^(\/(en|es|pt))+/g, "");

    // Redireciona para a nova URL com o idioma correto
    router.push(`/${lang}${newPath}`);

    // Recarregar a página para garantir que o middleware de idioma seja ativado
    window.location.reload();
  };

  return (
    <nav className="flex gap-8 items-center">
      {/* Links de navegação com prefixo de idioma */}
      {links.map((link, index) => (
        <Link
          href={`/${currentLang}${link.path}`}
          key={index}
          className={`${
            `/${currentLang}${link.path}` === pathname &&
            "text-accent border-b-2 border-accent"
          } 
            capitalize font-medium hover:text-accent transition-all`}
        >
          {link.name}
        </Link>
      ))}

      {/* Botões para troca de idioma */}
      <div className="flex gap-4 ml-8">
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
    </nav>
  );
};

export default Nav;
