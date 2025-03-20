import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  preflight: true,
  include: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  theme: {
    extend: {
      tokens: {
        colors: {
          white: {
            1000: { value: "#FFFFFF" }
          },
          sea: {
            900: { value: "#000082" },
            800: { value: "#0017C1" },
            700: { value: "#0031D8" },
            600: { value: "#1A3EE8" },
            500: { value: "#265AF4" },
            400: { value: "#4979F5" },
            300: { value: "#7096F8" },
            200: { value: "#9DB7F9" },
            100: { value: "#C5D7FB" },
            50: { value: "#E8F1FE" }
          },
          sumi: {
            900: { value: "#1A1A1C" },
            800: { value: "#414143" },
            700: { value: "#626264" },
            600: { value: "#757578" },
            500: { value: "#949497" },
            400: { value: "#B4B4B7" },
            300: { value: "#D8D8DB" },
            200: { value: "#E8E8EB" },
            100: { value: "#F1F1F4" },
            50: { value: "#F8F8FB" }
          },
          forest: {
            900: { value: "#115A36" },
            800: { value: "#197A4B" },
            700: { value: "#1D8B56" },
            600: { value: "#259D63" },
            500: { value: "#2CAC6E" },
            400: { value: "#51B883" },
            300: { value: "#71C598" },
            200: { value: "#9BD4B5" },
            100: { value: "#C2E5D1" },
            50: { value: "#E6F5EC" }
          },
          wood: {
            900: { value: "#B65200" },
            800: { value: "#C16800" },
            700: { value: "#C87504" },
            600: { value: "#CD820A" },
            500: { value: "#D18D0F" },
            400: { value: "#D69C2B" },
            300: { value: "#DCAC4D" },
            200: { value: "#E1C383" },
            100: { value: "#E7D8B9" },
            50: { value: "#F3EEE5" }
          },
          sun: {
            900: { value: "#D50000" },
            800: { value: "#EC0000" },
            700: { value: "#FA1606" },
            600: { value: "#FF220D" },
            500: { value: "#FF4B36" },
            400: { value: "#FF5838" },
            300: { value: "#FF7B5C" },
            200: { value: "#FFA28B" },
            100: { value: "#FFC8B8" },
            50: { value: "#FFE7E6" }
          }
        },
        fonts: {
          body: { value: "'Inter', sans-serif" }
        },
        sizes: {
          maxWidth: { value: "1024px" }
        }
      },
      breakpoints: {
        tablet: "521px",
        desktop: "961px"
      },
      semanticTokens: {
        colors: {
          foreground: {
            body: { value: "{colors.sumi.900}" },
            description: { value: "{colors.sumi.700}" },
            link: { value: "{colors.sea.800}" },
            hover: { value: "{colors.sea.900}" }
          },
          background: {
            primary: { value: "{colors.white.1000}" },
            secondary: { value: "{colors.sumi.100}" },
            tertiary: { value: "{colors.sumi.50}" }
          },
          border: {
            divider: { value: "#D8D8DB" }
          }
        }
      }
    }
  }
})
