import {StyleSheet} from 'react-native';
import { theme } from '../constants';

export const commonStyles = StyleSheet.create({
  flexRowAlign: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexJustRowAlign: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardWithShadow: {
    backgroundColor: "white",
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 10,
    
  },

  // COMMON INPUTTEXT & INPUTVIEW STYLES
  inputView: {
    alignItems: "center",
    borderColor: theme.color.disable,
    borderRadius: 10,
  },
  iconView: {
    marginRight: 10,
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  // NOTIFICATON POP CARD
  popupCard: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    position: "absolute",
    zIndex: 999,
    alignSelf: "center",
    borderRadius: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: theme.color.disable,
  },
  chatBtn: {
    height: 35,
    width: 35,
    borderColor: theme.color.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  separator: {
    width: "100%",
    height: 1,
    borderColor: theme.color.disable,
    opacity: 0.8,
    marginVertical: 10,
  },
  unreadBadge: {
    borderColor: theme.color.disable,
    width: 20,
    height: 20,
    borderRadius: 10,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: -5,
    right: -5,
  },
  // Modal Styling
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalStyle: {
    alignItems: "center",
    borderRadius: 20,
    borderColor: theme.color.white,
    width: "100%",
    padding: 30,
  },
  lineBar: {
    width: "100%",
    borderWidth: 1,
    borderColor: theme.color.divider,
  },

  // Header
  headerView: {
    paddingVertical: 15,
    borderColor: theme.color.primary,
  },

  // Footer
  footerContainer: {
    flex: 1,
    // marginTop: -15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    // borderWidth:0.3,
    borderColor: theme.color.descColor,
    backgroundColor:theme.color.white,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 7,
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    borderWidth: 1,
    borderColor: theme.color.primary,
  },
});
