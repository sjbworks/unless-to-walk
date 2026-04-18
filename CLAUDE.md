# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npx expo start       # Start dev server (scan QR or press i/a/w for simulator)
expo start --ios     # iOS simulator
expo start --android # Android emulator
expo start --web     # Web browser
npm run lint         # Run ESLint via expo lint
npm run reset-project # Move current app/ to app-example/, create blank app/
```

There are no tests configured in this project.

## Architecture

This is an **Expo (React Native)** app using **expo-router** for file-based routing with TypeScript strict mode.

### Routing

- `app/_layout.tsx` — Root layout: wraps the entire app in `ThemeProvider` (light/dark), sets up a `Stack` navigator with `(tabs)` as the anchor and `modal` as a sheet.
- `app/(tabs)/_layout.tsx` — Tab bar with three tabs: Home (`index`), Explore (`explore`), Test (`test`). Uses `HapticTab` as the tab button for haptic feedback.
- `app/(tabs)/test.tsx` — A grid layout experiment using `FlatList` with `numColumns`.

### Theming

Theme is resolved at runtime from the system color scheme via a two-layer pattern:

1. `hooks/use-color-scheme.ts` — Wraps React Native's `useColorScheme` (`.web.ts` variant for web).
2. `hooks/use-theme-color.ts` — Reads from `constants/theme.ts` (`Colors`) using the active scheme; accepts per-component `light`/`dark` overrides.
3. `constants/theme.ts` — Single source of truth for `Colors` (text, background, tint, icon, tabIcon) and `Fonts` (platform-specific font stacks).

Themed primitives (`ThemedText`, `ThemedView`) consume `useThemeColor` and accept `lightColor`/`darkColor` props for overrides.

### Path alias

`@/` maps to the repo root (configured in `tsconfig.json`). Use `@/components/...`, `@/hooks/...`, `@/constants/...` etc.

### Platform-specific files

expo-router resolves `.ios.tsx` before `.tsx` on iOS. Currently used for `components/ui/icon-symbol.ios.tsx` (SF Symbols on iOS vs a fallback on other platforms).
