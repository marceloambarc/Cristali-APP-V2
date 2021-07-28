import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../global";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F3F5',
    paddingHorizontal: 24,
  },
  historyArea: {
    width: '100%',
    marginTop: Dimensions.get('window').height * 0.15
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: Dimensions.get('window').height *.03,
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    fontSize: 24,
    paddingRight: 15
  },
  calendar: {
    marginRight: 10
  },
  datepickedContainer: {
    justifyContent: 'flex-start',
    lineHeight: 3
  },
  datepickedTitle: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title
  },
  datepicked: {
    alignItems: 'center',
    marginRight: 20,
    fontFamily: theme.fonts.text,
    color: theme.colors.text
  },
  subtitleContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  orderRow: {
    flexDirection: 'row',
    marginBottom: Dimensions.get('window').height * .01
  },
  orderCol: {
    width: '50%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderText: {
    fontFamily: theme.fonts.text,
    color: theme.colors.text,
    fontSize: 15,
    marginBottom: 2
  },
  dividerLimiter: {
    paddingHorizontal: Dimensions.get('window').height * .09,
    overflow: 'hidden'
  },
  list: {
    marginBottom: Dimensions.get('window').height * 0.3
  }
});