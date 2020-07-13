import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button } from "./src/Components/Kit";
import colors from "./src/StyleSheet/colors";
import spacing from "./src/StyleSheet/spacing";
import { StatusBar } from "react-native";
import Users from "./src/Containers/Users";
import AsyncStorage from "@react-native-community/async-storage";

export default function App() {
  const initialState = {
    isUsersPage: true,
    users: [],
    isVotingPage: false,
    isShowingVotePage: false,
    isAnonymous: false,
    user: "",
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const getState = async () => {
      try {
        const state = await AsyncStorage.getItem("state");
        if (state) {
          setState(JSON.parse(state));
        }
      } catch (e) {
        alert(e.toString());
      }
    };
    getState()
  }, []);

  const save = async () => {
    await AsyncStorage.setItem("state", JSON.stringify(state));
  };
  const reset = async () => {
    await AsyncStorage.setItem("state", JSON.stringify(initialState));
    setState(initialState);
  };

  return (
    <View style={styles.container}>
      {state.isUsersPage ? <Users state={state} setState={setState} /> : null}
      <View style={styles.buttons}>
        <Button text="save" onPress={save} iconName="save" />
        <Button text="reset" onPress={reset} iconName="ccw" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
    padding: spacing.lg,
    paddingTop: StatusBar.currentHeight || 0,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: spacing.sm
  }
});
