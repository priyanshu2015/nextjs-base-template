const colors = require("tailwindcss/colors");
module.exports = {
  purge: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx,css,scss}",
  ],
  darkMode: "class",
  theme: {
    borderRadius: {
      xs: "6px",
      sm: "8px",
      DEFAULT: "10px",
      md: "12px",
      lg: "14px",
      xl: "16px",
      "2xl": "18px",
      full: "9999px",
    },
    fontFamily: {
      // display: ["Oswald"],
      // body: ['"Poppins"'],
      sans: ["Poppins"],
      // serif: ["Poppins"],
      mono: ['Poppins'],
      code: ['Fira Code', 'monospace'], // Add your desired font family
    },
    // borderRadius: { DEFAULT: "12px" },
    screens: {
      xsm: "400px",

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      // macbook pro 14 inches: 1512/982
      "2xl": "1500px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      animation: {},
      keyframes: {},
      screens: {
        lg: "1024px",
      },
      colors: {
        yellow: {
          DEFAULT: "#FFD947",
          diff: "#ffa238",
          alert: "#f1c40f",
          diffbg: "#ffa2382B",
        },
        indigo: "#17294D",
        blue: {
          DEFAULT: "#1481FF",
          200: "#78C1F2",
          300: "#5EA8FF",
          400: "#4B9EFF",
          500: "#3391FF",
          600: "#2589FF",
          700: "#1180FF",
          800: "#17294D",
          // ...colors.blue,
        },
        orange: {
          ...colors.orange,
          DEFAULT: "#FF8A44",
          alert: "#fff3cd",
        },
        gray: {
          ...colors.gray,
          DEFAULT: "#a1a1aa",
          body: "#0D1117",
          550: "#30363D",
          600: "#21262D",
          700: "#161B22",
        },
        green: {
          ...colors.green,
          DEFAULT: "#3FB950",
          alert: "#07bc0c",
          diffbg: "#33B4A626",
          diff: "#33B4A6",
          neon: "#68d391"
        },
        red: {
          alert: "#e74c3c",
          diff: "#FF5757",
          diffbg: "#FF575726",
          ...colors.red,
          DEFAULT: "#DB0510",
          main: "#EB3F5E"
          // 100: "#FE9170",
        },
        github: {
          DEFAULT: "#333",
          200: "#777",
        },
        google: {
          DEFAULT: "#ea4335",
          200: "#ea433580",
        },
        purple: { ...colors.purple, DEFAULT: "#8094fe" },
        linkedin: { DEFAULT: "#0077b5", 200: "#0077b580" },
        white: { ...colors.white, body: "#F7F8FA", DEFAULT: "#FFFFFF" },

        // addcoolor
        cusblack: {
          dark: "#21262D",
          black: "#161B23",
          liblack: "rgba(255, 255, 255, 0.5)",
          vdark: "#30363D",
        },
        cusblue: {
          blue: "#3A95FF",
          drkblue: "#1481FF"
        },
      },
    },
    fontSize: {
      'xs': '11px',
      'sm': '14px',
      'tiny': '16px',
      'base': '18px',
      'lg': '20px',
      'xl': '22px',
      '2xl': '28px',
      '3xl': '40px',
      '4xl': '48px',
      '5xl': '60px',
      '6xl': '72px',
      '7xl': '24px',

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  // if JIT mode is on then dynamic colors(which are not used directly) do not work even in development mode,
  // if JIT mode is off then dynamic colors(which are not used directly) work in development mode but not in prod for which we have to list them in safelist
  safelist: [
    'bg-red-alert',
    'bg-green-alert',
    'border-gray-550'
  ]
}