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
  },
  titleContainer: {
    paddingLeft: 14,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    fontSize: theme.fonts.sizeTitle,
    paddingRight: 15
  },
  datePicker: {
    flexDirection: 'column'
  },
  datePickerRow: {
    flexDirection: 'row',
    paddingVertical: 4
  },
  calendar: {
    marginRight: 10
  },
  datepickedContainer: {
    justifyContent: 'flex-start',
    lineHeight: 1
  },
  datepickedTitle: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    fontSize: theme.fonts.sizeD,
  },
  datepicked: {
    alignItems: 'center',
    marginRight: 20,
    fontFamily: theme.fonts.text,
    color: theme.colors.text,
    fontSize: theme.fonts.sizeD
  },
  subtitleContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  buttonColumn: {
    width: 60, 
    paddingHorizontal: 5
  },
  orderRow: {
    flexDirection: 'row',
    marginTop: Dimensions.get('window').height *.00,
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
    fontSize: theme.fonts.sizeC,
    marginBottom: 2
  },
  dividerLimiter: {
    paddingHorizontal: Dimensions.get('window').height * .07,
    overflow: 'hidden'
  },
  list: {
    height: Dimensions.get('window').height * 0.66
  }
});