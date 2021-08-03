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
  clientArea: {
    paddingTop: Dimensions.get('window').height * 0.01,
    width: '100%',
  },
  titleContainer: {
    paddingVertical: Dimensions.get('window').height *0.04,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    fontSize: 20,
  },
  clientData: {
    marginTop: 24
  },
  clientInput: {
    width: '100%',
    marginBottom: 10
  },
  inputTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  inputTextCol: {

  },
  inputBannerText: {
    fontFamily: theme.fonts.text,
    fontSize: 15,
    color: theme.colors.text
  },
  inputLabel: {
    fontFamily: theme.fonts.text,
    fontSize: 10,
    color: theme.colors.text,
    paddingTop: 1
  },
  subtitle: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title,
    fontSize: 18,
  },
  orderRow: {
    flexDirection: 'row',
    marginTop: Dimensions.get('window').height * 0.02,
    marginBottom: Dimensions.get('window').height * 0.03
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
    marginBottom: 9
  },
  insertProduct: {
    paddingVertical: 24,
    marginBottom: 10
  },
  footer: {
    paddingVertical: 24,
  },
  productContainer: {
    paddingVertical: Dimensions.get('window').height * 0.015
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: Dimensions.get('window').height * .015
  },
  listProdutContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  sellPriceContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '50%'
  },
  productTitleContainer: {
    width: '100%'
  },
  listProductTitle: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.title
  },
  listButton: {
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
    marginHorizontal: Dimensions.get('window').width * .007
  }
});