"use client";

import { useTranslation } from "@/i18n";
import { useState, useEffect, FC, lazy, Suspense } from "react";

const Marquee = lazy(() => import("react-fast-marquee"));

const CategoryArea: FC = () => {
  const { t } = useTranslation(["home"]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="catagory-slide" id="catagorySlide">
      <div className="marquee3k" data-speed="1">
        <Suspense fallback={null}>
          <Marquee gradient={false} speed={50}>
            <h2 className="d-flex align-items-center mb-0">
              <span>#</span>
               <span>{t("services_2", "home")}</span>
              <span>#</span>
               <span>{t("services_3", "home")}</span>
              <span>#</span>
               <span>{t("services_4", "home")}</span>
            </h2>
          </Marquee>
        </Suspense>
      </div>
    </div>
  );
};

export default CategoryArea;
