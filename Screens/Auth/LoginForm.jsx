import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from '../StyleSheet/AppStyles';

const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpMethod, setOtpMethod] = useState('sms');

  const handleGetOtp = () => {
    console.log('Getting OTP for:', phoneNumber, 'via:', otpMethod);
    // Implement OTP sending logic here
  };

  const handleLogin = () => {
    console.log('Logging in with OTP:', otp);
    // Implement login logic here
  };

  const handleGoogleLogin = () => {
    console.log('Logging in with Google');
    // Implement Google login logic here
  };

  return (
    <View style={AppStyles.formContainer}>
      <Text style={AppStyles.label}>Enter Mobile Number</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter your mobile number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      
      <Text style={AppStyles.label}>Enter OTP</Text>
      
      {/* OTP Method Selection */}
      <View style={AppStyles.otpMethodContainer}>
        <TouchableOpacity 
          style={AppStyles.radioOption}
          onPress={() => setOtpMethod('sms')}
        >
          <View style={AppStyles.radioCircle}>
            {otpMethod === 'sms' && <View style={AppStyles.radioChecked} />}
          </View>
          <Icon name="sms" size={20} color="#a0522d" style={AppStyles.optionIcon} />
          <Text style={AppStyles.radioLabel}> SMS</Text>
          
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={AppStyles.radioOption}
          onPress={() => setOtpMethod('whatsapp')}
        >
          <View style={AppStyles.radioCircle}>
            {otpMethod === 'whatsapp' && <View style={AppStyles.radioChecked} />}
          </View>
          <Icon name="whatsapp" size={20} color="#25D366" style={AppStyles.optionIcon} />
          <Text style={AppStyles.radioLabel}> WhatsApp</Text>
          
        </TouchableOpacity>
      </View>
      
      {/* OTP Input */}
      <View style={AppStyles.otpContainer}>
        <TextInput
          style={AppStyles.otpInput}
          placeholder="Enter OTP"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
        />
        <TouchableOpacity style={AppStyles.getOtpButton} onPress={handleGetOtp}>
          <Text style={AppStyles.getOtpText}>Get OTP</Text>
        </TouchableOpacity>
      </View>
      
      {/* Login Button */}
      <TouchableOpacity style={AppStyles.loginButton} onPress={handleLogin}>
        <Text style={AppStyles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      
      {/* Google Login */}
      <TouchableOpacity style={AppStyles.googleButton} onPress={handleGoogleLogin}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} 
          style={AppStyles.googleIcon}
        />
        <Text style={AppStyles.googleButtonText}>Login via Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;