### Just a theme provider for [Aleph.js](https://alephjs.org).

```tsx
// app.tsx
import React, { FC } from "react";
import ThemeProvider, { Mode } from "https://deno.land/x/aleph_provider_theme@v1.1.0/mod.tsx";

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
import React from "react";
import { Mode, useTheme } from "https://deno.land/x/aleph_provider_theme@v1.1.0/mod.tsx";

interface SettingsItem {
  label: string;
  value: Mode;
}

const settings: SettingsItem[] = [
  {
    label: "Light Mode ⛅",
    value: Mode.LIGHT,
  },
  {
    label: "Dark Mode 🌑",
    value: Mode.DARK,
  },
  {
    label: "System Mode ⚡",
    value: Mode.SYSTEM,
  },
];

export default function ThemeToggler() {
  const { mode, setMode } = useTheme();

  return (
    <div className="inline-block text-center" id="theme-toggler">
      <button className="w-full px-4 py-2 font-medium rounded-md shadow-md focus:outline-none">
        {settings.find(({ value }) => value === mode)?.label}
      </button>
      <ul className="mt-2 rounded-md shadow-md">
        {settings.map(({ label, value }) => (
          <li key={value}>
            <button
              className="w-full px-4 py-2 rounded-md hover:shadow focus:outline-none"
              onClick={() => setMode(value)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

```css
/* style/reset.css */
#theme-toggler ul
{
    display: none;
}

#theme-toggler:hover ul
{
    display: block;
}
```
