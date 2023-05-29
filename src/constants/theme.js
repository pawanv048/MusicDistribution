import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

// USE IT WHEN NEED TO CHANGE THEME
export const dark = {
  theme: "dark",
  base1: "#1d1c1d",
  base2: "#413244",
  base3: "#5f5063",
  base4: "#88788a",
  blue2: "#7cc5ff",
  blue3: "#7cc5ff",
  blue4: "#D3ECFF",
  buttonMask: "rgba(0,0,0,.2)",
  dot: "#66017b",
  indigo4: "#ac9fc7",
  mask: "rgba(0,0,0,.8)",
  red2: "#e4606a",
  red3: "#3f2d2f",
  shadow: "transparent",
  darkShadow: "transparent",
  text: "#f9f2fa",
  text2: "#ece1ee",
  text3: "#dfdaf0",
  white: "#303041",
  pink1: "#f5c9fd",
  pink2: "#47475f",
  pink3: "#fec3e7",
  purple: "#cf8dde",
  purple2: "#e7b9f1",
  purpleLight: "#f7eef9",
  green: "#74f700",
  dark: true,
  colors: {
    primary: "#d9d9e0",
    background: "#1d1c1d",
    card: "#1d1c1d",
    text: "#f6ddfa",
    border: "#797479",
    notification: "green",
    activeTab: "#cf8dde",
    inactiveTab: "#d9d9e0",
  },
};
// USE IT WHEN NEED TO CHANGE THEME
export const standard = {
  theme: "standard",
  base1: "#ffffff",
  base2: "#f5f5ff",
  base3: "#ebebff",
  base4: "#e0e0ff",
  blue2: "#addbff",
  blue3: "#7cc5ff",
  blue4: "#2d8ad3",
  primary: "#3ECAC0",
  buttonMask: "rgba(255,255,255,.2)",
  dot: "#f5f5ff",
  indigo4: "#bec2e6",
  mask: "rgba(255,255,255,.8)",
  red2: "#e4606a",
  red3: "#fee5e7",
  shadow: "#e0e0ff",
  darkShadow: "#aaaac7",
  text: "#17001c",
  text2: "#392f3a",
  text3: "#514953",
  white: "#ffffff",
  pink1: "#fe46b0",
  pink2: "#fee7f5",
  pink3: "#ffa7dd",
  purple: "#66017b",
  purple2: "#9718b1",
  purpleLight: "#66017b",
  green: "#56b801",
  dark: false,
  colors: {
    primary: "#47475f",
    background: "#f5f5ff",
    card: "#f5f5ff",
    text: "#66017b",
    border: "#e0e0ff",
    notification: "yellow",
    activeTab: "#9718b1",
    inactiveTab: "#685d6b",
  },
};


export const COLORS = {
  error: 'rgba(246, 86, 93, 1)',
  error80: 'rgba(246, 86, 93, 0.8)',
  error60: 'rgba(246, 86, 93, 0.6)',
  error20: 'rgba(246, 86, 93, 0.2)',
  error08: 'rgba(246, 86, 93, 0.08)',

  // Primary
  primary: 'rgba(62, 202, 189,1)',
  primary80: 'rgba(62, 202, 189, 0.8)',
  primary60: 'rgba(62, 202, 189, 0.6)',
  primary20: 'rgba(62, 202, 189, 0.2)',
  primary08: 'rgba(62, 202, 189, 0.08)',

  // Secondary
  secondary: 'rgba(161, 219, 245, 1)',
  secondary80: 'rgba(161, 219, 245, 0.8)',
  secondary60: 'rgba(161, 219, 245, 0.6)',
  secondary20: 'rgba(161, 219, 245, 0.2)',
  secondary08: 'rgba(161, 219, 245, 0.08)',

  // Success
  success: 'rgba(253, 212, 70, 1)',
  success80: 'rgba(253, 212, 70, 0.8)',
  success60: 'rgba(253, 212, 70, 0.6)',
  success20: 'rgba(253, 212, 70, 0.2)',
  success08: 'rgba(253, 212, 70, 0.08)',

  // Dark
  dark: 'rgba(13, 15, 35, 1)',
  dark80: 'rgba(13, 15, 35, 0.8)',
  dark60: 'rgba(13, 15, 35, 0.6)',
  dark20: 'rgba(13, 15, 35, 0.2)',
  dark08: 'rgba(13, 15, 35, 0.08)',

  // Grey
  grey: 'rgba(160, 161, 180, 1)',
  grey80: 'rgba(160, 161, 180, 0.8)',
  grey60: 'rgba(160, 161, 180, 0.6)',
  grey20: 'rgba(160, 161, 180, 0.2)',
  grey08: 'rgba(160, 161, 180, 0.08)',

  // Light Grey
  lightGrey: 'rgba(247, 247, 247, 1)',
  lightGrey80: 'rgba(247, 247, 247, 0.8)',
  lightGrey60: 'rgba(247, 247, 247, 0.6)',
  lightGrey20: 'rgba(247, 247, 247, 0.2)',
  lightGrey08: 'rgba(247, 247, 247, 0.08)',

  // Light
  light: 'rgba(255, 255, 255, 1)',
  light80: 'rgba(255, 255, 255, 0.8)',
  light60: 'rgba(255, 255, 255, 0.6)',
  light20: 'rgba(255, 255, 255, 0.2)',
  light08: 'rgba(255, 255, 255, 0.08)',

  // Support 1
  support1: 'rgba(17, 52, 85, 1)',
  support1_08: 'rgba(110, 162, 255, 0.08)',

  // Support 2
  support2: 'rgba(249, 161, 218, 1)',
  support2_08: 'rgba(249, 161, 218, 0.08)',

  // Support 3
  support3: 'rgba(0, 210, 224, 1)',
  support3_08: 'rgba(0, 210, 224, 0.08)',

  // Support 4
  support4: 'rgba(255, 132, 13, 1)',
  support4_08: 'rgba(255, 132, 13, 0.08)',

  // Support 5
  support5: 'rgba(123, 96, 238, 1)',
  support5_08: 'rgba(123, 96, 238, 0.08)',

  // Shadow
  shadow: 'rgba(138, 149, 158, 1)',
  shadow08: 'rgba(138, 149, 158, 0.08)',
}

export const SIZES = {
   // global sizes
   base: 8,
   font: 14,
   radius: 30,
   padding: 10,
   padding2: 12,

   // font sizes
   largeTitle: 50,
   h1: 30,
   h2: 22,
   h3: 20,
   h4: 18,
   h5: 14,
   body1: 30,
   body2: 20,
   body3: 16,
   body4: 14,
   body5: 12,

   // app dimensions
   width,
   height
}

 export const TEXTS = {
  text: {
    size: {
      xsm: 12,
      sm: 14,
      base: 16,
      md: 18,
      lg: 20,
      xl: 24,
    },
    weight: {
      light: '200',
      normal: '400',
      bold: '700',
    },
    spacing: {
      tight: 0.8,
      normal: 1,
      wide: 1.5,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      normal: 1.5,
      large: 2,
    },
    fonts: {
      base: null,
    },
  },
  //COLORS,
  space: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 36,
    xl: 40,
  },
  radius: {
    xs: 6,
    sm: 10,
    base: 14,
    lg: 20,
    xl: 30,
  },
  opacity: {
    none: 0,
    low: 0.3,
    demi: 0.5,
    high: 0.8,
    base: 1,
  },
  shadows: [
    {
      shadowColor: COLORS.black,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 1,
    },
    {
      shadowColor: COLORS.black,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.6,
      shadowRadius: 5,
    },
  ],
  borders: [
    {
      borderWidth: 1,
      borderColor: COLORS.black,
    },
    {
      borderWidth: 2,
      borderColor: COLORS.black,
    },
    {
      borderWidth: 5,
      borderColor: COLORS.black,
    },
  ],
  button: {
    disabled: {
      opacity: 0.5,
    },
  },
};

const appTheme = { COLORS, SIZES, TEXTS };

export default appTheme;