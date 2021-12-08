/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import { AuthContext, AuthContextProvider } from '../contexts/auth';
import useColorScheme from '../hooks/useColorScheme';
import Home from '../screens/Home';
import ModalScreen from '../screens/LoginModal';
import ModalSignUp from '../screens/ModalSignUp';
import NotFoundScreen from '../screens/NotFoundScreen';
import WishList from '../screens/WishList';
import WishListElse from '../screens/WishListElse';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import CardSearchScreen from '../screens/CardSearchScreen';
import { Icon } from 'react-native-elements';



export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthContextProvider>
        <RootNavigator />
      </AuthContextProvider>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() { // handles normal button links within app
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="ModalSignUp" component={ModalSignUp} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() { // handles only the tab links
  const colorScheme = useColorScheme();

  const { userData } = React.useContext(AuthContext)

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>

      <BottomTab.Screen
        name="CardSearch"
        component={CardSearchScreen}
        options={({ navigation }: RootTabScreenProps<'CardSearch'>) => ({
          title: `User: ${userData.email}`,
          tabBarIcon: ({ color }) => <Icon tvParallaxProperties name='search' type='material' size={30} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />

      <BottomTab.Screen
        name="TabThree"
        component={WishList}
        options={{
          title: "WishList",
          tabBarIcon: ({ color }) => <Icon tvParallaxProperties name='list' type='material' size={35} />,
        }}
      />

      <BottomTab.Screen
        name="TabTwo"
        component={WishList}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Icon tvParallaxProperties name='settings' type='material' size={30} />,
        }}
      />


    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
