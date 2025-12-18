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
              data-bs-target="#vorixNav"
              aria-controls="vorixNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="material-symbols-outlined">view_cozy</span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-end"
              id="vorixNav"
            >
              <ul className="navbar-nav navbar-nav-scroll">
                {menu_data.map((item, i) => (
                  <li key={i} className="nav-item">
                    <Link
                      href={item.link}
                      className="nav-link"
                    >
                      {translateMenuTitle(item.title)}
                    </Link>
                  </li>
                ))}
              </ul>
              <div
                className="d-flex align-items-center"
                style={{ gap: "15px" }}
              >
                {/* <div className="header-search-btn" id="searchButton">
                  <button className="btn">
                    <svg
                      onClick={() => setSearchOpen(!isSearchOpen)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1_195)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.5003 2C9.14485 2.00012 7.80912 2.32436 6.60451 2.94569C5.3999 3.56702 4.36135 4.46742 3.57549 5.57175C2.78963 6.67609 2.27926 7.95235 2.08696 9.29404C1.89466 10.6357 2.026 12.004 2.47003 13.2846C2.91406 14.5652 3.6579 15.7211 4.63949 16.6557C5.62108 17.5904 6.81196 18.2768 8.11277 18.6576C9.41358 19.0384 10.7866 19.1026 12.1173 18.8449C13.448 18.5872 14.6977 18.015 15.7623 17.176L19.4143 20.828C19.6029 21.0102 19.8555 21.111 20.1177 21.1087C20.3799 21.1064 20.6307 21.0012 20.8161 20.8158C21.0015 20.6304 21.1066 20.3796 21.1089 20.1174C21.1112 19.8552 21.0104 19.6026 20.8283 19.414L17.1763 15.762C18.1642 14.5086 18.7794 13.0024 18.9514 11.4157C19.1233 9.82905 18.8451 8.22602 18.1485 6.79009C17.4519 5.35417 16.3651 4.14336 15.0126 3.29623C13.66 2.44911 12.0962 1.99989 10.5003 2ZM4.00025 10.5C4.00025 8.77609 4.68507 7.12279 5.90406 5.90381C7.12305 4.68482 8.77635 4 10.5003 4C12.2242 4 13.8775 4.68482 15.0964 5.90381C16.3154 7.12279 17.0003 8.77609 17.0003 10.5C17.0003 12.2239 16.3154 13.8772 15.0964 15.0962C13.8775 16.3152 12.2242 17 10.5003 17C8.77635 17 7.12305 16.3152 5.90406 15.0962C4.68507 13.8772 4.00025 12.2239 4.00025 10.5Z"
                          fill="#FEFEFE"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_195">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div> */}
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
