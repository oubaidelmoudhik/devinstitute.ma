"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n";

const services = [
  {
    icon: "public",
    titleKey: "services_1",
    descriptionKey: "services_2",
  },
  {
    icon: "design_services",
    titleKey: "services_3",
    descriptionKey: "services_4",
  },
  {
    icon: "code",
    titleKey: "services_5",
    descriptionKey: "services_6",
  },
  {
    icon: "search",
    titleKey: "services_7",
    descriptionKey: "services_8",
  },
  {
    icon: "shopping_cart",
    titleKey: "services_9",
    descriptionKey: "services_10",
  },
  {
    icon: "build",
    titleKey: "services_11",
    descriptionKey: "services_12",
  },
];

const ServiceArea = () => {
  const { t } = useTranslation(["service"]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="service-wrapper">
        <div className="divider"></div>

        <div className="container">
          <div className="row g-4 g-lg-5">
            {services.map((item, i) => (
              <div key={i} className="col-12 col-md-6 col-xl-4">
                <Link href="/service-details">
                  <div
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                    className={`service-slide-card  ${
                      activeIndex === i ? "active" : ""
                    }`}
                  >
                    <span className="material-symbols-outlined">
                      {item.icon}
                    </span>
                    <h2
                      style={{ bottom: `${activeIndex === i ? "140px" : ""}` }}
                    >
                      {t(item.titleKey, "service")}
                    </h2>
                    <p
                      className="mb-0"
                      style={{ bottom: `${activeIndex === i ? "25px" : ""}` }}
                    >
                      {t(item.descriptionKey, "service")}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="divider"></div>
      </div>
    </>
  );
};

export default ServiceArea;
