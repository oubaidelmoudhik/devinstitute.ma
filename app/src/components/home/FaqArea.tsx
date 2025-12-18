"use client";

import { useEffect } from "react";
import FAQQuestion from "../reusable/FAQQuestion";
import { NUM_CLIENTS } from "../../data/constants";
import { useTranslation } from "../../../i18n";

const FaqArea = ({ style_2 }: any) => {
  const { t } = useTranslation(['home']);
  useEffect(() => {
    if (typeof window !== "undefined") {
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
                 <h2 className="mb-0">{t('faq_section_title', 'home')}</h2>
              </div>

              <div className="divider-sm"></div>

              <div className="faq-image">
                <img src="/assets/img/bg-img/faq.webp" alt="" />

                <div className="faq-info d-flex align-items-center">
                  <h2 className="mb-0">{NUM_CLIENTS}+</h2>
                   <p className="mb-0">{t('hero_clients_count_text', 'home').split('{{count}}')[1] || 'Clients'}</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="faq-accordion ps-lg-4">
                <div className="accordion" id="faqAccordion">
                   <FAQQuestion
                     id={1}
                     question={t('faq_question_5', 'home')}
                     answer={t('faq_answer_5', 'home')}
                   />

                   <FAQQuestion
                     id={2}
                     question={t('faq_question_6', 'home')}
                     answer={t('faq_answer_6', 'home')}
                   />

                   <FAQQuestion
                     id={3}
                     question={t('faq_question_7', 'home')}
                     answer={t('faq_answer_7', 'home')}
                   />

                   <FAQQuestion
                     id={4}
                     question={t('faq_question_8', 'home')}
                     answer={t('faq_answer_8', 'home')}
                   />

                   <FAQQuestion
                     id={5}
                     question={t('faq_question_1', 'home')}
                     answer={t('faq_answer_1', 'home')}
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
