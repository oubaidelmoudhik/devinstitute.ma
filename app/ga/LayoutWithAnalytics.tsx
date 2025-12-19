import { useEffect } from "react";
// import { Outlet, useLocation } from "next/link";
import Wrapper from "../../layouts/Wrapper";
import { initGA } from ".";

export default function LayoutWithAnalytics() {
  // const location = useLocation();

  // Initialize Google Analytics once on mount
  useEffect(() => {
    initGA();
  }, []);

  // Track page view on every route change
  // useEffect(() => {
  //   trackPageView(location.pathname + location.search);
  // }, [location]);

  return (
    <Wrapper>
      {/* <Outlet /> */}
      <div>Analytics Layout - Component not currently used</div>
    </Wrapper>
  );
}
