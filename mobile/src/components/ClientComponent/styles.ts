import { StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 82,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 16,
    marginRight: 16,
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    fontSize: theme.fonts.sizeC,
    marginBottom: 4,
  },
  text: {
    fontFamily: theme.fonts.text,
    color: theme.colors.text,
    fontSize: theme.fonts.sizeD,
  },
  number:  {
    fontFamily: theme.fonts.text,
    color: theme.colors.title,
    fontSize: theme.fonts.sizeD,
  }
});