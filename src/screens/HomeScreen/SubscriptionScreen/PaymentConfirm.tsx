import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import HeaderHome from "../../../components/atoms/HomeAtoms/HeaderHome";
import { IMAGES, SCREEN_WIDTH, theme } from "../../../constants";
import { CustomBtn } from "../../../components/atoms/OnBoardingAtoms/OnBeardingBottomBtn";
import { Typography } from "../../../components/atoms/Typography";
import { onBack } from "../../../navigation/RootNavigation";
import LinearGradient from "react-native-linear-gradient";
import { InputText } from "../../../components/atoms/InputText";
import { scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const PaymentConfirm = () => {
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const inputRef = useRef([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaContainer safeArea={false}>
      <HeaderHome color={theme.color.primary} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <ScrollView>
      <View flex backgroundColor="#fff">
        <View marginH-20 marginV-10>
          {/* <DrawerTitle title={"Payment Method"} /> */}
          <View row style={{ gap: 10, alignItems: "center" }}>
            <TouchableOpacity onPress={() => onBack()}>
              <Image
                source={IMAGES.leftIconWithColor}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Typography textType="semiBold" size={theme.fontSize.large20}>
              Payment Method
            </Typography>
          </View>
          <View marginV-20>
            <Image
              source={IMAGES.visa}
              style={{ width: "100%", height: 200 }}
              resizeMode="cover"
            />
          </View>
          <InputText
            label={""}
            value={name}
            placeholder="Name on Card"
            validate={["name"]}
            onChangeText={(text: string) => setName(text)}
          />

          <InputText
            label={""}
            value={cardNumber}
            placeholder="Card Number"
            validate={["name"]}
            onChangeText={(text: string) => setCardNumber(text)}
          />
          <View row spread width={"100%"}>
            <InputText
              label={""}
              value={expiry}
              keyboardType="numeric"
              placeholder="Expiry Date"
              validate={["name"]}
              style={{ width: scale(150) }}
              onChangeText={(text: string) => setExpiry(text)}
            />

            <InputText
              label={""}
              value={cvc}
              placeholder="CVV"
              keyboardType="numeric"
              validate={["name"]}
              style={{ width: scale(150) }}
              onChangeText={(text: string) => setCvc(text)}
            />
          </View>
          <View row gap-10 style={{ alignItems: "center" }}>
            <Image source={IMAGES.click} style={{ width: 15, height: 15 }} />
            <Typography>Save this card for future payments.</Typography>
          </View>
          <View marginT-40>
            <CustomBtn label="Pay Now" onPress={() => setModalVisible(true)} />
          </View>
        </View>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ width: verticalScale(270) }}>
              <View center>
                <Typography textType="semiBold" size={theme.fontSize.large20}>
                  Congratulations!
                </Typography>
                <Typography
                  align="center"
                  color={theme.color.descColor}
                  size={theme.fontSize.extraSmall12}
                  style={{ marginVertical: 20 }}
                >
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text
                </Typography>
                <CustomBtn
                  label="Done"
                  style={{ width: "80%", marginVertical: 20 }}
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaContainer>
  );
};

const CreditCard = ({ expiry, number, holder, cvc }: any) => {
  return (
    <LinearGradient
      colors={[theme.color.primary, theme.color.primary]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{
        height: 180,
        borderRadius: 20,
        padding: 20,
      }}
    >
      <View style={{ flexDirection: "row", flex: 1 }}>
        <Typography
          children={"Lindsay App"}
          color={"#fff"}
          size={18}
          textType={"semiBold"}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {Array(4)
          .fill("****")
          .map((i, index) => (
            <Typography
              children={number.split(" ")[index] || i}
              color={"#fff"}
              size={20}
              textType={"light"}
            />
          ))}
        {Array(1)
          .fill("***")
          .map((i, index) => (
            <Typography
              children={number.split(" ")[4] || i}
              color={"#fff"}
              size={20}
              textType={"light"}
            />
          ))}
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <View style={{ width: "50%" }}>
          <Typography
            children={"Card Holder Name"}
            color={"#fff"}
            size={10}
            textType={"light"}
            numberOfLines={2}
          />
          <Typography children={holder || "******"} color={"#fff"} size={14} />
        </View>
        <View>
          <Typography
            children={"CVC"}
            color={"#fff"}
            size={10}
            textType={"light"}
          />
          <Typography children={cvc || "***"} color={"#fff"} size={14} />
        </View>
        <View>
          <Typography
            children={"Expiry Date"}
            color={"#fff"}
            size={10}
            textType={"light"}
          />
          <Typography children={expiry || "****/**"} color={"#fff"} size={14} />
        </View>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 30,
  },
  formContainer: {
    marginTop: 20,
  },
  container: {
    height: 80,
    backgroundColor: "#fff",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  calenderPicker: {
    height: 55,
    width: "100%",
    borderWidth: 1.5,
    borderColor: "red",
    // top: 10,
    justifyContent: "center",
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: theme.color.white,
    borderRadius: 20,
    paddingTop: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default PaymentConfirm;
