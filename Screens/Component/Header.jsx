import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient'; // Import gradient
import AppStyles from '../StyleSheet/AppStyles';
import { useSafeAreaInsets } from "react-native-safe-area-context";


const Header = ({ userAddress, onSearch, onAddressPress }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  return (
    <LinearGradient
      colors={['#D18F71', '#8B4513']} // Gradient shades (you can tweak)
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[AppStyles.headerContainer, { paddingTop: insets.top }]} // keep your container styles
    >
      {/* User Address */}
      <TouchableOpacity onPress={onAddressPress} style={AppStyles.addressContainer}>
        <Icon name="location-on" size={18} color="#fff" />
        <Text style={[AppStyles.addressText, { color: '#fff' }]} numberOfLines={1}>
          {userAddress || 'Select your address'}
        </Text>
        <Icon name="keyboard-arrow-down" size={18} color="#fff" />
      </TouchableOpacity>

      {/* Search Field */}
      <TouchableOpacity
        style={[AppStyles.searchContainer, { backgroundColor: 'rgba(255,255,255,0.15)' }]}
        onPress={handleSearchPress}
        activeOpacity={0.7}
      >
        <Icon name="search" size={20} style={[AppStyles.searchIcon, { color: '#fff' }]} />
        <Text style={[AppStyles.searchInput, { color: '#ddd' }]}>
          Search for products...
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Header;
