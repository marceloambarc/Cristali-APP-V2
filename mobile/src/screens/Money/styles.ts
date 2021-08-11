import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.input,
    paddingTop: 30,
    paddingHorizontal: 24
  },
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    fontSize: theme.fonts.sizeTitle,
    lineHeight: 70
  },
  text: {
    fontFamily: theme.fonts.text,
    color: theme.colors.text,
    fontSize: theme.fonts.sizeC,
    marginTop: Dimensions.get('window').height * 0.07
  },
  footer: {
    paddingHorizontal: 24,
    marginTop: Dimensions.get('window').height * 0.07,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  empty: {
    paddingVertical: 7
  },
  inputContainer: {
    width: '100%'
  },
  inputText: {
    marginBottom: Dimensions.get('window').height * 0.01,
    fontFamily: theme.fonts.text,
    color: theme.colors.text
  },
});