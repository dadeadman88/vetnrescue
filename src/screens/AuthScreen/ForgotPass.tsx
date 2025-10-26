import React, { useState } from "react";
import { StyleSheet, Image, ScrollView } from "react-native";
import { Text, ToastPresets, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import LoginScreen from "../../components/molecules/LoginMol/LoginScreen";
import { CustomBtn } from "../../components/atoms/OnBoardingAtoms/OnBeardingBottomBtn";
import { InputText } from "../../components/atoms/InputText";
import { theme } from "../../constants";
import { onBack } from "../../navigation/RootNavigation";
import { Typography } from "../../components/atoms/Typography";
import { AuthActions } from "../../redux/actions/AuthActions";
import { useDispatch } from "react-redux";
import { showHideToast } from "../../redux/slices/OtherSlice";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();


  const Forgot = async () => {
    if (email) {
      await dispatch(AuthActions.ForgotPass({
        email: email.toLowerCase(),
      })).then((v) => {
        let status = v.meta.requestStatus;
        if (status == "fulfilled") {
          dispatch(showHideToast({
            visible: true,
            message: "Email has been sent to you, Please check inbox to change password",
            preset: ToastPresets.SUCCESS
          }))
        }
      });
    }
  }

  return (
    <SafeAreaContainer safeArea={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#fff" }}
      >
        <View flex backgroundColor={theme.color.white}>
          <View marginT-100 marginH-20>
            <Typography align="center" textType="bold" size={25}>
              Forgot Password
            </Typography>
          </View>
          <View margin-20>
            <InputText
              label={"Email Address:"}
              value={email}
              // onValidationFailed={(isValid: boolean) => {
              //   setValidated((prev) => {
              //     let copy = [...prev];
              //     copy[0] = isValid;
              //     return copy;
              //   });
              // }}
              placeholder="Enter your email"
              validate={["email"]}
              validationMessage={["Email is invalid"]}
              onChangeText={(text: string) => setEmail(text)}
            />

            <View marginV-40>
              <CustomBtn label="Forgot Password" onPress={() => Forgot()} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default ForgotPass;
