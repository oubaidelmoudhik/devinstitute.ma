"use client";

import { useEffect } from "react";
import FAQQuestion from "../reusable/FAQQuestion";
import { NUM_CLIENTS } from "../../data/constants";
import { useTranslation } from "@/i18n";
import Image from "next/image";

const FaqArea = ({ style_2 }: any) => {
  const { t } = useTranslation(["home"]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore - Bootstrap JS bundle doesn't have type definitions
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <>
      <div className={`faq-wrapper ${style_2 ? "bg-secondary" : ""}`}>
        <div className="divider"></div>

        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6">
              <div className="section-heading">
                <h2 className="mb-0">{t("faq_1", "home")}</h2>
              </div>

              <div className="divider-sm"></div>

              <div className="faq-image">
                 <Image src="/assets/img/bg-img/faq.webp" alt="FAQ illustration" width={500} height={400} />

                <div className="faq-info d-flex align-items-center">
                  <h2 className="mb-0">{NUM_CLIENTS}+</h2>
                  <p className="mb-0">{t("counter_5", "home") || "Clients"}</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="faq-accordion ps-lg-4">
                <div className="accordion" id="faqAccordion">
                  <FAQQuestion
                    id={1}
                    question={t("faq_10", "home")}
                    answer={t("faq_11", "home")}
                  />

                  <FAQQuestion
                    id={2}
                    question={t("faq_12", "home")}
                    answer={t("faq_13", "home")}
                  />

                  <FAQQuestion
                    id={3}
                    question={t("faq_14", "home")}
                    answer={t("faq_15", "home")}
                  />

                  <FAQQuestion
                    id={4}
                    question={t("faq_16", "home")}
                    answer={t("faq_17", "home")}
                  />

                  <FAQQuestion
                    id={5}
                    question={t("faq_2", "home")}
                    answer={t("faq_3", "home")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </div>
    </>
  );
};

export default FaqArea;
