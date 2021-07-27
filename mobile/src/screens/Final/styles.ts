import { StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.input,
    paddingTop: 70
  },
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70
  },
  title: {
    fontFamily: theme.fonts.text,
    color: theme.colors.Success,
    fontSize: 24,
    lineHeight: 70
  },
  footer: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    marginTop: 160
  },
});