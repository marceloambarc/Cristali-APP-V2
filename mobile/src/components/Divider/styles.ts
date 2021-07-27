import { StyleSheet } from "react-native";
import { theme } from "../../global"; 

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.inputDesactivatedBorder,
    alignSelf: 'center'
  }
});