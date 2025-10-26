import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { theme } from "../../constants";
import HeaderHome from "../../components/atoms/HomeAtoms/HeaderHome";
import DrawerTitle from "../../components/atoms/DrawerTitle";
import NotificatonList from "../../components/atoms/Notification/NotificatonList";
import { commonStyles } from "../../globalStyle";

const Notification = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <HeaderHome color={theme.color.primary} />
      <View marginH-20 marginV-10>
        <DrawerTitle title={"Notifications"} />
      </View>

      <View style={commonStyles.footerContainer}>
        <NotificatonList />
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default Notification;
