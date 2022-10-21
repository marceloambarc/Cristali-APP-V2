import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 70
  },
  content: {
    paddingBottom: 16,
    paddingHorizontal: 70
  },
  title: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fonts.sizeA,
    textAlign: 'center',
    color: theme.colors.primary,
    marginBottom: 20
  },
  text: {
    fontFamily: theme.fonts.text,
    fontSize: theme.fonts.sizeB,
    textAlign: 'left',
  },
  number:  {
    fontFamily: theme.fonts.text,
    fontSize: theme.fonts.sizeB,
    color: theme.colors.primary,
    textAlign: 'center'
  },
  reference: {
    fontFamily: theme.fonts.text,
    fontSize: theme.fonts.sizeD,
    color: theme.colors.primary,
    textAlign: 'center'
  },
  condition: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fonts.sizeB,
    color: theme.colors.primary,
    justifyContent: 'flex-end',
    textAlign: 'center'
  },
  itensTitle: {
    marginTop: 7
  },
  bar: {
    width: 39,
    height: 2,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
    alignSelf: 'center',
    marginTop: 20
  },
  itemContainer: {
    marginBottom: 10,
    paddingHorizontal: 40
  },
  itemtext: {
    fontFamily: theme.fonts.text,
    fontSize: theme.fonts.sizeB,
    textAlign: 'left',
    color: theme.colors.primary,
  }
});