import React, { useState } from "react";
import { StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { Typography } from "../Typography";
import { IMAGES, theme } from "../../../constants";
import { commonStyles } from "../../../globalStyle";

const ProfileImg = ({ image }: { image: string }) => {
  return (
    <View center marginV-10>
      <Image
        source={{ uri: image }}
        style={{ width: "100%", height: 200 }}
        resizeMode="contain"
      />
    </View>
  );
};
export default ProfileImg;
