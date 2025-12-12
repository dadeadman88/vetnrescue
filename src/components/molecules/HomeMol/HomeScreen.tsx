import React, { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { useSelector } from "react-redux";
import { States } from "../../../utils/types";
import { navigate } from "../../../navigation/RootNavigation";

const HomeScreen = () => {
  const language = useSelector((state: States) => state.Others.language);

  const HomeTabs = [
    {
      key: 0,
      title: "Vet Finder",
      titleAr: "البحث عن الطبيب البيطري",
      navigateTo: SCREENS.HEALTH_COACHING,
      image: require("../../../assets/images/petFinder.png"),
    },
    {
      key: 1,
      title: "Rescue Services",
      titleAr: "خدمات الإنقاذ",
      navigateTo: SCREENS.FITNESS_DETAIL,
      image: require("../../../assets/images/rescueIcon.png"),
    },
    {
      key: 2,
      title: "Contact for Advertisement",
      titleAr: "تواصل معنا للترويج",
      navigateTo: SCREENS.EDIT_PROFILE,
      image: require("../../../assets/images/promoIcon.png"),
    }
  ];

  useEffect(() => {

  }, [])

  return (
      <View style={{ flex: 1, backgroundColor: "#FFF"}}>
          <View style={styles.headerWrapper}>
            <View style={styles.headerRow}>
              <View style={styles.logoContainer}>
                <Image source={IMAGES.headerLogo} style={styles.logoImage} resizeMode="contain" />
              </View>
            </View>
          </View>

          <ImageBackground source={require("../../../assets/images/buttonBg01.png")} style={styles.imageBackground} resizeMode="cover">
              <TouchableOpacity 
                onPress={() => navigate(SCREENS.FITNESS_DETAIL, { type: "vet" })}
                style={styles.buttonContainer}
              >
                <Image
                  source={HomeTabs[0].image}
                  style={{
                    marginVertical: 5,
                    width: 50,
                    height: 50,
                    tintColor: "#5FBE3A"
                  }}
                  resizeMode="contain"
                />
                <Typography color={theme.color.primary} size={theme.fontSize.large} align="center">
                    {language === 'ar' ? HomeTabs[0].titleAr : HomeTabs[0].title}
                </Typography>
              </TouchableOpacity>
          </ImageBackground>

          <ImageBackground source={require("../../../assets/images/buttonBg02.png")} style={styles.imageBackground} resizeMode="cover">
              <TouchableOpacity 
                onPress={() => navigate(SCREENS.FITNESS_DETAIL, { type: "rescue" })}
                style={styles.buttonContainer}
              >
                <Image
                  source={HomeTabs[1].image}
                  style={{
                    marginVertical: 5,
                    width: 50,
                    height: 50,
                    tintColor: "#5FBE3A"
                  }}
                  resizeMode="contain"
                />
                <Typography color={theme.color.primary} size={theme.fontSize.large} align="center">
                    {language === 'ar' ? HomeTabs[1].titleAr : HomeTabs[1].title}
                </Typography>
              </TouchableOpacity>
          </ImageBackground>
          
          <ImageBackground source={require("../../../assets/images/buttonBg03.png")} style={styles.imageBackground} resizeMode="cover">
              <TouchableOpacity 
                onPress={() => navigate(SCREENS.EDIT_PROFILE)}
                style={styles.buttonContainer}
              >
                <Image
                  source={HomeTabs[2].image}
                  style={{
                    marginVertical: 5,
                    width: 50,
                    height: 50,
                    tintColor: "#5FBE3A"
                  }}
                  resizeMode="contain"
                />
                <Typography color={theme.color.primary} size={theme.fontSize.large} align="center">
                    {language === 'ar' ? HomeTabs[2].titleAr : HomeTabs[2].title}
                </Typography>
              </TouchableOpacity>
          </ImageBackground>

      </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    width: "100%"
  },
  headerRow: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 50
  },
  logoImage: {
    width: "50%",
    height: 70,
  },
  imageBackground: {
    height: Dimensions.get('window').height * 0.23, // 25vh equivalent
    alignItems: "center",
    justifyContent: "center",
    marginBottom:20,
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  }
});

export default HomeScreen;
