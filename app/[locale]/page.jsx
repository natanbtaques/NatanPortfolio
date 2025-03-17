import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import { useTranslations } from "next-intl";

const Locale = () => {
  const t = useTranslations(); // Hook do Next-Intl para tradução

  return (
    <section>
      <div className="container mx-auto h-full">
        <div className="flex flex-col items-center justify-between xl:flex-row xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">{t("softwareDeveloper")}</span>
            <h1 className="h1">
              {t("hello")} <br />{" "}
              <span className="text-accent">Natan Taques</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white">{t("description")}</p>
            {/* btn and socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <a
                href="/assets/Curriculo Natan.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="uppercase flex items-center gap-2 border text-accent border-accent rounded-full px-8 p-3 hover:bg-accent hover:text-black transition"
              >
                <span>{t("downloadCV")}</span>
                <FiDownload className="text-xl" />
              </a>
              <div className="mb-8 xl:mb-0 ">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary transition-all duration-500"
                />
              </div>
            </div>
          </div>
          {/* photo */}
          <div>
            <Photo className="order-1 xl:order-none mb-8 xl:mb-0" />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Locale;
