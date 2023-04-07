import { StyleSheet, View, BackHandler } from "react-native";
import React, { useState, Component, useEffect } from "react";
import Home from "./screens/Home";
import Devices from "./screens/Devices";
import Testing from "./screens/Testing";
import Training from "./screens/Training";

const App = (props) => {
  const [currentScreen, setCurrentScreen] = useState("Home");
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(2);

  useEffect(() => {
    let backCounter = 0;
    const backAction = () => {
      backCounter++;
      setCurrentScreen("Home");
      if (backCounter >= 2) {
        BackHandler.exitApp();
      }
      setTimeout(() => {
        backCounter = 0;
      }, 1000);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const updateCurrentScreen = (screen) => {
    setCurrentScreen(screen);
  };

  const updateConnectedDevices = (connectedDevices) => {
    setConnectedDevices(connectedDevices);
  };

  const updateSelectedTheme = (theme) => {
    setSelectedTheme(theme);
  };

  const params = {
    connectedDevices,
    selectedTheme,
    callBacks: {
      updateCurrentScreen,
      updateConnectedDevices,
      updateSelectedTheme,
    },
  };

  return (
    <View style={styles.container}>
      {currentScreen == "Home" && <Home params={params} />}
      {currentScreen == "Devices" && <Devices params={params} />}
      {currentScreen == "Testing" && <Testing params={params} />}
      {currentScreen == "Training" && <Training params={params} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
    paddingTop: 48,
    paddingLeft: 16,
    paddingRight: 16,
    fontFamily: "Inter",
  },
});

export default App;
