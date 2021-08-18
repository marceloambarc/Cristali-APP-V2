import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 50
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('window').height * .04,
    marginBottom: Dimensions.get('window').height * .01
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    marginBottom: Dimensions.get('window').height * .02
  },
  payment: {

  },
  text: {
    fontFamily: theme.fonts.text,
    color: theme.colors.text,
    fontSize: theme.fonts.sizeC
  },
  buttonsContainer: {
    paddingTop: 20,
    alignItems: 'center',
  },
  checkoutButtonRow: {
    flexDirection: 'row',
    marginBottom: 15
  },
  checkoutButtonCol: {
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
});