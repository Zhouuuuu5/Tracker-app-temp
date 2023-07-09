const primary = '#463FB0'; // rgb(70, 63, 176)
const hateprimary = '#000';
const grays = {
  white: '#fff', // rgb(255, 255, 255)
  gray100: '#F2F2F2', // rgb(242, 242, 242)
  gray800: '#5D5D5D', // rgb(93, 93, 93)
  gray900: '#333333', // rgb(51, 51, 51)
  gray950: '#1e1e1e', //rgb(30, 30, 30)
  gray975: '#121212', // rgb(18, 18, 18)
  black: '#000', // rgb(0, 0, 0)
};
const maincolor = '#FEF753'; // rgba(254, 247, 83, 1), yellow
const blue = '#34C3FF';

export default {
  light: {
    primary,
    text: grays.gray900,
    background: grays.black,
    tint: primary,
    tabIconDefault: '#ccc',
    ...grays,
    completedBackground: primary,
    completedPrimary: grays.white,
    navBarBackground: grays.white,
  },
  dark: {
    hateprimary,
    title: maincolor,
    text: grays.white,
    background: grays.black,
    tint: blue,
    tabIconDefault: '#ccc',
    ...grays,
    white: grays.gray950,
    completedBackground: grays.gray900,
    completedPrimary: maincolor,
    navBarBackground: grays.black,
  },
};
