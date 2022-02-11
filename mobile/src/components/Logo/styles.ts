import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 69,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 75.97,
    height: 68,
  },
  subtextContainer: {

  },
  subtextImage: {
    width: Dimensions.get('window').height * 0.3,
    height: Dimensions.get('window').height * .1
  },
  versionText: {
    fontSize: 12,
    marginBottom: Dimensions.get('window').height * 0.02
  }
});