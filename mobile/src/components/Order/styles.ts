import { StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 82,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingLeft: 6,
    paddingRight: 18,
    
    marginVertical: 5
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fonts.sizeC,
    marginBottom: 2
  },
  text: {
    fontFamily: theme.fonts.text,
    fontSize: theme.fonts.sizeD,
    textAlign: 'right'
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