import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { IMAGES, theme } from "../../../constants";
import FitnessContent from "../HomeAtoms/FitnessContent";
import { navigate } from "../../../navigation/RootNavigation";



interface CategoriesCompProps {
  goals: Array<any>;
}

const CategoriesComp: React.FC<CategoriesCompProps> = ({
  goals,
  
}) => {
  const [selectedId, setSelectedId] = useState<number>(1);

  return (
    <>
      {goals && goals.map((goal) => (
        <TouchableOpacity
          key={goal.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
          onPress={() => setSelectedId(goal.id)}
        >
          <Image
            source={selectedId === goal.id ? IMAGES.click : IMAGES.circle}
            style={{ width: 20, height: 20,tintColor:theme.color.primary }}
            resizeMode="contain"
          />
          <Typography style={{ marginLeft: 10 }}>{goal.title}</Typography>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default CategoriesComp;
