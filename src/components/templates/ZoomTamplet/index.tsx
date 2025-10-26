import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { Typography } from "../../atoms/Typography";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native-ui-lib";
import { verticalScale } from "react-native-size-matters";
import { CustomBtn } from "../../atoms/OnBoardingAtoms/OnBeardingBottomBtn";
import { onBack } from "../../../navigation/RootNavigation";

const ZoomTemplate = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setModalVisible(true);
  }, []);

  const handleModalPress = () => {
    setModalVisible(false);
    navigation.navigate(SCREENS.HEALTH_COACHING);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGES.onBoardingImg}
        style={styles.imageBackground}
      >
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ width: verticalScale(270) }}>
                <ImageBackground
                  source={IMAGES.fitnessGirl}
                  style={{ width: verticalScale(270), height: 200 }}
                  imageStyle={{ borderRadius: 20 }}
                  resizeMode="cover"
                >
                  <TouchableOpacity
                    style={{ position: "absolute", right: 20, top: 20 }}
                    onPress={() => {
                      setModalVisible(false);
                      onBack();
                    }}
                  >
                    <Image
                      source={IMAGES.cross}
                      style={{ width: 15, height: 15 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </ImageBackground>
                <View center marginV-20>
                  <Typography textType="semiBold" size={theme.fontSize.large20}>
                    Subscribe to Premium
                  </Typography>
                  <Typography
                    align="center"
                    color={theme.color.descColor}
                    size={theme.fontSize.extraSmall12}
                  >
                    It is a long established fact that a reader will be
                    distracted by the readable
                  </Typography>
                  <CustomBtn
                    label="Unlock Premium"
                    style={{ width: "60%", marginVertical: 20 }}
                    onPress={handleModalPress}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: theme.color.white,
    borderRadius: 20,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ZoomTemplate;
