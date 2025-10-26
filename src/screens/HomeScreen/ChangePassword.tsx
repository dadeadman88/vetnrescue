import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { theme } from "../../constants";
import HeaderHome from "../../components/atoms/HomeAtoms/HeaderHome";
import DrawerTitle from "../../components/atoms/DrawerTitle";
import ChangePassData from "../../components/molecules/ChangePassMOI/ChangePassData";

const ChangePassword = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <HeaderHome color={theme.color.primary} />
      <View marginH-20 marginV-10>
        <DrawerTitle title={"Change Password"} />
      </View>
      <ChangePassData />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default ChangePassword;
