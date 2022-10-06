### Just a theme provider for [Aleph.js](https://aleph.deno.dev/).

```tsx
// routes/_app.tsx
import ThemeProvider, {
  Mode,
} from "https://deno.land/x/aleph_theme@2.0.0/mod.tsx";

export default function App(
  { children }: { children: React.ReactNode },
) {
  return (
    <ThemeProvider initialMode={Mode.SYSTEM}>
      <Page {...pageProps} />
    </ThemeProvider>
  );
}
```

```tsx
// components/ThemeToggler.tsx
import { useCallback } from "react";
import { Mode, useTheme } from "https://deno.land/x/aleph_theme@2.0.0/mod.tsx";

interface Option {
  emoji: string;
  label: string;
  value: Mode;
}

const options: Option[] = [
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
    (event) => setMode(event.target.value),
    [],
  );

  return (
    <select onChange={onChange}>
      {options.map(({ emoji, label, value }) => (
        <option value={value} selected={value === mode} key={value}>
          {emoji} {label}
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
