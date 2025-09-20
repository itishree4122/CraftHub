import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import AppStyles from './StyleSheet/AppStyles';

const Profile = () => {
    const navigation = useNavigation();
  return (
    
      <View style={AppStyles.container}>
        <SafeAreaView edges={['top']} style={AppStyles.safeArea}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Header with back button if needed */}
      <View style={AppStyles.profileHeader}>
        <Text style={AppStyles.profileHeaderTitle}>Profile</Text>
      </View>
      </SafeAreaView>
      
      <ScrollView style={AppStyles.profileContent}>
        {/* Logo and Welcome Section */}
        <View style={AppStyles.logoContainer}>
          <View style={AppStyles.circularLogo}>
            <Text style={AppStyles.logoText}>CH</Text>
          </View>
          <Text style={AppStyles.welcomeText}>Welcome to Craft Hub</Text>
          {/* onPress={() => navigation.navigate('LoginSignup')} */}
          <TouchableOpacity style={AppStyles.SignUpButton} onPress={() => navigation.navigate('LoginSignup')} > 
            <Text style={AppStyles.loginText}>Log in / Sign Up</Text>
            <Icon name="arrow-forward" size={20} color="#a0522d" style={AppStyles.arrowIcon} />
          </TouchableOpacity>
        </View>

        {/* My Orders and Returns Section */}
        <View style={AppStyles.ordersReturnsContainer}>
          <TouchableOpacity style={AppStyles.orderReturnCard} onPress={() => navigation.navigate('MyOrders')}>
            <Icon name="shopping-bag" size={24} color="#a0522d" />
            <Text style={AppStyles.orderReturnText}>My Orders</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={AppStyles.orderReturnCard} onPress={() => navigation.navigate('Returns')}>
            <Icon name="assignment-return" size={24} color="#a0522d" />
            <Text style={AppStyles.orderReturnText}>Returns</Text>
          </TouchableOpacity>
        </View>

        {/* My Account Section */}
        <View style={AppStyles.accountSection}>
          <Text style={AppStyles.sectionTitle}>My Account</Text>
          
          <TouchableOpacity style={AppStyles.accountOption} onPress={() => navigation.navigate('MyProfile')}>
            <Icon name="person" size={24} color="#333" />
            <Text style={AppStyles.optionText}>My Profile</Text>
            <Icon name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>
          
          <TouchableOpacity style={AppStyles.accountOption} onPress={() => navigation.navigate('Wishlist')}>
            <Icon name="favorite" size={24} color="#333" />
            <Text style={AppStyles.optionText}>Wishlist</Text>
            <Icon name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>
          
          <TouchableOpacity style={AppStyles.accountOption}>
            <Icon name="location-on" size={24} color="#333" />
            <Text style={AppStyles.optionText}>Addresses</Text>
            <Icon name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>
          
          <TouchableOpacity style={AppStyles.accountOption}>
            <Icon name="payment" size={24} color="#333" />
            <Text style={AppStyles.optionText}>Payment Methods</Text>
            <Icon name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={AppStyles.accountOption} onPress={() => navigation.navigate('SellerInfo')}>
            <Icon name="storefront" size={24} color="#333" />
            <Text style={AppStyles.optionText}>Become a Seller</Text>
            <Icon name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={AppStyles.accountSection}>
          <Text style={AppStyles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={AppStyles.accountOption}>
            <Icon name="help" size={24} color="#333" />
            <Text style={AppStyles.optionText}>Help Center</Text>
            <Icon name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>
          
          <TouchableOpacity style={AppStyles.accountOption}>
            <Icon name="headset-mic" size={24} color="#333" />
            <Text style={AppStyles.optionText}>Contact Us</Text>
            <Icon name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>
          
          <TouchableOpacity style={AppStyles.accountOption}>
            <Icon name="info" size={24} color="#333" />
            <Text style={AppStyles.optionText}>About Craft Hub</Text>
            <Icon name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
   
    
  );
};

export default Profile;