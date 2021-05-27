import * as React from "react";
import { FontAwesome as Icon } from "@expo/vector-icons";

export default class GithubButton extends React.PureComponent {
  render() {
    return (
      <Icon.Button
        name="github"
        color="black"
        backgroundColor="transparent"
        onPress={this.props.onPress}
      >
        Sign In with Github
      </Icon.Button>
    );
  }
}
