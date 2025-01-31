import Link from "next/link";
import { Button } from "./ui/button";
// components
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href={"/"}>
            <h1 className="text-4xl font-semibold">
              Natan <span className="text-accent">.</span>
            </h1>
          </Link>
          {/* Navigation */}
          <div className="hidden xl:flex items-center justify-between pl-4">
            {" "}
            <Nav />
            <Link href={"/contact"}>
              <Button>Hire me</Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="xl:hidden">
            {" "}
            <MobileNav />{" "}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
