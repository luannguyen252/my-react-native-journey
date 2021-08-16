// Import React Libraries
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
// Import React Native Libraries
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
// Tab Bar Icons
import {
  ic_ban_be_24_active,
  ic_ban_be_24_inactive,
  ic_khac_24_active,
  ic_khac_24_inactive,
  ic_quet_ma_48,
  ic_trang_chu_24_active,
  ic_trang_chu_24_inactive,
  ic_uu_dai_24_active,
  ic_uu_dai_24_inactive,
} from "./src/assets/icons/";
import globalStyles from "./src/assets/styles/globalStyles";
import DetailsScreen from "./src/screens/DetailsScreen";
import FifthScreen from "./src/screens/FifthScreen";
// Screens
import FirstScreen from "./src/screens/FirstScreen";
import FourthScreen from "./src/screens/FourthScreen";
import SecondScreen from "./src/screens/SecondScreen";
import ThirdScreen from "./src/screens/ThirdScreen";

// BEGIN: Active and Inactive Color
const activeColor: string = "#EE0033";
const inactiveColor: string = "#A7A7A7";
// END: Active and Inactive Color

// BEGIN: Navigation Bottom Tab
const Tab = createBottomTabNavigator();

// BEGIN: Tạo một nút di chuyển giữa các màn hình
function GoToButton({ screenName }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate(screenName)}
      style={{ paddingLeft: 16 }}
    >
      <Text
        style={[
          globalStyles.bodyText,
          {
            color: "#FFFFFF",
          },
        ]}
      >
        ← Back to {screenName}
      </Text>
    </TouchableOpacity>
  );
}
// END: Tạo một nút di chuyển giữa các màn hình

// BEGIN: Tab Bar Icon Styles
function TabBarIcon({ name, focused, navigation }) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  // BEGIN: Tạo một hiệu ứng khi focused là true, cách này chỉ cho phép hiệu ứng chạy khi người dùng thực sự bấm vào tab
  React.useEffect(() => {
    if (focused) {
      const unsubscribe = navigation?.addListener("tabPress", () => {
        // chỉ sự kiện tabPress mới kích hoạt animation
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      });
      return unsubscribe;
    }
  }, [navigation]);
  // END: Tạo một hiệu ứng khi focused là true

  // BEGIN: Tạo một hiệu ứng khi focused là true, cách này đơn giản hơn, tuy nhiên animation sẽ chạy mỗi khi TabBarIcon được gọi lại, TabBarIcon nó render 2 cái inactive và active riêng biệt cho cùng 1 tab
  // React.useEffect(() => {
  //   if (focused) {
  //     Animated.sequence([
  //       Animated.timing(scaleAnim, {
  //         toValue: 1.2,
  //         duration: 100,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(scaleAnim, {
  //         toValue: 1,
  //         duration: 200,
  //         useNativeDriver: true,
  //       }),
  //     ]).start();
  //   }
  // });
  // END: Tạo một hiệu ứng khi focused là true, cách này đơn giản hơn, tuy nhiên animation sẽ chạy mỗi khi TabBarIcon được gọi lại, TabBarIcon nó render 2 cái inactive và active riêng biệt cho cùng 1 tab

  return (
    <Animated.Image
      style={{
        width: 24,
        height: 24,
        resizeMode: "contain",
        transform: [{ scale: scaleAnim }],
      }}
      source={name}
    />
  );
}
// END: Tab Bar Icon Styles

// BEGIN: Scan QR Icon Styles
function ScanQRIcon() {
  return (
    <Image
      style={{ width: 64, height: 64, resizeMode: "contain", marginTop: 8 }}
      source={ic_quet_ma_48}
    />
  );
}
// END: Scan QR Icon Styles

// BEGIN: Setup Tab Bar Items
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "First") {
            return (
              <TabBarIcon
                name={
                  focused ? ic_trang_chu_24_active : ic_trang_chu_24_inactive
                }
                focused={focused}
                navigation={navigation}
              />
            );
          } else if (route.name === "Second") {
            return (
              <TabBarIcon
                name={focused ? ic_uu_dai_24_active : ic_uu_dai_24_inactive}
                focused={focused}
                navigation={navigation}
              />
            );
          } else if (route.name === "Third") {
            return <ScanQRIcon />;
          } else if (route.name === "Fourth") {
            return (
              <TabBarIcon
                name={focused ? ic_ban_be_24_active : ic_ban_be_24_inactive}
                focused={focused}
                navigation={navigation}
              />
            );
          } else if (route.name === "Fifth") {
            return (
              <TabBarIcon
                name={focused ? ic_khac_24_active : ic_khac_24_inactive}
                focused={focused}
                navigation={navigation}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        showLabel: false, // Hide Tab Bar Label
        activeTintColor: activeColor, // Active Color Text for Tab Bar Items
        inactiveTintColor: inactiveColor, // Inactive Color Text for Tab Bar Items
        style: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 5,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          position: "absolute",
          zIndex: 1,
        },
      }}
    >
      <Tab.Screen name="First" component={FirstStackScreen} />
      <Tab.Screen name="Second" component={SecondScreen} />
      <Tab.Screen
        name="Third"
        component={ThirdStackScreen}
        options={{
          tabBarVisible: false,
        }}
      />
      <Tab.Screen name="Fourth" component={FourthScreen} />
      <Tab.Screen name="Fifth" component={FifthScreen} />
    </Tab.Navigator>
  );
}
// END: Setup Tab Bar Items
// END: Navigation Bottom Tab

// BEGIN: Navigation Stack
const Stack = createStackNavigator();

const FirstStack = createStackNavigator();
const FirstStackScreen = () => (
  <FirstStack.Navigator>
    <FirstStack.Screen
      name="First"
      component={FirstScreen}
      options={{
        headerShown: false,
      }}
    />
  </FirstStack.Navigator>
);

const ThirdStack = createStackNavigator();
const ThirdStackScreen = () => (
  <ThirdStack.Navigator>
    <ThirdStack.Screen
      name="Third"
      component={ThirdScreen}
      options={{
        headerTitle: () => null,
        headerLeft: () => <GoToButton screenName="First" />,
        headerRight: () => null,
        headerShown: true,
        headerStyle: {},
        headerTransparent: true,
      }}
    />
  </ThirdStack.Navigator>
);
// END: Navigation Stack

// BEGIN: App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="First"
          component={MyTabs}
          options={{
            headerShown: false /* Hide All Navigation Bar On Tab Bar Items */,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerTitleStyle: {
              fontSize: 18,
              lineHeight: 24,
              fontWeight: "600",
            },
            headerStyle: false,
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// END: App

// BEGIN: Navigation Styles
const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
  },
});
// END: Navigation Styles
