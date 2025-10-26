import {moderateScale} from 'react-native-size-matters';
import {Colors, ThemeManager, Typography} from 'react-native-ui-lib';
import {theme} from './Constants';

export class DesignSystem {
  static async configure(): PVoid {
    ThemeManager.setComponentTheme('Text', {
      allowFontScaling: false,
      extraSmall12: true,
      regular: true,
    });

    ThemeManager.setComponentTheme('TextField', {
      allowFontScaling: false,
    });

    Colors.loadColors(theme.color);

    let fontFamilies = {};
    Object.keys(theme.font).map(s => {
      if (!fontFamilies) fontFamilies = {};
      fontFamilies[s] = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fontFamily: theme.font[s],
      };
    });

    Typography.loadTypographies({
      section: {fontSize: moderateScale(26), fontWeight: '600'},
      tiny: {
        fontSize: moderateScale(theme.fontSize.tiny),
        // lineHeight: moderateScale(theme.fontSize.tiny + 5),
      },
      smallest: {
        fontSize: moderateScale(theme.fontSize.extraVSmall),
        // lineHeight: moderateScale(theme.fontSize.extraVSmall + 5),
      },
      extraVSmall: {
        fontSize: moderateScale(theme.fontSize.extraVSmall),
        // lineHeight: moderateScale(theme.fontSize.extraVSmall + 5),
      },
      extraSmall12: {
        fontSize: moderateScale(theme.fontSize.extraSmall12),
        // lineHeight: moderateScale(theme.fontSize.extraSmall12 + 5),
      },
      extraSmall: {
        fontSize: moderateScale(theme.fontSize.extraSmall),
        // lineHeight: moderateScale(theme.fontSize.extraSmall + 5),
      },
      small: {
        fontSize: moderateScale(theme.fontSize.small),
        // lineHeight: moderateScale(theme.fontSize.small + 5),
      },
      mediumSize: {
        fontSize: moderateScale(theme.fontSize.medium),
        // lineHeight: moderateScale(theme.fontSize.medium + 5),
      },
      large: {
        fontSize: moderateScale(theme.fontSize.large),
        // lineHeight: moderateScale(theme.fontSize.large + 5),
      },
      large20: {
        fontSize: moderateScale(theme.fontSize.large20),
        // lineHeight: moderateScale(theme.fontSize.large20 + 5),
      },
      large24: {
        fontSize: moderateScale(theme.fontSize.large24),
        // lineHeight: moderateScale(theme.fontSize.large24 + 5),
      },
      large26: {
        fontSize: moderateScale(theme.fontSize.large26),
        // lineHeight: moderateScale(theme.fontSize.large26 + 5),
      },
      regularSize: {
        fontSize: moderateScale(theme.fontSize.regular),
        // lineHeight: moderateScale(theme.fontSize.regular + 5),
      },
      extraLarge: {
        fontSize: moderateScale(theme.fontSize.extraLarge),
        // lineHeight: moderateScale(theme.fontSize.extraLarge + 5),
      },
      heading: {
        fontSize: moderateScale(theme.fontSize.headingSize),
        // lineHeight: moderateScale(theme.fontSize.headingSize + 5),
      },
      ...fontFamilies,
    });
  }
}
