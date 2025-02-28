"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";

const MobileNav = () => {
  const pathname = usePathname();

  const links = [
    { path: "/", label: "Home" },
    { path: "/services", label: "services" },
    { path: "/resume", label: "resume" },
    { path: "/work", label: "work" },
    { path: "/contact", label: "contact" },
  ];
  return (
    <nav>
      <Sheet>
        <SheetTrigger className="flex justify-center items-center">
          <CiMenuFries className="text-[32px] text-accent" />
        </SheetTrigger>
        <SheetContent>
          {/*Logo */}
          <div className="mt-32 mb-40 text-center text-2xl">
            <Link href="/">
              <h1 className="text-4xl font-semibold">
                Natan{" "}
                <span className="text-accent text-xl capitalize hover:text-accent transition-all">
                  .
                </span>
              </h1>
            </Link>
          </div>
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
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
