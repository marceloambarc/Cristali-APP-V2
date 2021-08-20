import { StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  overlay: {
    backgroundColor: theme.colors.overlay,
    flex: 1
  },
  modalContainer: {
    flex: 1,
    marginTop: 30,
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
    fontSize: theme.fonts.sizeB
  },
  firstColor: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.activatedList
  },
  installmentChoosed: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.input
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  buttonContainer: {
    width: '100%',
    height: 60,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.Success
  }
});