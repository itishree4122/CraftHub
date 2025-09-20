import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const SellerInfo = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shop Information
    shopName: '',
    ownerName: '',
    mobile: '',
    email: '',
    experience: '',
    address: '',
    state: '',
    
    // Shop Schedule
    openingTime: '',
    closingTime: '',
    workingDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    
    // Policies
    aboutShop: '',
    shippingPolicies: '',
    returnRefundPolicies: '',
    
    // Media
    profilePicture: null,
    coverPhoto: null,
    
    // Product Information
    products: [{
      category: '',
      name: '',
      price: '',
      description: '',
      makingProcess: '',
      materialsUsed: '',
      photos: [] // Added photos array for each product
    }]
  });

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePickerType, setTimePickerType] = useState(''); // 'opening' or 'closing'
  const [imagePreview, setImagePreview] = useState({ profile: null, cover: null });

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWorkingDaysChange = (day) => {
    setFormData(prev => ({
      ...prev,
      workingDays: {
        ...prev.workingDays,
        [day]: !prev.workingDays[day]
      }
    }));
  };

  const handleProductChange = (index, name, value) => {
    const products = [...formData.products];
    products[index][name] = value;
    setFormData(prev => ({
      ...prev,
      products
    }));
  };

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, {
        category: '',
        name: '',
        price: '',
        description: '',
        makingProcess: '',
        materialsUsed: '',
        photos: []
      }]
    }));
  };

  const removeProduct = (index) => {
    const products = [...formData.products];
    products.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      products
    }));
  };

  const handleProductPhotoUpload = (productIndex) => {
    // In a real app, this would open the image picker
    // For demo purposes, we'll just set a placeholder
    const imageUri = 'https://via.placeholder.com/300';
    const products = [...formData.products];
    products[productIndex].photos.push(imageUri);
    setFormData(prev => ({
      ...prev,
      products
    }));
  };

  const removeProductPhoto = (productIndex, photoIndex) => {
    const products = [...formData.products];
    products[productIndex].photos.splice(photoIndex, 1);
    setFormData(prev => ({
      ...prev,
      products
    }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    alert('Seller information submitted successfully!');
    console.log('Form data:', formData);
  };

  const openTimePicker = (type) => {
    setTimePickerType(type);
    setShowTimePicker(true);
  };

  const selectTime = (hours, minutes) => {
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    if (timePickerType === 'opening') {
      handleInputChange('openingTime', timeString);
    } else {
      handleInputChange('closingTime', timeString);
    }
    
    setShowTimePicker(false);
  };

  const handleImageSelect = (type) => {
    // In a real app, this would open the image picker
    // For demo purposes, we'll just set a placeholder
    const imageUri = 'https://via.placeholder.com/300';
    if (type === 'profile') {
      setImagePreview({ ...imagePreview, profile: imageUri });
      handleInputChange('profilePicture', imageUri);
    } else {
      setImagePreview({ ...imagePreview, cover: imageUri });
      handleInputChange('coverPhoto', imageUri);
    }
  };

  const renderTimePicker = () => {
    return (
      <Modal
        visible={showTimePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTimePicker(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowTimePicker(false)}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <TouchableWithoutFeedback>
              <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 20, width: '85%', elevation: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16, textAlign: 'center', color: '#2c3e50' }}>
                  Select {timePickerType === 'opening' ? 'Opening' : 'Closing'} Time
                </Text>
                
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 }}>
                  {[9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(hour => (
                    <TouchableOpacity 
                      key={hour}
                      style={{ 
                        width: '30%', 
                        padding: 12, 
                        backgroundColor: '#f8f9fa', 
                        borderRadius: 8, 
                        marginBottom: 10,
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#e9ecef'
                      }}
                      onPress={() => selectTime(hour, 0)}
                    >
                      <Text style={{ color: '#495057', fontWeight: '500' }}>{hour}:00</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                
                <TouchableOpacity 
                  style={{ padding: 14, backgroundColor: '#e9ecef', borderRadius: 10 }}
                  onPress={() => setShowTimePicker(false)}
                >
                  <Text style={{ color: '#6c757d', textAlign: 'center', fontWeight: '600' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  // Enhanced Styles
  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    safeArea: {
      flex: 0,
      backgroundColor: '#fff',
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      backgroundColor: '#fff',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    profileHeaderTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2c3e50',
    },
    headerSpacer: {
      width: 24,
    },
    profileContent: {
      flex: 1,
    },
    accountSection: {
      padding: 20,
    },
    formContainer: {
      marginBottom: 24,
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    labelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    inputLabel: {
      marginLeft: 10,
      fontSize: 16,
      color: '#2c3e50',
      fontWeight: '600',
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#e9ecef',
      borderRadius: 10,
      padding: 14,
      fontSize: 16,
      backgroundColor: '#f8f9fa',
      color: '#495057',
    },
    passwordContainer: {
      borderWidth: 1,
      borderColor: '#e9ecef',
      borderRadius: 10,
      padding: 14,
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
    },
    signupButton: {
      backgroundColor: '#a0522d',
      padding: 16,
      borderRadius: 10,
      alignItems: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    signupButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    stepIndicator: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 20,
      paddingHorizontal: 20,
    },
    step: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#dee2e6',
      marginHorizontal: 6,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 1,
    },
    activeStep: {
      backgroundColor: '#a0522d',
    },
    stepText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    inactiveStepText: {
      color: '#6c757d',
      fontWeight: 'bold',
    },
    stepLine: {
      height: 2,
      backgroundColor: '#dee2e6',
      flex: 1,
      marginHorizontal: 4,
      alignSelf: 'center',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      backgroundColor: '#f8f9fa',
      padding: 10,
      borderRadius: 8,
    },
    productSection: {
      borderWidth: 1,
      borderColor: '#e9ecef',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      backgroundColor: '#fff',
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    removeButton: {
      backgroundColor: '#fff5f5',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 12,
      borderWidth: 1,
      borderColor: '#fed7d7',
    },
    removeButtonText: {
      color: '#e53e3e',
      fontWeight: '600',
    },
    addButton: {
      backgroundColor: '#faece0',
      padding: 16,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#c27d5e',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    addButtonText: {
      color: '#a0522d',
      fontWeight: '600',
      marginLeft: 8,
    },
    imageUploadContainer: {
      borderWidth: 1,
      borderColor: '#e9ecef',
      borderRadius: 12,
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      height: 150,
    },
    imagePreview: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    timeDisplay: {
      color: '#495057',
      fontSize: 16,
    },
    placeholderText: {
      color: '#6c757d',
      fontSize: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: 16,
      paddingBottom: 8,
      borderBottomWidth: 2,
      borderBottomColor: '#a0522d',
    },
    dayText: {
      color: '#495057',
      marginLeft: 10,
      fontWeight: '500',
    },
    productPhotoContainer: {
      marginTop: 16,
    },
    photoUploadButton: {
      backgroundColor: '#faece0',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#c27d5e',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    photoUploadButtonText: {
      color: '#a0522d',
      fontWeight: '600',
      marginLeft: 8,
    },
    photoList: {
      marginTop: 12,
    },
    photoItem: {
      position: 'relative',
      marginRight: 12,
      marginBottom: 12,
    },
    productPhoto: {
      width: 100,
      height: 100,
      borderRadius: 8,
    },
    removePhotoButton: {
      position: 'absolute',
      top: -8,
      right: -8,
      backgroundColor: '#e53e3e',
      borderRadius: 12,
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  const StepIndicator = () => {
    const steps = ['Shop', 'Schedule', 'Policies', 'Media', 'Products'];
    
    return (
      <View style={styles.stepIndicator}>
        {steps.map((label, i) => (
          <View key={i} style={{ alignItems: 'center', flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {i > 0 && <View style={styles.stepLine} />}
              <View style={[styles.step, step > i && styles.activeStep]}>
                <Text style={step > i ? styles.stepText : styles.inactiveStepText}>
                  {i + 1}
                </Text>
              </View>
              {i < steps.length - 1 && <View style={styles.stepLine} />}
            </View>
            <Text style={{ 
              fontSize: 12, 
              marginTop: 6, 
              color: step > i ? '#a0522d' : '#6c757d',
              fontWeight: step > i ? '600' : '400'
            }}>
              {label}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const ProductPhotoUpload = ({ productIndex, photos }) => {
    return (
      <View style={styles.productPhotoContainer}>
        <Text style={[styles.inputLabel, { marginBottom: 12 }]}>Product Photos</Text>
        
        <TouchableOpacity 
          style={styles.photoUploadButton}
          onPress={() => handleProductPhotoUpload(productIndex)}
        >
          <Icon name="add-a-photo" size={20} color="#a0522d" />
          <Text style={styles.photoUploadButtonText}>Add Photos</Text>
        </TouchableOpacity>
        
        {photos.length > 0 && (
          <FlatList
            data={photos}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.photoItem}>
                <Image source={{ uri: item }} style={styles.productPhoto} />
                <TouchableOpacity 
                  style={styles.removePhotoButton}
                  onPress={() => removeProductPhoto(productIndex, index)}
                >
                  <Icon name="close" size={16} color="white" />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={styles.photoList}
          />
        )}
        
        <Text style={{ fontSize: 12, color: '#6c757d', marginTop: 8 }}>
          Upload high-quality photos of your product from different angles
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top','bottom']} style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={step > 1 ? prevStep : () => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.profileHeaderTitle}>
            {step === 1 && 'Shop Information'}
            {step === 2 && 'Shop Schedule'}
            {step === 3 && 'Shop Policies'}
            {step === 4 && 'Shop Media'}
            {step === 5 && 'Product Information'}
          </Text>
          <View style={styles.headerSpacer} />
        </View>
      </SafeAreaView>

      <StepIndicator />
      
      <ScrollView style={styles.profileContent}>
        <View style={styles.accountSection}>
          {step === 1 && (
            <>
              <Text style={styles.sectionTitle}>Shop Details</Text>
              
              {/* Shop Name */}
              <View style={styles.formContainer}>
                <View style={styles.labelContainer}>
                  <Icon name="store" size={20} color="#a0522d" />
                  <Text style={styles.inputLabel}>Shop Name</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  value={formData.shopName}
                  onChangeText={(text) => handleInputChange('shopName', text)}
                  placeholder="Enter your shop name"
                  placeholderTextColor="#6c757d"
                />
              </View>

              {/* Owner Name */}
              <View style={styles.formContainer}>
                <View style={styles.labelContainer}>
                  <Icon name="person" size={20} color="#a0522d" />
                  <Text style={styles.inputLabel}>Owner Name</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  value={formData.ownerName}
                  onChangeText={(text) => handleInputChange('ownerName', text)}
                  placeholder="Enter owner's full name"
                  placeholderTextColor="#6c757d"
                />
              </View>

              {/* Contact Information */}
              <View style={styles.formContainer}>
                <View style={styles.labelContainer}>
                  <Icon name="contact-phone" size={20} color="#a0522d" />
                  <Text style={styles.inputLabel}>Contact Information</Text>
                </View>
                
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ marginBottom: 8, color: '#495057', fontWeight: '500' }}>Mobile Number</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.mobile}
                    onChangeText={(text) => handleInputChange('mobile', text)}
                    placeholder="Enter mobile number"
                    placeholderTextColor="#6c757d"
                    keyboardType="phone-pad"
                  />
                </View>
                
                <View>
                  <Text style={{ marginBottom: 8, color: '#495057', fontWeight: '500' }}>Email Address</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    placeholder="Enter email address"
                    placeholderTextColor="#6c757d"
                    keyboardType="email-address"
                  />
                </View>
              </View>

              {/* Experience */}
              <View style={styles.formContainer}>
                <View style={styles.labelContainer}>
                  <Icon name="work" size={20} color="#a0522d" />
                  <Text style={styles.inputLabel}>Business Experience</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  value={formData.experience}
                  onChangeText={(text) => handleInputChange('experience', text)}
                  placeholder="Years of experience"
                  placeholderTextColor="#6c757d"
                    keyboardType="numeric"
                />
              </View>

              {/* Location */}
              <View style={styles.formContainer}>
                <View style={styles.labelContainer}>
                  <Icon name="location-on" size={20} color="#a0522d" />
                  <Text style={styles.inputLabel}>Business Location</Text>
                </View>
                
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ marginBottom: 8, color: '#495057', fontWeight: '500' }}>Full Address</Text>
                  <TextInput
                    style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                    value={formData.address}
                    onChangeText={(text) => handleInputChange('address', text)}
                    placeholder="Enter your shop address"
                    placeholderTextColor="#6c757d"
                    multiline
                  />
                </View>
                
                <View>
                  <Text style={{ marginBottom: 8, color: '#495057', fontWeight: '500' }}>State</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.state}
                    onChangeText={(text) => handleInputChange('state', text)}
                    placeholder="Enter your state"
                    placeholderTextColor="#6c757d"
                  />
                </View>
              </View>
            </>
          )}

          {step === 2 && (
            <>
              <Text style={styles.sectionTitle}>Business Hours</Text>
              
              {/* Opening Time */}
              <View style={styles.formContainer}>
                <View style={styles.labelContainer}>
                  <Icon name="access-time" size={20} color="#a0522d" />
                  <Text style={styles.inputLabel}>Opening Time</Text>
                </View>
                <TouchableOpacity 
                  style={styles.passwordContainer}
                  onPress={() => openTimePicker('opening')}
                >
                  <Text style={formData.openingTime ? styles.timeDisplay : styles.placeholderText}>
                    {formData.openingTime || 'Select opening time'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Closing Time */}
              <View style={styles.formContainer}>
                <View style={styles.labelContainer}>
                  <Icon name="access-time" size={20} color="#a0522d" />
                  <Text style={styles.inputLabel}>Closing Time</Text>
                </View>
                <TouchableOpacity 
                  style={styles.passwordContainer}
                  onPress={() => openTimePicker('closing')}
                >
                  <Text style={formData.closingTime ? styles.timeDisplay : styles.placeholderText}>
                    {formData.closingTime || 'Select closing time'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Working Days */}
              <View style={styles.formContainer}>
                <View style={styles.labelContainer}>
                  <Icon name="event" size={20} color="#a0522d" />
                  <Text style={styles.inputLabel}>Working Days</Text>
                </View>
                {Object.keys(formData.workingDays).map(day => (
                  <View key={day} style={styles.checkboxContainer}>
                    <TouchableOpacity
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 4,
                        borderWidth: 2,
                        borderColor: formData.workingDays[day] ? '#a0522d' : '#ced4da',
                        backgroundColor: formData.workingDays[day] ? '#a0522d' : 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      onPress={() => handleWorkingDaysChange(day)}
                    >
                      {formData.workingDays[day] && (
                        <Icon name="check" size={18} color="white" />
                      )}
                    </TouchableOpacity>
                    <Text style={styles.dayText}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {step === 3 && (
            <>
              <Text style={styles.sectionTitle}>Business Policies</Text>
              
              {/* About Shop */}
              <View style={styles.formContainer}>
                <View style={styles.labelContainer}>
                  <Icon name="info" size={20} color="#a0522d" />
                  <Text style={styles.inputLabel}>About Your Shop</Text>
                </View>
                <TextInput
                  style={[styles.textInput, { height: 120, textAlignVertical: 'top' }]}
                  value={formData.aboutShop}
                  onChangeText={(text) => handleInputChange('aboutShop', text)}
                  placeholder="Tell customers about your shop, your story, and what makes you unique"
                  placeholderTextColor="#6c757d"
                  multiline
                />
              </View>

              {/* Shipping Policies */}
              <View style={styles.formContainer}>
                <View style={styles.labelContainer}>
                  <Icon name="local-shipping" size={20} color="#a0522d" />
                  <Text style={styles.inputLabel}>Shipping Policies</Text>
                </View>
                <TextInput
                  style={[styles.textInput, { height: 120, textAlignVertical: 'top' }]}
                  value={formData.shippingPolicies}
                  onChangeText={(text) => handleInputChange('shippingPolicies', text)}
                  placeholder="Describe your shipping methods, processing time, and delivery areas"
                  placeholderTextColor="#6c757d"
                  multiline
                />
              </View>

              {/* Return & Refund Policies */}
              <View style={styles.formContainer}>
                <View style={styles.labelContainer}>
                  <Icon name="assignment-return" size={20} color="#a0522d" />
                  <Text style={styles.inputLabel}>Return & Refund Policies</Text>
                </View>
                <TextInput
                  style={[styles.textInput, { height: 120, textAlignVertical: 'top' }]}
                  value={formData.returnRefundPolicies}
                  onChangeText={(text) => handleInputChange('returnRefundPolicies', text)}
                  placeholder="Explain your return window, refund process, and any conditions"
                  placeholderTextColor="#6c757d"
                  multiline
                />
              </View>
            </>
          )}

          {step === 4 && (
            <>
              <Text style={styles.sectionTitle}>Shop Visuals</Text>
              
              {/* Profile Picture */}
              <View style={styles.formContainer}>
                <View style={styles.labelContainer}>
                  <Icon name="camera-alt" size={20} color="#a0522d" />
                  <Text style={styles.inputLabel}>Profile Picture</Text>
                </View>
                <TouchableOpacity 
                  style={styles.imageUploadContainer}
                  onPress={() => handleImageSelect('profile')}
                >
                  {imagePreview.profile ? (
                    <Image 
                      source={{ uri: imagePreview.profile }} 
                      style={styles.imagePreview}
                      resizeMode="cover"
                    />
                  ) : (
                    <>
                      <Icon name="add-a-photo" size={32} color="#6c757d" />
                      <Text style={{ color: '#6c757d', marginTop: 8 }}>Tap to upload profile picture</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              {/* Cover Photo */}
              <View style={styles.formContainer}>
                <View style={styles.labelContainer}>
                  <Icon name="photo-size-select-large" size={20} color="#a0522d" />
                  <Text style={styles.inputLabel}>Cover Photo</Text>
                </View>
                <TouchableOpacity 
                  style={styles.imageUploadContainer}
                  onPress={() => handleImageSelect('cover')}
                >
                  {imagePreview.cover ? (
                    <Image 
                      source={{ uri: imagePreview.cover }} 
                      style={styles.imagePreview}
                      resizeMode="cover"
                    />
                  ) : (
                    <>
                      <Icon name="add-to-photos" size={32} color="#6c757d" />
                      <Text style={{ color: '#6c757d', marginTop: 8 }}>Tap to upload cover photo</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}

          {step === 5 && (
            <>
              <Text style={styles.sectionTitle}>Product Catalog</Text>
              
              {formData.products.map((product, index) => (
                <View key={index} style={styles.productSection}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#2c3e50' }}>Product {index + 1}</Text>
                    {index > 0 && (
                      <TouchableOpacity 
                        onPress={() => removeProduct(index)}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Icon name="delete" size={20} color="#e53e3e" />
                        <Text style={{ color: '#e53e3e', marginLeft: 4 }}>Remove</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  
                  {/* Category */}
                  <View style={[styles.formContainer, { marginBottom: 16, padding: 0, backgroundColor: 'transparent', elevation: 0 }]}>
                    <Text style={[styles.inputLabel, { marginBottom: 8 }]}>Category</Text>
                    <TextInput
                      style={styles.textInput}
                      value={product.category}
                      onChangeText={(text) => handleProductChange(index, 'category', text)}
                      placeholder="e.g., Handmade Jewelry, Home Decor, Clothing"
                      placeholderTextColor="#6c757d"
                    />
                  </View>

                  {/* Name */}
                  <View style={[styles.formContainer, { marginBottom: 16, padding: 0, backgroundColor: 'transparent', elevation: 0 }]}>
                    <Text style={[styles.inputLabel, { marginBottom: 8 }]}>Product Name</Text>
                    <TextInput
                      style={styles.textInput}
                      value={product.name}
                      onChangeText={(text) => handleProductChange(index, 'name', text)}
                      placeholder="Enter product name"
                      placeholderTextColor="#6c757d"
                    />
                  </View>

                  {/* Price */}
                  <View style={[styles.formContainer, { marginBottom: 16, padding: 0, backgroundColor: 'transparent', elevation: 0 }]}>
                    <Text style={[styles.inputLabel, { marginBottom: 8 }]}>Price ($)</Text>
                    <TextInput
                      style={styles.textInput}
                      value={product.price}
                      onChangeText={(text) => handleProductChange(index, 'price', text)}
                      placeholder="0.00"
                      placeholderTextColor="#6c757d"
                      keyboardType="decimal-pad"
                    />
                  </View>

                  {/* Description */}
                  <View style={[styles.formContainer, { marginBottom: 16, padding: 0, backgroundColor: 'transparent', elevation: 0 }]}>
                    <Text style={[styles.inputLabel, { marginBottom: 8 }]}>Description</Text>
                    <TextInput
                      style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                      value={product.description}
                      onChangeText={(text) => handleProductChange(index, 'description', text)}
                      placeholder="Describe your product features and benefits"
                      placeholderTextColor="#6c757d"
                      multiline
                    />
                  </View>

                  {/* Making Process */}
                  <View style={[styles.formContainer, { marginBottom: 16, padding: 0, backgroundColor: 'transparent', elevation: 0 }]}>
                    <Text style={[styles.inputLabel, { marginBottom: 8 }]}>Making Process</Text>
                    <TextInput
                      style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                      value={product.makingProcess}
                      onChangeText={(text) => handleProductChange(index, 'makingProcess', text)}
                      placeholder="Describe how this product is made"
                      placeholderTextColor="#6c757d"
                      multiline
                    />
                  </View>

                  {/* Materials Used */}
                  <View style={[styles.formContainer, { marginBottom: 16, padding: 0, backgroundColor: 'transparent', elevation: 0 }]}>
                    <Text style={[styles.inputLabel, { marginBottom: 8 }]}>Materials Used</Text>
                    <TextInput
                      style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                      value={product.materialsUsed}
                      onChangeText={(text) => handleProductChange(index, 'materialsUsed', text)}
                      placeholder="List all materials used in this product"
                      placeholderTextColor="#6c757d"
                      multiline
                    />
                  </View>

                  {/* Product Photos */}
                  <ProductPhotoUpload productIndex={index} photos={product.photos} />
                </View>
              ))}

              <TouchableOpacity 
                style={styles.addButton}
                onPress={addProduct}
              >
                <Icon name="add" size={24} color="#a0522d" />
                <Text style={styles.addButtonText}>Add Another Product</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      {renderTimePicker()}

      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <View style={{ padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e9ecef' }}>
          <View style={{ flexDirection: 'row', justifyContent: step > 1 ? 'space-between' : 'flex-end' }}>
            {step > 1 && (
              <TouchableOpacity 
                style={[styles.signupButton, { backgroundColor: '#e9ecef', flex: 0.48 }]}
                onPress={prevStep}
              >
                <Text style={[styles.signupButtonText, { color: '#6c757d' }]}>Back</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[styles.signupButton, { flex: step > 1 ? 0.48 : 1 }]}
              onPress={step < 5 ? nextStep : handleSubmit}
            >
              <Text style={styles.signupButtonText}>
                {step < 5 ? 'Continue' : 'Complete Setup'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SellerInfo;