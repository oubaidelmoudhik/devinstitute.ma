import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Wrapper from "../layouts/Wrapper";
import { initGA, trackPageView } from ".";

export default function LayoutWithAnalytics() {
  const location = useLocation();

  // Initialize Google Analytics once on mount
  useEffect(() => {
    initGA();
  }, []);

  // Track page view on every route change
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}
