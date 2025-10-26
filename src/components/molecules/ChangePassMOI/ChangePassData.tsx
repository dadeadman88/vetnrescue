import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ToastPresets, View } from "react-native-ui-lib";
import { commonStyles } from "../../../globalStyle";
import ProfileImg from "../../atoms/Profile/ProfileImg";
import ProfileList from "../../atoms/Profile/ProfileList";
import { useDispatch } from "react-redux";
import { IMAGES } from "../../../constants";
import { onBack } from "../../../navigation/RootNavigation";
import { CustomBtn } from "../../atoms/OnBoardingAtoms/OnBeardingBottomBtn";
import { InputText } from "../../atoms/InputText";
import { AuthActions } from "../../../redux/actions/AuthActions";
import { showHideToast } from "../../../redux/slices/OtherSlice";

const ChangePassData = () => {
  const [hasValidated, setValidated] = useState(new Array(3).fill(false));
  const [current_pass, setCurrentPass] = useState("");
  const [new_pass, setNewPass] = useState("");
  const [confirm_pass, setConfirmPass] = useState("");
  const [current_pass_show, setCurrentPassShow] = useState(true);
  const [new_pass_show, setNewPassShow] = useState(true);
  const [confirm_pass_show, setConfirmPassShow] = useState(true);
  const dispatch = useDispatch();

  const ChangePass = async () => {
    if (!hasValidated.includes(false)) {
      await dispatch(AuthActions.ChangePass({
        old_password: current_pass,
        new_password: new_pass
      })).then((v) => {
        let status = v.meta.requestStatus;
        if (status == "fulfilled") {
          dispatch(showHideToast({
            visible: true,
            message: "Password has been changed",
            preset: ToastPresets.SUCCESS
          }))
          onBack();
        }
      });
    }
  }

  return (
    <View style={commonStyles.footerContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputText
          // label={"Email Address:"}
          secureTextEntry={current_pass_show}
          value={current_pass}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[0] = isValid;
              return copy;
            });
          }}
          placeholder="Current Password"
          validate={["required"]}
          validationMessage={["Current Password is required"]}
          onChangeText={(text: string) => setCurrentPass(text)}
          rightImage={!current_pass_show ? IMAGES.eyeOn : IMAGES.eyeOff}
          onPressRight={() => setCurrentPassShow(!current_pass_show)}
        />
        <InputText
          // label={"Email Address:"}
          secureTextEntry={new_pass_show}
          value={new_pass}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[1] = isValid;
              return copy;
            });
          }}
          placeholder="New Password"
          validate={["required",
            (v) =>
              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(v),
          ]}
          validationMessage={[
            "Password is required",
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          ]}
          style={{ marginTop: -10 }}
          onChangeText={(text: string) => setNewPass(text)}
          rightImage={!new_pass_show ? IMAGES.eyeOn : IMAGES.eyeOff}
          onPressRight={() => setNewPassShow(!new_pass_show)}
        />
        <InputText
          // label={"Email Address:"}
          secureTextEntry={confirm_pass_show}
          value={confirm_pass}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[2] = isValid;
              return copy;
            });
          }}
          placeholder="Confirm Password"
          style={{ marginTop: -10 }}
          validate={["required",
            (v) =>
              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(v),
            v => v == new_pass
          ]}
          validationMessage={[
            "Password is required",
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            "Password must match"
          ]}
          onChangeText={(text: string) => setConfirmPass(text)}
          rightImage={!confirm_pass_show ? IMAGES.eyeOn : IMAGES.eyeOff}
          onPressRight={() => setConfirmPassShow(!confirm_pass_show)}
        />

        <View marginV-40>
          <CustomBtn label="Change Password" onPress={() => ChangePass()} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ChangePassData;
