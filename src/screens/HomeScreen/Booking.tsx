import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ViewBase,
} from "react-native";
import { Image, ToastPresets, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, theme } from "../../constants";
import HeaderHome from "../../components/atoms/HomeAtoms/HeaderHome";
import DrawerTitle from "../../components/atoms/DrawerTitle";
import ChangePassData from "../../components/molecules/ChangePassMOI/ChangePassData";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import { MainActions } from "../../redux/actions/MainActions";
import { showHideToast } from "../../redux/slices/OtherSlice";
import { FlatList } from "react-native-gesture-handler";
import { SCREEN_WIDTH } from "../../utils/Constants";
import { Typography } from "../../components/atoms/Typography";
import { States } from "../../utils/types";
import { onBack } from "../../navigation/RootNavigation";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBookDate, setSelectedBookDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState([]);
  const { user } = useSelector((state: States) => state.Auth);

  const dispatch = useDispatch();

  const GetBookings = async (date) => {
    await dispatch(MainActions.GetAllAvailableDates({ date })).then((v) => {
      let status = v.meta.requestStatus;
      if (status == "fulfilled") {
        setSlots(
          v?.payload?.filter(
            (f) => Object.entries(f?.booking_details)?.length == 0
          )
        );
        // console.warn(v?.payload[0]?.booking_details?.id)
        // console.warn(v?.payload?.find(f => f.booking_details?.id == user?.id))
        //setSelectedBookDate(v?.payload.find())
        // dispatch(showHideToast({
        //     visible: true,
        //     message: "Slot has been booked successfully",
        //     preset: ToastPresets.SUCCESS
        // }))
      }
    });
    setLoading(false);
  };
  const Book = async () => {
    await dispatch(MainActions.BookSlot({ booking_id: selectedBookDate })).then(
      (v) => {
        let status = v.meta.requestStatus;
        if (status == "fulfilled") {
          setSlots((prev) => {
            return [...prev].filter((f) => f.id != selectedBookDate);
          });
          dispatch(
            showHideToast({
              visible: true,
              message: "Slot has been booked successfully",
              preset: ToastPresets.SUCCESS,
            })
          );
        }
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    if (selectedBookDate) {
      Alert.alert(
        "Book this date",
        `Do you want to book this slot on ${selectedDate}?`,
        [
          {
            text: "Yes, Book",
            onPress: () => {
              Book();
            },
          },
          {
            text: "No",
            onPress: () => {
              setSelectedBookDate(null);
            },
          },
        ]
      );
    }
  }, [selectedBookDate]);

  return (
    <SafeAreaContainer safeArea={false}>
      <HeaderHome color={theme.color.primary} />
      <TouchableOpacity onPress={() => onBack()}>
        <Image
          source={IMAGES.leftIconWithColor}
          style={{
            width: 30,
            height: 30,
            marginVertical: 10,
            marginHorizontal: 20,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Calendar
        minDate={new Date().toISOString()}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: theme.color.primary,
          },
        }}
        onDayPress={(day) => {
          setLoading(true);
          GetBookings(day.dateString);
          setSelectedDate(day?.dateString);
        }}
      />
      <FlatList
        style={{ marginTop: 20 }}
        data={slots}
        numColumns={3}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10, justifyContent: "center" }}
        renderItem={({ item, index }) => {
          let booked = item?.status != "available";
          return (
            <TouchableOpacity
              disabled={booked}
              onPress={() => {
                setSelectedBookDate(item?.id);
              }}
            >
              <View
                center
                padding-15
                backgroundColor={
                  item?.id == selectedBookDate
                    ? theme.color.primarybeta
                    : "#fff"
                }
                br20
                width={SCREEN_WIDTH * 0.3}
                style={{ opacity: booked ? 0.7 : 1 }}
              >
                <Typography
                  textType="semiBold"
                  color={item?.id == selectedBookDate ? "#fff" : "#000"}
                >
                  {item?.start_time}
                </Typography>
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={
          loading && (
            <ActivityIndicator size={"large"} color={theme.color.primary} />
          )
        }
      />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default Booking;
