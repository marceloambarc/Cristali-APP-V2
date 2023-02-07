import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    height: '90%',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    fontSize: theme.fonts.sizeTitle,
    lineHeight: 30
  },
  text: {
    fontFamily: theme.fonts.text,
    color: theme.colors.text,
    fontSize: theme.fonts.sizeC,
    paddingVertical: Dimensions.get('window').height *0.03
  },
  footer: {
    paddingTop: Dimensions.get('window').height *0.02,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  empty: {
    paddingVertical: 7
  },
  inputContainer: {
    paddingVertical: Dimensions.get('window').height *0.03,
    width: '100%'
  },
  inputText: {
    fontFamily: theme.fonts.text,
    color: theme.colors.text
  },
});