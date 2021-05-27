import colors from "../../colors";
import { Dimensions } from "react-native";

export default {
  parent: {
    height: "100%",
    backgroundColor: colors.lessWhite
  },
  optionsWrapper: {
    position: "absolute",
    top: 0,
    right: 0
  },
  nameInputWrapper: {
    height: "12%",
    justifyContent: "center",
    backgroundColor: colors.primary
  },
  nameInput: {
    backgroundColor: colors.evenLessWhite,
    height: "60%",
    width: "70%",
    marginLeft: "5%",
    paddingLeft: "3%",
    fontSize: 20,
    color: colors.dark
  },
  nameInvalidInput: {
    backgroundColor: colors.rusty,
    height: "60%",
    width: "70%",
    marginLeft: "5%",
    paddingLeft: "3%",
    fontSize: 20
  },
  nameText: {
    fontSize: 25,
    color: colors.white,
    width: "70%",
    marginLeft: "10%"
  },
  photoAnimationWrapper: {
    position: "absolute",
    top: "3%",
    right: "5%",
    height: Dimensions.get("window").width * 0.25,
    width: Dimensions.get("window").width * 0.25,
    borderRadius: (Dimensions.get("window").width * 0.25) / 2,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: colors.dark
  },
  photo: {
    height: "100%",
    width: "100%",
    borderRadius: (Dimensions.get("window").width * 0.25) / 2
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: (Dimensions.get("window").width * 0.25) / 2
  },
  questionRow: {
    height: "5%",
    justifyContent: "flex-end",
    width: "95%",
    marginLeft: "3%"
  },
  lastChanged: {
    height: "10%",
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "3%"
  },
  datePickerBtn: {
    flex: 1,
    marginLeft: "3%",
    height: "80%",
    justifyContent: "center"
  },
  coated: {
    height: "10%",
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "3%",
    paddingRight: "3%"
  },
  submitWrapper: {
    height: "18%",
    alignItems: "center"
  },
  updateAnimationWrapper: {
    height: "55%",
    width: "90%"
  },
  submit: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: "3%"
  },
  gradient: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15
  },
  text: {
    color: colors.notQuiteBlack,
    fontSize: 17
  },
  btnText: {
    color: colors.white,
    fontSize: 21
  }
};
