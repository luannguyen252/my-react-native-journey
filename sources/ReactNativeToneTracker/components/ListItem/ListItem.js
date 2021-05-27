import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Animated,
  Alert
} from "react-native";
import { selectedGuitar, editGuitar, showDatePicker } from "../../actions";
import { connect } from "react-redux";
import styles from "./styles";
import electricGuitarImg from "../../images/electric_guitar.png";
import bassImg from "../../images/bass_guitar.png";
import acousticImg from "../../images/acoustic_guitar.png";
import coatedImg from "../../images/coated_icon.png";
import constants from "../../constants";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../colors";
import Dialog from "react-native-dialog";
import NotifService from "../../NotifService";
import PropTypes from "prop-types";
import * as Animatable from "react-native-animatable";
import strings from "../../strings";

const width = Dimensions.get("window").width;

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restringPopup: false
    };
    this.notif = new NotifService();
  }

  componentWillMount() {
    //each animated button needs an animated value
    this.animatedEditValue = new Animated.Value(1);
    this.animatedRestringValue = new Animated.Value(1);
  }

  //shrink selected button
  handlePressIn = valueToAnimate => {
    Animated.spring(valueToAnimate, {
      toValue: 0.8
    }).start();
  };

  //bounce the selected button
  handlePressOut = valueToAnimate => {
    Animated.spring(valueToAnimate, {
      toValue: 1,
      friction: 3,
      tension: 40
      //perform the selected button's job
    }).start(
      valueToAnimate === this.animatedEditValue
        ? this.goToEdit
        : this.setState({ restringPopup: true })
    );
  };

  //navigate to Edit screen
  goToEdit = () => {
    this.props.selectedGuitar(this.props.item.key);
    this.props.navigation.navigate("Edit", { photo: null });
  };

  instrumentImage = () => {
    let { type, photo } = this.props.item;
    //No photo exists. Use a  default image
    if (photo === null) {
      switch (type) {
        case constants.electric:
          return electricGuitarImg;
        case constants.bass:
          return bassImg;
        case constants.acoustic:
          return acousticImg;
      }
    }
    //Return the photo
    return { uri: photo };
  };

  //percentage of progress bar to fill
  getProgress = () => {
    let age = this.getDaysElapsed();
    return Math.floor(this.getAge(age));
  };

  isCoated = () => {
    return (
      this.props.item.coated && (
        <Image
          source={coatedImg}
          style={styles.coatedImg}
          resizeMode="contain"
        />
      )
    );
  };

  getPulsar = () => {
    return (
      this.getCondition() === "#dc143c" && (
        <Animatable.View
          style={styles.pulse}
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
        />
      )
    );
  };

  whenDidRestring = () => {
    return `${strings.whenDidRestring} ${String(this.props.item.name)}?`;
  };

  getDaysElapsed = () => {
    let diffStamp = new Date().getTime() - this.props.item.timestamp;
    diffStamp /= 86400000;
    return Math.floor(diffStamp);
  };

  //easy to read age of strings
  getDisplayAge = () => {
    const age = this.getDaysElapsed();
    if (age === 0) {
      return strings.restrungToday;
    } else if (age === 1) {
      return `${age} ${strings.dayAgo}`;
    } else {
      return `${age} ${strings.daysAgo}`;
    }
  };

  //getting color for progress indicator
  getCondition = () => {
    const { item } = this.props;
    //setting string quality to good as default
    let stringCondition = colors.good;
    let age = this.getDaysElapsed();
    if (item.type === constants.bass) {
      age /= 2;
    }
    //conditions for strings being dull
    if (
      (15 < age && age < 30 && !item.coated && item.use === constants.daily) ||
      (37 < age &&
        age < 75 &&
        !item.coated &&
        item.use === constants.somedays) ||
      (60 < age &&
        age < 120 &&
        !item.coated &&
        item.use === constants.weekly) ||
      (37 < age && age < 75 && item.coated && item.use === constants.daily) ||
      (94 < age &&
        age < 187 &&
        item.coated &&
        item.use === constants.somedays) ||
      (150 < age && age < 300 && item.coated && item.use === constants.weekly)
    ) {
      stringCondition = colors.dull;
    }
    //conditions for strings being rusty
    if (
      (age >= 30 && !item.coated && item.use === constants.daily) ||
      (age >= 75 && !item.coated && item.use === constants.somedays) ||
      (age >= 120 && !item.coated && item.use === constants.weekly) ||
      (age >= 75 && item.coated && item.use === constants.daily) ||
      (age >= 187 && item.coated && item.use === constants.somedays) ||
      (age >= 300 && item.coated && item.use === constants.weekly)
    ) {
      stringCondition = colors.rusty;
    }
    return stringCondition;
  };

  //determining how close strings are to being rusty
  getAge = age => {
    const { item } = this.props;
    if (item.type === constants.bass) {
      age /= 2;
    }
    if (!item.coated && item.use === constants.daily) {
      return (age *= 3.3);
    } else if (!item.coated && item.use === constants.somedays) {
      return (age *= 1.3333);
    } else if (!item.coated && item.use === constants.weekly) {
      return (age *= 0.833);
    } else if (item.coated && item.use === constants.daily) {
      return (age *= 1.3333);
    } else if (item.coated && item.use === constants.somedays) {
      return (age *= 0.535);
    } else if (item.coated && item.use === constants.weekly) {
      return (age *= 0.3333);
    }
  };

  render() {
    //the animateable buttons need to reference size values which can dynamically change
    const animatedEditStyle = {
      transform: [{ scale: this.animatedEditValue }]
    };
    const animatedRestringStyle = {
      transform: [{ scale: this.animatedRestringValue }]
    };
    return (
      <View style={styles.parent}>
        <View style={styles.imageWrapper}>
          {this.getPulsar()}
          <Image
            source={this.instrumentImage()}
            style={styles.instrumentImg}
            resizeMode="cover"
          />
          <AnimatedCircularProgress
            style={styles.progressCircle}
            size={width * 0.27 * 0.9}
            width={5}
            backgroundWidth={3}
            fill={this.getProgress()}
            tintColor={this.getCondition()}
            backgroundColor={colors.notQuiteBlack}
          />
        </View>
        {this.isCoated()}
        <View style={styles.detailsWrapper}>
          <View style={styles.detailsRowOne}>
            <Text style={styles.nameText}>{this.props.item.name}</Text>
            <TouchableWithoutFeedback
              onPressIn={() => this.handlePressIn(this.animatedEditValue)}
              onPressOut={() => this.handlePressOut(this.animatedEditValue)}
              style={styles.editBtnWrapper}
            >
              <Animated.View style={animatedEditStyle}>
                <LinearGradient
                  colors={["#fff", "#eee", "#ccc"]}
                  style={styles.editButton}
                >
                  <Icon name="edit" color={colors.notQuiteBlack} size={20} />
                </LinearGradient>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.detailsRowTwo}>
            <View style={styles.ageTextWrapper}>
              <Text style={[styles.ageText, { color: this.getCondition() }]}>
                {this.getDisplayAge()}
              </Text>
            </View>
            <TouchableWithoutFeedback
              onPressIn={() => this.handlePressIn(this.animatedRestringValue)}
              onPressOut={() => this.handlePressOut(this.animatedRestringValue)}
              style={styles.restringBtnWrapper}
            >
              <Animated.View style={animatedRestringStyle}>
                <LinearGradient
                  colors={[colors.light, colors.primary, colors.dark]}
                  style={styles.restringButton}
                >
                  <Text style={styles.btnText}>{strings.restring}</Text>
                </LinearGradient>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <Dialog.Container visible={this.state.restringPopup}>
          <Dialog.Title>{strings.restringGuitar}</Dialog.Title>
          <Dialog.Description>{this.whenDidRestring()}</Dialog.Description>
          <Dialog.Button
            label={strings.today}
            onPress={() => {
              this.setState({ restringPopup: false });
              this.props.item.timestamp = new Date().getTime();
              this.props.editGuitar(this.props.item);
              this.notif.cancelNotif(this.props.item.key);
              if (this.props.notifications) {
                this.notif.scheduleNotif(this.props.item);
              }
            }}
            color={colors.primary}
          />
          <Dialog.Button
            label={strings.someOtherDay}
            onPress={() => {
              this.setState({ restringPopup: false });
              this.props.selectedGuitar(this.props.item.key);
              this.props.showDatePicker(true);
              this.props.navigation.navigate("Edit", { photo: null });
            }}
            color={colors.primary}
          />
          <Dialog.Button
            label={strings.cancel}
            onPress={() => {
              this.setState({ restringPopup: false });
            }}
            color={colors.primary}
          />
        </Dialog.Container>
      </View>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string.isRequired,
    coated: PropTypes.bool.isRequired,
    photo: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    use: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired
  }).isRequired
};

ListItem.defaultProps = {
  item: PropTypes.objectOf(
    PropTypes.shape({
      photo: null
    })
  )
};

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectedGuitar: key => {
      dispatch(selectedGuitar(key));
    },
    showDatePicker: val => {
      dispatch(showDatePicker(val));
    },
    editGuitar: guitar => {
      dispatch(editGuitar(guitar));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);
