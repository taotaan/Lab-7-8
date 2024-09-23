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

function HomeTabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarStyle: [{ display: 'flex' }, null] // แนะนำให้ใช้ตัวเลือกการตั้งค่าใหม่ที่นี่
      }}
    >
      <Tab.Screen 
        name="Homeja" 
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<Icon name="home" color={color} size={size} />)
        }} 
      />
      <Tab.Screen 
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<Icon name="cart" color={color} size={size} />)
        }} 
      />
      <Tab.Screen  
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<Icon name="person" color={color} size={size} />)
        }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}