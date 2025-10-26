import React from "react";
import { commonStyles } from "../../../globalStyle";
import { View } from "react-native-ui-lib";
import HomeDetailTopView from "../../atoms/HomeAtoms/HomeDetailTopView";
import HomeDetailMol from "../../molecules/HomeMol/HomeDetailMol";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { CustomBtn } from "../../atoms/OnBoardingAtoms/OnBeardingBottomBtn";
import { navigate } from "../../../navigation/RootNavigation";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { Image, TouchableOpacity } from "react-native";
import { Typography } from "../../atoms/Typography";

const DATA = [
  { id: 2, title: "Diet Plan", image: IMAGES.pr7, navigateTo: SCREENS.DIET },
  { id: 2, title: "Moods", image: IMAGES.pr8, navigateTo: SCREENS.MOOD },
];

const HealthCoachingTamplet = () => {
  const { AllCategoryData } = useSelector((state) => state.Main);
  const { params } = useRoute();
  const { getState } = useNavigation();

  return (
    <>
      {
        (getState()?.routeNames[getState()?.index] == "HealthCoaching" && (
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
              backgroundColor: theme.color.primary,
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
              // position: "absolute",
              // top: 0,
              // left: 0,
              // right: 0,
              // zIndex: 11111111,
            }}
          >
            <Typography
              align="center"
              textType="semiBold"
              size={theme.fontSize.large}
              color={"#fff"}
            >
              Health Coaching
            </Typography>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {DATA?.map((item) => (
                <TouchableOpacity onPress={() => navigate(item.navigateTo)}>
                  <View row marginV-15>
                    <Image
                      source={item.image}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))
      }
      <HomeDetailTopView data={AllCategoryData[params?.index]} />

      <View style={[commonStyles.footerContainer, { marginTop: -30 }]}>
        <HomeDetailMol data={AllCategoryData[params?.index]} />
      </View>
      {params?.index == 0 && (
        <CustomBtn
          style={{ margin: 20 }}
          label="Book a Coaching Session"
          onPress={() => navigate(SCREENS.BOOKING)}
        />
      )}
    </>
  );
};

export default HealthCoachingTamplet;
