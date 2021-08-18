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
  },
  totalText: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputmaskContainer: {
    paddingLeft: 20,
    width: 200
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
  },
  payment: {

  },
  text: {
    fontFamily: theme.fonts.text,
    color: theme.colors.text,
    fontSize: 14
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