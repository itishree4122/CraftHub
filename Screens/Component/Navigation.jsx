import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomePage from '../HomePage';
import Profile from '../Profile';
import LoginSignup from '../Auth/LoginSignup';
import BottomNavBar from '../Component/BottomNavBar';
import MyProfile from '../MyProfile';
import Categories from '../Categories';
import Search from '../Search';
import ProductList from '../ProductList';
import Product from '../Product';
import Cart from '../Cart';
import Checkout from '../Checkout';
import MyOrders from '../MyOrders';
import Returns from '../Returns';
import Wishlist from '../Wishlist';
import ArtisanProfile from '../ArtisanProfile';
import ArtisanBlog from '../ArtisanBlog';
import OrderSuccess from '../OrderSuccess';
import VideoPlayer from '../VideoPlayer';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const VideosStack = createNativeStackNavigator();



// Videos Stack Navigator
const VideosStackScreen = () => (
  <VideosStack.Navigator screenOptions={{ headerShown: false }}>
    <VideosStack.Screen name="VideosHome" component={VideoPlayer} />
    {/* Add other video-related screens here if needed */}
  </VideosStack.Navigator>
);

const BottomTabs = () => (
  <Tab.Navigator
    tabBar={(props) => <BottomNavBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="home" component={HomePage} />
    <Tab.Screen name="profile" component={Profile} />
    <Tab.Screen name="videos" component={VideosStackScreen} />
    <Tab.Screen name="cart" component={Cart} />
    <Tab.Screen name="categories" component={Categories} />
    
  </Tab.Navigator>
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Main tab navigation */}
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        {/* Screens without bottom navigation */}
        <Stack.Screen name="LoginSignup" component={LoginSignup} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="Returns" component={Returns} />
        <Stack.Screen name="Wishlist" component={Wishlist} />
        <Stack.Screen name="ArtisanProfile" component={ArtisanProfile} />
        <Stack.Screen name="ArtisanBlog" component={ArtisanBlog} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
        {/* Add VideoPlayer as a stack screen for navigation from other screens */}
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
