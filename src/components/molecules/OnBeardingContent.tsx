import React, { useEffect, useState } from "react";
import { SCREENS, theme } from "../../constants";
import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import { commonStyles } from "../../globalStyle";
import { Typography } from "../atoms/Typography";
import { navigate } from "../../navigation/RootNavigation";
import { OnBoardingBtn } from "../atoms/OnBoardingAtoms/OnBoardingBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../redux/slices/AuthSlice";
import Animated, { SlideInDown, SlideInLeft } from "react-native-reanimated";

export const OnBeardingContent = (props: any) => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("@LA-USER", (error, result) => {
      if (!error) {
        if (result) {
          dispatch(LoginUser(JSON.parse(result)))
        }
      }
      setLoading(false)
    })
  }, [])

  return (
    <View center marginT-10 marginH-20 flex>
      <Animated.View entering={SlideInLeft.duration(500)}>
        <Typography
          textType="bold"
          align="center"
          size={theme.fontSize.extraLarge}
          color={theme.color.white}
        >
          Take Health{"\n"}into your own hands
        </Typography>
        <View
          marginV-20
          style={[commonStyles.lineBar, { borderColor: theme.color.white, borderWidth: 0.4 }]}
        />
        {/* <Typography
          textType="semiBold"
          align="center"
          size={theme.fontSize.medium}
          color={theme.color.white}
        >
          As a Nationally Board Certified Health and Wellness Coach, Elite
          Personal Trainer,
        </Typography> */}
      </Animated.View>
      {
        loading ?
          <View center marginT-20>
            <ActivityIndicator color={"#fff"} size={"large"} />
          </View>
          :
          <Animated.View entering={SlideInDown.duration(1000)}>
            <OnBoardingBtn onPress={() => navigate(SCREENS.LOGIN)} />
          </Animated.View>
      }
    </View>
  );
};

const styles = StyleSheet.create({});
