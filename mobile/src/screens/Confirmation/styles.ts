import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    alignItems: 'center',
    height: 430,
    marginTop: 10,
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

  bodyDeclined:  {
    paddingHorizontal: 24,
    paddingVertical: Dimensions.get('window').height * 0.24,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleDeclined: {
    paddingTop: 50,
    paddingBottom: 100,
  },
  textDeclined :{
    fontSize: 20,
    fontFamily: theme.fonts.heading
  },

})