import React, { useState } from "react";
import { Button, View } from "react-native-ui-lib";
import { Typography } from "../Typography";
import { SCREENS, theme } from "../../../constants";
import { navigate } from "../../../navigation/RootNavigation";

const ExerciseDetailBottomContent = ({ data, list, index }) => {
  return (
    <View marginV-20>
      <Typography size={theme.fontSize.large20}>{data?.title}</Typography>
      <Typography color={theme.color.descColor} size={theme.fontSize.extraSmall12}>
        {data?.description}
      </Typography>
      <View row spread marginV-30 style={{ flex: 1, alignItems: 'center' }}>
        <Typography size={theme.fontSize.medium} textType="semiBold">{data?.duration} - {list?.length} Excercises</Typography>
        <Button label="Start Now" onPress={() => navigate(SCREENS.WORKOUT, { data, list, index })} backgroundColor={theme.color.primarybeta} style={{ flex: 0.5, borderRadius: 10 }} />
      </View>
    </View>
  );
};
export default ExerciseDetailBottomContent;
