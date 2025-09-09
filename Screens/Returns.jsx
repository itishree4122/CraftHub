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

const Returns = ({ navigation }) => {
  // Sample return data
  const [returns, setReturns] = useState([
    {
      id: 'RET001',
      orderId: 'ORD001',
      date: '2024-01-20',
      status: 'Refund Processed',
      refundAmount: 2500,
      refundDate: '2024-01-22',
      reason: 'Product damaged during delivery',
      item: {
        id: '1',
        name: 'Pattachitra Painting',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400',
        quantity: 1,
        artisan: 'Master Pattachitra Artist'
      }
    },
    {
      id: 'RET002',
      orderId: 'ORD002',
      date: '2024-01-18',
      status: 'Return Approved',
      refundAmount: 4500,
      refundDate: 'Processing',
      reason: 'Wrong size delivered',
      item: {
        id: '2',
        name: 'Silver Filigree Work',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1605108721178-97a9514c0b94?w=400',
        quantity: 1,
        artisan: 'Cuttack Silver Artisan'
      }
    },
    {
      id: 'RET003',
      orderId: 'ORD003',
      date: '2024-01-15',
      status: 'Return Requested',
      refundAmount: 3200,
      refundDate: 'Pending',
      reason: 'Product not as described',
      item: {
        id: '3',
        name: 'Dhokra Metal Craft',
        price: 3200,
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400',
        quantity: 1,
        artisan: 'Tribal Dhokra Artist'
      }
    },
    {
      id: 'RET004',
      orderId: 'ORD004',
      date: '2023-12-28',
      status: 'Refund Rejected',
      refundAmount: 1800,
      refundDate: 'N/A',
      reason: 'Return period expired',
      item: {
        id: '4',
        name: 'Palm Leaf Engraving',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
        quantity: 1,
        artisan: 'Puri Palm Leaf Artist'
      }
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Refund Processed':
        return '#4CAF50';
      case 'Return Approved':
        return '#2196F3';
      case 'Return Requested':
        return '#a0522d';
      case 'Refund Rejected':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Refund Processed':
        return 'check-circle';
      case 'Return Approved':
        return 'verified';
      case 'Return Requested':
        return 'schedule';
      case 'Refund Rejected':
        return 'cancel';
      default:
        return 'help';
    }
  };

  const formatDate = (dateString) => {
    if (dateString === 'Processing' || dateString === 'Pending' || dateString === 'N/A') {
      return dateString;
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderReturnItem = ({ item }) => (
    <View style={AppStyles.returnCard}>
      {/* Return Header */}
      <View style={AppStyles.returnHeader}>
        <View>
          <Text style={AppStyles.returnId}>Return #{item.id}</Text>
          <Text style={AppStyles.returnOrderId}>Order #{item.orderId}</Text>
          <Text style={AppStyles.returnDate}>Requested on {formatDate(item.date)}</Text>
        </View>
        <View style={[AppStyles.returnStatusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Icon 
            name={getStatusIcon(item.status)} 
            size={16} 
            color={getStatusColor(item.status)} 
            style={{ marginRight: 4 }}
          />
          <Text style={[AppStyles.returnStatusText, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>
      </View>

      {/* Return Item */}
      <View style={AppStyles.returnItem}>
        <Image source={{ uri: item.item.image }} style={AppStyles.returnItemImage} />
        <View style={AppStyles.returnItemDetails}>
          <Text style={AppStyles.returnItemName} numberOfLines={2}>{item.item.name}</Text>
          <Text style={AppStyles.returnItemArtisan}>By {item.item.artisan}</Text>
          <Text style={AppStyles.returnItemPrice}>₹{item.item.price.toLocaleString('en-IN')}</Text>
        </View>
      </View>

      {/* Return Details */}
      <View style={AppStyles.returnDetails}>
        <View style={AppStyles.detailRow}>
          <Text style={AppStyles.detailLabel}>Reason:</Text>
          <Text style={AppStyles.detailValue}>{item.reason}</Text>
        </View>
        <View style={AppStyles.detailRow}>
          <Text style={AppStyles.detailLabel}>Refund Amount:</Text>
          <Text style={[AppStyles.detailValue, AppStyles.refundAmount]}>
            ₹{item.refundAmount.toLocaleString('en-IN')}
          </Text>
        </View>
        <View style={AppStyles.detailRow}>
          <Text style={AppStyles.detailLabel}>Refund Date:</Text>
          <Text style={AppStyles.detailValue}>{formatDate(item.refundDate)}</Text>
        </View>
      </View>

      {/* Return Actions */}
      <View style={AppStyles.returnActions}>
        {item.status === 'Return Requested' && (
          <TouchableOpacity style={AppStyles.secondaryButton}>
            <Text style={AppStyles.secondaryButtonText}>Cancel Return</Text>
          </TouchableOpacity>
        )}
        {item.status === 'Refund Rejected' && (
          <TouchableOpacity style={AppStyles.secondaryButton}>
            <Text style={AppStyles.secondaryButtonText}>Contact Support</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={AppStyles.primaryButton}>
          <Text style={AppStyles.primaryButtonText}>View Details</Text>
        </TouchableOpacity>
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
            Returns & Refunds
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {returns.length === 0 ? (
        <View style={AppStyles.emptyCartContainer}>
          <Icon name="assignment-return" size={80} color="#ddd" />
          <Text style={AppStyles.emptyCartText}>No Returns Yet</Text>
          <Text style={AppStyles.emptyCartSubtext}>
            You haven't requested any returns or refunds yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={returns}
          renderItem={renderReturnItem}
          keyExtractor={item => item.id}
          contentContainerStyle={AppStyles.returnsContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Returns;