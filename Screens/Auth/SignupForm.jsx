import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from '../StyleSheet/AppStyles';

const SignupForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpMethod, setOtpMethod] = useState('sms');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleGetOtp = () => {
    console.log('Getting OTP for:', phoneNumber, 'via:', otpMethod);
    // Implement OTP sending logic here
  };

  const handleSignup = () => {
    console.log('Signing up with OTP:', otp);
    console.log('Agreed to terms:', agreeToTerms);
    // Implement signup logic here
  };

  const handleGoogleSignup = () => {
    console.log('Signing up with Google');
    // Implement Google signup logic here
  };

  const openTermsAndConditions = () => {
    // Replace with your actual terms and conditions URL
    Linking.openURL('https://yourwebsite.com/terms-and-conditions');
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

      {/* Terms and Conditions Checkbox */}
      <TouchableOpacity 
        style={AppStyles.termsContainer}
        onPress={() => setAgreeToTerms(!agreeToTerms)}
      >
        <View style={AppStyles.checkbox}>
          {agreeToTerms && <Icon name="check" size={16} color="#a0522d" />}
        </View>
        <Text style={AppStyles.termsText}>
          I agree to the{' '}
          <Text style={AppStyles.termsLink} onPress={openTermsAndConditions}>
            Terms and Conditions
          </Text>
        </Text>
      </TouchableOpacity>
      
      {/* Sign Up Button */}
      <TouchableOpacity 
        style={[
          AppStyles.loginButton, 
          !agreeToTerms && AppStyles.disabledButton
        ]} 
        onPress={handleSignup}
        disabled={!agreeToTerms}
      >
        <Text style={AppStyles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>
      
      {/* Google Sign Up */}
      <TouchableOpacity style={AppStyles.googleButton} onPress={handleGoogleSignup}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} 
          style={AppStyles.googleIcon}
        />
        <Text style={AppStyles.googleButtonText}>SignUp via Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupForm;