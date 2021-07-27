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
    paddingVertical: Dimensions.get('window').height * 0.03
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    fontSize: 18
  },
  inputContainer: {
    paddingTop: Dimensions.get('window').height * .02,
    paddingBottom: Dimensions.get('window').height * .01
  },
  buttonContainer: {
    paddingBottom: Dimensions.get('window').height * 0.01
  },
  clientList: {
    maxHeight: Dimensions.get('window').height *.5
  }
});