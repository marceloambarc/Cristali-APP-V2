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
    fontSize: theme.fonts.sizeHeader
  },
  overlay: {
    backgroundColor: theme.colors.overlay,
    flex: 1
  },
  modalContainer: {
    flex: 1,
    marginTop: 100,
    paddingHorizontal: 24
  },
  firstColor: {
    marginTop: 70,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.unactivatedList
  },
  secondColor: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.ContinueDesactivated
  },
  thirdColor: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.SuccessDesactivated
  },
  fouthColor: {
    marginTop: 70,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.Cancel
  }
});