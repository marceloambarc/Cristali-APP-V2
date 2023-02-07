import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').height * .4,
    height: 120,
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    paddingTop: 30,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '90%',
    height: '100%'
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    fontSize: theme.fonts.sizeC,
    marginBottom: 40
  },
})