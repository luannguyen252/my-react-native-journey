import React, {
    Component
} from 'react'
import {Dimensions, TouchableWithoutFeedback} from 'react-native';
import {Overlay} from 'react-native-elements'
import {Image as CacheImage} from "react-native-expo-image-cache";


const SCREEN_WIDTH = Dimensions.get('window').width;

export default class AvatarDisplayOverlay extends Component{


    static navigationOptions = {header:null}

    constructor(props){
        super(props);
        this.showAvatarDisplay = this.showAvatarDisplay.bind(this);
        props.onRef(this);
        this.state={
            isVisible:false,
            photoURL:null
        };
    }


    showAvatarDisplay(photoURL){
        this.setState({isVisible:true, photoURL:photoURL})
        console.log(photoURL);
    }

    render() {
        const {isVisible,photoURL} = this.state;
        return (
            <Overlay
                height={SCREEN_WIDTH-80}
                borderRadius={25}
                isVisible={isVisible}
                overlayStyle={{padding:0}}
                onBackdropPress={()=>this.setState({isVisible:false,photoURL:null})}
            >
                <TouchableWithoutFeedback
                    onPress={()=>this.setState({isVisible:false,photoURL:null})}
                >
                    <CacheImage
                        style={{height:SCREEN_WIDTH-80, width:SCREEN_WIDTH-80, borderRadius:25}}
                        uri={photoURL}
                    />
                </TouchableWithoutFeedback>
            </Overlay>
        )
    }
}
