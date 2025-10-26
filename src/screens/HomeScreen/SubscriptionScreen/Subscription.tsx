import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import HeaderHome from "../../../components/atoms/HomeAtoms/HeaderHome";
import { SCREENS, theme } from "../../../constants";
import DrawerTitle from "../../../components/atoms/DrawerTitle";
import { commonStyles } from "../../../globalStyle";
import SubscriptionPackages from "../../../components/molecules/SubsciptionMol/SubscriptionPackages";
import { CustomBtn } from "../../../components/atoms/OnBoardingAtoms/OnBeardingBottomBtn";
import { Typography } from "../../../components/atoms/Typography";
import { navigate } from "../../../navigation/RootNavigation";

const Subscription = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <HeaderHome color={theme.color.primary} />
      {/* <View marginH-20 marginV-10>
        <DrawerTitle title={"Subscription"} />
      </View> */}
      <View style={[commonStyles.footerContainer,{paddingTop:40,}]}>
        <SubscriptionPackages />
        <CustomBtn label="Subscribe" onPress={()=>navigate(SCREENS.PAYMENT_METHOD)}/>
        {/* <Typography align="center" style={{marginVertical:20}}>Cancel</Typography> */}
      </View>
    </SafeAreaContainer>
  );
};

export default Subscription;
