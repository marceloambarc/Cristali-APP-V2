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
    
    marginVertical: 7
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    fontSize: 15,
    marginBottom: 4
  },
  text: {
    fontFamily: theme.fonts.text,
    color: theme.colors.text,
    fontSize: 12,
  },
  number:  {
    fontFamily: theme.fonts.text,
    color: theme.colors.title,
    fontSize: 11,
  }
});