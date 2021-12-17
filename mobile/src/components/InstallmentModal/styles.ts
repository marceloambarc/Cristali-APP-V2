import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  overlay: {
    backgroundColor: theme.colors.overlay,
    flex: 1
  },
  modalContainer: {
    flex: 1,
    marginTop: Dimensions.get('screen').height * 0.03,
    paddingHorizontal: 24
  },
  modalHeader: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    fontSize: theme.fonts.sizeB,
  },
  firstColor: {
    marginVertical: Dimensions.get('screen').height * 0.012,
    paddingVertical: Dimensions.get('screen').height * 0.01,
    paddingHorizontal: Dimensions.get('screen').height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.activatedList
  },
  installmentChoosed: {
    marginTop: Dimensions.get('screen').height * 0.02,
    paddingVertical: Dimensions.get('screen').height * 0.01,
    paddingHorizontal: Dimensions.get('screen').height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.input
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('screen').height * 0.02,
    marginBottom: Dimensions.get('screen').height * 0.02
  },
  buttonContainer: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.06,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.Success
  }
});