import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { theme } from "../../constants";
import HeaderHome from "../../components/atoms/HomeAtoms/HeaderHome";
import DrawerTitle from "../../components/atoms/DrawerTitle";
import { commonStyles } from "../../globalStyle";
import { Typography } from "../../components/atoms/Typography";

const Privacy = (props:any) => {
  console.log('props',props?.route?.params?.title)
  const title = props?.route?.params?.title
  
  return (
    <SafeAreaContainer safeArea={false}>
      <View style={commonStyles.footerContainer}>
        <View marginH-0 marginV-10>
          <DrawerTitle title={title} />
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehe
            nderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui"
          </Typography>
        </View>
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default Privacy;
