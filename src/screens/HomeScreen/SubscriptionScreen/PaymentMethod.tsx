import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import HeaderHome from "../../../components/atoms/HomeAtoms/HeaderHome";
import { SCREENS, theme } from "../../../constants";
import DrawerTitle from "../../../components/atoms/DrawerTitle";
import { commonStyles } from "../../../globalStyle";
import { CustomBtn } from "../../../components/atoms/OnBoardingAtoms/OnBeardingBottomBtn";
import { Typography } from "../../../components/atoms/Typography";
import { navigate } from "../../../navigation/RootNavigation";
import PaymentCard from "../../../components/molecules/SubsciptionMol/PaymentCard";

const PaymentMethod = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <HeaderHome color={theme.color.primary} />
      <View marginH-20 marginV-10>
        <DrawerTitle title={"Payment Method"} />
      </View>
      <View style={[commonStyles.footerContainer,{paddingTop:40,}]}>
        <PaymentCard />
        <View marginV-20>
        <CustomBtn label="Process to Payment" onPress={() => navigate(SCREENS.PAYMENT_CONFIRM)} />
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default PaymentMethod;
