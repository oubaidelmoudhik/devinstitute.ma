"use client";

import Link from "next/link";
import { useTranslation } from "../../i18n";

interface BreadcrumbProps {
  title?: string;
  subtitle?: string;
  titleKey?: string;
  subtitleKey?: string;
  isMainHeading?: boolean;
  background?: string;
}

const Breacrumb = ({
  title,
  subtitle,
  titleKey,
  subtitleKey,
  isMainHeading = false,
  background,
}: BreadcrumbProps) => {
  const { t } = useTranslation(["navigation"]);
  const displayTitle = titleKey ? t(titleKey, "navigation") : title;
  const displaySubtitle = subtitleKey ? t(subtitleKey, "navigation") : subtitle;
  return (
    <>
      <div
        className="breadcrumb-wrapper bg-img jarallax bg-overlay"
        data-jarallax=""
        data-speed="0.6"
        style={{
          backgroundImage: `url(${
            background ? background : "/assets/img/bg-img/32.webp"
          })`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container h-100">
          <div className="breadcrumb-content h-100">
            {isMainHeading ? (
               <h1
                 className="wow fadeInUp clr-off-white"
                 data-wow-duration="1000ms"
                 data-wow-delay="700ms"
                 style={{
                   fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                   lineHeight: '1.1'
                 }}
               >
                 {displayTitle}
               </h1>
            ) : (
               <h2
                 className="wow fadeInUp clr-off-white"
                 data-wow-duration="1000ms"
                 data-wow-delay="700ms"
               >
                 {displayTitle}
               </h2>
            )}
            <ul
              className="list-unstyled wow fadeInUp"
              data-wow-duration="1000ms"
              data-wow-delay="1000ms"
            >
              <li>
                <Link href="/">{t("nav_1", "navigation")}</Link>
              </li>
              <li>{displaySubtitle}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breacrumb;
