import Link from "next/link";

// components
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations(); // Hook do Next-Intl para tradução

  return (
    <header className="sticky top-0 z-50 py-4 xl:py-2 text-white bg-primary/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href={"/"}>
            <Image
              alt="Logo"
              src="/assets/logo.png"
              width={80}
              height={70}
              className="object-cover"
              priority
            />
          </Link>
          {/* Navigation */}
          <div className="hidden xl:flex items-center justify-between pl-4">
            {" "}
            <Nav />
          </div>

          {/* Mobile Navigation */}
          <div className="xl:hidden">
            {" "}
            <MobileNav />{" "}
          </div>
      </div>
    </header>
  );
};

export default Header;
