import { useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useAppContext } from "../../contexts/AppStateContext";

export default function ThemeSwitcher() {
  const { appState, setAppState } = useAppContext();

  useEffect(() => {
    if (appState.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [appState.theme]);

  const toggleDarkMode = (checked: boolean) => {
    setAppState({
      ...appState,
      theme: checked ? "dark" : "light",
    });
  };

  return (
    <DarkModeSwitch
      style={{ marginBottom: "2rem" }}
      checked={appState.theme === "dark"}
      onChange={toggleDarkMode}
      size={"30%"}
    />
  );
}
