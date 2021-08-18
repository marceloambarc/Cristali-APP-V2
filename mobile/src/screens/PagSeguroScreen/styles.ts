import { StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    width: '100%',
    height: 100,
  },
  pagseguroImage: {
    width: '70%',
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    fontSize: theme.fonts.sizeC
  },
  inputContainer: {
    paddingVertical: 10
  }, 
  inputText: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.text,
    fontSize: theme.fonts.sizeC,
    marginBottom: 10
  },
  banner: {
    paddingVertical: 24,
    marginBottom: 40
  },
  payment: {
    marginTop: 20
  },
  bodyContainer: {
    paddingBottom: 24
  },
  code: {
    paddingVertical: 24,
  },
  codeRow: {
    flexDirection: 'row',
  },
  codeCol: {
    width: '51%',
    paddingHorizontal: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    marginTop: 10,
    marginBottom: 20
  },
});