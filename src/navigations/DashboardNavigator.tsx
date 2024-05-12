import Home from "../screens/Home";
import Scanner from "../screens/Scanner";
import Profile from "../screens/Profile";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AppQRIconButton from "../components/AppQRIconButton";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends DashboardStackParamList {}
  }
}

type DashboardStackParamList = {
  Home: undefined;
  Scanner: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<DashboardStackParamList>();

const screenOptions = (props: {
  route: RouteProp<DashboardStackParamList>;
  navigation: any;
}): BottomTabNavigationOptions => {
  const route = props.route.name;

  const tabBarIcon = ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }): React.ReactNode => {
    switch (route) {
      case "Home": {
        return (
          <Ionicons
            color={color}
            size={size}
            name={focused ? "home" : "home-outline"}
          />
        );
      }
      case "Scanner": {
        return <AppQRIconButton color={color} size={size} focused={focused} />;
      }
      case "Profile": {
        return (
          <Ionicons
            color={color}
            size={size}
            name={focused ? "person" : "person-outline"}
          />
        );
      }
      default: {
        return;
      }
    }
  };

  return {
    headerShown: false,
    tabBarStyle: {
      height: 84,
      position: "absolute",
      bottom: 10,
      margin: 32,
      borderRadius: 24,
      shadowOffset: {
        width: 0,
        height: 4, // Increase the shadow offset for a more intense effect
      },
      shadowOpacity: 0.5, // Increase the shadow opacity for a more intense effect
      shadowRadius: 8, // Increase the shadow radius for a more intense effect
      elevation: 10, // Add elevation for shadow effect
    },
    tabBarLabelStyle: {
      fontSize: 14,
      fontWeight: "bold",
    },
    tabBarIcon,
  };
};

const DashboardNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        options={{ tabBarLabelStyle: { display: "none" } }}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default DashboardNavigator;
