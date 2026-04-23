import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import DrawerTitle from "../../components/atoms/DrawerTitle";
import AdvertData from "../../components/AdvertData";
import { useSelector } from "react-redux";
import { States } from "../../utils/types";

const AdvertisementForm = () => {
  const language = useSelector((state: States) => state.Others.language);

  return (
    <SafeAreaContainer safeArea={false}>
      <View marginH-20 marginV-10>
        <DrawerTitle title={language === "ar" ? "الإعلانات" : "Advertisements"} />
      </View>
      <AdvertData />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default AdvertisementForm;

