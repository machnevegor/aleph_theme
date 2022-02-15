import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "https://esm.sh/react@17.0.2";

export enum Mode {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

export type Theme = {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
};

export const ThemeContext = createContext<Theme>({
  mode: Mode.SYSTEM,
  setMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const updateDocument = () => {
  const mode = localStorage.theme || Mode.SYSTEM;
  mode === Mode.DARK || mode === Mode.SYSTEM &&
      matchMedia("(prefers-color-scheme: dark)").matches
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");
};

type Props = {
  children: ReactNode;
  initialMode?: Mode;
};

export default function ThemeProvider(
  { children, initialMode = Mode.SYSTEM }: Props,
) {
  const [mode, setMode] = useState(localStorage.theme || initialMode);

  useEffect(() => {
    localStorage.setItem("theme", mode);
    updateDocument();
  }, [mode]);

  useEffect(() => {
    const mediaQuery = matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateDocument);
    return () => mediaQuery.removeEventListener("change", updateDocument);
  }, []);

  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
