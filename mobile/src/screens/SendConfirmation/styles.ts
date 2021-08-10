import { StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    flex: 1
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
    height: 100,
  },
  pagseguroImage: {
    width: '70%',
  },
  text: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.text,
    fontSize: 20,
    textAlign: 'center'
  },
  buttons: {
    flexDirection: 'row', 
    paddingHorizontal: '30%', 
    justifyContent: 'space-between'
  },
  button: {
    width: '100%',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spaceButtons: {
    width: 10
  }
})