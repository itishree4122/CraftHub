import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TextInput,
  Platform,
  ActionSheetIOS,
  UIManager,
  findNodeHandle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from './StyleSheet/AppStyles';

// For Android, we'll use a custom modal for image selection
const MyOrders = ({ navigation }) => {
  // Sample order data with tracking information
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 2500,
      tracking: {
        placed: '2024-01-15',
        confirmed: '2024-01-15',
        packaged: '2024-01-16',
        shipped: '2024-01-17',
        outForDelivery: '2024-01-19',
        delivered: '2024-01-20',
        estimatedDelivery: '2024-01-20'
      },
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
      tracking: {
        placed: '2024-01-10',
        confirmed: '2024-01-10',
        packaged: '2024-01-11',
        shipped: '2024-01-12',
        estimatedDelivery: '2024-01-18'
      },
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
      tracking: {
        placed: '2024-01-05',
        confirmed: '2024-01-05',
        estimatedDelivery: '2024-01-15'
      },
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
      tracking: {
        placed: '2023-12-20',
        confirmed: '2023-12-20',
        packaged: '2023-12-21',
        shipped: '2023-12-22',
        outForDelivery: '2023-12-23',
        delivered: '2023-12-24',
        estimatedDelivery: '2023-12-24'
      },
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

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [trackingModalVisible, setTrackingModalVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageSourceModalVisible, setImageSourceModalVisible] = useState(false);

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

  const handleCancelOrder = (orderId) => {
    Alert.alert(
      "Cancel Order",
      "Are you sure you want to cancel this order?",
      [
        {
          text: "No",
          style: "cancel"
        },
        { 
          text: "Yes", 
          onPress: () => {
            setOrders(orders.map(order => 
              order.id === orderId ? {...order, status: 'Cancelled'} : order
            ));
          }
        }
      ]
    );
  };

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setTrackingModalVisible(true);
  };

  const handleRateProduct = (order, product) => {
    setSelectedOrder(order);
    setSelectedProduct(product);
    setRating(0);
    setReview('');
    setUploadedImages([]);
    setRatingModalVisible(true);
  };

  const showImageSourceDialog = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            // Take Photo
            Alert.alert('Camera', 'Camera functionality would be implemented here');
          } else if (buttonIndex === 2) {
            // Choose from Library
            Alert.alert('Photo Library', 'Photo library functionality would be implemented here');
          }
        }
      );
    } else {
      // For Android, show a custom modal
      setImageSourceModalVisible(true);
    }
  };

  const simulateImagePick = (source) => {
    // In a real app, you would use React Native's ImagePicker here
    // For this example, we'll just add a placeholder image
    const newImage = {
      uri: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
      width: 400,
      height: 400,
    };
    
    setUploadedImages([...uploadedImages, newImage]);
    setImageSourceModalVisible(false);
  };

  const removeImage = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  const submitReview = () => {
    if (rating === 0) {
      Alert.alert('Please select a rating');
      return;
    }

    // Update the product rating and review count
    const updatedOrders = orders.map(order => {
      if (order.id === selectedOrder.id) {
        const updatedItems = order.items.map(item => {
          if (item.id === selectedProduct.id) {
            const newReviews = item.reviews + 1;
            const newRating = ((item.rating * item.reviews) + rating) / newReviews;
            return {
              ...item,
              rating: parseFloat(newRating.toFixed(1)),
              reviews: newReviews
            };
          }
          return item;
        });
        
        return {
          ...order,
          items: updatedItems
        };
      }
      return order;
    });

    setOrders(updatedOrders);
    
    Alert.alert('Thank you!', 'Your review has been submitted successfully.');
    setRatingModalVisible(false);
  };

  const renderTrackingSteps = (order) => {
    const steps = [
      { key: 'placed', label: 'Order Placed', icon: 'shopping-cart' },
      { key: 'confirmed', label: 'Order Confirmed', icon: 'check-circle' },
      { key: 'packaged', label: 'Packaged', icon: 'inventory' },
      { key: 'shipped', label: 'Shipped', icon: 'local-shipping' },
      { key: 'outForDelivery', label: 'Out for Delivery', icon: 'delivery-dining' },
      { key: 'delivered', label: 'Delivered', icon: 'home' },
    ];

    return steps.map((step, index) => {
      const isCompleted = order.tracking[step.key] !== undefined;
      const isCurrent = 
        (order.status === 'Processing' && step.key === 'confirmed') ||
        (order.status === 'Shipped' && step.key === 'shipped') ||
        (order.status === 'Delivered' && step.key === 'delivered');
      
      return (
        <View key={step.key} style={[AppStyles.trackingStep, 
          isCompleted ? AppStyles.trackingStepCompleted : {},
          isCurrent ? AppStyles.trackingStepCurrent : {}
        ]}>
          <View style={AppStyles.trackingIconContainer}>
            <Icon 
              name={step.icon} 
              size={20} 
              color={isCompleted ? '#4CAF50' : '#ccc'} 
            />
            {index < steps.length - 1 && (
              <View style={[AppStyles.trackingLine, 
                isCompleted ? AppStyles.trackingLineCompleted : {}
              ]} />
            )}
          </View>
          <View style={AppStyles.trackingTextContainer}>
            <Text style={[
              AppStyles.trackingStepLabel,
              isCompleted ? AppStyles.trackingStepLabelCompleted : {}
            ]}>
              {step.label}
            </Text>
            {isCompleted && (
              <Text style={AppStyles.trackingStepDate}>
                {formatDate(order.tracking[step.key])}
              </Text>
            )}
          </View>
        </View>
      );
    });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Icon 
            name={i <= rating ? "star" : "star-border"} 
            size={32} 
            color={i <= rating ? "#FFD700" : "#ccc"} 
          />
        </TouchableOpacity>
      );
    }
    return stars;
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
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Icon name="star" size={14} color="#FFD700" />
              <Text style={{ fontSize: 12, marginLeft: 4 }}>{product.rating} ({product.reviews} reviews)</Text>
            </View>
            <Text style={AppStyles.orderItemPrice}>₹{product.price.toLocaleString('en-IN')} × {product.quantity}</Text>
          </View>
        </View>
      ))}

      {/* Order Footer */}
      <View style={AppStyles.orderFooter}>
        <Text style={AppStyles.orderTotal}>Total: ₹{item.total.toLocaleString('en-IN')}</Text>
        <View style={AppStyles.orderActions}>
          {item.status === 'Delivered' && (
            <TouchableOpacity 
              style={AppStyles.secondaryButton}
              onPress={() => handleRateProduct(item, item.items[0])}
            >
              <Text style={AppStyles.secondaryButtonText}>Rate Product</Text>
            </TouchableOpacity>
          )}
          
          {item.status === 'Processing' && (
            <TouchableOpacity 
              style={[AppStyles.secondaryButton, {marginRight: 10}]}
              onPress={() => handleCancelOrder(item.id)}
            >
              <Text style={AppStyles.secondaryButtonText}>Cancel Order</Text>
            </TouchableOpacity>
          )}
          
          {item.status !== 'Cancelled' && (
            <TouchableOpacity 
              style={AppStyles.primaryButton}
              onPress={() => handleTrackOrder(item)}
            >
              <Text style={AppStyles.primaryButtonText}>
                {item.status === 'Delivered' ? 'View Details' : 'Track Order'}
              </Text>
            </TouchableOpacity>
          )}
          
          {item.status === 'Cancelled' && (
            <TouchableOpacity style={[AppStyles.primaryButton, {backgroundColor: '#ccc'}]} disabled>
              <Text style={AppStyles.primaryButtonText}>Cancelled</Text>
            </TouchableOpacity>
          )}
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

      {/* Tracking Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={trackingModalVisible}
        onRequestClose={() => setTrackingModalVisible(false)}
      >
        <View style={AppStyles.modalContainer}>
          <View style={AppStyles.modalHeader}>
            <TouchableOpacity 
              onPress={() => setTrackingModalVisible(false)} 
              style={AppStyles.modalBackButton}
            >
              <Icon name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={AppStyles.modalTitle}>Order Tracking</Text>
            <View style={{ width: 40 }} />
          </View>
          
          <View style={AppStyles.modalContent}>
            {selectedOrder && (
              <>
                <View style={AppStyles.orderSummary}>
                  <Text style={AppStyles.orderId}>Order #{selectedOrder.id}</Text>
                  <Text style={AppStyles.orderDate}>Placed on {formatDate(selectedOrder.date)}</Text>
                  <View style={[AppStyles.statusBadge, { 
                    backgroundColor: getStatusColor(selectedOrder.status) + '20',
                    alignSelf: 'flex-start',
                    marginTop: 8
                  }]}>
                    <Text style={[AppStyles.statusText, { 
                      color: getStatusColor(selectedOrder.status) 
                    }]}>
                      {selectedOrder.status}
                    </Text>
                  </View>
                </View>
                
                <Text style={AppStyles.estimatedDelivery}>
                  Estimated Delivery: {formatDate(selectedOrder.tracking.estimatedDelivery)}
                </Text>
                
                <ScrollView style={AppStyles.trackingContainer}>
                  {renderTrackingSteps(selectedOrder)}
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Rating Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={ratingModalVisible}
        onRequestClose={() => setRatingModalVisible(false)}
      >
        <View style={AppStyles.modalContainer}>
          <View style={AppStyles.modalHeader}>
            <TouchableOpacity 
              onPress={() => setRatingModalVisible(false)} 
              style={AppStyles.modalBackButton}
            >
              <Icon name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={AppStyles.modalTitle}>Rate Product</Text>
            <View style={{ width: 40 }} />
          </View>
          
          <ScrollView style={AppStyles.modalContent}>
            {selectedProduct && (
              <>
                <View style={AppStyles.orderSummary}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image 
                      source={{ uri: selectedProduct.image }} 
                      style={{ width: 60, height: 60, borderRadius: 8 }} 
                    />
                    <View style={{ marginLeft: 12, flex: 1 }}>
                      <Text style={[AppStyles.orderItemName, { fontSize: 16 }]} numberOfLines={2}>
                        {selectedProduct.name}
                      </Text>
                      <Text style={AppStyles.orderItemArtisan}>By {selectedProduct.artisan}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={AppStyles.ratingSection}>
                  <Text style={AppStyles.ratingTitle}>How would you rate this product?</Text>
                  <View style={AppStyles.starsContainer}>
                    {renderStars()}
                  </View>
                </View>
                
                <View style={AppStyles.reviewSection}>
                  <Text style={AppStyles.reviewTitle}>Share your experience</Text>
                  <TextInput
                    style={AppStyles.reviewInput}
                    placeholder="Tell others about your experience with this product..."
                    multiline
                    numberOfLines={4}
                    value={review}
                    onChangeText={setReview}
                  />
                </View>
                
                <View style={AppStyles.uploadSection}>
                  <Text style={AppStyles.uploadTitle}>Add photos (optional)</Text>
                  <Text style={AppStyles.uploadSubtitle}>Show your product in real life</Text>
                  
                  <TouchableOpacity 
                    style={AppStyles.uploadButton}
                    onPress={showImageSourceDialog}
                  >
                    <Icon name="add-a-photo" size={24} color="#a0522d" />
                    <Text style={AppStyles.uploadButtonText}>Add Photos</Text>
                  </TouchableOpacity>
                  
                  {uploadedImages.length > 0 && (
                    <View style={AppStyles.uploadedImagesContainer}>
                      {uploadedImages.map((image, index) => (
                        <View key={index} style={AppStyles.uploadedImageWrapper}>
                          <Image 
                            source={{ uri: image.uri }} 
                            style={AppStyles.uploadedImage} 
                          />
                          <TouchableOpacity 
                            style={AppStyles.removeImageButton}
                            onPress={() => removeImage(index)}
                          >
                            <Icon name="close" size={16} color="#fff" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
                
                <TouchableOpacity 
                  style={[AppStyles.loginButton, { marginHorizontal: 16, marginBottom: 24 }]}
                  onPress={submitReview}
                >
                  <Text style={AppStyles.primaryButtonText}>Submit Review</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* Image Source Modal for Android */}
      <Modal
        visible={imageSourceModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImageSourceModalVisible(false)}
      >
        <TouchableOpacity 
          style={AppStyles.imageSourceModalOverlay}
          activeOpacity={1}
          onPress={() => setImageSourceModalVisible(false)}
        >
          <View style={AppStyles.imageSourceModalContent}>
            <TouchableOpacity 
              style={AppStyles.imageSourceOption}
              onPress={() => simulateImagePick('camera')}
            >
              <Icon name="camera-alt" size={24} color="#333" />
              <Text style={AppStyles.imageSourceOptionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={AppStyles.imageSourceOption}
              onPress={() => simulateImagePick('library')}
            >
              <Icon name="photo-library" size={24} color="#333" />
              <Text style={AppStyles.imageSourceOptionText}>Choose from Library</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[AppStyles.imageSourceOption, { borderBottomWidth: 0 }]}
              onPress={() => setImageSourceModalVisible(false)}
            >
              <Text style={[AppStyles.imageSourceOptionText, { color: '#F44336' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default MyOrders;