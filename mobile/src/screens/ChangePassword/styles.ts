import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingTop: Dimensions.get('window').height *0.03
  },
  falseDivider2: {
    paddingTop: Dimensions.get('window').height *0.02
  },
  cristaliInputText: {
    fontFamily: theme.fonts.text,
    fontSize: theme.fonts.sizeD,
    lineHeight: 20.46,
    color: theme.colors.loginText,
    marginBottom: 7
  },
  errorPassword: {
    fontFamily: theme.fonts.text,
    color: theme.colors.Config,
    fontSize: theme.fonts.sizeD
  },
  footer: {
    marginTop: Dimensions.get('window').height *0.02
  }
});