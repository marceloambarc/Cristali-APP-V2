import { StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 112,
    backgroundColor: theme.colors.secondary,
    color: theme.colors.text,
    borderRadius: 20,
    fontFamily: theme.fonts.text,
    fontSize: theme.fonts.sizeB,
    marginRight: 4,
    borderWidth: 1,
    borderColor: theme.colors.inputActivatedBorder,
    paddingHorizontal: 16,
    paddingTop: 16,
    textAlignVertical: 'top'
  }
});