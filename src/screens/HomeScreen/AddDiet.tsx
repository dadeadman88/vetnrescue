import * as React from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { theme } from "../../constants";
import HeaderHome from "../../components/atoms/HomeAtoms/HeaderHome";
import DrawerTitle from "../../components/atoms/DrawerTitle";
import { View } from "react-native-ui-lib";
import { InputText } from "../../components/atoms/InputText";
import { CustomBtn } from "../../components/atoms/OnBoardingAtoms/OnBeardingBottomBtn";
import { useDispatch } from "react-redux";
import { MainActions } from "../../redux/actions/MainActions";
import { useNavigation, useRoute } from "@react-navigation/native";

interface AddDietProps {}

const AddDiet = (props: AddDietProps) => {
  const [hasValidated, setValidated] = React.useState(new Array(5).fill(true));
  const [name, setName] = React.useState(
    __DEV__ ? "Bread and apples with juice" : ""
  );
  const [serving_size, setServingSize] = React.useState(__DEV__ ? "150" : "");
  const [protien, setProtien] = React.useState(__DEV__ ? "5" : "");
  const [carbs, setCarbs] = React.useState(__DEV__ ? "10" : "");
  const [fats, setFats] = React.useState(__DEV__ ? "5" : "");
  const dispatch = useDispatch();
  const nav = useNavigation();
  const { params } = useRoute();

  const AddDiet = async () => {
    if (!hasValidated.includes(false)) {
      await dispatch(
        MainActions.AddDietService({
          type: params?.type,
          name,
          serving_size,
          protien,
          carbs,
          fats,
        })
      ).then((v) => {
        let status = v.meta.requestStatus;
        if (status == "fulfilled") {
          nav.goBack();
        }
      });
    }
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <HeaderHome color={theme.color.primary} />
      <View marginH-20 marginV-10>
        <DrawerTitle title={"Add Diet Plan"} />
      </View>
      <View padding-20>
        <InputText
          label={false}
          placeholder="Food Name"
          validate={["required"]}
          validationMessage={["This is field is required"]}
          onChangeText={(text: string) => setName(text)}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[0] = isValid;
              return copy;
            });
          }}
        />
        <InputText
          label={false}
          placeholder="Serving Size"
          keyboardType={"number-pad"}
          validate={["required"]}
          validationMessage={["This is field is required"]}
          onChangeText={(text: string) => setServingSize(text)}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[1] = isValid;
              return copy;
            });
          }}
        />
        <InputText
          label={false}
          placeholder="Protein"
          validate={["required"]}
          keyboardType={"number-pad"}
          validationMessage={["This is field is required"]}
          onChangeText={(text: string) => setProtien(text)}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[2] = isValid;
              return copy;
            });
          }}
        />
        <InputText
          label={false}
          placeholder="Carbs"
          validate={["required"]}
          keyboardType={"number-pad"}
          validationMessage={["This is field is required"]}
          onChangeText={(text: string) => setCarbs(text)}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[3] = isValid;
              return copy;
            });
          }}
        />
        <InputText
          label={false}
          placeholder="Fats"
          keyboardType={"number-pad"}
          validate={["required"]}
          validationMessage={["This is field is required"]}
          onChangeText={(text: string) => setFats(text)}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[4] = isValid;
              return copy;
            });
          }}
        />
        <CustomBtn label="Save" onPress={AddDiet} />
      </View>
    </SafeAreaContainer>
  );
};

export default AddDiet;
