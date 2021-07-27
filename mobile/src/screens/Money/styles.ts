import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.input,
    paddingTop: 40,
    paddingHorizontal: 24
  },
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    fontSize: 24,
    lineHeight: 70
  },
  text: {
    fontFamily: theme.fonts.text,
    color: theme.colors.text,
    fontSize: 15,
    marginTop: Dimensions.get('window').height * 0.1
  },
  footer: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    marginTop: Dimensions.get('window').height * 0.1
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