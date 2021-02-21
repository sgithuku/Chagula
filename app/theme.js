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
        Button: {
          bgColor: mode(light.button, dark.button)(props),
        },
      },
      scrollbarColor: mode(light.text + "!important", dark.text + "!important")(props),
      "::-webkit-scrollbar": mode(light.text, dark.text)(props),
      ".category": {
        bgColor: mode(dark.backgroundColor, light.backgroundColor)(props),
        color: mode(dark.text, light.text)(props),
      },
      label: {
        fontWeight: "bold !important",
      },
      ".chakra-switch__thumb": {
        backgroundColor: mode(dark.switches + "!important", light.switches + "!important")(props),
      },
      ".chakra-switch__track": {
        backgroundColor: mode(light.switches + "!important", dark.switches + "!important")(props),
      },
      "::placeholder": {
        color: mode(light.text, dark.text)(props),
        opacity: 1 /* Firefox */,
      },
      "form button": {
        marginTop: "3",
      },
      input: {
        color: "#171923 !important",
      },
    }),
  },
})

export default theme
