import { StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 82,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20,
    paddingLeft: 6,
    paddingRight: 18,
    marginVertical: 5
  },
  content: {
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 16,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fonts.sizeC,
  },
  text: {
    fontFamily: theme.fonts.text,
    fontSize: theme.fonts.sizeD,
    textAlign: 'right',
    maxHeight: 20
  },
  number:  {
    fontFamily: theme.fonts.text,
    fontSize: theme.fonts.sizeD,
    textAlign: 'right'
  },
  condition: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fonts.sizeD,
    textAlign: 'right'
  }
});