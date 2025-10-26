import React, { useState } from "react";
import LoginHeader from "../../atoms/LoginAtom/LoginHeader";
import { InputText } from "../../atoms/InputText";
import { Button, Text, View } from "react-native-ui-lib";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { Typography } from "../../atoms/Typography";
import { CustomBtn } from "../../atoms/OnBoardingAtoms/OnBeardingBottomBtn";
import { navigate } from "../../../navigation/RootNavigation";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { AuthActions } from "../../../redux/actions/AuthActions";
import { getDeviceInfo } from "../../../utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [hasValidated, setValidated] = useState(new Array(2).fill(true));
  const [email, setEmail] = useState(__DEV__ ? "testing@test.com" : "");
  const [passwordVal, setPasswordVal] = useState(__DEV__ ? "test" : "");
  const [password, setPassword] = useState(true);
  const dispatch = useDispatch();

  const LoginFunc = async () => {
    if (!hasValidated.includes(false)) {
      await dispatch(AuthActions.Login({
        email: email.toLowerCase(),
        password: passwordVal,
        device_token: "123456788",
        ...getDeviceInfo()
      })).then((v) => {
        let status = v.meta.requestStatus;
        if (status == "fulfilled") {
          AsyncStorage.setItem("@LA-USER", JSON.stringify(v.payload))
        }
      });
    }
  }

  return (
    <View backgroundColor={theme.color.white}>
      <LoginHeader />
      <View margin-20>
        <InputText
          label={"Email Address:"}
          value={email}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[0] = isValid;
              return copy;
            });
          }}
          placeholder="Enter your email"
          validate={["email"]}
          validationMessage={["Email is invalid"]}
          onChangeText={(text: string) => setEmail(text)}
        />
        <InputText
          label={"Password:"}
          value={passwordVal}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[1] = isValid;
              return copy;
            });
          }}
          onPressRight={() => setPassword(!password)}
          secureTextEntry={password}
          rightImage={!password ? IMAGES.eyeOn : IMAGES.eyeOff}
          placeholder="Enter your password"
          validate={["required"
            // (v) =>
            //   /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(v),
          ]}
          validationMessage={[
            "Password is required"
            // "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          ]}
          onChangeText={(text: string) => setPasswordVal(text)}
        />
        <TouchableOpacity onPress={() => navigate(SCREENS.FORGOT)}>
          <Typography align="right" color={theme.color.tgray}>
            Forgot Password?
          </Typography>
        </TouchableOpacity>
        <View marginV-40>
          <CustomBtn label="Sign In" onPress={() => {
            LoginFunc();
          }} />
        </View>
        <View row center>
          <Text center small marginV-20>
            Don’t have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigate(SCREENS.SIGN_UP)}>
            <Text semiBold small color={theme.color.primary}>
              {" "}
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
