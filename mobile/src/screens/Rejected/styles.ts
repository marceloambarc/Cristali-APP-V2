import { StyleSheet } from "react-native";
import { theme } from "../../global"; 

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    alignItems: 'center',
    paddingTop: 50,
    height: '70%',
    paddingHorizontal: 24,
    justifyContent: 'space-around'
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
  },
  pagseguroImage: {
    width: '70%',
  },
  textContainer: {
    textAlign: 'center',
    marginTop: -50
  },
  text: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.Cancel,
    fontSize: 20,
  },
  subtext: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.text,
    fontSize: 20,
  },
  footer: {
    paddingHorizontal: 24,
    flexDirection: 'row',
  },
});