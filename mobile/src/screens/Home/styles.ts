import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Dimensions.get('window').height * .15,
    marginBottom: Dimensions.get('window').height *.1
  },
  logoContainer: {
    paddingVertical: 10
  },
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 7,
    marginTop: Dimensions.get('window').height * .03,
    marginBottom: Dimensions.get('window').height * .07
  },
  username: {
    fontFamily: theme.fonts.logo,
    color: 'black',
    fontSize: 24,
    maxWidth: Dimensions.get('window').width *0.8
  },
  title: {
    fontFamily: theme.fonts.logo,
    color: 'black',
    fontSize: 64,
    lineHeight: 70
  },
  painel: {
    paddingHorizontal: 24,
    marginBottom: Dimensions.get('window').height * .07
  },
  painelButton: {
    width: '100%',
    paddingVertical: Dimensions.get('window').height * 0.01,
  },
  footer: {
    paddingHorizontal: 24,
    flexDirection: 'row'
  },
  footerRow: {
    width: '50%',
    justifyContent: 'flex-start'
  }
});