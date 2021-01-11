import {RFValue} from 'react-native-responsive-fontsize';

export const COLOR = {
  green: '#48d792',
  skyBlue: '#12cffc',
  lavenderBlue: '#8686fb',
  blue: '#6868f5',
  pink: '#ff4d99',
  pinkLight: '#ff88aa',
  red: '#ff0000',
  silver: '#bbc2cd',
  whiteTwo: '#f2f2f2',
  white: '#ffffff',
  transparent: 'transparent',

  greenRGB: 'rgb(72,215,146)',
  blueRGB: 'rgb(104,104,245)',
  whiteRGB: 'rgb(255,255,255)',
};

export const FONT = {
  SIZE: {
    fs12: RFValue(12),
    fs15: RFValue(15),
    fs16: RFValue(16),
    fs17: RFValue(17),
    fs18: RFValue(18),
    fs20: RFValue(20),
    fs30: RFValue(30),
  },
};

export const SIZE = {
  // inputHeight: 56,
  // inputHelperHeight: 18,
  // inputRadius: 4,
  // cardHeight: 360,
  // gameCardHeight: 177,
  buttonHeight: 48,
  buttonRadius: 4,
  screenHeaderHeight: 40,
};

export default {
  COLOR,
  SIZE,
  FONT,
};
