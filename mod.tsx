import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "https://esm.sh/react@18.2.0";

export enum Mode {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

export function update() {
  const mode: Mode = localStorage.theme ?? Mode.SYSTEM;

  mode === Mode.DARK || mode === Mode.SYSTEM &&
      matchMedia("(prefers-color-scheme: dark)").matches
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");
}

export type Theme = {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
};

export const ThemeContext = createContext<Theme>({
  mode: Mode.SYSTEM,
  setMode: () => {},
});

export function ThemeProvider(
  { children }: { children: React.ReactNode },
) {
  const [mode, setMode] = useState<Mode>(
    localStorage.theme ?? Mode.SYSTEM,
  );

  useEffect(() => {
    const query = matchMedia("(prefers-color-scheme: dark)");

    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    localStorage.theme = mode;
    update();
  }, [mode]);

  const theme = useMemo(() => ({ mode, setMode }), [mode]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
