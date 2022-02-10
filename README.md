### Just a theme provider for [Aleph.js](https://alephjs.org).

```tsx
// app.tsx
import React, { FC } from "react";
import ThemeProvider, { Mode } from "https://deno.land/x/aleph_provider_theme@v1.2.0/mod.tsx";

export default function App(
  { Page, pageProps }: { Page: FC; pageProps: Record<string, unknown> },
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
import React, { useCallback } from "react";
import { Mode, useTheme } from "https://deno.land/x/aleph_provider_theme@v1.2.0/mod.tsx";

const settings = [
  {
    label: "Light Mode",
    value: Mode.LIGHT,
    emoji: "⛅",
  },
  {
    label: "Dark Mode",
    value: Mode.DARK,
    emoji: "🌑",
  },
  {
    label: "System Mode",
    value: Mode.SYSTEM,
    emoji: "⚡",
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
      {settings.map(({ label, value, emoji }) => (
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
    --bg-color: white;
}

:root[class="dark"]
{
    --text-color: white;
    --bg-color: black;
}
```
