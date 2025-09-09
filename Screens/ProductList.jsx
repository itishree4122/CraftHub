import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
  ToastAndroid,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from './StyleSheet/AppStyles';

const { width } = Dimensions.get('window');

const ProductList = ({ route, navigation }) => {
  const { products, categoryName } = route.params;
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [wishlistItems, setWishlistItems] = useState([]);

  // Add mock prices to products
  const productsWithPrices = products.map(product => ({
    ...product,
    price: Math.floor(Math.random() * 5000) + 500, // Random price between 500 and 5500
    rating: (Math.random() * 5).toFixed(1), // Random rating between 0-5
    reviews: Math.floor(Math.random() * 1000) // Random number of reviews
  }));

  // Sort products based on selected option
  const sortedProducts = [...productsWithPrices].sort((a, b) => {
    switch (sortOption) {
      case 'priceLowToHigh':
        return a.price - b.price;
      case 'priceHighToLow':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0; // Default order
    }
  });

  const toggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    
    if (isInWishlist) {
      // Remove from wishlist
      setWishlistItems(prev => prev.filter(item => item.id !== product.id));
      showMessage('Removed from wishlist');
    } else {
      // Add to wishlist
      setWishlistItems(prev => [...prev, product]);
      showMessage('Added to wishlist');
    }
  };

  const showMessage = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Success', message);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const renderProductItem = ({ item }) => {
    const isWishlisted = isInWishlist(item.id);

    return (
      <TouchableOpacity 
        style={{
          width: (width - 36) / 2, // Calculate width for 2 columns with padding
          marginBottom: 16,
        }}
        onPress={() => navigation.navigate('Product', { product: item })}
      >
        {/* Product Image with Wishlist Button */}
        <View style={{ position: 'relative' }}>
          <Image 
            source={{ uri: item.image }} 
            style={{ 
              width: '100%', 
              height: (width - 36) / 2,
              borderRadius: 8,
              resizeMode: 'cover',
              marginBottom: 8
            }}
          />
          <TouchableOpacity 
            style={{ 
              position: 'absolute', 
              top: 8, 
              right: 8, 
              backgroundColor: 'rgba(255,255,255,0.9)', 
              borderRadius: 20, 
              padding: 4 
            }}
            onPress={(e) => {
              e.stopPropagation(); // Prevent navigation to product page
              toggleWishlist(item);
            }}
          >
            <Icon 
              name={isWishlisted ? 'favorite' : 'favorite-border'} 
              size={20} 
              color={isWishlisted ? '#ff3b30' : '#333'} 
            />
          </TouchableOpacity>
        </View>

        {/* Product Details */}
        <View style={{ paddingHorizontal: 4 }}>
          {/* Product Name */}
          <Text style={{ 
            fontSize: 14, 
            fontWeight: '500', 
            color: '#333',
            marginBottom: 6,
            lineHeight: 18
          }} numberOfLines={2}>
            {item.name}
          </Text>

          {/* Rating and Reviews */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              backgroundColor: '#388e3c', 
              paddingHorizontal: 6, 
              paddingVertical: 2, 
              borderRadius: 4,
              marginRight: 8
            }}>
              <Text style={{ fontSize: 12, color: '#fff', marginRight: 4 }}>{item.rating}</Text>
              <Icon name="star" size={12} color="#fff" />
            </View>
            <Text style={{ fontSize: 12, color: '#666' }}>({item.reviews})</Text>
          </View>

          {/* Price */}
          <Text style={{ 
            fontSize: 16, 
            fontWeight: 'bold', 
            color: '#a0522d',
            marginBottom: 4
          }}>
            ₹{item.price.toLocaleString('en-IN')}
          </Text>

          {/* Delivery Info */}
          <Text style={{ fontSize: 12, color: '#388e3c', marginBottom: 4 }}>
            Free delivery
          </Text>

          {/* Artisan Info */}
          <Text style={{ fontSize: 12, color: '#666' }} numberOfLines={1}>
            By {item.artisan}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const FilterModal = () => (
    <Modal
      visible={showFilterModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowFilterModal(false)}
    >
      <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableWithoutFeedback>
            <View style={{ 
              backgroundColor: 'white', 
              borderRadius: 12,
              padding: 20,
              width: width * 0.8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5
            }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Sort By</Text>
              
              {[
                { key: 'default', label: 'Recommended' },
                { key: 'priceLowToHigh', label: 'Price: Low to High' },
                { key: 'priceHighToLow', label: 'Price: High to Low' },
                { key: 'rating', label: 'Customer Rating' },
                { key: 'name', label: 'Name' }
              ].map((option) => (
                <TouchableOpacity 
                  key={option.key}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}
                  onPress={() => { setSortOption(option.key); setShowFilterModal(false); }}
                >
                  <Icon 
                    name={sortOption === option.key ? 'radio-button-checked' : 'radio-button-unchecked'} 
                    size={20} 
                    color={sortOption === option.key ? '#a0522d' : '#666'} 
                  />
                  <Text style={{ marginLeft: 12, fontSize: 16, color: sortOption === option.key ? '#a0522d' : '#333' }}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <View style={AppStyles.container}>
      {/* Header */}
      <View style={AppStyles.headerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 4 }}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={[AppStyles.profileHeaderTitle, { fontSize: 18, maxWidth: width * 0.6 }]} numberOfLines={1}>
            {categoryName}
          </Text>
          <TouchableOpacity onPress={() => setShowFilterModal(true)} style={{ padding: 4 }}>
            <Icon name="filter-list" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Results Count */}
      <View style={{ backgroundColor: '#fff', padding: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}>
        <Text style={{ fontSize: 14, color: '#666' }}>
          {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      {/* Product List */}
      <FlatList
        data={sortedProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
            <Icon name="search-off" size={48} color="#ccc" />
            <Text style={{ fontSize: 16, color: '#888', marginTop: 16, textAlign: 'center' }}>
              No products found in this category
            </Text>
          </View>
        }
      />

      <FilterModal />
    </View>
  );
};

export default ProductList;