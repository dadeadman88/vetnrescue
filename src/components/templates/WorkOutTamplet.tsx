import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, SCREENS, theme } from "../../constants";
import HeaderHome from "../../components/atoms/HomeAtoms/HeaderHome";
import DrawerTitle from "../../components/atoms/DrawerTitle";
import ExerciseMol from "../../components/molecules/ExerciseMol";
import { Image, TouchableOpacity } from "react-native";
import { navigate, onBack } from "../../navigation/RootNavigation";
import { commonStyles } from "../../globalStyle";
import { Typography } from "../../components/atoms/Typography";
import ProgreeBar from "../../components/atoms/WorkoutAtoms/ProgressBar";
import WorkoutBtn from "../atoms/WorkoutAtoms/WorkoutBtn";
import { useRoute } from "@react-navigation/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const WorkOutTamplet = () => {
  const { params } = useRoute();
  const [data, setData] = useState(params?.data);
  const [nextIndex, setNextIndex] = useState(params?.index);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [summary, setSummary] = useState({
    totalSeconds: 0,
    excercises: "",
    sets: 0
  });
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (paused == false)
      startTime(true, data);
    return () => {
      clearInterval(timer.current);
    }
  }, [paused])


  useEffect(() => {
    const tseconds = 10//data?.work_time * 60;
    if (seconds == tseconds) {

      clearInterval(timer.current);
      setSeconds(0)
      setNextIndex(pre => {
        if (!params?.list[pre + 1]) {
          navigate(SCREENS.WORKOUT_RESULT, { data: summary })
        }
        else {
          setTimeout(() => {
            startTime(true, params?.list[pre + 1])
          }, 100)
        }
        setData(params?.list[pre + 1])
        return pre + 1
      })

    }
  }, [seconds])

  const startTime = (Isfirst = true, dt) => {
    if (Isfirst)
      setSummary({ ...summary, excercises: summary.excercises + dt?.title + ",", sets: summary?.sets ? parseInt(summary?.sets) + parseInt(dt?.work_sets) : parseInt(dt?.work_sets) })


    timer.current = setInterval(() => {
      setSeconds(prev => {
        return prev + 1
      })
      setSummary(prev => {
        return {
          ...prev, totalSeconds: prev.totalSeconds + 1
        }
      })
    }, 1000)
  }

  const getTime = () => {
    let secs = seconds % 60
    let minutes = seconds / 60
    return (minutes < 10 ? "0" + Math.floor(minutes) : Math.floor(minutes)) + ":" + (secs < 10 ? "0" + Math.floor(secs) : Math.floor(secs))
  }

  const total_seconds = 10;//data?.work_time * 60;


  return (
    <>
      <View margin-20>
        <TouchableOpacity onPress={() => onBack()}>
          <Image
            source={IMAGES.leftIconWithColor}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
      <View style={commonStyles.footerContainer}>
        <Typography
          align="center"
          textType="semiBold"
          style={{ marginVertical: 20 }}
          size={theme.fontSize.large20}
        >
          {data?.title}
        </Typography>
        <AnimatedCircularProgress
          size={150}
          width={10}
          tintColor={theme.color.primary}
          style={{ alignSelf: "center" }}
          fill={parseInt(seconds / total_seconds * 100).toFixed(1)}
          backgroundColor="#7C8BA0"
        >

          {(fill) => (
            <Typography textType="bold" size={theme.fontSize.extraLarge} style={{ marginVertical: 10 }}>{getTime()}</Typography>
          )}
        </AnimatedCircularProgress>
        <WorkoutBtn
          onSkip={() => {
            clearInterval(timer.current);
            setSeconds(0)
          }}
          onPause={() => {
            clearInterval(timer.current);
            setPaused(!paused)
          }}
          paused={paused}
          data={summary} />
        <View center>
          <Typography color={theme.color.descColor} size={theme.fontSize.large}>{seconds} Seconds Active, {data?.work_sets} sets</Typography>
          {
            params?.list[nextIndex + 1]?.title &&
            <Typography textType={'semiBold'} size={theme.fontSize.medium}>Next: {params?.list[nextIndex + 1]?.title}</Typography>
          }
        </View>
      </View>
    </>
  );
};

export default WorkOutTamplet;
