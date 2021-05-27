import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Switch,
  NativeModules,
  Platform,
  BackHandler,
  Image
} from "react-native";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import InstrumentType from "../InstrumentType";
import InstrumentUse from "../InstrumentUse";
import { connect } from "react-redux";
import { addGuitar } from "../../actions";
import uuidv1 from "uuid";
import DatePicker from "react-native-datepicker";
import colors from "../../colors";
import { HeaderBackButton } from "react-navigation";
import Dialog from "react-native-dialog";
import Toast from "react-native-easy-toast";
import NotifService from "../../NotifService";
import ImagePicker from "react-native-image-picker";
import cameraImg from "../../images/camera.png";
import * as Animatable from "react-native-animatable";
import strings from "../../strings";

//need to know locale for date formatting
const locale =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;

//name cannot be whitespace
const regex = "[a-z|A-Z|0-9]";

//options for the image picker
const photoOptions = {
  customButtons: [{ name: "delete", title: strings.removePhoto }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

class Add extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerLeft: (
        <HeaderBackButton
          tintColor={colors.primary}
          onPress={() => params.handleBack()}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      //user chosen details for the new guitar
      newGuitar: {
        key: uuidv1(),
        name: "",
        type: null,
        use: null,
        timestamp: null,
        coated: false,
        photo: null
      },
      //are details validated?
      nameValidated: true,
      typeValidated: true,
      useValidated: true,
      stampValidated: true,
      //show 'unsaved changes' prompt
      warningPopup: false
    };
    this.notif = new NotifService();
  }

  handleNameChange = event => {
    this.setState({ newGuitar: { ...this.state.newGuitar, name: event } });
  };

  handleTypeChange = newType => {
    this.setState({ newGuitar: { ...this.state.newGuitar, type: newType } });
  };

  handleUseChange = newUse => {
    this.setState({ newGuitar: { ...this.state.newGuitar, use: newUse } });
  };

  handleSubmit = () => {
    const { name, type, use, timestamp } = this.state.newGuitar;
    //animate the submit button before doing anything else
    this.refs["submit"].rubberBand(500).then(endState => {
      //check that no details are missing
      if (
        name.match(regex) &&
        type !== null &&
        use !== null &&
        timestamp !== null
      ) {
        this.props.addGuitar(this.state.newGuitar);
        this.props.navigation.navigate("Home");
        //schedule restring reminder
        if (this.props.notifications) {
          this.notif.scheduleNotif(this.state.newGuitar);
        }
        //validating details
      } else {
        this.refs.toast.show(strings.fillInDetails);
        if (!name.match(regex)) {
          this.setState({ nameValidated: false });
        } else {
          this.setState({ nameValidated: true });
        }
        if (type === null) {
          this.setState({ typeValidated: false });
        } else {
          this.setState({ typeValidated: true });
        }
        if (use === null) {
          this.setState({ useValidated: false });
        } else {
          this.setState({ useValidated: true });
        }
        if (timestamp === null) {
          this.setState({ stampValidated: false });
        } else {
          this.setState({ stampValidated: true });
        }
      }
    });
  };

  onSwitchChanged = () => {
    this.setState({
      newGuitar: {
        ...this.state.newGuitar,
        coated: !this.state.newGuitar.coated
      }
    });
  };

  //format date based on locale
  getFormattedDate = () => {
    const { timestamp } = this.state.newGuitar;
    if (timestamp !== null) {
      const date = new Date(timestamp);
      const day = date.getDate();
      let month = date.getMonth();
      let year = date.getYear();

      return locale === "en_US"
        ? `${++month} ${day} ${year - 100}`
        : `${day} ${++month} ${year - 100}`;
    } else {
      return null;
    }
  };

  //getting current date with locale accounted date format
  getCurrentDate = () => {
    let today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear() - 2000;

    return locale === "en_US"
      ? `${month}-${day}-${year}`
      : `${day}-${month}-${year}`;
  };

  getDateFormat = () => {
    return locale === "en_US" ? "MM-DD-YYYY" : "DD-MM-YYYY";
  };

  instrumentImage = () => {
    let { photo } = this.state.newGuitar;
    //No photo exists. Use a  default image
    if (photo === null) {
      //put camera icon here
      return cameraImg;
    }
    //Return the photo
    return { uri: photo };
  };

  changePhoto = () => {
    //animate the photo first
    this.refs["photo"].swing(500).then(endState => {
      //only have delete option if photo exists in the first place
      const optionToRemove =
        this.state.newGuitar.photo === null ? null : photoOtions;
      ImagePicker.showImagePicker(optionToRemove, response => {
        if (response.customButton) {
          this.setState({
            ...this.state,
            newGuitar: { ...this.state.newGuitar, photo: null }
          });
        } else if (!response.didCancel) {
          this.setState({
            ...this.state,
            newGuitar: {
              ...this.state.newGuitar,
              photo: response.uri
            }
          });
        }
      });
    });
  };

  handleBackPressed = () => {
    //check if user has unsaved changes
    if (
      this.state.newGuitar.name.match(regex) !== null ||
      this.state.newGuitar.type !== null ||
      this.state.newGuitar.use !== null ||
      this.state.newGuitar.timestamp !== null ||
      this.state.newGuitar.coated
    ) {
      this.setState({ warningPopup: true });
    } else {
      this.props.navigation.navigate("Home");
    }
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackPressed
    );
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleBack: () => this.handleBackPressed()
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPressed);
  }

  render() {
    //invalid name input needs a red background
    nameStyle = this.state.nameValidated
      ? styles.nameInput
      : styles.nameInvalidInput;

    //invalid date needs a red border
    stampStyle = this.state.stampValidated
      ? styles.datePickerBtn
      : styles.invalidDatePickerBtn;

    return (
      <View style={styles.parent}>
        {/* guitar's name */}
        <View style={styles.nameInputWrapper}>
          <TextInput
            placeholder={strings.namePlaceholder}
            style={nameStyle}
            value={this.state.newGuitar.name}
            onChangeText={this.handleNameChange}
            maxLength={20}
            autoFocus={true}
            selectionColor={colors.dark}
          />
        </View>
        {/* guitar type */}
        <View style={styles.questionRow}>
          <Text style={styles.text}>{strings.whatTypeOfGuitar}</Text>
        </View>
        <InstrumentType
          type={this.state.newGuitar.type}
          handleTypeChange={this.handleTypeChange}
          validated={this.state.typeValidated}
        />
        {/* profile photo */}
        <Animatable.View ref="photo" style={styles.photoAnimationWrapper}>
          <TouchableHighlight
            style={styles.photo}
            onPress={this.changePhoto}
            underlayColor={colors.evenLessWhite}
          >
            <Image
              style={styles.image}
              source={this.instrumentImage()}
              resizeMode="cover"
            />
          </TouchableHighlight>
        </Animatable.View>
        {/* guitar usage */}
        <View style={styles.questionRow}>
          <Text style={styles.text}>{strings.howOftenPlayGuitar}</Text>
        </View>
        <InstrumentUse
          use={this.state.newGuitar.use}
          handleUseChange={this.handleUseChange}
          validated={this.state.useValidated}
        />
        {/* strings age */}
        <View style={styles.lastChanged}>
          <Text style={styles.text}>{strings.lastChanged}</Text>
          <DatePicker
            style={stampStyle}
            date={this.getFormattedDate()}
            mode="date"
            placeholder={strings.choose}
            format={this.getDateFormat()}
            minDate="01-01-14"
            maxDate={this.getCurrentDate()}
            confirmBtnText={strings.confirm}
            cancelBtnText={strings.cancel}
            onDateChange={date => {
              date = date.split("-");
              let timestamp = null;
              locale === "en_US"
                ? (timestamp = date[0] + "/" + date[1] + "/" + date[2])
                : (timestamp = date[1] + "/" + date[0] + "/" + date[2]);
              timestamp = new Date(timestamp).getTime();
              this.setState({
                newGuitar: { ...this.state.newGuitar, timestamp }
              });
            }}
            customStyles={{
              btnTextConfirm: {
                color: colors.primary
              }
            }}
          />
        </View>
        {/* are the strings coated */}
        <View style={styles.coated}>
          <Text style={styles.text}>{strings.coatedStrings}</Text>
          <Switch
            value={this.state.newGuitar.coated}
            onValueChange={() => this.onSwitchChanged()}
          />
        </View>
        {/* submit button */}
        <View style={styles.submitWrapper}>
          <Animatable.View ref="submit" style={styles.submitAnimationWrapper}>
            <TouchableHighlight
              style={styles.submit}
              onPress={() => {
                this.handleSubmit();
              }}
              underlayColor={colors.evenLessWhite}
            >
              <LinearGradient
                colors={[colors.primary, colors.primary, colors.dark]}
                style={styles.gradient}
              >
                <Text style={styles.btnText}>{strings.submit}</Text>
              </LinearGradient>
            </TouchableHighlight>
          </Animatable.View>
        </View>
        {/* back pressed warning */}
        <Dialog.Container visible={this.state.warningPopup}>
          <Dialog.Title>{strings.warning}</Dialog.Title>
          <Dialog.Description>{strings.unsavedChanges}</Dialog.Description>
          <Dialog.Button
            label={strings.leave}
            onPress={() => {
              this.setState({ warningPopup: false });
              this.props.navigation.navigate("Home");
            }}
            color={colors.primary}
          />
          <Dialog.Button
            label={strings.stayHere}
            onPress={() => {
              this.setState({ warningPopup: false });
            }}
            color={colors.primary}
          />
        </Dialog.Container>
        {/* invalid data toast */}
        <Toast
          ref="toast"
          style={{
            backgroundColor: colors.notQuiteBlack,
            position: "absolute",
            bottom: "10%"
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addGuitar: guitar => {
      dispatch(addGuitar(guitar));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add);
