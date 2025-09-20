import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import AppStyles from '../StyleSheet/AppStyles';
import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';
import { useNavigation } from '@react-navigation/native';

const LoginSignup = () => {
    const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('login');

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={AppStyles.container}>
      {/* Header with Back Button and App Name */}
      <SafeAreaView edges={['top']} style={AppStyles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
       <View style={AppStyles.loginHeader}>
        
        <TouchableOpacity onPress={handleBack} style={AppStyles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={AppStyles.appName}>Craft Hub</Text>
        <View style={AppStyles.placeholder} /> {/* For alignment */}
      </View>
      </SafeAreaView>
     

      <ScrollView style={AppStyles.loginContent}>
        {/* Login/Sign Up Tabs */}
        <View style={AppStyles.tabContainer}>
          <TouchableOpacity 
            style={[
              AppStyles.tabButton, 
              activeTab === 'login' && AppStyles.activeTabButton
            ]}
            onPress={() => setActiveTab('login')}
          >
            <Text style={[
              AppStyles.tabButtonText,
              activeTab === 'login' && AppStyles.activeTabButtonText
            ]}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              AppStyles.tabButton, 
              activeTab === 'signup' && AppStyles.activeTabButton
            ]}
            onPress={() => setActiveTab('signup')}
          >
            <Text style={[
              AppStyles.tabButtonText,
              activeTab === 'signup' && AppStyles.activeTabButtonText
            ]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Render the appropriate form based on activeTab */}
        {activeTab === 'login' ? <LoginForm /> : <SignupForm />}
      </ScrollView>
    </View>
  );
};

export default LoginSignup;