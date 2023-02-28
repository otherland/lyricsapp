import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const breakpoints = ['40em', '52em', '64em']

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    brand: {
      orange: '#FF9000',
      blue: '#4141FF',
      blueLight: '#0055ffAA',
      purple: "#5D3FD3",
      50: '#C2D6FF',
      100: '#ADC9FF',
      200: '#99BBFF',
      300: '#85ADFF',
      400: '#70A0FF',
      500: '#5C92FF',
      600: '#4785FF',
      700: '#3377FF',
      800: '#1F69FF',
      900: '#0055ff'
    },
    black: '#16161D',
    customBlue: '#4455ff'
  },
  breakpoints,
  icons: {
    logo: {}
  },
  styles: {
    global: {
      a: {
        _hover: {
          textDecoration: "none !important",
        },
      },
      body: {
        bg: "gray.600",
        color: "white",

      },
      ".chakra-ui-light": {
          "display": "flex",
      },
    },
  },
  components: {
    Button: {
      variants: {
        "link": {
          color: 'white',
          _hover: {
            textDecoration: "none !important",
            color: 'gray.500'
          },
        },
        "solid": {
          color: 'white',
          backgroundColor: 'brand.purple',
          // _hover: {}
        },
      }
    }
  }
});

export default theme
