### Just a theme provider for [Aleph.js](https://aleph.deno.dev/).

```tsx
/* routes/_app.tsx */
import {
  Mode,
  ThemeProvider,
} from "https://deno.land/x/aleph_theme@2.2.0/mod.tsx";

export default function App(
  { children }: { children: React.ReactNode },
) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
```

```tsx
/* components/ThemeToggler.tsx */
import { useCallback } from "react";
import { Mode, useTheme } from "https://deno.land/x/aleph_theme@2.2.0/mod.tsx";

const options = [
  {
    emoji: "⛅",
    label: "Light Mode",
    value: Mode.LIGHT,
  },
  {
    emoji: "🌑",
    label: "Dark Mode",
    value: Mode.DARK,
  },
  {
    emoji: "⚡",
    label: "System Mode",
    value: Mode.SYSTEM,
  },
];

export default function ThemeToggler() {
  const { mode, setMode } = useTheme();

  const onChange = useCallback(
    // deno-lint-ignore no-explicit-any
    (e: any) => setMode(e.target.value),
    [],
  );

  return (
    <select onChange={onChange} value={mode}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.emoji} {option.label}
        </option>
      ))}
    </select>
  );
}
```

```css
/* style/reset.css */
:root
{
    --text-color: black;
    --wall-color: white;
}

:root[class="dark"]
{
    --text-color: white;
    --wall-color: black;
}
```
