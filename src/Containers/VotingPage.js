import React from "react";
import { View, Text, StyleSheet, Button, Icon } from "../Components/Kit";
import strings from "../strings";
import spacing from "../StyleSheet/spacing";
import typography from "../StyleSheet/typography";

export default function VotingPage(props) {
  const { state, setState } = props;

  const nextVoteIndex = () =>
    state.users.length - 1 === state.voteIndex ? 0 : state.voteIndex + 1;
  const handleApproved = () => {
    const voteIndex = nextVoteIndex();
    setState({
      ...state,
      users: state.users.map((user, i) => {
        if (i === state.voteIndex) {
          return {
            ...user,
            vote: true,
          };
        }
        return user;
      }),
      voteIndex,
      isVotingPage: voteIndex !== 0,
      isResultPage: voteIndex === 0,
    });
  };
  const handleRejected = () => {
    const voteIndex = nextVoteIndex();
    setState({
      ...state,
      voteIndex,
      isVotingPage: voteIndex !== 0,
      isResultPage: voteIndex === 0,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <Icon name="documents" color="black" size={35} />
        <Text style={[styles.text, styles.gap]}>
          {state.users[state.voteIndex].name}
        </Text>
        <Icon name="documents" color="black" size={35} />
      </View>
      <Button
        text={strings.approved}
        bg="white"
        color="black"
        iconName="check"
        style={[styles.button, styles.gap]}
        onPress={handleApproved}
      />
      <Button
        text={strings.rejected}
        bg="black"
        iconName="cross"
        style={[styles.button, styles.gap]}
        onPress={handleRejected}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
  },
  name: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xxl,
  },
  text: {
    fontSize: typography.xxl,
    paddingHorizontal: spacing.md,
  },
  gap: {
    marginVertical: spacing.lg,
  },
});
