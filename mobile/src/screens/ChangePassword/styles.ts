import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Dimensions.get('window').height *.15,
    paddingBottom: Dimensions.get('window').height * 0.1
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    fontSize: theme.fonts.sizeB
  },
  text: {
    fontFamily: theme.fonts.text,
    color: theme.colors.text,
    fontSize: theme.fonts.sizeC
  },
  falseDivider: {
    paddingTop: 32
  },
  falseDivider2: {
    paddingTop: 14
  },
  cristaliInputText: {
    fontFamily: theme.fonts.text,
    fontSize: 15,
    lineHeight: 20.46,
    color: theme.colors.loginText,
    marginBottom: 10
  },
});