import PropTypes from "prop-types"
import React, { PureComponent } from "react"
import { Dimensions, Keyboard, ScrollView, StyleSheet } from "react-native"

const { width, height } = Dimensions.get("window")

class KeyboardAdaptableView extends PureComponent {
  heights = {}

  constructor(props) {
    super(props)

    this.state = {
      paddingBottom: 0
    }
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    )
  }

  keyboardDidShow = e => {
    const { extraHeight = 15 } = this.props
    this.setState({
      paddingBottom: e.endCoordinates.height + extraHeight
    })
  }

  keyboardDidHide = () => {
    this.setState({ paddingBottom: 0 })
  }

  handleDismissKeyboard = () => {
    Keyboard.dismiss()
  }

  handleOnFocus = (ref, event) => {
    const height = this.heights[ref]
    if (height != null) {
      setTimeout(() => {
        this.scrollView.scrollTo({
          y: height - 100,
          animated: true
        })
      }, 100)
    }
  }

  recursiveMap = (children, fn) => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return child
      }

      if (child.props.children) {
        child = React.cloneElement(child, {
          children: this.recursiveMap(child.props.children, fn)
        })
      }

      return fn(child)
    })
  }

  updateChildren = () => {
    const { children } = this.props
    let index = 0

    const fn = child => {
      if (child != null && child.props != null && child.props.adaptKeyboard) {
        index++
        if (child.type && child.type.displayName == "TextInput") {
          return React.cloneElement(child, {
            onFocus: event => this.handleOnFocus(`adjust_${index}`, event),
            ref: r => {
              this[`adjust_${index}`] = r
            },
            onLayout: ({
              nativeEvent: {
                layout: { x, y, width, height }
              }
            }) => {
              setTimeout(() => {
                this.heights[`adjust_${index}`] = y
              }, 200)
            }
          })
        } else {
          return React.cloneElement(child, {
            onFocus: event => this.handleOnFocus(`adjust_${index}`, event),
            forwardedRef: r => {
              this[`adjust_${index}`] = r
            },
            onLayout: ({
              nativeEvent: {
                layout: { x, y, width, height }
              }
            }) => {
              setTimeout(() => {
                this.heights[`adjust_${index}`] = y
              }, 200)
            }
          })
        }
      }
      return child
    }

    return this.recursiveMap(children, fn)
  }

  definePaddingBottom = () => {
    const { contentContainerStyle } = this.props
    const { paddingBottom } = this.state
    let bottom = paddingBottom

    if (contentContainerStyle.paddingBottom) {
      bottom += contentContainerStyle.paddingBottom
    } else {
      if (contentContainerStyle.padding) {
        bottom += contentContainerStyle.padding
      }
    }

    return {
      ...contentContainerStyle,
      ...styles.content,
      ...{ paddingBottom: bottom }
    }
  }

  render() {
    const { style, keyboardShouldPersistTaps, keyboardDismissMode } = this.props
    return (
      <ScrollView
        ref={r => {
          this.scrollView = r
        }}
        {...this.props}
        style={{ ...styles.container, ...style }}
        contentContainerStyle={this.definePaddingBottom()}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps || "always"}
        keyboardDismissMode={keyboardDismissMode || "none"}
      >
        {this.updateChildren()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: { width, height },
  content: { flexGrow: 1 }
})

KeyboardAdaptableView.propTypes = {
  extraHeight: PropTypes.number
}

export default KeyboardAdaptableView
