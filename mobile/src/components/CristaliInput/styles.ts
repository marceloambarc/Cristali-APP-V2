import { StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    color: theme.colors.text,
    borderRadius: 20,
    fontFamily: theme.fonts.text,
    fontSize: theme.fonts.sizeB,
    paddingHorizontal: 16
  },
  extend: {
    borderWidth: 1,
    borderColor: theme.colors.inputActivatedBorder
  },
  desactivated: {
    borderWidth: 1,
    borderColor: theme.colors.inputDesactivatedBorder
  },
  color1: {
    backgroundColor: theme.colors.secondary,
  },
  color2: {
    backgroundColor: theme.colors.loginInput,
    color: theme.colors.loginText
  }
});