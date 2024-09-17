import React from 'react';
import HomeScreen from './Screen/Home'; 
import Login from './Screen/Login';
import Register from './Screen/Register';
import Forgot from './Screen/Forgot';
import Cart from './Screen/Cart';
import Profile from './Screen/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabNavigator({ Navigator }) { // Renamed Home to HomeTabNavigator
  return (
    <Tab.Navigator tabBarOptions={{ activeTintColor: 'red' }}>
      <Tab.Screen 
        name="Home" 
        options={{  headerShown: false,  tabBarIcon: ({ color, size }) => (<Icon name="home" color={color} size={size} />)  }} 
        component={HomeScreen} // Use HomeScreen here
      />
      <Tab.Screen name="Cart" options={{ headerShown: false,  tabBarIcon: ({ color, size }) => (<Icon name="cart" color={color} size={size} />)  }} 
        component={Cart} 
      />
      <Tab.Screen  name="Profile"  options={{ headerShown: false,  tabBarIcon: ({ color, size }) => (<Icon name="person" color={color} size={size} />) }} 
        component={Profile} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
    <Stack.Screen name="Register" options={{ headerShown: false }} component={Register} />
    <Stack.Screen name="Forgot" options={{ headerShown: false }} component={Forgot} />
    <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabNavigator} />
</Stack.Navigator>
    </NavigationContainer>
  );
}
