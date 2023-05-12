import { StyleSheet } from 'react-native';

const commonStyle = StyleSheet.create({
  card: {
    backgroundColor: COLORS.light,
    height: SIZES.height / 1.6,
    marginTop: SIZES.padding * 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 8.65,
    borderRadius: 10,
  },
  authCard: {
    margin: SIZES.padding * 2,
    marginTop: 100,
    // height: SIZES.height / 1.3,
    borderRadius: 10,
    backgroundColor: COLORS.light,
    padding: SIZES.padding * 3
  }
})