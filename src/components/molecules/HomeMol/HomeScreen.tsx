import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import HeaderHome from "../../atoms/HomeAtoms/HeaderHome";
import Fitness from "../../atoms/HomeAtoms/Fitness";
import Nutrition from "../../atoms/HomeAtoms/Nutrition";
import { theme } from "../../../constants";
import HealthCoachingHome from "../../atoms/HomeAtoms/HealthCoachingHome";
import { View } from "react-native-ui-lib";
import { useDispatch } from "react-redux";
import { MainActions } from "../../../redux/actions/MainActions";

const HomeScreen = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    await dispatch(MainActions.GetAllCategoryData()).then((v) => {
      let status = v.meta.requestStatus;
      if (status == "fulfilled") {

      }
    });
  }

  return (
    <>
      <HealthCoachingHome />
      <Nutrition />
      <View absH style={{ top: "25%", left: 0, right: 0,borderBottomLeftRadius:1000,borderTopRightRadius:1000 }}>
        <Fitness />
      </View>
      <HeaderHome color={theme.color.white} headerBkColor={"rgba(0,0,0,0)"} abs />
    </>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
