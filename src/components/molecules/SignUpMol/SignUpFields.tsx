import React, { useState } from "react";
import { InputText } from "../../atoms/InputText";
import { Button, View } from "react-native-ui-lib";
import { IMAGES, theme } from "../../../constants";
import { Typography } from "../../atoms/Typography";
import { CustomBtn } from "../../atoms/OnBoardingAtoms/OnBeardingBottomBtn";
import { useDispatch } from "react-redux";
import { getDeviceInfo } from "../../../utils/Constants";
import { AuthActions } from "../../../redux/actions/AuthActions";

const SignUpFields = () => {
  const [hasValidated, setValidated] = useState(new Array(6).fill(false));
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [cpasswordVal, setCPasswordVal] = useState("");
  const [password, setPassword] = useState(true);
  const [cpassword, setCPassword] = useState(true);
  const dispatch = useDispatch();


  const SignupFunc = async () => {
    if (!hasValidated.includes(false)) {
      // const token = await messaging().getToken();
      console.warn(getDeviceInfo())
      await dispatch(AuthActions.Register({
        first_name: fname,
        last_name: lname,
        mobile_number: phone,
        email: email.toLowerCase(),
        password: passwordVal,
        device_token: "123456789",
        ...getDeviceInfo(),
        udid: "a1b2c3d4e5f67890123456789abcdef012345678"
      })).then((v) => {
        let status = v.meta.requestStatus;
        if (status == "fulfilled") {

        }
      });
    }
  }


  return (
    <View backgroundColor={theme.color.white}>
      <View marginH-20 style={{ marginTop: 100 }}>
        <Typography
          align="center"
          size={theme.fontSize.extraLarge}
          textType="semiBold"
          color={theme.color.primary}
        >
          Sign Up
        </Typography>
        {/* <Typography
          align="center"
          size={theme.fontSize.small}
          textType="semiBold"
          color={theme.color.descColor}
        >
          As a Nationally Board Certified Health and Wellness Coach, Elite
          Personal Trainer, In
        </Typography> */}
      </View>
      <View margin-20>
        <InputText
          // label={"Email Address:"}
          value={fname}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[0] = isValid;
              return copy;
            });
          }}
          placeholder="First Name"
          validationMessage={["First name is required"]}
          validate={["required"]}
          onChangeText={(text: string) => setFName(text)}
        />
        <InputText
          // label={"Email Address:"}
          value={lname}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[1] = isValid;
              return copy;
            });
          }}
          placeholder="Last Name"
          validate={["required"]}
          validationMessage={["Last name is required"]}
          style={{ marginTop: -10 }}
          onChangeText={(text: string) => setLName(text)}
        />
        <InputText
          // label={"Email Address:"}
          value={email}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[2] = isValid;
              return copy;
            });
          }}
          placeholder="Email Address"
          validate={["required", "email",]}
          style={{ marginTop: -10 }}
          validationMessage={["Email is required", "Email is invalid",]}
          onChangeText={(text: string) => setEmail(text)}
        />
        <InputText
          // label={"Email Address:"}
          value={phone}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[3] = isValid;
              return copy;
            });
          }}
          placeholder="Mobile Number"
          validate={["required"]}
          validationMessage={["Mobile Number is required"]}
          style={{ marginTop: -10 }}
          onChangeText={(text: string) => setPhone(text)}
        />
        <InputText
          // label={"Password:"}
          value={passwordVal}
          style={{ marginTop: -10 }}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[4] = isValid;
              return copy;
            });
          }}
          onPressRight={() => setPassword(!password)}
          secureTextEntry={password}
          rightImage={!password ? IMAGES.eyeOn : IMAGES.eyeOff}
          placeholder="Enter your password"
          validate={["required",
            (v) =>
              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(v),
           // v => v == cpasswordVal
          ]}
          validationMessage={[
            "Password is required",
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          //  "Password must match"
          ]}
          onChangeText={(text: string) => setPasswordVal(text)}
        />

        <InputText
          // label={"Password:"}
          value={cpasswordVal}
          style={{ marginTop: -10 }}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[5] = isValid;
              return copy;
            });
          }}
          onPressRight={() => setCPassword(!cpassword)}
          secureTextEntry={cpassword}
          rightImage={!cpassword ? IMAGES.eyeOn : IMAGES.eyeOff}
          placeholder="Confirm password"
          validate={[
            "required",
            (v) =>
              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(v),
            v => v == passwordVal
          ]}
          validationMessage={[
            "Confirm Password is required",
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            "Password must match"
          ]}
          onChangeText={(text: string) => setCPasswordVal(text)}
        />

        <View marginV-40>
          <CustomBtn
            label="Sign Up"
            onPress={() => {
              SignupFunc();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SignUpFields;
