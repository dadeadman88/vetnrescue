import React from "react";
import { View } from "react-native-ui-lib";
import { theme } from "../../../constants";
import { Typography } from "../Typography";
import { useRoute } from "@react-navigation/native";

const WorkoutSummaryContent = () => {
  const { params } = useRoute();

  return (
    <View center marginV-20>
      <Typography textType="bold" size={theme.fontSize.large24}>
        Workout Result
      </Typography>
      <Typography size={theme.fontSize.extraSmall12} color={theme.color.descColor}>
        {params?.data?.excercises}
      </Typography>
      {/* <Typography size={theme.fontSize.extraSmall12} color={theme.color.descColor}>
        Completed on {new Date().get}
      </Typography>
       <Typography size={theme.fontSize.extraSmall12} color={theme.color.descColor}>
        Exercise 3/12
      </Typography> */}
    </View>
  );
};

export default WorkoutSummaryContent;
