import React from "react";
import { Button, Text, View } from "react-native-ui-lib";
import { theme } from "../../../constants";

export const CustomBtn = (props: any) => {
  const {onPress = ()=>{},label,backgroundColor =theme.color.primary,style,width,height} = props;
  return (
      <Button
        label={label}
        labelStyle={{ fontSize: 18 }}
        backgroundColor={backgroundColor}
        onPress={onPress}
        width={width}
        height={height}
        style={[{
          paddingVertical:15,
          borderRadius:10
        },style]}
      />
  );
};
