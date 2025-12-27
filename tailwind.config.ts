// import type { Config } from "tailwindcss";
// import relumeTailwindPreset from "@relume_io/relume-tailwind";
// import tailwindcssAnimate from "tailwindcss-animate";

// const config: Config = {
//   darkMode: ["class"],
//   content: [
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
//   ],
//   presets: [relumeTailwindPreset],
//   theme: {
//     container: {
//       center: true,
//       padding: {
//         DEFAULT: "1rem", // Mobile padding
//         sm: "2rem", // Tablet padding
//         lg: "4rem", // Desktop padding
//       },
//       screens: {
//         sm: "100%", // Full width on mobile
//         md: "100%", // Full width on small tablets
//         lg: "960px", // Standard desktop width
//         xl: "1280px", // Large desktop width
//         "2xl": "1440px", // Ultra-wide max
//       },
//     },
//     extend: {
//       colors: {
//         brand: {
//           primary: "#000000",
//           secondary: "#ffffff",
//         },
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         chart: {
//           "1": "hsl(var(--chart-1))",
//           "2": "hsl(var(--chart-2))",
//           "3": "hsl(var(--chart-3))",
//           "4": "hsl(var(--chart-4))",
//           "5": "hsl(var(--chart-5))",
//         },
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       keyframes: {
//         "accordion-down": {
//           from: { height: "0" },
//           to: { height: "var(--radix-accordion-content-height)" },
//         },
//         "accordion-up": {
//           from: { height: "var(--radix-accordion-content-height)" },
//           to: { height: "0" },
//         },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//       },
//     },
//   },
//   plugins: [tailwindcssAnimate],
// };

// export default config;

import type { Config } from "tailwindcss";
import relumeTailwindPreset from "@relume_io/relume-tailwind";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // Preset provides the base Relume classes
  presets: [relumeTailwindPreset],
  theme: {
    // Relume-specific breakpoints
    screens: {
      sm: "480px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      xxl: "1440px",
    },
    // Relume-specific Container logic merged with your padding preferences
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
      },
      screens: {
        sm: "100%",
        md: "100%",
        lg: "992px",
        xl: "1280px",
      },
    },
    extend: {
      // Relume's massive spacing scale (essential for Relume components)
      spacing: {
        px: "1px",
        0: "0px",
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        14: "3.5rem",
        16: "4rem",
        18: "4.5rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        30: "7.5rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        72: "18rem",
        80: "20rem",
        96: "24rem",
      },
      // Relume's specific Typography scale
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.5" }],
        md: ["1.125rem", { lineHeight: "1.5" }],
        lg: ["1.25rem", { lineHeight: "1.5" }],
        xl: ["1.25rem", { lineHeight: "1.4" }],
        "2xl": ["1.5rem", { lineHeight: "1.4" }],
        "3xl": ["1.75rem", { lineHeight: "1.4" }],
        "4xl": ["2rem", { lineHeight: "1.3" }],
        "5xl": ["2.25rem", { lineHeight: "1.2" }],
        "6xl": ["2.5rem", { lineHeight: "1.2" }],
        "7xl": ["2.75rem", { lineHeight: "1.2" }],
        "8xl": ["3rem", { lineHeight: "1.2" }],
        "9xl": ["3.25rem", { lineHeight: "1.2" }],
        "10xl": ["3.5rem", { lineHeight: "1.2" }],
      },
      // Merged Color System (Shadcn HSL + Relume Hex)
      colors: {
        // Shadcn System
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Relume System
        brand: {
          black: "#000000",
          white: "#ffffff",
        },
        neutral: {
          DEFAULT: "#666666",
          black: "#000000",
          white: "#ffffff",
          lightest: "#eeeeee",
          lighter: "#cccccc",
          light: "#aaaaaa",
          dark: "#444444",
          darker: "#222222",
          darkest: "#111111",
        },
        system: {
          "success-green": "#027a48",
          "success-green-light": "#ecfdf3",
          "error-red": "#b42318",
          "error-red-light": "#fef3f2",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Combined Keyframes (Relume Animations + Shadcn Accordion)
      keyframes: {
        "accordion-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
        "loop-horizontally": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "marquee-horizontally": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "loop-horizontally": "loop-horizontally 20s linear infinite",
        "marquee-horizontally": "marquee-horizontally 30s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
};

export default config;
