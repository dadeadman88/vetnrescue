import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import HomeScreen from "../../components/molecules/HomeMol/HomeScreen";

const Home = () => {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
});

export default Home;
