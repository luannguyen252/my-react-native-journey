/* eslint-disable no-underscore-dangle, no-use-before-define */

import React from 'react';
import {
    View,
    ViewPropTypes,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types'
import {Image as CacheImage} from "react-native-expo-image-cache";

import { Avatar, Day, utils } from 'react-native-gifted-chat';
import Bubble from './SlackBubble';
import {getAvatarPlaceholder} from "../modules/CommonUtility";
import SystemMessage from './SystemMessage';

const { isSameUser, isSameDay } = utils;

export default class Message extends React.Component {

    getInnerComponentProps() {
        const { containerStyle, ...props } = this.props;
        return {
            ...props,
            position: 'left',
            isSameUser,
            isSameDay,
        };
    }

    renderDay() {
        if (this.props.currentMessage.createdAt) {
            const dayProps = this.getInnerComponentProps();
            if (this.props.renderDay) {
                return this.props.renderDay(dayProps);
            }
            return <Day {...dayProps} />;
        }
        return null;
    }

    renderBubble() {
        const bubbleProps = this.getInnerComponentProps();
        if (this.props.renderBubble) {
            return this.props.renderBubble(bubbleProps);
        }
        return <Bubble {...bubbleProps} />;
    }

    renderAvatar() {
        let extraStyle;
        if (
            isSameUser(this.props.currentMessage, this.props.previousMessage)
            && isSameDay(this.props.currentMessage, this.props.previousMessage)
        ) {
            // Set the invisible avatar height to 0, but keep the width, padding, etc.
            extraStyle = { height: 0 };
        }

        const avatarProps = this.getInnerComponentProps();
        return (
            <TouchableOpacity
                onPress={() => avatarProps.onPressAvatar(avatarProps.currentMessage.user._id,avatarProps.navigation)}
            >
                <CacheImage
                    preview={getAvatarPlaceholder}
                    uri={avatarProps.currentMessage.user.avatar}
                    style={styles.slackAvatar}
                />
            </TouchableOpacity>
        );
    }

    renderSystemMessage() {
        const systemMessageProps = this.getInnerComponentProps();
        if (this.props.renderSystemMessage) {
            return this.props.renderSystemMessage(systemMessageProps);
        }
        return <SystemMessage {...systemMessageProps} />;
    }

    render() {
        const marginBottom = isSameUser(this.props.currentMessage, this.props.nextMessage) ? 2 : 10;

        return (
            <View>
                {this.renderDay()}
                {this.props.currentMessage.system ? (
                    this.renderSystemMessage()
                ) : (
                    <View
                        style={[
                            styles.container,
                            { marginBottom },
                            this.props.containerStyle,
                        ]}
                    >
                        {this.renderAvatar()}
                        {this.renderBubble()}
                    </View>
                )}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: 8,
        marginRight: 0,
        marginTop:10,
    },
    slackAvatar: {
        // The bottom should roughly line up with the first line of message text.
        height: 40,
        width: 40,
        borderRadius: 3,
        marginRight:8
    },
});

Message.defaultProps = {
    renderAvatar: undefined,
    renderBubble: null,
    renderDay: null,
    currentMessage: {},
    nextMessage: {},
    previousMessage: {},
    user: {},
    containerStyle: {},
};

Message.propTypes = {
    renderAvatar: PropTypes.func,
    renderBubble: PropTypes.func,
    renderDay: PropTypes.func,
    currentMessage: PropTypes.object,
    nextMessage: PropTypes.object,
    previousMessage: PropTypes.object,
    user: PropTypes.object,
    containerStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
};
