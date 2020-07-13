import React from "react";
import { Entypo } from "@expo/vector-icons";
import colors from "../../StyleSheet/colors";

Icon.defaultProps = {
  color: colors.white,
  size: 30,
};

export default function Icon(props) {
  return <Entypo {...props} />;
}
