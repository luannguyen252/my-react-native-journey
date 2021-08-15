import {Platform, StatusBar  } from "react-native";

export default {

    images: {
        heartIcon: require("../../ReactifyGithub/assets/like.png"),
        heartFilledIcon: require("../../ReactifyGithub/assets/heart.png"),
        fireIcon: require("../../ReactifyGithub/assets/fire.png"),
        commentIcon: require("../../ReactifyGithub/assets/chat.png"),
        sendIcon: require("../../ReactifyGithub/assets/send.png"),
        background: require("../../ReactifyGithub/assets/start.jpg"),
        send: require("../../ReactifyGithub/assets/navigation.png"),
        sync: require("../../ReactifyGithub/assets/sync.png"),
        addReaction: require("../../ReactifyGithub/assets/add.png"),
    },

    colors: {
        appColor: "#ff471a",
        secondaryColor: "#e62e00",
        tabBgColor: "#D5DBDB",
        tabInActiveColor: "#FFFFFF",
        black: "#000000",
        appBgColor: "#E5E8E8"
    },

    constants: {
        appName: "Reactify",
        headerFontSize: 20, 
        headerFontColor: "white", 
        headerFontStyle: "normal",
        headerFontWeight: "500", 
        headerFontFamily: "arial", 
        imagePickerTitle: "Create Reaction",
        profileTitle: "Profile",
        defaultPadding: 15,
        buttonHeight: 45,
        padding20: 20,
        padding5: 5,
        padding2: 2,
        padding3: 3,
        padding8: 8,
        padding10: 10,
        padding25: 25,
        padding30: 30,
        padding50: 50,
        padding70: 70,
        padding80: 80,
        padding90: 90,
        padding100: 100,
        padding120: 120,
        textsize_14: 14,
        textsize_16: 16,
        LOGIN: "login",
        STATUSBAR_HEIGHT : 0,  //Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        APPBAR_HEIGHT : 0, //Platform.OS === 'ios' ? 44 : 56,

        registerFirePath : "/User/",
        reactionFirePath : "/Reaction/",
        uploadFirePath : "/Image/",
    }
}

export const printLog = (message) => {
    console.log(message)
}