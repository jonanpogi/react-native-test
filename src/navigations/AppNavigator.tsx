import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardNavigator from "./DashboardNavigator";
import Initial from "../screens/Initial";
import CreateProfile from "../screens/CreateProfile";
import ViewProfileImage from "../screens/ViewProfileImage";
import UpdateProfileName from "../screens/UpdateProfileName";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}

export type AppStackParamList = {
  Initial: undefined;
  CreateProfile: undefined;
  Dashboard: undefined;
  ViewProfileImage: { uri: string };
  UpdateProfileName: { firstName: string; lastName: string };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ header: () => undefined }}>
      <Stack.Screen name="Initial" component={Initial} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="Dashboard" component={DashboardNavigator} />
      <Stack.Screen name="ViewProfileImage" component={ViewProfileImage} />
      <Stack.Screen name="UpdateProfileName" component={UpdateProfileName} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
