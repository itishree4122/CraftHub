import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  Modal,
  Animated,
  PanResponder,
  Alert,
  ToastAndroid,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from './StyleSheet/AppStyles';
import { SafeAreaView } from 'react-native-safe-area-context';


const Product = ({ route, navigation }) => {
  const { product } = route.params;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [zoomModalVisible, setZoomModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [activeTab, setActiveTab] = useState('description'); // State for active tab
  const [isWishlisted, setIsWishlisted] = useState(false); // Wishlist state
  
  // For pinch-to-zoom functionality
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  // Mock multiple images for the product
  const productImages = [
    product.image,
    'https://via.placeholder.com/400x400/FF5733/FFFFFF?text=Product+Angle+2',
    'https://via.placeholder.com/400x400/C70039/FFFFFF?text=Product+Angle+3',
    'https://via.placeholder.com/400x400/900C3F/FFFFFF?text=Making+Process'
  ];

  // Mock product details
  const productDetails = {
    makingProcess: "Each piece is carefully handcrafted using traditional techniques passed down through generations. The process involves meticulous attention to detail at every stage, from material selection to final finishing.",
    makingTime: "Approximately 3-4 weeks",
    materials: "High-quality clay, natural dyes, and traditional sealants",
  };

  // Mock reviews data
  const reviewsData = [
    {
      id: 1,
      user: {
        name: "Priya Sharma",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely love this product! The craftsmanship is exceptional and it looks even better in person. The artisan's attention to detail is remarkable.",
      photos: [
        "https://via.placeholder.com/200x200/FF5733/FFFFFF?text=Review+1",
        "https://via.placeholder.com/200x200/C70039/FFFFFF?text=Review+2"
      ]
    },
    {
      id: 2,
      user: {
        name: "Rahul Verma",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      rating: 4,
      date: "1 month ago",
      comment: "Good quality product. The colors are vibrant and it's well-made. Took a bit longer to arrive than expected but worth the wait.",
      photos: [
        "https://via.placeholder.com/200x200/900C3F/FFFFFF?text=Review+3"
      ]
    },
    {
      id: 3,
      user: {
        name: "Sneha Patel",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg"
      },
      rating: 5,
      date: "3 weeks ago",
      comment: "This is my second purchase from this artisan. The quality is consistently excellent. The product arrived well-packaged and in perfect condition.",
      photos: []
    },
    {
      id: 4,
      user: {
        name: "Amit Kumar",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg"
      },
      rating: 3,
      date: "2 months ago",
      comment: "The product is decent but I expected better finishing for the price. The concept is good but execution could be improved.",
      photos: [
        "https://via.placeholder.com/200x200/581845/FFFFFF?text=Review+4"
      ]
    }
  ];

  // Calculate average rating
  const averageRating = reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length;
  
  // Calculate rating distribution
  const ratingDistribution = {
    5: reviewsData.filter(review => review.rating === 5).length,
    4: reviewsData.filter(review => review.rating === 4).length,
    3: reviewsData.filter(review => review.rating === 3).length,
    2: reviewsData.filter(review => review.rating === 2).length,
    1: reviewsData.filter(review => review.rating === 1).length
  };

  // PanResponder for zoom functionality
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.numberActiveTouches === 2) {
          // Pinch gesture
          const { dx, dy } = gestureState;
          // Calculate scale based on pinch distance
          // This is a simplified implementation
          Animated.event([null, { scale: scale }], { useNativeDriver: false })(
            evt,
            gestureState
          );
        } else if (gestureState.numberActiveTouches === 1 && scale._value > 1) {
          // Drag gesture only when zoomed
          translateX.setValue(gestureState.dx);
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: () => {
        // Reset values if needed
        if (scale._value < 1) {
          Animated.spring(scale, { toValue: 1, useNativeDriver: false }).start();
        }
        Animated.spring(translateX, { toValue: 0, useNativeDriver: false }).start();
        Animated.spring(translateY, { toValue: 0, useNativeDriver: false }).start();
      },
    })
  ).current;

  const openZoomModal = () => {
    setZoomModalVisible(true);
  };

  const closeZoomModal = () => {
    setZoomModalVisible(false);
    // Reset zoom and pan
    scale.setValue(1);
    translateX.setValue(0);
    translateY.setValue(0);
  };

  const navigateToArtisanProfile = () => {
    // Navigate to artisan profile screen
    navigation.navigate('ArtisanProfile', { artisan: product.artisan });
  };

  const toggleWishlist = () => {
    const newWishlistStatus = !isWishlisted;
    setIsWishlisted(newWishlistStatus);
    
    // Show confirmation message
    const message = newWishlistStatus ? 'Added to wishlist!' : 'Removed from wishlist!';
    
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Success', message);
    }
  };

  const addToCart = () => {
    // Show confirmation message
    if (Platform.OS === 'android') {
      ToastAndroid.show('Item added to cart successfully!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Success', 'Item added to cart successfully!');
    }
  };

  const buyNow = () => {
    // Create the cart item with all selected options
    const cartItem = {
      ...product,
      quantity,
      selectedColor,
      selectedSize,
      id: Date.now().toString()
    };
    
    // Navigate directly to Checkout with this single item
    navigation.navigate('Checkout', {
      cartItems: [cartItem],
      subtotal: product.price * quantity,
      tax: (product.price * quantity) * 0.1,
      deliveryCharge: 50,
      total: (product.price * quantity) + ((product.price * quantity) * 0.1) + 50
    });
  };

  // Render star ratings
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Icon
        key={index}
        name={index < rating ? "star" : "star-border"}
        size={16}
        color={index < rating ? "#FFD700" : "#CCC"}
        style={{ marginRight: 2 }}
      />
    ));
  };

  // Render rating distribution bar
  const renderRatingBar = (stars, count, total) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    
    return (
      <View style={AppStyles.ratingBarContainer}>
        <Text style={AppStyles.ratingBarText}>{stars} stars</Text>
        <View style={AppStyles.ratingBar}>
          <View style={[AppStyles.ratingBarFill, { width: `${percentage}%` }]} />
        </View>
        <Text style={AppStyles.ratingBarCount}>{count}</Text>
      </View>
    );
  };

  // Render individual review item
  const renderReviewItem = ({ item }) => (
    <View style={AppStyles.reviewItem}>
      <View style={AppStyles.reviewHeader}>
        <Image source={{ uri: item.user.avatar }} style={AppStyles.reviewerAvatar} />
        <View style={AppStyles.reviewerInfo}>
          <Text style={AppStyles.reviewerName}>{item.user.name}</Text>
          <View style={AppStyles.reviewRating}>
            {renderStars(item.rating)}
            <Text style={AppStyles.reviewDate}>{item.date}</Text>
          </View>
        </View>
      </View>
      
      <Text style={AppStyles.reviewComment}>{item.comment}</Text>
      
      {item.photos.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={AppStyles.reviewPhotosContainer}>
          {item.photos.map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={AppStyles.reviewPhoto} />
          ))}
        </ScrollView>
      )}
    </View>
  );

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <Text style={AppStyles.productDescription}>
            Handcrafted with precision and care by skilled artisans. {product.name} is made from 
            high-quality materials ensuring durability and aesthetic appeal. This piece showcases 
            traditional craftsmanship with a modern touch, perfect for adding elegance to any space.
          </Text>
        );
      case 'process':
        return (
          <View>
            <Text style={AppStyles.productDescription}>
              {productDetails.makingProcess}
            </Text>
            <Text style={[AppStyles.productSectionTitle, {marginTop: 16}]}>Making Time</Text>
            <Text style={AppStyles.productDescription}>
              {productDetails.makingTime}
            </Text>
          </View>
        );
      case 'materials':
        return (
          <Text style={AppStyles.productDescription}>
            {productDetails.materials}
          </Text>
        );
      case 'reviews':
        return (
          <View style={AppStyles.reviewsContainer}>
            {/* Rating Summary */}
            <View style={AppStyles.ratingSummary}>
              <View style={AppStyles.averageRatingContainer}>
                <Text style={AppStyles.averageRating}>{averageRating.toFixed(1)}</Text>
                <View style={AppStyles.averageStars}>
                  {renderStars(Math.round(averageRating))}
                </View>
                <Text style={AppStyles.totalReviews}>{reviewsData.length} reviews</Text>
              </View>
              
              <View style={AppStyles.ratingDistribution}>
                {[5, 4, 3, 2, 1].map(stars => (
                  renderRatingBar(stars, ratingDistribution[stars], reviewsData.length)
                ))}
              </View>
            </View>

            {/* Customer Photos */}
            <Text style={[AppStyles.productSectionTitle, {marginTop: 24}]}>Customer Photos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={AppStyles.customerPhotosContainer}>
              {reviewsData.flatMap(review => review.photos).slice(0, 8).map((photo, index) => (
                <Image key={index} source={{ uri: photo }} style={AppStyles.customerPhoto} />
              ))}
            </ScrollView>

            {/* Reviews List */}
            <Text style={[AppStyles.productSectionTitle, {marginTop: 24}]}>All Reviews</Text>
            <FlatList
              data={reviewsData}
              renderItem={renderReviewItem}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={AppStyles.container}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={AppStyles.safeArea} >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={AppStyles.headerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 4 }}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={[AppStyles.profileHeaderTitle, { fontSize: 18 }]} numberOfLines={1}>
            Product Details
          </Text>
          <TouchableOpacity 
            style={{ padding: 4 }}
            onPress={toggleWishlist}
          >
            <Icon 
              name={isWishlisted ? "favorite" : "favorite-border"} 
              size={24} 
              color={isWishlisted ? "#ff3b30" : "#333"} 
            />
          </TouchableOpacity>
        </View>
      </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={AppStyles.productImageContainer}>
          <TouchableOpacity onPress={openZoomModal} activeOpacity={0.9}>
            <Image 
              source={{ uri: productImages[selectedImage] }} 
              style={AppStyles.productMainImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
          
          {/* Authenticity Badge */}
          <View style={AppStyles.authenticityBadge}>
            <Icon name="verified" size={16} color="#fff" />
            <Text style={AppStyles.authenticityText}>Handmade Authentic</Text>
          </View>
          
          {/* Image Thumbnails */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={AppStyles.productThumbnailContainer}
          >
            {productImages.map((image, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => setSelectedImage(index)}
                style={[
                  AppStyles.productThumbnail,
                  selectedImage === index && AppStyles.productSelectedThumbnail
                ]}
              >
                <Image 
                  source={{ uri: image }} 
                  style={AppStyles.productThumbnailImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Product Details */}
        <View style={AppStyles.productDetailsContainer}>
          <Text style={AppStyles.productName}>{product.name}</Text>
          
          {/* Rating and Reviews */}
          <TouchableOpacity 
            style={AppStyles.productRatingContainer}
            onPress={() => setActiveTab('reviews')}
          >
            <View style={AppStyles.productRatingBadge}>
              <Text style={AppStyles.productRatingText}>{product.rating}</Text>
              <Icon name="star" size={14} color="#fff" />
            </View>
            <Text style={AppStyles.productReviewText}>({product.reviews} reviews)</Text>
            <Text style={AppStyles.productSoldText}>• 1.2k+ sold</Text>
            <Icon name="chevron-right" size={16} color="#666" style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          {/* Price */}
          <Text style={AppStyles.productPrice}>₹{product.price.toLocaleString('en-IN')}</Text>

          {/* Color Options (if applicable) */}
          {product.colors && (
            <>
              <Text style={AppStyles.productSectionTitle}>Color</Text>
              <View style={AppStyles.productOptionsContainer}>
                {product.colors.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedColor(color)}
                    style={[
                      AppStyles.colorOption,
                      selectedColor === color && AppStyles.selectedColorOption,
                      { backgroundColor: color.value }
                    ]}
                  >
                    {selectedColor === color && (
                      <Icon name="check" size={16} color="#fff" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Size Options (if applicable) */}
          {product.sizes && (
            <>
              <Text style={AppStyles.productSectionTitle}>Size</Text>
              <View style={AppStyles.productOptionsContainer}>
                {product.sizes.map((size, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedSize(size)}
                    style={[
                      AppStyles.sizeOption,
                      selectedSize === size && AppStyles.selectedSizeOption
                    ]}
                  >
                    <Text style={[
                      AppStyles.sizeOptionText,
                      selectedSize === size && AppStyles.selectedSizeOptionText
                    ]}>
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Tab Buttons - Horizontal Scroll */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 20, marginHorizontal: -7 }}
            contentContainerStyle={{ paddingHorizontal: 0 }}
          >
            <TouchableOpacity 
              style={[
                AppStyles.tabButtonHorizontal,
                activeTab === 'description' && AppStyles.activeTabButtonHorizontal
              ]}
              onPress={() => setActiveTab('description')}
            >
              <Text style={[
                AppStyles.tabButtonTextHorizontal,
                activeTab === 'description' && AppStyles.activeTabButtonTextHorizontal
              ]}>
                Description
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                AppStyles.tabButtonHorizontal,
                activeTab === 'process' && AppStyles.activeTabButtonHorizontal
              ]}
              onPress={() => setActiveTab('process')}
            >
              <Text style={[
                AppStyles.tabButtonTextHorizontal,
                activeTab === 'process' && AppStyles.activeTabButtonTextHorizontal
              ]}>
                Making Process
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                AppStyles.tabButtonHorizontal,
                activeTab === 'materials' && AppStyles.activeTabButtonHorizontal
              ]}
              onPress={() => setActiveTab('materials')}
            >
              <Text style={[
                AppStyles.tabButtonTextHorizontal,
                activeTab === 'materials' && AppStyles.activeTabButtonTextHorizontal
              ]}>
                Materials Used
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                AppStyles.tabButtonHorizontal,
                activeTab === 'reviews' && AppStyles.activeTabButtonHorizontal
              ]}
              onPress={() => setActiveTab('reviews')}
            >
              <Text style={[
                AppStyles.tabButtonTextHorizontal,
                activeTab === 'reviews' && AppStyles.activeTabButtonTextHorizontal
              ]}>
                Reviews ({reviewsData.length})
              </Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Tab Content */}
          {renderTabContent()}

          {/* Artisan Info */}
          <Text style={[AppStyles.productSectionTitle, {marginTop: 24}]}>Seller Info</Text>
          <TouchableOpacity 
            style={AppStyles.productArtisanContainer}
            onPress={navigateToArtisanProfile}
          >
            <Image 
              source={{ uri: 'https://via.placeholder.com/60x60/007AFF/FFFFFF?text=A' }} 
              style={AppStyles.productArtisanImage}
            />
            <View style={AppStyles.productArtisanInfo}>
              <Text style={AppStyles.productArtisanName}>{product.artisan}</Text>
              <Text style={AppStyles.productArtisanLocation}>Jaipur, Rajasthan</Text>
              <Text style={AppStyles.productArtisanYears}>15 years of experience</Text>
              <Text style={AppStyles.productArtisanStory}>
                Specializing in traditional pottery techniques passed down through three generations...
              </Text>
              <Text style={AppStyles.viewProfileText}>View Full Profile →</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer with Buy Options */}
      <SafeAreaView edges={['bottom']} >
      <View style={AppStyles.productFooter}>
        <TouchableOpacity 
          style={AppStyles.productCartButton}
          onPress={addToCart}
        >
          <Icon name="add-shopping-cart" size={20} color="#a0522d" />
          <Text style={AppStyles.productCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={AppStyles.productBuyButton}
          onPress={buyNow}
        >
          <Text style={AppStyles.productBuyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>

      {/* Zoom Modal */}
      <Modal
        visible={zoomModalVisible}
        transparent={true}
        onRequestClose={closeZoomModal}
      >
        <View style={AppStyles.zoomModalContainer}>
          <TouchableOpacity 
            style={AppStyles.zoomModalCloseButton}
            onPress={closeZoomModal}
          >
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Animated.Image
            source={{ uri: productImages[selectedImage] }}
            style={[
              AppStyles.zoomedImage,
              {
                transform: [
                  { scale: scale },
                  { translateX: translateX },
                  { translateY: translateY }
                ]
              }
            ]}
            resizeMode="contain"
            {...panResponder.panHandlers}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Product;