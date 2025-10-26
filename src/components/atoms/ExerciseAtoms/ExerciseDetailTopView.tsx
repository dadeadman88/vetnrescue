import React, { useState } from "react";
import { Image, Platform } from "react-native";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { IMAGES, SCREEN_HEIGHT, SCREEN_WIDTH, theme } from "../../../constants";
import { scale, verticalScale } from "react-native-size-matters";
import { onBack } from "../../../navigation/RootNavigation";

const ExerciseDetailTopView = ({ url }: any) => {
  return (
    <View style={{}}>
      <Image
        source={{ uri: url ? url : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" }}
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT * 0.5,
        }}
        resizeMode="cover"
      />
      <TouchableOpacity style={{ position: "absolute", top: 10, left: 10 }} onPress={() => onBack()}>
        <Image
          source={IMAGES.leftIconWithColor}
          style={{ width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default ExerciseDetailTopView;
