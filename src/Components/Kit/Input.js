import React from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "../../StyleSheet/colors";
import spacing from "../../StyleSheet/spacing";
import typography from "../../StyleSheet/typography";
import radius from "../../StyleSheet/radius";

export default function Input(props) {
  const { style, ...restProps } = props;

  return (
    <TextInput
      style={[styles.input, style]}
      underlineColorAndroid={colors.transparent}
      placeholderTextColor={colors.darkGray}
      {...restProps}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    alignSelf: "stretch",
    height: 60,
    backgroundColor: colors.lightGray,
    borderStyle: "solid",
    borderColor: colors.black,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    fontSize: typography.lg,
    borderRadius: radius.lg,
  },
});
