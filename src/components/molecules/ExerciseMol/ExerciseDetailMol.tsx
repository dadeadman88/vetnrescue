import React, { useEffect, useState } from "react";
import { View } from "react-native-ui-lib";
import ExerciseDetailTopView from "../../atoms/ExerciseAtoms/ExerciseDetailTopView";
import ExerciseDetailBottomView from "../../atoms/ExerciseAtoms/ExerciseDetailBottomView";
import VerticalItem from "../../atoms/ExerciseAtoms/VerticalItem";
import ExerciseDetailBottomContent from "../../atoms/ExerciseAtoms/ExerciseDetailBottomContent";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../globalStyle";
import { useRoute } from "@react-navigation/native";
import { navigate } from "../../../navigation/RootNavigation";
import { SCREENS } from "../../../constants";

const ExerciseDetailMol = () => {
  const { params } = useRoute();
  const [data, setData] = useState([]);

  useEffect(() => {
    let list = [...params?.list]
    list.splice(params?.active, 1);
    setData(list)
  }, [])

  return (
    <>
      <ExerciseDetailTopView url={params?.data?.image_urls} />
      <View style={[commonStyles.footerContainer, { marginTop: -30 }]}>
        <ExerciseDetailBottomView data={params?.data} />
        <ExerciseDetailBottomContent data={params?.data} list={params?.list} index={params?.active} />
        <Typography textType={"semiBold"}>Exercise Program</Typography>
        <VerticalItem data={data} onPress={(data) => navigate(SCREENS.EXERCISE_DETAIL, { data, list: params?.list })} />
      </View>
    </>
  );
};

export default ExerciseDetailMol;
