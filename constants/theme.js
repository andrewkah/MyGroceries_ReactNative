export const COLORS = {
  background: "#031F2B",
  paleBackground: "#D8D8D8",
  primary: "#56A706",
  secondary: "#D6D2D2",
  tertiary: "#263238",
  white: "#FFFFFF",
  gray: "#666",
  black: "#32343E",
};

export const SIZES = {
  // GLOBAL SIZES
  base: 8,
  font: 14,
  radius: 10,
  radius2: 30,
  padding0: 3,
  padding: 8,
  padding2: 16,
  padding3: 25,

  // ICONS
  icon0: 20,
  icon1: 30,
  icon2: 35,
  icon3: 45,

  // FONTS SIZES
  largeTitle: 45,
  h1: 30,
  h2: 24,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
};

export const FONTS = {
  largeTitle: {
    fontFamily: "extraBold",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  button: { fontFamily: "extraBold", fontSize: SIZES.h2, lineHeight: 30},
  h1: { fontFamily: "bold", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "bold", fontSize: SIZES.h4, lineHeight: 20 },
  body1: { fontFamily: "regular", fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: "regular", fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: "regular", fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontFamily: "regular", fontSize: SIZES.body4, lineHeight: 20 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
