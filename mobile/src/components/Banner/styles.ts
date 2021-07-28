import { StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gradient1,
    height: 210,
    borderRadius: 20
  },
  banner: {
    backgroundColor: theme.colors.credit,
    height: 147,
    borderRadius: 20
  },
  bannerRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bannerCol: {
    flexDirection: 'column',
    paddingHorizontal: 5
  },
  cardsImage: {
    width: 70,
    height: 50,
    borderRadius: 15
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },
  text: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.Config,
    fontSize: 15,
  },
});