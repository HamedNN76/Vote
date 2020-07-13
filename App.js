import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, SafeAreaView } from "./src/Components/Kit";
import colors from "./src/StyleSheet/colors";
import spacing from "./src/StyleSheet/spacing";
import { StatusBar } from "expo-status-bar";
import { StatusBar as NativeStatusBar } from "react-native";
import Users from "./src/Containers/Users";
import AsyncStorage from "@react-native-community/async-storage";
import VotingPage from "./src/Containers/VotingPage";
import strings from "./src/strings";
import Result from "./src/Containers/Result";

export default function App() {
  const initialState = {
    isUsersPage: true,
    users: [],
    isVotingPage: false,
    isResultPage: false,
    isAnonymous: false,
    user: "",
    voteIndex: 0,
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
    getState();
  }, []);

  const save = async () => {
    await AsyncStorage.setItem("state", JSON.stringify(state));
  };
  const reset = async () => {
    await AsyncStorage.setItem("state", JSON.stringify(initialState));
    setState(initialState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={colors.gray} />
      <View style={styles.wrapper}>
        {state.isUsersPage ? <Users state={state} setState={setState} /> : null}
        {state.isVotingPage ? (
          <VotingPage state={state} setState={setState} />
        ) : null}
        {state.isResultPage ? (
          <Result state={state} setState={setState} />
        ) : null}
        {!state.isResultPage ? (
          <View style={styles.buttons}>
            <Button
              text={strings.save}
              onPress={save}
              iconName="save"
              bg="green"
            />
            <Button
              text={strings.reset}
              onLongPress={reset}
              iconName="ccw"
              bg="red"
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.gray,
    padding: spacing.lg,
    paddingTop: NativeStatusBar.currentHeight || 0,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: spacing.sm,
  },
});
