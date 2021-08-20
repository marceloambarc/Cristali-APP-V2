import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 82,
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 5,
  },
  content: {
    paddingTop: 10,
    paddingBottom: 16,
  },
  title: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fonts.sizeC,
    textAlign: 'left',
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
    justifyContent: 'flex-end',
    textAlign: 'right'
  }
});