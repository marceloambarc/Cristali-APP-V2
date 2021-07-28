import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24
  },
  searchContainer: {
    
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Dimensions.get('window').height *.020
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    fontSize: 18
  },
  inputContainer: {
    paddingBottom: Dimensions.get('window').height *.012
  },
  buttonContainer: {
    paddingBottom: Dimensions.get('window').height *.015
  },
  list: {
    height: Dimensions.get('window').height * .55,
  }
});