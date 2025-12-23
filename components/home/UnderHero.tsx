"use client";

import { useEffect } from "react";
import "jarallax/dist/jarallax.css";
import { COUNTER_DATA, IMAGES } from "../../data/constants";
import { useTranslation } from "@/i18n";
import Count from "../common/count";
import Image from "next/image";

const UnderHero = ({ style_2 }: any) => {
  const { t } = useTranslation(["home"]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Importing jarallax dynamically
      import("jarallax").then(({ jarallax }) => {
        jarallax(document.querySelectorAll<HTMLElement>(".jarallax"), {
          speed: 0.6,
        });
      });
    }
  }, []);

  return (
    <>
      <div className="cta-video-wrapper">
        {style_2 ? <div className="divider"></div> : null}
        <div className="container">
          {style_2 ? null : (
              <div className="video-wrap">
                <Image
                  src={IMAGES.underHero}
                  alt="Under hero background"
                  fill
                  sizes="100vw"
                  style={{ borderRadius: '20px' }}
                />
              </div>
          )}

          <div className="row g-4 g-lg-5">
            {COUNTER_DATA.map((item, i) => {
              const labelKey = `counter_${i * 2 + 1}`;
              const descriptionKey = `counter_${i * 2 + 2}`;
              return (
                <div key={i} className="col-12 col-md-4">
                  <div className="cta-content">
                    <h2 className="mb-3">
                      <span className="counter">
                        <Count number={item.count} text="+" />
                      </span>
                    </h2>
                    <h4>{t(labelKey, "home")}</h4>
                    <p className="mb-0">{t(descriptionKey, "home")}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="divider"></div>
      </div>
    </>
  );
};

export default UnderHero;
