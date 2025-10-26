import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { Typography } from "./Typography";
import { IMAGES, theme } from "../../constants";
import { onBack } from "../../navigation/RootNavigation";

const DrawerTitle = (props: any) => {
  const { title } = props;
  return (
    <View style={{marginVertical: 15}} row gap-15>
      <TouchableOpacity onPress={() => onBack()}>
        <Image
          source={IMAGES.backButton}
          style={{ width: 30, height: 30, }}
        />
      </TouchableOpacity>
      <Typography textType="semiBold" size={theme.fontSize.large20}>
        {title}
      </Typography>
    </View>
  );
};
const styles = StyleSheet.create({
  titleStyle: {
    height: 20,
    alignSelf: "center",
    borderWidth: 3,
    marginRight: 10,
    borderColor: theme.color.primary,
  },
});
export default DrawerTitle;
