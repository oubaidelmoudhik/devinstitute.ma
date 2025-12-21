"use client";

import { useTranslation } from "@/i18n";

const Cta2Area = () => {
  const { t } = useTranslation(["service"]);
  return (
    <>
      <div className="cta-wrapper">
        <div className="divider"></div>

        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-6">
              <h2
                className="wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="700ms"
              >
                {t("cta_1", "service")}
              </h2>
            </div>
            <div className="col-12 col-lg-6">
              <p
                className="wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="900ms"
              >
                {t("cta_2", "service")}
              </p>
              <a
                href="#"
                className="btn btn-primary wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="1100ms"
              >
                <span>{t("cta_3", "service")}</span>
                <span>{t("cta_3", "service")}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </div>
    </>
  );
};

export default Cta2Area;
