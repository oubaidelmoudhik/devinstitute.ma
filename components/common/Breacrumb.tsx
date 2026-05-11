"use client";

import Link from "next/link";
import { useContext } from "react";
import { useTranslation, I18nContext } from "../../i18n";
import blogEn from "@/i18n/en/blog.json";
import blogFr from "@/i18n/fr/blog.json";

interface BreadcrumbProps {
  title?: string;
  subtitle?: string;
  titleKey?: string;
  subtitleKey?: string;
  isMainHeading?: boolean;
  background?: string;
  blogTitleKey?: string;
  blogCategoryKey?: string;
}

const Breacrumb = ({
  title,
  subtitle,
  titleKey,
  subtitleKey,
  isMainHeading = false,
  background,
  blogTitleKey,
  blogCategoryKey,
}: BreadcrumbProps) => {
  const { t } = useTranslation(["navigation"]);
  const i18nCtx = useContext(I18nContext);
  const locale = i18nCtx?.locale || "en";

  // Translate blog post title key using blog i18n dictionaries
  const blogT = (key: string): string => {
    const dict = locale === "fr" ? blogFr : blogEn;
    return (dict as Record<string, string>)[key] || key
  }

  let displayTitle: string
  if (blogTitleKey) {
    displayTitle = blogT(blogTitleKey)
  } else {
    displayTitle = titleKey ? t(titleKey, "navigation") : (title || "")
  }

  let displaySubtitle: string | undefined
  if (blogCategoryKey) {
    displaySubtitle = blogT(blogCategoryKey)
  } else {
    displaySubtitle = subtitleKey ? t(subtitleKey, "navigation") : subtitle
  }
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
                 className="wow fadeInUp"
                 data-wow-duration="1000ms"
                 data-wow-delay="700ms"
                  style={{
                    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                    lineHeight: '1.1',
                    textAlign: 'center'
                  }}
               >
                 {displayTitle}
               </h1>
            ) : (
               <h2
                 className="wow fadeInUp"
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
