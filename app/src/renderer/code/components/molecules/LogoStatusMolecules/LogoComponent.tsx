import { useAppState } from "../../../contexts/AppStateContext";

function LogoComponent() {
  const { toggleDarkMode } = useAppState();
  return (
    <div className="w-full pt-2" onClick={() => toggleDarkMode()}>
      <img className="m-auto w-3/4" src="/assets/Logo.png" />
    </div>
  );
}

export default LogoComponent;
