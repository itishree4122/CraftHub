// MyProfile.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from './StyleSheet/AppStyles';

const MyProfile = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    email: ''
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    setFormData(prev => ({
      ...prev,
      dob: newDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    }));
    setShowDatePicker(false);
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const handleSubmit = () => {
    alert('Profile submitted successfully!');
    console.log('Form data:', formData);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View key={`empty-${i}`} style={[AppStyles.calendarDay, AppStyles.empty]} />
      );
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDate.getDate() && 
                         currentMonth === selectedDate.getMonth() && 
                         currentYear === selectedDate.getFullYear();
      
      days.push(
        <TouchableOpacity
          key={`day-${day}`}
          style={[AppStyles.calendarDay, isSelected && AppStyles.selected]}
          onPress={() => handleDateSelect(day)}
        >
          <Text style={isSelected ? { color: 'white' } : { color: '#333' }}>{day}</Text>
        </TouchableOpacity>
      );
    }
    
    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <View style={AppStyles.container}>
      <View style={AppStyles.profileHeader}>
        <Text style={AppStyles.profileHeaderTitle}>My Profile</Text>
        <View style={AppStyles.headerSpacer} />
      </View>
      
      <ScrollView style={AppStyles.profileContent}>
        <View style={AppStyles.accountSection}>
          {/* Name Field */}
          <View style={AppStyles.formContainer}>
            <View style={AppStyles.labelContainer}>
              <Icon name="person" size={18} color="#495057" />
              <Text style={AppStyles.inputLabel}> Name</Text>
            </View>
            <TextInput
              style={AppStyles.textInput}
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              placeholder="Enter your full name"
            />
          </View>

          {/* Date of Birth Field */}
          <View style={AppStyles.formContainer}>
            <View style={AppStyles.labelContainer}>
              <Icon name="calendar-today" size={18} color="#495057" />
              <Text style={AppStyles.inputLabel}> Date of Birth</Text>
            </View>
            <TouchableOpacity 
              style={AppStyles.passwordContainer}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={formData.dob ? { color: '#333' } : { color: '#999' }}>
                {formData.dob || 'Select your date of birth'}
              </Text>
            </TouchableOpacity>
            
            <Modal
              visible={showDatePicker}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setShowDatePicker(false)}
            >
              <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <TouchableWithoutFeedback>
                    <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 16, width: '90%' }}>
                      <View style={AppStyles.calendarHeader}>
                        <TouchableOpacity 
                          style={AppStyles.navButton}
                          onPress={() => navigateMonth('prev')}
                        >
                          <Text style={AppStyles.arrowText}>&lt;</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                          {monthNames[currentMonth]} {currentYear}
                        </Text>
                        <TouchableOpacity 
                          style={AppStyles.navButton}
                          onPress={() => navigateMonth('next')}
                        >
                          <Text style={AppStyles.arrowText}>&gt;</Text>
                        </TouchableOpacity>
                      </View>
                      
                      <View style={AppStyles.calendarWeekdays}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Sun</Text>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Mon</Text>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Tue</Text>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Wed</Text>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Thu</Text>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Fri</Text>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Sat</Text>
                      </View>
                      
                      <View style={AppStyles.calendarDays}>
                        {generateCalendar()}
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>

          {/* Gender Selection */}
          <View style={AppStyles.formContainer}>
            <View style={AppStyles.labelContainer}>
              <Icon name="person" size={18} color="#495057" />
              <Text style={AppStyles.inputLabel}> Gender</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
              <TouchableOpacity 
                style={[
                  { 
                    flex: 1, 
                    padding: 12, 
                    borderRadius: 8, 
                    marginRight: 8,
                    borderWidth: 1,
                    borderColor: formData.gender === 'male' ? '#a0522d' : '#ddd',
                    backgroundColor: formData.gender === 'male' ? '#FAECE0' : 'white'
                  }
                ]}
                onPress={() => handleInputChange('gender', 'male')}
              >
                <Text style={{ textAlign: 'center', color: formData.gender === 'male' ? '#a0522d' : '#333' }}>Male</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  { 
                    flex: 1, 
                    padding: 12, 
                    borderRadius: 8, 
                    marginRight: 8,
                    borderWidth: 1,
                    borderColor: formData.gender === 'female' ? '#a0522d' : '#ddd',
                    backgroundColor: formData.gender === 'female' ? '#FAECE0' : 'white'
                  }
                ]}
                onPress={() => handleInputChange('gender', 'female')}
              >
                <Text style={{ textAlign: 'center', color: formData.gender === 'female' ? '#a0522d' : '#333' }}>Female</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  { 
                    flex: 1, 
                    padding: 12, 
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: formData.gender === 'other' ? '#a0522d' : '#ddd',
                    backgroundColor: formData.gender === 'other' ? '#FAECE0' : 'white'
                  }
                ]}
                onPress={() => handleInputChange('gender', 'other')}
              >
                <Text style={{ textAlign: 'center', color: formData.gender === 'other' ? '#a0522d' : '#333' }}>Other</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Email Field */}
          <View style={AppStyles.formContainer}>
            <View style={AppStyles.labelContainer}>
              <Icon name="email" size={18} color="#495057" />
              <Text style={AppStyles.inputLabel}> Email</Text>
            </View>
            <TextInput
              style={AppStyles.textInput}
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              placeholder="Enter your email address"
              keyboardType="email-address"
            />
          </View>

          
        </View>
      </ScrollView>

      {/* Submit Button */}
          <View style={{ paddingLeft: 16, paddingRight: 16,paddingBottom: 16,paddingTop: -5, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e0e0e0' }}>
        <TouchableOpacity 
          style={AppStyles.signupButton}
          onPress={handleSubmit}
        >
          <Text style={AppStyles.signupButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyProfile;