### Just a theme provider for [Aleph.js](https://alephjs.org).
```tsx
// app.tsx
import React, { FC } from "react";
import ThemeProvider, { Mode } from "https://deno.land/x/aleph_provider_theme@v0.1.0/mod.tsx";
import Header from "~/components/Header.tsx";
import "~/style/reset.css";

export default function App(
  { Page, pageProps }: { Page: FC; pageProps: Record<string, unknown> },
) {
  return (
    <ThemeProvider initialMode={Mode.SYSTEM}>
      <Header />
      <Page {...pageProps} />
    </ThemeProvider>
  );
}
```
```tsx
// components/Header.tsx
import React, { useCallback } from "react";
import { Mode, useTheme } from "https://deno.land/x/aleph_provider_theme@v0.1.0/mod.tsx";

export default function Header() {
  const { mode, setMode } = useTheme();

  const toggleTheme = useCallback(
    () => setMode(mode === Mode.LIGHT ? Mode.DARK : Mode.LIGHT),
    [mode],
  );

  return (
    <header>
      <button onClick={toggleTheme}>
        {mode === Mode.LIGHT ? "⛅" : "🌑"}
      </button>
    </header>
  );
}
```
```css
/* style/reset.css */
.dark body
{
  background-color: #000;
}
```
