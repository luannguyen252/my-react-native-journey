const CONSTANTS = {
  ANIMATEDLIST_HEIGHT: 180,
  ANIMATEDLIST_CARDWIDTH: 120,
  ANIMATEDLIST_BORDERRADIUS: 5,
};

const Styles = {
  App: {
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  },
  AnimatedList: {
    scrollviewContainer: {
      height: CONSTANTS.ANIMATEDLIST_HEIGHT,
      overflow: "visible",
    },
    scrollview: {
      height: CONSTANTS.ANIMATEDLIST_HEIGHT,
      overflow: "visible",
    },
    scrollviewContentContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
  },
  Card: {
    container: {
      marginLeft: 10,
      borderRadius: CONSTANTS.ANIMATEDLIST_BORDERRADIUS,
      backgroundColor: "#dedede",
    },
    imageThumb: {
      height: CONSTANTS.ANIMATEDLIST_HEIGHT,
      width: CONSTANTS.ANIMATEDLIST_CARDWIDTH,
      borderRadius: CONSTANTS.ANIMATEDLIST_BORDERRADIUS,
    },
    image: {
      position: "absolute",
      top: 0,
      height: CONSTANTS.ANIMATEDLIST_HEIGHT,
      width: CONSTANTS.ANIMATEDLIST_CARDWIDTH,
      borderRadius: CONSTANTS.ANIMATEDLIST_BORDERRADIUS,
    },
  },
};

export default Styles;
