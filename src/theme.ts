// src/theme.ts
import { createSystem, defaultConfig } from "@chakra-ui/react";

// Création du système de thème
export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50:  { value: "#e3f2f9" },
          100: { value: "#c5e4f3" },
          200: { value: "#a2d4ec" },
          300: { value: "#7ac1e4" },
          400: { value: "#47a9da" },
          500: { value: "#0088cc" },
          600: { value: "#007ab8" },
          700: { value: "#006ba1" },
          800: { value: "#005885" },
          900: { value: "#003f5e" },
        },
      },
      fonts: {
        body:    { value: `'Inter', sans-serif` },
        heading: { value: `'Inter', sans-serif` },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid:     { value: "{colors.brand.500}" },
          contrast:  { value: "{colors.brand.50}" },
          fg:        { value: "{colors.brand.700}" },
          muted:     { value: "{colors.brand.100}" },
          subtle:    { value: "{colors.brand.200}" },
          emphasized: { value: "{colors.brand.300}" },
          focusRing: { value: "{colors.brand.500}" },
        },
      },
    },
  },
});
