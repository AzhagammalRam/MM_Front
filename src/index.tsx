import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './redux/store'; 
import 'react-toastify/dist/ReactToastify.css';

// Utility functions for theme handling
const calculateSettingAsThemeString = (localStorageTheme: string | null): string => {
  return localStorageTheme ?? "light";
};

const updateButton = (buttonEl: HTMLElement | null, isDark: boolean) => {
  const newCta = isDark ? "dark" : "light";
  if (buttonEl) {
    buttonEl.setAttribute("aria-label", newCta);
    buttonEl.innerText = newCta;
  }
};

const updateThemeOnHtmlEl = (theme: string) => {
  const el = document.querySelector("html");
  if (el) {
    el.setAttribute("data-theme", theme);
  }
};

// Main app component
const AppWrapper: React.FC = () => {
  const themeToggleButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const button = themeToggleButtonRef.current;
    const localStorageTheme = localStorage.getItem("theme");

    const currentThemeSetting = calculateSettingAsThemeString(localStorageTheme);

    updateButton(button, currentThemeSetting === "dark");
    updateThemeOnHtmlEl(currentThemeSetting);

    const handleThemeToggle = () => {
      const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      updateButton(button, newTheme === "dark");
      updateThemeOnHtmlEl(newTheme);
    };

    if (button) {
      button.addEventListener("click", handleThemeToggle);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (button) {
        button.removeEventListener("click", handleThemeToggle);
      }
    };
  }, []);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <ToastContainer />
        <App />
      </Provider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<AppWrapper />);
