"use client";

import { useEffect, useState } from "react";
import useSticky from "../../hooks/use-sticky";
import Link from "next/link";
import menu_data from "../../data/menu-data";
// import SearchArea from "../../common/SearchArea";
import OffCanvas from "../../common/OffCanvas";
import Logo from "../../common/Logo";
import ThemeToggle from "../../common/ThemeToggle";
import LanguageToggle from "../../common/LanguageToggle";
import { useTranslation } from "../../../i18n";

interface HeaderOneProps {
  style_2?: boolean;
}

const HeaderOne = ({ style_2 }: HeaderOneProps) => {
  const { t, locale, changeLocale, resetToSystem } = useTranslation([
    "navigation",
  ]);

  // Function to translate menu titles
  const translateMenuTitle = (title: string) => {
    return t(title, "navigation") || title;
  };
  const [theme, setTheme] = useState("light-mode");
  const [mounted, setMounted] = useState(false);
  const [userOverride, setUserOverride] = useState(false);
  const [languageOverride, setLanguageOverride] = useState(false);

  // Function to detect system theme preference
  const getSystemTheme = () => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark-mode"
        : "light-mode";
    }
    return "light-mode";
  };

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const savedOverride = localStorage.getItem("userOverride") === "true";

    if (savedTheme && savedOverride) {
      // User has manually set a theme
      setTheme(savedTheme);
      setUserOverride(true);
    } else {
      // Use system preference as default
      const systemTheme = getSystemTheme();
      setTheme(systemTheme);
      setUserOverride(false);
    }
  }, []);

  // Listen for system theme changes when no user override
  useEffect(() => {
    if (!mounted || userOverride) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark-mode" : "light-mode";
      setTheme(newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mounted, userOverride]);

  useEffect(() => {
    if (mounted) {
      document.body.className = theme;
      if (userOverride) {
        localStorage.setItem("theme", theme);
        localStorage.setItem("userOverride", "true");
      } else {
        // Clear saved theme when following system
        localStorage.removeItem("theme");
        localStorage.setItem("userOverride", "false");
      }
    }
  }, [theme, mounted, userOverride]);

  const toggleTheme = () => {
    setUserOverride(true);
    setTheme((prevTheme) =>
      prevTheme === "light-mode" ? "dark-mode" : "light-mode"
    );
  };

  const resetThemeToSystem = () => {
    setUserOverride(false);
    const systemTheme = getSystemTheme();
    setTheme(systemTheme);
  };

  const toggleLanguage = () => {
    setLanguageOverride(true);
    const nextLang = locale === "en" ? "fr" : "en";
    changeLocale(nextLang);
  };

  const resetLanguageToSystem = () => {
    setLanguageOverride(false);
    resetToSystem?.();
  };

  const { sticky } = useSticky();
  // const [isSearchOpen, setSearchOpen] = useState(false);
  const [openCanvas, setOpenCavas] = useState(false);

  return (
    <>
      <header className={`header-area ${sticky && "sticky-on"}`}>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <Logo className="navbar-brand" />

            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#devAgencyNav"
              aria-controls="devAgencyNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="material-symbols-outlined">view_cozy</span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-end"
              id="devAgencyNav"
            >
              <ul className="navbar-nav navbar-nav-scroll">
                {menu_data.map((item, i) => (
                  <li key={i} className="nav-item">
                    <Link href={item.link} className="nav-link">
                      {translateMenuTitle(item.title)}
                    </Link>
                  </li>
                ))}
              </ul>
              <div
                className="d-flex align-items-center"
                style={{ gap: "15px" }}
              >
                {mounted && (
                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "5px" }}
                  >
                    <LanguageToggle
                      style={{
                        margin: 0,
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                      }}
                      currentLanguage={locale}
                      toggleLanguage={toggleLanguage}
                      userOverride={languageOverride}
                      resetToSystem={resetLanguageToSystem}
                    />
                    <ThemeToggle
                      style={{
                        margin: 0,
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                      }}
                      theme={theme}
                      toggleTheme={toggleTheme}
                      userOverride={userOverride}
                      resetToSystem={resetThemeToSystem}
                    />
                  </div>
                )}
                {style_2 ? (
                  <div className="mb-0 mb-lg-0" id="sideMenuButton">
                    <a
                      onClick={() => setOpenCavas(!openCanvas)}
                      className="btn btn-primary sideMenuButton"
                      data-bs-toggle="offcanvas"
                      href="#sideMenuOffcanvas"
                      role="button"
                      aria-controls="sideMenuOffcanvas"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M3 12H21"
                            stroke="#0E0E0E"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M3 6H21"
                            stroke="#0E0E0E"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M3 18H21"
                            stroke="#0E0E0E"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M3 12H21"
                            stroke="#0E0E0E"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M3 6H21"
                            stroke="#0E0E0E"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M3 18H21"
                            stroke="#0E0E0E"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </a>
                  </div>
                ) : (
                  <Link className="btn btn-primary" href="/contact">
                    <span>GET IN TOUCH</span>
                    <span>GET IN TOUCH</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* <SearchArea setSearchOpen={setSearchOpen} isSearchOpen={isSearchOpen} /> */}
      <OffCanvas setOpenCavas={setOpenCavas} openCanvas={openCanvas} />
    </>
  );
};

export default HeaderOne;
