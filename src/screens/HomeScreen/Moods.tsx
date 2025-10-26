import * as React from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import HeaderHome from "../../components/atoms/HomeAtoms/HeaderHome";
import { SCREENS, theme } from "../../constants";
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
import { MOODS } from "./AddMood";

interface MoodProps {}

const PLANS = [
  { label: "Breakfast", value: "breakfast" },
  { label: "Lunch", value: "lunch" },
  { label: "Dinner", value: "dinner" },
];

const Mood = (props: MoodProps) => {
  const [showChilds, setShowChilds] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const { Moods } = useSelector((state: States) => state.Main);

  useFocusEffect(
    React.useCallback(() => {
      getDiets();
    }, [])
  );

  const getDiets = async () => {
    setLoading(true);
    await dispatch(MainActions.GetMoodService()).then((v) => {
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
        <DrawerTitle title={"Moods"} />
      </View>
      <FlatList
        refreshing={refresh}
        onRefresh={() => {
          setRefresh(true);
          getDiets();
        }}
        data={Moods?.data}
        renderItem={({ item }) => {
          let image = MOODS.find((f) => f.value == item?.mood);
          const date = new Date(item?.mood_date+"T"+item?.mood_time+"Z");
          const options = { year: "numeric", month: "long", day: "numeric" };
          const formattedDate = date.toLocaleDateString("en-US", options);
          return (
            <View padding-20 paddingB-10 row gap-20>
              <Image source={image?.img} style={{ width: 50, height: 50 }} />
              <View flex>
                <View row spread flex centerV>
                  <Text medium mediumSize black>
                    {item.mood
                      ? item.mood[0].toUpperCase() +
                        item.mood.substring(1, item.mood.length)
                      : item?.mood}
                  </Text>
                  <Text regular extraSmall black>
                    {formattedDate}
                  </Text>
                </View>
                <Text regular extraSmall black>
                  {item?.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View
        right
        gap-10
        style={{ position: "absolute", bottom: 20, right: 20 }}
      >
        <TouchableOpacity
          onPress={() => navigate(SCREENS.ADD_MOOD)}
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

export default Mood;
