// src/ga/index.ts
import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-CHLV3WJMNY");
};

export const trackPageView = (url: string) => {
  ReactGA.send({ hitType: "pageview", page: url });
};

export const trackEvent = (action: string, category: string) => {
  ReactGA.event({ category, action });
};
