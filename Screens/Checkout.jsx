import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from './StyleSheet/AppStyles';

import { SafeAreaView } from 'react-native-safe-area-context';

const Checkout = ({ navigation, route }) => {
  const { cartItems, subtotal, tax, deliveryCharge, total } = route.params;
  
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: 'Odisha',
    pincode: ''
  });
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Animation values
  const circleScale = new Animated.Value(0);
  const checkmarkOpacity = new Animated.Value(0);

  const handleSaveAddress = () => {
    if (!deliveryAddress.fullName || !deliveryAddress.phone || !deliveryAddress.address || 
        !deliveryAddress.city || !deliveryAddress.pincode) {
      Alert.alert('Error', 'Please fill all delivery address fields');
      return;
    }

    setIsAddressSaved(true);
    setShowAddressForm(false);
    Alert.alert('Success', 'Delivery address saved successfully!');
  };

  const animateSuccess = () => {
    // Scale animation for the circle
    Animated.timing(circleScale, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.back(1.2)),
      useNativeDriver: true,
    }).start();

    // Fade in animation for the checkmark (delayed)
    setTimeout(() => {
      Animated.timing(checkmarkOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 600);
  };

  const handlePlaceOrder = () => {
    if (!isAddressSaved) {
      Alert.alert('Error', 'Please add your delivery address first');
      return;
    }

    if (paymentMethod === 'card' && (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name)) {
      Alert.alert('Error', 'Please fill all card details');
      return;
    }

    // Generate order details
    const order = {
      id: 'ORD' + Math.floor(Math.random() * 10000),
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      total: total,
      paymentMethod: paymentMethod,
      deliveryAddress: deliveryAddress,
      items: cartItems,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 7 days from now
    };

    setOrderDetails(order);
    setShowSuccess(true);
    animateSuccess();

    // Navigate to success page after animation completes
    setTimeout(() => {
      navigation.navigate('OrderSuccess', { orderDetails: order });
    }, 2000);
  };

  const renderOrderItem = (item) => (
    <View key={item.id} style={AppStyles.cartItem}>
      <Image source={{ uri: item.image }} style={AppStyles.cartItemImage} />
      <View style={AppStyles.cartItemDetails}>
        <Text style={AppStyles.cartItemName} numberOfLines={1}>{item.name}</Text>
        <Text style={AppStyles.cartItemPrice}>₹{item.price.toLocaleString('en-IN')} × {item.quantity}</Text>
        <Text style={AppStyles.cartItemOption}>Total: ₹{(item.price * item.quantity).toLocaleString('en-IN')}</Text>
      </View>
    </View>
  );

  if (showSuccess) {
    return (
      <View style={[AppStyles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }]}>
        <Animated.View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#4CAF50',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ scale: circleScale }],
          }}
        >
          <Animated.View style={{ opacity: checkmarkOpacity }}>
            <Icon name="check" size={50} color="#fff" />
          </Animated.View>
        </Animated.View>
        <Text style={{ marginTop: 20, fontSize: 18, fontWeight: '600', color: '#333' }}>
          Order Placed Successfully!
        </Text>
        <Text style={{ marginTop: 10, color: '#666', textAlign: 'center' }}>
          Redirecting to order details...
        </Text>
      </View>
    );
  }

  return (
    <View style={AppStyles.container}>
      <SafeAreaView edges={['top']} >
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {/* Header */}
      <View style={AppStyles.headerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 4 }}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={[AppStyles.profileHeaderTitle, { fontSize: 18 }]}>
            Checkout
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Delivery Address Section */}
        <View style={AppStyles.productDetailsContainer}>
          <Text style={AppStyles.productSectionTitle}>Delivery Address</Text>
          
          {!isAddressSaved ? (
            <TouchableOpacity 
              style={[AppStyles.accountOption, { justifyContent: 'center' }]}
              onPress={() => setShowAddressForm(true)}
            >
              <Icon name="add-location-alt" size={24} color="#666" />
              <Text style={[AppStyles.optionText,{color: '#000'},{fontWeight:'600'}, { textAlign: 'center' }]}>Add Delivery Address</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ backgroundColor: '#f8f9fa', padding: 16, borderRadius: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
                {deliveryAddress.fullName}
              </Text>
              <Text style={{ color: '#666', marginBottom: 4 }}>
                {deliveryAddress.address}
              </Text>
              <Text style={{ color: '#666', marginBottom: 4 }}>
                {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pincode}
              </Text>
              <Text style={{ color: '#666', marginBottom: 8 }}>
                Phone: {deliveryAddress.phone}
              </Text>
              <TouchableOpacity 
                onPress={() => setShowAddressForm(true)}
                style={{ alignSelf: 'flex-end' }}
              >
                <Text style={{ color: '#333', fontWeight: '500' }}>Change Address</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Address Form Modal */}
          {showAddressForm && (
            <View style={{ marginTop: 16, backgroundColor: '#fff', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Text style={AppStyles.productSectionTitle}>Add Delivery Address</Text>
                <TouchableOpacity onPress={() => setShowAddressForm(false)}>
                  <Icon name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <View style={AppStyles.formContainer}>
                <Text style={AppStyles.inputLabel}>Full Name</Text>
                <TextInput
                  style={AppStyles.textInput}
                  value={deliveryAddress.fullName}
                  onChangeText={(text) => setDeliveryAddress({...deliveryAddress, fullName: text})}
                  placeholder="Enter your full name"
                />

                <Text style={AppStyles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={AppStyles.textInput}
                  value={deliveryAddress.phone}
                  onChangeText={(text) => setDeliveryAddress({...deliveryAddress, phone: text})}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />

                <Text style={AppStyles.inputLabel}>Address</Text>
                <TextInput
                  style={[AppStyles.textInput, { height: 80 }]}
                  value={deliveryAddress.address}
                  onChangeText={(text) => setDeliveryAddress({...deliveryAddress, address: text})}
                  placeholder="Enter your complete address"
                  multiline
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ width: '48%' }}>
                    <Text style={AppStyles.inputLabel}>City</Text>
                    <TextInput
                      style={AppStyles.textInput}
                      value={deliveryAddress.city}
                      onChangeText={(text) => setDeliveryAddress({...deliveryAddress, city: text})}
                      placeholder="Enter city"
                    />
                  </View>
                  <View style={{ width: '48%' }}>
                    <Text style={AppStyles.inputLabel}>Pincode</Text>
                    <TextInput
                      style={AppStyles.textInput}
                      value={deliveryAddress.pincode}
                      onChangeText={(text) => setDeliveryAddress({...deliveryAddress, pincode: text})}
                      placeholder="Pincode"
                      keyboardType="number-pad"
                    />
                  </View>
                </View>

                <TouchableOpacity 
                  style={[AppStyles.checkoutButton, { marginTop: 16 }]}
                  onPress={handleSaveAddress}
                >
                  <Text style={AppStyles.checkoutButtonText}>Save Address</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Order Summary */}
        <View style={AppStyles.productDetailsContainer}>
          <Text style={AppStyles.productSectionTitle}>Order Summary</Text>
          
          {cartItems.map(renderOrderItem)}
          
          <View style={AppStyles.priceSummary}>
            <View style={AppStyles.priceRow}>
              <Text style={AppStyles.priceLabel}>Subtotal</Text>
              <Text style={AppStyles.priceValue}>₹{subtotal.toLocaleString('en-IN')}</Text>
            </View>
            
            <View style={AppStyles.priceRow}>
              <Text style={AppStyles.priceLabel}>Tax (10%)</Text>
              <Text style={AppStyles.priceValue}>₹{tax.toLocaleString('en-IN')}</Text>
            </View>
            
            <View style={AppStyles.priceRow}>
              <Text style={AppStyles.priceLabel}>Delivery Charge</Text>
              <Text style={AppStyles.priceValue}>₹{deliveryCharge.toLocaleString('en-IN')}</Text>
            </View>
            
            <View style={[AppStyles.priceRow, AppStyles.totalRow]}>
              <Text style={AppStyles.totalLabel}>Total Amount</Text>
              <Text style={AppStyles.totalValue}>₹{total.toLocaleString('en-IN')}</Text>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={AppStyles.productDetailsContainer}>
          <Text style={AppStyles.productSectionTitle}>Payment Method</Text>
          
          <TouchableOpacity 
            style={[
              AppStyles.accountOption,
              paymentMethod === 'card' && { backgroundColor: '#f0f8ff' }
            ]}
            onPress={() => setPaymentMethod('card')}
          >
            <Icon name="credit-card" size={24} color="#333" />
            <Text style={[AppStyles.optionText,{color: '#333'}]}>Credit/Debit Card</Text>
            <Icon 
              name={paymentMethod === 'card' ? 'radio-button-checked' : 'radio-button-unchecked'} 
              size={24} 
              color="#333" 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              AppStyles.accountOption,
              paymentMethod === 'upi' && { backgroundColor: '#f0f8ff' }
            ]}
            onPress={() => setPaymentMethod('upi')}
          >
            <Icon name="payment" size={24} color="#333" />
            <Text style={[AppStyles.optionText,{color: '#333'}]}>UPI Payment</Text>
            <Icon 
              name={paymentMethod === 'upi' ? 'radio-button-checked' : 'radio-button-unchecked'} 
              size={24} 
              color="#333" 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              AppStyles.accountOption,
              paymentMethod === 'cod' && { backgroundColor: '#f0f8ff' }
            ]}
            onPress={() => setPaymentMethod('cod')}
          >
            <Icon name="local-atm" size={24} color="#333" />
            <Text style={[AppStyles.optionText,{color: '#333'}]}>Cash on Delivery</Text>
            <Icon 
              name={paymentMethod === 'cod' ? 'radio-button-checked' : 'radio-button-unchecked'} 
              size={24} 
              color="#333" 
            />
          </TouchableOpacity>

          {/* Card Details Form */}
          {paymentMethod === 'card' && (
            <View style={[AppStyles.formContainer, { marginTop: 16 }]}>
              <Text style={AppStyles.inputLabel}>Card Number</Text>
              <TextInput
                style={AppStyles.textInput}
                value={cardDetails.cardNumber}
                onChangeText={(text) => setCardDetails({...cardDetails, cardNumber: text})}
                placeholder="1234 5678 9012 3456"
                keyboardType="number-pad"
              />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '48%' }}>
                  <Text style={AppStyles.inputLabel}>Expiry Date</Text>
                  <TextInput
                    style={AppStyles.textInput}
                    value={cardDetails.expiry}
                    onChangeText={(text) => setCardDetails({...cardDetails, expiry: text})}
                    placeholder="MM/YY"
                  />
                </View>
                <View style={{ width: '48%' }}>
                  <Text style={AppStyles.inputLabel}>CVV</Text>
                  <TextInput
                    style={AppStyles.textInput}
                    value={cardDetails.cvv}
                    onChangeText={(text) => setCardDetails({...cardDetails, cvv: text})}
                    placeholder="123"
                    keyboardType="number-pad"
                    secureTextEntry
                  />
                </View>
              </View>

              <Text style={AppStyles.inputLabel}>Name on Card</Text>
              <TextInput
                style={AppStyles.textInput}
                value={cardDetails.name}
                onChangeText={(text) => setCardDetails({...cardDetails, name: text})}
                placeholder="Enter name as on card"
              />
            </View>
          )}

          {/* UPI Instructions */}
          {paymentMethod === 'upi' && (
            <View style={{ padding: 16, backgroundColor: '#f8f9fa', borderRadius: 8, marginTop: 16 }}>
              <Text style={{ color: '#666', marginBottom: 8 }}>
                You will be redirected to your UPI app to complete the payment after placing the order.
              </Text>
              <Text style={{ color: '#666' }}>
                Supported apps: Google Pay, PhonePe, Paytm, BHIM UPI
              </Text>
            </View>
          )}

          {/* COD Instructions */}
          {paymentMethod === 'cod' && (
            <View style={{ padding: 16, backgroundColor: '#f8f9fa', borderRadius: 8, marginTop: 16 }}>
              <Text style={{ color: '#666' }}>
                Pay cash when your order is delivered. A small additional charge may apply.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer with Place Order Button */}
      <SafeAreaView edges={['bottom']} >
      <View style={AppStyles.cartFooter}>
        <View style={[AppStyles.priceRow, { marginBottom: 12 }]}>
          <Text style={AppStyles.totalLabel}>Total Payable</Text>
          <Text style={AppStyles.totalValue}>₹{total.toLocaleString('en-IN')}</Text>
        </View>
        <TouchableOpacity 
          style={AppStyles.checkoutButton}
          onPress={handlePlaceOrder}
        >
          <Text style={AppStyles.checkoutButtonText}>
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </View>
  );
};

export default Checkout;