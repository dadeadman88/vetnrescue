import * as React from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import HeaderHome from "../../components/atoms/HomeAtoms/HeaderHome";
import { theme } from "../../constants";
import { FloatingButton, Text, View } from "react-native-ui-lib";
import DrawerTitle from "../../components/atoms/DrawerTitle";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Animated, {
  BounceIn,
  BounceInDown,
  BounceInUp,
  BounceOut,
  BounceOutDown,
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomInDown,
  ZoomOut,
  ZoomOutDown,
} from "react-native-reanimated";
import { navigate } from "../../navigation/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { MainActions } from "../../redux/actions/MainActions";
import { States } from "../../utils/types";
import { useFocusEffect } from "@react-navigation/native";

interface DietProps {}

const PLANS = [
  { label: "Breakfast", value: "breakfast" },
  { label: "Lunch", value: "lunch" },
  { label: "Dinner", value: "dinner" },
];

const Diet = (props: DietProps) => {
  const [showChilds, setShowChilds] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const { Diets } = useSelector((state: States) => state.Main);

  useFocusEffect(
    React.useCallback(() => {
      getDiets();
    }, [])
  );

  const getDiets = async () => {
    setLoading(true);
    await dispatch(MainActions.GetDietService()).then((v) => {
      let status = v.meta.requestStatus;
      if (status == "fulfilled") {
        console.warn(v.payload);
      }
    });
    setLoading(false);
    setRefresh(false);
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <HeaderHome color={theme.color.primary} />
      <View marginH-20 marginV-10>
        <DrawerTitle title={"Diet Plan"} />
      </View>
      <FlatList
        refreshing={refresh}
        onRefresh={() => {
          setRefresh(true);
          getDiets();
        }}
        data={Diets?.data}
        renderItem={({ item }) => {
          return (
            <View padding-20 paddingB-10>
              <Text semibold regularSize grey30>
                {item.type
                  ? item.type[0].toUpperCase() +
                    item.type.substring(1, item.type.length)
                  : item?.type}
              </Text>
              <View row gap-5 centerV>
                <Text medium mediumSize black>
                  {item.name}
                </Text>
                <Text regular extraSmall black>
                  {/* 1 slice (227g) */}
                </Text>
              </View>
              <View row spread marginT-5>
                <View center>
                  <Text semibold extraVSmall black>
                    Serving Size
                  </Text>
                  <Text regular extraSmall black>
                    {item.serving_size}g
                  </Text>
                </View>
                <View center>
                  <Text semibold extraVSmall black>
                    Protein
                  </Text>
                  <Text regular extraSmall black>
                    {item.protien}g
                  </Text>
                </View>
                <View center>
                  <Text semibold extraVSmall black>
                    Carbs
                  </Text>
                  <Text regular extraSmall black>
                    {item.carbs}g
                  </Text>
                </View>
                <View center>
                  <Text semibold extraVSmall black>
                    Fats
                  </Text>
                  <Text regular extraSmall black>
                    {item.fats}g
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
      {showChilds && (
        <Animated.View
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            ...StyleSheet.absoluteFillObject,
          }}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setShowChilds(false)}
          />
        </Animated.View>
      )}
      <View
        right
        gap-10
        style={{ position: "absolute", bottom: 20, right: 20 }}
      >
        {showChilds && (
          <Animated.View entering={ZoomInDown} exiting={ZoomOutDown}>
            <View centerH gap-10>
              {PLANS.map((v) => (
                <View row centerV gap-5>
                  <Text white regular small>
                    Add {v.label}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigate("AddDiet", { type: v.value });
                    }}
                    style={{
                      borderRadius: 100,
                      backgroundColor: theme.color.primary,
                      height: 50,
                      width: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        resizeMode: "contain",
                        tintColor: "#fff",
                      }}
                      source={require("../../assets/images/plus.png")}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Animated.View>
        )}
        <TouchableOpacity
          onPress={() => setShowChilds(!showChilds)}
          style={{
            borderRadius: 100,
            backgroundColor: theme.color.primary,
            height: 56,
            width: 56,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              height: 20,
              width: 20,
              resizeMode: "contain",
              tintColor: "#fff",
            }}
            source={require("../../assets/images/plus.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaContainer>
  );
};

export default Diet;
