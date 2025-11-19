import { ReactNode } from "react";
import { Dimensions } from "react-native";
import { SCREENS } from "./ScreenNames";
import { navigate } from "../navigation/RootNavigation";
import { IMAGES } from ".";
interface Tab {
  key: number;
  title: string;
  navigateTo: string;
  image: ReactNode;
  imageActive: ReactNode;
  vector: string;
}
const { height, width } = Dimensions.get("screen");

export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH = width;

const fontRegularName = "Poppins";

export const theme = {
  font: {
    regular: fontRegularName + "-Regular",
    semibold: fontRegularName + "-SemiBold",
    bold: fontRegularName + "-Bold",
    medium: fontRegularName + "-Medium",
  },
  fontSize: {
    tiny: 8,
    extraVSmall: 10,
    extraSmall12: 12,
    extraSmall: 13,
    small: 14,
    medium: 15,
    regular: 16,
    large: 18,
    large20: 20,
    headingSize: 22,
    large24: 24,
    large26: 26,
    extraLarge: 28,
  },
  color: {
    primary: "#5FBE3A",
    primarybeta: "#67AE6E",
    secondry: "#6969691A",
    cyan: "#9DE5FF",
    tgray: "#7C8BA0",
    descColor: "#8C8C8C",
    inputTypeColor: "#F5F9FE",
    darkGray: "#454857",

    divider: "#E6E8EE",
    black: "#000",
    white: "#fff",
  },
};

export const CheckIfValid = (
  index: number,
  isValid: boolean,
  state: boolean[],
  setState: React.Dispatch<React.SetStateAction<boolean[]>>
) => {
  const copy = [...state];
  copy[index] = isValid;
  setState(copy);
};

export const BOTTOMTABS = [
  {
    key: 0,
    title: "Vet Finder",
    titleAr: "البحث عن الطبيب البيطري",
    navigateTo: SCREENS.HEALTH_COACHING,
    image: require("../assets/images/petFinder.png"),
  },
  {
    key: 1,
    title: "Rescue Services",
    titleAr: "خدمات الإنقاذ",
    navigateTo: SCREENS.FITNESS_DETAIL,
    image: require("../assets/images/rescueIcon.png"),
  },
  {
    key: 2,
    title: "Promotions",
    titleAr: "الترويجات",
    navigateTo: SCREENS.NOTIFICATION,
    image: require("../assets/images/promoIcon.png"),
  },
  {
    key: 3,
    title: "Settings",
    titleAr: "الإعدادات",
    navigateTo: SCREENS.PROFILE,
    image: require("../assets/images/account.png"),
  },
];
