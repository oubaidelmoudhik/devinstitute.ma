"use client";

import { useEffect } from "react";
import { useTranslation } from "../../../i18n";

const MissionArea = () => {
  const { t } = useTranslation(['home']);
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <>
      <div className="mission-vision-wrapper">
        <div className="divider"></div>

        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-6">
              <div className="mission-vision-img-container">
                <img src="/assets/img/bg-img/missionarea.webp" alt="" />

                <div className="experience">
                  <h3 className="mb-0">7+</h3>
                  <span>Years Experience</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="mission-vision-content">
                 <h2>{t('mission_main_title', 'home')}</h2>
                 <p className="mb-4">
                   {t('mission_main_description', 'home')}
                 </p>

                <div className="mission-vision-accordion">
                  <div className="accordion" id="missionVision">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                           {t('mission_accordion_mission_title', 'home')}
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#missionVision"
                      >
                         <div className="accordion-body">
                           {t('mission_accordion_mission_content', 'home')}
                         </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                           {t('mission_accordion_vision_title', 'home')}
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        data-bs-parent="#missionVision"
                      >
                         <div className="accordion-body">
                           {t('mission_accordion_vision_content', 'home')}
                         </div>
                      </div>
                    </div>
                  </div>
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

export default MissionArea;
