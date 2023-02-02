import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function ThemeSwitcher() {
  const [checked, setChecked] = useState(false);

  const toggleDarkMode = (checked: boolean) => {
    setChecked(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <DarkModeSwitch
      style={{ marginBottom: '2rem' }}
      checked={checked}
      onChange={toggleDarkMode}
      size={"30%"}
    />
  );
}
