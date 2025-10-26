import React, { useEffect, useState } from "react";
import { StyleSheet, Image, ImageBackground, FlatList, ActivityIndicator } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { SCREENS, theme } from "../../../constants";
import HorizentalItem from "../../atoms/ExerciseAtoms/HorizentalItem";
import VerticalItem from "../../atoms/ExerciseAtoms/VerticalItem";
import { navigate } from "../../../navigation/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { MainActions } from "../../../redux/actions/MainActions";

const ExerciseMol = (props: any) => {

  const dispatch = useDispatch();
  const { ExcerciseCategories } = useSelector(state => state.Main)
  const [selected, setSelected] = useState(0)
  const [loadig, setLoading] = useState(false)

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    setLoading(true)
    await dispatch(MainActions.GetAllExcerciseCategory()).then((v) => {
      let status = v.meta.requestStatus;
      if (status == "fulfilled") {

      }
    });
    setLoading(false)
  }


  if (loadig)
    return (
      <View flex center>
        <ActivityIndicator size={"large"} />
      </View>
    )

  return (
    <View marginV-20>
      <HorizentalItem data={ExcerciseCategories} onSelect={(index) => {
        setSelected(index)
      }} />
      <VerticalItem data={ExcerciseCategories[selected]?.sub_categories} onPress={(data, index) => navigate(SCREENS.EXERCISE_DETAIL, { data, list: ExcerciseCategories[selected]?.sub_categories, active: index })} />
    </View>
  );
};
const styles = StyleSheet.create({});
export default ExerciseMol;
