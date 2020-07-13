import React from "react";
import {
  View,
  Button,
  Input,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Icon,
  TouchableOpacity,
} from "../Components/Kit";
import strings from "../strings";
import typography from "../StyleSheet/typography";
import spacing from "../StyleSheet/spacing";
import { Platform } from "react-native";
import colors from "../StyleSheet/colors";

export default function Users(props) {
  const { state, setState } = props;

  const handleChange = (user) => {
    setState({
      ...state,
      user,
    });
  };
  const handleAddUser = () => {
    const hasDuplicate = state.users.find(
      (user) => user.name.toLowerCase() === state.user.toLowerCase()
    );
    if (state.user && !hasDuplicate) {
      setState({
        ...state,
        user: "",
        users: [...state.users, { name: state.user, vote: false }],
      });
    } else if (state.user && hasDuplicate) {
      alert(strings.noDuplicateItem);
    } else {
      alert(strings.typeUserName);
    }
  };
  const handleRemove = (index) => {
    setState({
      ...state,
      users: state.users.filter((user, i) => i !== index),
    });
  };
  const renderItem = ({ item, index }) => (
    <View style={[styles.space, styles.usersWrapper]}>
      <Text style={styles.text}>
        {index + 1}. {item.name}
      </Text>
      <TouchableOpacity
        style={styles.userIconsWrapper}
        onPress={() => handleRemove(index)}
      >
        <Icon name="erase" size={25} color={colors.red} />
      </TouchableOpacity>
    </View>
  );

  const handleStartVote = () => {
    setState({
      ...state,
      isUsersPage: false,
      isVotingPage: true,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === strings.ios ? strings.padding : strings.height}
      style={styles.container}
    >
      <Input
        placeholder={strings.typeName}
        value={state.user}
        onChangeText={handleChange}
        onSubmitEditing={handleAddUser}
        style={styles.space}
      />
      <Button
        text={strings.addUserToVote}
        iconName="add-user"
        onPress={handleAddUser}
        style={styles.space}
        bg="darkGray"
      />
      {state.users.length ? (
        <FlatList
          style={styles.usersContainer}
          data={state.users}
          keyExtractor={(item, i) => i.toString()}
          renderItem={renderItem}
        />
      ) : null}
      {state.users.length >= 2 ? (
        <Button
          text={strings.startToVote}
          iconName="merge"
          onPress={handleStartVote}
        />
      ) : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  usersContainer: {
    marginVertical: spacing.lg,
  },
  usersWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userIconsWrapper: {
    flexDirection: "row",
  },
  text: {
    fontSize: typography.lg,
  },
  space: {
    marginVertical: spacing.sm,
  },
});
