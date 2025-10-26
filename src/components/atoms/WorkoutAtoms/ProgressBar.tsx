import React from "react";
import { View } from "react-native-ui-lib";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Typography } from "../Typography";
import { theme } from "../../../constants";

const ProgreeBar = () => {
  return (
    <View center>
      <AnimatedCircularProgress
        size={150}
        width={10}
        tintColor={theme.color.primary}
        fill={70}
        backgroundColor="#7C8BA0"
      >
        {(fill) => (
          <Typography textType="bold" size={theme.fontSize.extraLarge}>
            {fill}
          </Typography>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

export default ProgreeBar;
