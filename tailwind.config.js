import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
		extend: {
			fontFamily: {
				manrope: ["var(--font-manrope)"],
			}
		}
	},
  darkMode: "class",
  plugins: [heroui({
    themes: {
      dark: {
        extend: 'dark',
        colors: {
          background: '#1A1D24',
          'background-dark': '#111416',
          foreground: '#ffffff',
          content1: '#292E38',
          content2: '#1A1D24',
          content3: '#3a4454',
          content4: '#4a5568',
          divider: '#3a4454',
          default: {
            foreground: '#ffffff'
          },
          primary: {
              DEFAULT: '#0072F5',
              foreground: '#ffffff'
          },
          success: {
              DEFAULT: '#17C964',
              foreground: '#ffffff'
          },
          warning: {
              DEFAULT: '#F5A524',
              foreground: '#ffffff'
          },
          danger: {
              DEFAULT: '#F31260',
              foreground: '#ffffff'
          }
        },
        layout: {
          disabledOpacity: "0.3",
          radius: {
            small: "4px",
            medium: "6px",
            large: "8px"
          },
          borderWidth: {
            small: "1px",
            medium: "2px",
            large: "3px"
          }
        },
        components: {
          dropdown: {
            defaultProps: {
              menuProps: {
                className: "text-foreground"
              },
              itemClasses: {
                base: "text-foreground",
                description: "text-foreground-500"
              }
            },
            styles: {
              base: "bg-content1 border-content3",
              trigger: "bg-content1",
              menu: "bg-content1 border-content3",
              arrow: "bg-content1",
            }
          },
          button: {
            defaultProps: {
              className: "text-foreground"
            }
          },
          card: {
            defaultProps: {
              className: "text-foreground"
            }
          }
        }
      }
    }
  })],
}
