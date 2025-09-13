import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from './StyleSheet/AppStyles';

const OrderSuccess = ({ navigation, route }) => {
  const { orderDetails } = route.params;
  const { deliveryAddress, paymentMethod, items, total, estimatedDelivery } = orderDetails;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'card': return 'Credit/Debit Card';
      case 'upi': return 'UPI Payment';
      case 'cod': return 'Cash on Delivery';
      default: return method;
    }
  };

  return (
    <View style={AppStyles.container}>
      {/* Header */}
      <View style={AppStyles.headerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.navigate('MainTabs')} style={{ padding: 4 }}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={[AppStyles.profileHeaderTitle, { fontSize: 18 }]}>
            Order Confirmation
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Success Message */}
        <View style={[AppStyles.productDetailsContainer, { alignItems: 'center' }]}>
          <View style={[AppStyles.successCircle, { backgroundColor: '#4CAF50' }]}>
            <Icon name="check" size={40} color="#fff" />
          </View>
          <Text style={[AppStyles.productSectionTitle, { textAlign: 'center', marginTop: 16 }]}>
            Order Placed Successfully!
          </Text>
          <Text style={{ color: '#666', textAlign: 'center', marginTop: 8 }}>
            Your order has been confirmed and will be delivered soon.
          </Text>
          <Text style={[AppStyles.orderId, { textAlign: 'center', marginTop: 16 }]}>
            Order #: {orderDetails.id}
          </Text>
        </View>

        {/* Delivery Information */}
        <View style={AppStyles.productDetailsContainer}>
          <Text style={AppStyles.productSectionTitle}>Delivery Information</Text>
          <View style={AppStyles.deliveryInfo}>
            <Text style={AppStyles.deliveryInfoText}>
              <Text style={{ fontWeight: '600' }}>Estimated Delivery:</Text> {formatDate(estimatedDelivery)}
            </Text>
            <Text style={AppStyles.deliveryInfoText}>
              <Text style={{ fontWeight: '600' }}>Delivery Address:</Text> {deliveryAddress.address}, {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pincode}
            </Text>
            <Text style={AppStyles.deliveryInfoText}>
              <Text style={{ fontWeight: '600' }}>Contact:</Text> {deliveryAddress.phone}
            </Text>
          </View>
        </View>

        {/* Payment Information */}
        <View style={AppStyles.productDetailsContainer}>
          <Text style={AppStyles.productSectionTitle}>Payment Information</Text>
          <View style={AppStyles.paymentInfo}>
            <Text style={AppStyles.paymentInfoText}>
              <Text style={{ fontWeight: '600' }}>Payment Method:</Text> {getPaymentMethodText(paymentMethod)}
            </Text>
            <Text style={AppStyles.paymentInfoText}>
              <Text style={{ fontWeight: '600' }}>Total Amount:</Text> ₹{total.toLocaleString('en-IN')}
            </Text>
            <Text style={AppStyles.paymentInfoText}>
              <Text style={{ fontWeight: '600' }}>Payment Status:</Text> {paymentMethod === 'cod' ? 'Pending' : 'Paid'}
            </Text>
          </View>
        </View>

        {/* Order Items */}
        <View style={AppStyles.productDetailsContainer}>
          <Text style={AppStyles.productSectionTitle}>Order Items</Text>
          {items.map((item, index) => (
            <View key={index} style={AppStyles.orderItem}>
              <Image source={{ uri: item.image }} style={AppStyles.orderItemImage} />
              <View style={AppStyles.orderItemDetails}>
                <Text style={AppStyles.orderItemName}>{item.name}</Text>
                <Text style={AppStyles.orderItemPrice}>₹{item.price.toLocaleString('en-IN')} × {item.quantity}</Text>
                <Text style={AppStyles.orderTotal}>
                  Total: ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={[AppStyles.productDetailsContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
          <TouchableOpacity 
            style={[AppStyles.secondaryButton, { flex: 1, marginRight: 8 }]}
            onPress={() => navigation.navigate('MyOrders')}
          >
            <Text style={AppStyles.secondaryButtonText}>View Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[AppStyles.primaryButton, { flex: 1, marginLeft: 8 }]}
            onPress={() => navigation.navigate('MainTabs')}
          >
            <Text style={AppStyles.primaryButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderSuccess;