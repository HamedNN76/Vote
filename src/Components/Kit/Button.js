import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import radius from "../../StyleSheet/radius";
import colors from "../../StyleSheet/colors";
import spacing from "../../StyleSheet/spacing";
import typography from "../../StyleSheet/typography";
import Icon from "./Icon";

export default function Button(props) {
  const {
    text,
    iconName,
    iconSize,
    iconColor,
    bg = "blue",
    style,
    color = "white",
    ...restProps
  } = props;

  const containerStyle = [styles.button, { backgroundColor: colors[bg] }];
  if (iconName) {
    containerStyle.push(styles.row);
  } else {
    containerStyle.push(styles.center);
  }

  return (
    <TouchableOpacity style={[containerStyle, style]} {...restProps}>
      {iconName ? (
        <Icon
          name={iconName}
          size={iconSize || 30}
          color={iconColor || colors[color]}
          style={styles.gap}
        />
      ) : null}
      {text ? (
        <Text style={[styles.text, styles.gap, { color: colors[color] }]}>
          {text}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  text: {
    fontSize: typography.lg,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  gap: {
    paddingHorizontal: spacing.sm,
  },
});
