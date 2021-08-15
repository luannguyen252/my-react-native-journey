[Swipe Cards for React Native](https://github.com/meteor-factory/react-native-tinder-swipe-cards)

`cards*` - Array Data that will be provided as props for the cards
`renderCard*` - Function Renders the card with the current data
`loop` - Boolean If true, start again when run out of cards false
`onLoop` - Function Called when card list returns to the beginning
`renderNoMoreCards` - Function Renders what is shown after swiped last card
`showYup` - Boolean Shows the 'Yup' component true
`showNope` - Boolean Shows the 'Nope' true
`showMaybe` - Boolean Shows the 'Maybe' true
`hasMaybeAction` - Boolean Includes the possibility to swipe up and its components false
`renderYup` - Function Renders Yup
`renderNope` - Function Renders Nope
`renderMaybe` - Function Renders Maybe
`handleYup` - Function Called when card is 'passed' with that card's data
`handleNope` - Function Called when card is 'rejected' with that card's data
`containerStyle` - style Override default style
`yupStyle` - style Override default style
`yupTextStyle` - style Override default style
`nopeStyle` - style Override default style
`nopeTextStyle` - style Override default style
`maybeStyle` - style Override default style
`maybeTextStyle` - style Override default style
`yupView` - element React component to render on a Yes vote
`yupText` - string Text to render on Yes vote Yep
`noView` - element React component to render on a No vote
`noText` - string Text to render on No vote Nope
`maybeView` - element React component to render on a Maybe vote
`maybeText` - string Text to render on Maybe vote Maybe
`smoothTransition` - Boolean Disables a slow transition fading the current card out false
`cardKey` - String React key to be used to for each card
`dragY` - Boolean Allows dragging cards vertically true
`stack` - Boolean Enables the stack mode false
`stackOffsetX` - Number Horizontal offset between cards in stack 25
`stackOffsetY` - Number Vertical offset between cards in stack 0
`cardRemoved` - Function A callback passing the card reference that just got removed
`onClickHandler` - Function A callback clicking the card alert('tap')
