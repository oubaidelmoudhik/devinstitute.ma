import { useEffect } from "react";
import { NUM_CLIENTS } from "../../data/constants";
import FAQQuestion from "../reusable/FAQQuestion";

const FaqArea = ({ style_2 }: any) => {
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
                <h2 className="mb-0">Frequently Asked Questions</h2>
              </div>

              <div className="divider-sm"></div>

              <div className="faq-image">
                <img src="/assets/img/bg-img/faq.webp" alt="" />

                <div className="faq-info d-flex align-items-center">
                  <h2 className="mb-0">{NUM_CLIENTS}+</h2>
                  <p className="mb-0">Clients</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="faq-accordion ps-lg-4">
                <div className="accordion" id="faqAccordion">
                  <FAQQuestion
                    id={1}
                    question="What is your vision?"
                    answer="We help small businesses build a strong online presence with simple, effective, and scalable web solutions."
                  />

                  <FAQQuestion
                    id={2}
                    question="Do you offer free consultations?"
                    answer="Yes! We offer a free consultation to understand your needs and suggest the best approach for your website."
                  />

                  <FAQQuestion
                    id={3}
                    question="Can you help with website updates and maintenance?"
                    answer="Absolutely! We provide ongoing support to keep your website running smoothly."
                  />

                  <FAQQuestion
                    id={4}
                    question="Do you offer e-commerce solutions?"
                    answer="Yes, we build secure and user-friendly online stores to help you sell your products easily."
                  />

                  <FAQQuestion
                    id={5}
                    question="How long does it take to build a website?"
                    answer="It depends on the project, but a standard website usually takes 1 week."
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
