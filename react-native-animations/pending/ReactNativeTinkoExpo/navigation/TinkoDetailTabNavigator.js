import {TabNavigator} from "react-navigation";
import TinkoDetailScreen from "../screens/main/tinko/TinkoDetailScreen";
import TinkoDetailChatScreen from '../screens/main/tinko/TinkoDetailChatScreen'

export default TinkoDetailTabNavigator = TabNavigator(
    {
        TinkoDetail: {
            screen: TinkoDetailScreen,
        },
        TinkoDetailChat: {
            screen: TinkoDetailChatScreen,
        },

    },
    {

        //tabBarOptions:{style:{height:0, bottom:-30}, showLabel:false, },
        tabBarComponent: () => null,
        //tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
        headerMode: 'none',
        headerVisible: false,
        lazy:false,
        backBehavior:'none'
    }
);