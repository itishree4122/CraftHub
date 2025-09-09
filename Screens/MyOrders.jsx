import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from './StyleSheet/AppStyles';

const MyOrders = ({ navigation }) => {
  // Sample order data
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 2500,
      items: [
        {
          id: '1',
          name: 'Pattachitra Painting',
          price: 2500,
          image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400',
          quantity: 1,
          artisan: 'Master Pattachitra Artist',
          rating: 4.8,
          reviews: 124
        }
      ]
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 8900,
      items: [
        {
          id: '2',
          name: 'Silver Filigree Work',
          price: 4500,
          image: 'https://images.unsplash.com/photo-1605108721178-97a9514c0b94?w=400',
          quantity: 2,
          artisan: 'Cuttack Silver Artisan',
          rating: 4.9,
          reviews: 89
        }
      ]
    },
    {
      id: 'ORD003',
      date: '2024-01-05',
      status: 'Processing',
      total: 3200,
      items: [
        {
          id: '3',
          name: 'Dhokra Metal Craft',
          price: 3200,
          image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400',
          quantity: 1,
          artisan: 'Tribal Dhokra Artist',
          rating: 4.7,
          reviews: 156
        }
      ]
    },
    {
      id: 'ORD004',
      date: '2023-12-20',
      status: 'Delivered',
      total: 5400,
      items: [
        {
          id: '4',
          name: 'Palm Leaf Engraving',
          price: 1800,
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
          quantity: 3,
          artisan: 'Puri Palm Leaf Artist',
          rating: 4.6,
          reviews: 67
        }
      ]
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return '#4CAF50';
      case 'Shipped':
        return '#2196F3';
      case 'Processing':
        return '#a0522d';
      case 'Cancelled':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderOrderItem = ({ item }) => (
    <View style={AppStyles.orderCard}>
      {/* Order Header */}
      <View style={AppStyles.orderHeader}>
        <View>
          <Text style={AppStyles.orderId}>Order #{item.id}</Text>
          <Text style={AppStyles.orderDate}>Placed on {formatDate(item.date)}</Text>
        </View>
        <View style={[AppStyles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[AppStyles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>
      </View>

      {/* Order Items */}
      {item.items.map((product, index) => (
        <View key={product.id} style={AppStyles.orderItem}>
          <Image source={{ uri: product.image }} style={AppStyles.orderItemImage} />
          <View style={AppStyles.orderItemDetails}>
            <Text style={AppStyles.orderItemName} numberOfLines={2}>{product.name}</Text>
            <Text style={AppStyles.orderItemArtisan}>By {product.artisan}</Text>
            <Text style={AppStyles.orderItemPrice}>₹{product.price.toLocaleString('en-IN')} × {product.quantity}</Text>
          </View>
        </View>
      ))}

      {/* Order Footer */}
      <View style={AppStyles.orderFooter}>
        <Text style={AppStyles.orderTotal}>Total: ₹{item.total.toLocaleString('en-IN')}</Text>
        <View style={AppStyles.orderActions}>
          {item.status === 'Delivered' && (
            <TouchableOpacity style={AppStyles.secondaryButton}>
              <Text style={AppStyles.secondaryButtonText}>Rate Product</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={AppStyles.primaryButton}>
            <Text style={AppStyles.primaryButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={AppStyles.container}>
      {/* Header */}
      <View style={AppStyles.headerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 4 }}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={[AppStyles.profileHeaderTitle, { fontSize: 18 }]}>
            My Orders
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {orders.length === 0 ? (
        <View style={AppStyles.emptyCartContainer}>
          <Icon name="shopping-bag" size={80} color="#ddd" />
          <Text style={AppStyles.emptyCartText}>No Orders Yet</Text>
          <Text style={AppStyles.emptyCartSubtext}>
            You haven't placed any orders yet. Start shopping to see your orders here!
          </Text>
          <TouchableOpacity 
            style={AppStyles.continueShoppingButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={AppStyles.continueShoppingText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={AppStyles.ordersContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default MyOrders;