import React from "react";
import { View, Text, StyleSheet, Button } from "../Components/Kit";
import colors from "../StyleSheet/colors";
import radius from "../StyleSheet/radius";
import strings from "../strings";
import typography from "../StyleSheet/typography";

export default function Result(props) {
  const { state, setState } = props;

  const resetUsers = () =>
    state.users.map((user) => ({
      ...user,
      vote: false,
    }));

  const handleAgain = () => {
    setState({
      ...state,
      isResultPage: false,
      isVotingPage: true,
      users: resetUsers(),
    });
  };
  const handleBack = () => {
    setState({
      ...state,
      isResultPage: false,
      isUsersPage: true,
      users: resetUsers(),
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, styles.approvedWrapper]}>
        <Text style={styles.text}>{strings.approved}</Text>
        <Text style={styles.text}>
          {state.users.filter((user) => !!user.vote).length}
        </Text>
      </View>
      <View style={[styles.wrapper, styles.rejectedWrapper]}>
        <Text style={[styles.text, styles.rejectedText]}>
          {strings.rejected}
        </Text>
        <Text style={[styles.text, styles.rejectedText]}>
          {state.users.filter((user) => !user.vote).length}
        </Text>
      </View>
      <View style={[styles.wrapper, styles.buttons]}>
        <Button
          text={strings.back}
          iconName="chevron-left"
          bg="red"
          onPress={handleBack}
        />
        <Button
          text={strings.again}
          iconName="loop"
          bg="green"
          onPress={handleAgain}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  wrapper: {
    flex: 0.3,
    alignSelf: "stretch",
    borderRadius: radius.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  approvedWrapper: {
    backgroundColor: colors.white,
  },
  text: {
    fontSize: typography.xxl,
  },
  rejectedText: {
    color: colors.white,
  },
  rejectedWrapper: {
    backgroundColor: colors.black,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
