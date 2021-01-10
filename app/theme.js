// theme.js
import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"
import { dark, light } from "./colors"

const fonts = {
  serif: `Constantia, 'Lucida Bright', Lucidabright, 'Lucida Serif', Lucida, 'DejaVu Serif', 'Bitstream Vera Serif', 'Liberation Serif', Georgia, serif`,
  sans_serif: `Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif`,
  code: `Inconsolata, Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`,
}

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode(light.backgroundColor, dark.backgroundColor)(props),
        color: mode(light.text, dark.text)(props),
        fontFamily: fonts.sans_serif,
        fontSize: "lg",
        button: {
          bgColor: "orange.500",
        },
      },
      ".category": {
        bgColor: mode(dark.backgroundColor, light.backgroundColor)(props),
        color: mode(dark.text, light.text)(props),
      },
    }),
  },
})

export default theme
