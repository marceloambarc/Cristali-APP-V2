import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.input,
    height: Dimensions.get('window').height * .12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16
  },
  headerCol: {
    width: '33%',
  },
  headerBorder: {
    paddingHorizontal: 23
  },
  closeSpace: {
    width: 24
  },
  title: {
    fontFamily: theme.fonts.text,
    color: theme.colors.text,
    fontSize: 15
  }
});