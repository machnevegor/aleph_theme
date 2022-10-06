import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "https://esm.sh/react@17.0.2";

export const QUERY = "(prefers-color-scheme: dark)";

export enum Mode {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

export interface Theme {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
}

export const ThemeContext = createContext<Theme>({
  mode: Mode.SYSTEM,
  setMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const updateDocument = () => {
  const mode = localStorage.theme || Mode.SYSTEM;
  mode === Mode.DARK || mode === Mode.SYSTEM &&
      matchMedia(QUERY).matches
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");
};

interface ThemeProps {
  initialMode?: Mode;
}

const ThemeProvider: FC<ThemeProps> = (
  { children, initialMode = Mode.SYSTEM },
) => {
  const [mode, setMode] = useState(localStorage.theme || initialMode);

  useEffect(() => {
    localStorage.setItem("theme", mode);
    updateDocument();
  }, [mode]);

  useEffect(() => {
    const query = matchMedia(QUERY);
    query.addEventListener("change", updateDocument);
    return () => query.removeEventListener("change", updateDocument);
  }, []);

  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
