import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        92: '23rem',
        108: '27rem',
        112: '28rem',
      },
      width: {
        120: '30rem',
      },
      borderRadius: {
        '5xl': '2.5rem',
      },
      minHeight: {
        '4/5': '80%',
        '112': '28rem',
      },
    },
  },
  plugins: [],
};
export default config;
