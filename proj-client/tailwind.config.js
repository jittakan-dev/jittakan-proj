/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        filling: "filling 20s ease-in-out infinite",
      },
      keyframes: {
        filling: {
          "50%": { "background-position": "3000px 0px" },
          "100%": { "background-position": "6000px 350px" },
        },
      },
      screens: {
        sz: { min: "260px", max: "319px" },

        sx: { min: "320px", max: "479px" },

        smr: { min: "479px", max: "639px" }, //TRANSFORM 1 with  Mobile

        sm: { min: "639px", max: "767px" }, //TRANSFORM 1 No  Mobile

        md: {
          raw: "(min-width: 767px) and (max-width: 1023px) and (max-height: 767px)",
        },

        mdh: {
          raw: "(min-width: 767px) and (max-width: 1023px) and (min-height: 768px)",
        },

        lg: {
          //TRANSFORM 2
          raw: "(min-width: 1023px) and (max-width: 1279px) and (max-height: 767px)",
        },

        lgh: {
          raw: "(min-width: 1023px) and (max-width: 1279px) and (min-height: 768px)",
        },

        xl: { min: "1280px", max: "1535px" },

        "2xl": { min: "1536px" },
      },
      fontSize: {
        "base-s": [
          "0.925rem",
          {
            lineHeight: "1.325rem",
          },
        ],
        "base-l": [
          "1.075rem",
          {
            lineHeight: "1.625rem",
          },
        ],
        "1.25xl": [
          "1.3125rem",
          {
            lineHeight: "1.850rem",
          },
        ],
        "1.5xl": [
          "1.375rem",
          {
            lineHeight: "1.875rem",
          },
        ],
        "2.5xl": [
          "1.725rem",
          {
            lineHeight: "2.125rem",
          },
        ],
        "4.2xl": [
          "2.5rem",
          {
            lineHeight: "2rem",
          },
        ],
        "4.5xl": [
          "3rem",
          {
            lineHeight: "3rem",
            letterSpacing: "0.01em",
            fontWeight: "500",
          },
        ],
        "11xl": [
          "8rem",
          {
            lineHeight: "8rem",
            letterSpacing: "0.01em",
            fontWeight: "900",
          },
        ],
      },
      gap: {
        0.7: "0.19rem",
      },
      spacing: {
        0.7: "0.19rem",
        18: "4.5rem",
      },
      borderWidth: {
        3: "3px",
      },
      colors: {
        blackGB: "#111a1a",
        darkGB: "#0d2121",
        darkLGB: "#1a4040",
        lightGB: "#4aa898",
        whiteY: "#f7f7eb", //edd1b0 //f8fd89 //eddd6e
        whiteG: "#eaf5e1",
        whiteB: "#d1ebe3",
        whiteDG: "#d4e8c3",
        whiteLG: "#daebcc",
        whiteMY: "#fafab6",
        whiteDY: "#f5f5a6",
        whiteLO: "#fafaca",
        darkOlive: "#4b8001",
        olive: "#81a84a",
        mustard: "#e3e334",
        blueSea: "#68C5A8",
      },
    },
  },
  plugins: [],
};
