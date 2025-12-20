"use client";

import { useTranslation } from "@/i18n";
import { NUM_CLIENTS } from "../../data/constants";

const HeroArea = () => {
  const { t } = useTranslation(["home", "common"]);
  return (
    <>
      <section className="hero-wrapper">
        <div className="divider"></div>

        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-lg-8 col-xl-9">
              <div className="hero-content home2">
                <h1
                  className="mb-0 wow fadeInUp hero-title-responsive"
                  data-wow-duration="1000ms"
                  data-wow-delay="700ms"
                >
                  {t("hero_1", "home")}
                </h1>
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-4 col-xl-3">
              <div className="hero-content home2">
                <div
                  className="d-flex align-items-center gap-5 wow fadeInUp"
                  data-wow-duration="1000ms"
                  data-wow-delay="900ms"
                >
                  <div className="imgs-group">
                    <img src="/assets/img/bg-img/lumasmallicon.webp" alt="" />
                    <img
                      src="/assets/img/bg-img/blauseesmallicon.webp"
                      alt=""
                    />
                    <div>
                      <span className="counter">30</span>
                    </div>
                  </div>
                  <h6 className="mb-0">
                    {t("hero_2", "home").replace(
                      "{{count}}",
                      NUM_CLIENTS.toString()
                    )}
                  </h6>
                </div>
                <p
                  className="my-5 wow fadeInUp"
                  data-wow-duration="1000ms"
                  data-wow-delay="1100ms"
                >
                  {t("hero_3", "home")}
                </p>

                <a
                  href={
                    "https://wa.me/212776932898?text=Bonjour%20!%20Je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20vos%20services%20de%20d%C3%A9veloppement%20web.%20Pouvez-vous%20me%20donner%20plus%20d'informations%20%3F"
                  }
                  className="btn btn-primary wow fadeInUp"
                  data-wow-duration="1000ms"
                  data-wow-delay="1200ms"
                  style={{ width: "100%" }}
                >
                  <span>{t("hero_4", "home")}</span>
                  <span>{t("hero_4", "home")}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>
        <div className="divider"></div>
      </section>
    </>
  );
};

export default HeroArea;
