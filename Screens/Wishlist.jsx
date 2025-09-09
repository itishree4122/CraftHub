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
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from './StyleSheet/AppStyles';

const { width } = Dimensions.get('window');

const Wishlist = ({ navigation }) => {
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortOption, setSortOption] = useState('default');

  // Sample wishlist data
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: '1',
      name: 'Pattachitra Painting',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400',
      rating: 4.8,
      reviews: 124,
      artisan: 'Master Pattachitra Artist',
      inStock: true
    },
    {
      id: '2',
      name: 'Silver Filigree Work',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1605108721178-97a9514c0b94?w=400',
      rating: 4.9,
      reviews: 89,
      artisan: 'Cuttack Silver Artisan',
      inStock: true
    },
    {
      id: '3',
      name: 'Dhokra Metal Craft',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400',
      rating: 4.7,
      reviews: 156,
      artisan: 'Tribal Dhokra Artist',
      inStock: false
    },
    {
      id: '4',
      name: 'Palm Leaf Engraving',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
      rating: 4.6,
      reviews: 67,
      artisan: 'Puri Palm Leaf Artist',
      inStock: true
    },
    {
      id: '5',
      name: 'Stone Carving Art',
      price: 3800,
      image: 'https://images.unsplash.com/photo-1543857778-c4a1a569fb80?w=400',
      rating: 4.5,
      reviews: 92,
      artisan: 'Konark Stone Artist',
      inStock: true
    },
    {
      id: '6',
      name: 'Handloom Silk Saree',
      price: 5200,
      image: 'https://images.unsplash.com/photo-1560290464-6cf6e4c3d2d4?w=400',
      rating: 4.9,
      reviews: 203,
      artisan: 'Berhampur Weavers',
      inStock: false
    }
  ]);

  // Sort wishlist items based on selected option
  const sortedWishlist = [...wishlistItems].sort((a, b) => {
    switch (sortOption) {
      case 'priceLowToHigh':
        return a.price - b.price;
      case 'priceHighToLow':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
        return b.id - a.id; // Assuming higher ID means more recent
      default:
        return 0; // Default order
    }
  });

  const removeFromWishlist = (itemId) => {
    Alert.alert(
      "Remove from Wishlist",
      "Are you sure you want to remove this item from your wishlist?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Remove", 
          onPress: () => {
            setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId));
          }
        }
      ]
    );
  };

  const moveToCart = (item) => {
    Alert.alert(
      "Move to Cart",
      "Add this item to your shopping cart?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Move to Cart", 
          onPress: () => {
            // Here you would typically add the item to cart
            // For now, just show a success message
            Alert.alert("Success", "Item moved to cart successfully!");
          }
        }
      ]
    );
  };

  const renderWishlistItem = ({ item }) => (
    <TouchableOpacity 
      style={{
        width: (width - 36) / 2,
        marginBottom: 16,
      }}
      onPress={() => navigation.navigate('Product', { product: item })}
    >
      {/* Product Image with Remove Button */}
      <View style={{ position: 'relative' }}>
        <Image 
          source={{ uri: item.image }} 
          style={{ 
            width: '100%', 
            height: (width - 36) / 2,
            borderRadius: 8,
            resizeMode: 'cover',
            marginBottom: 8,
            opacity: item.inStock ? 1 : 0.7
          }}
        />
        {!item.inStock && (
          <View style={{ 
            position: 'absolute', 
            top: 8, 
            left: 8, 
            backgroundColor: 'rgba(255,0,0,0.8)', 
            paddingHorizontal: 8, 
            paddingVertical: 4, 
            borderRadius: 4 
          }}>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Out of Stock</Text>
          </View>
        )}
        <TouchableOpacity 
          style={{ 
            position: 'absolute', 
            top: 8, 
            right: 8, 
            backgroundColor: 'rgba(255,255,255,0.9)', 
            borderRadius: 20, 
            padding: 4 
          }}
          onPress={() => removeFromWishlist(item.id)}
        >
          <Icon name="favorite" size={20} color="#ff3b30" />
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

        {/* Artisan Info */}
        <Text style={{ fontSize: 12, color: '#666', marginBottom: 8 }} numberOfLines={1}>
          By {item.artisan}
        </Text>

        {/* Add to Cart Button */}
        <TouchableOpacity 
          style={{ 
            backgroundColor: item.inStock ? '#a0522d' : '#ccc',
            padding: 8,
            borderRadius: 6,
            alignItems: 'center'
          }}
          onPress={() => item.inStock && moveToCart(item)}
          disabled={!item.inStock}
        >
          <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const SortModal = () => (
    <Modal
      visible={showSortModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowSortModal(false)}
    >
      <TouchableWithoutFeedback onPress={() => setShowSortModal(false)}>
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
                { key: 'default', label: 'Recently Added' },
                { key: 'priceLowToHigh', label: 'Price: Low to High' },
                { key: 'priceHighToLow', label: 'Price: High to Low' },
                { key: 'rating', label: 'Customer Rating' },
                { key: 'name', label: 'Name' }
              ].map((option) => (
                <TouchableOpacity 
                  key={option.key}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}
                  onPress={() => { setSortOption(option.key); setShowSortModal(false); }}
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
            My Wishlist
          </Text>
          <TouchableOpacity onPress={() => setShowSortModal(true)} style={{ padding: 4 }}>
            <Icon name="sort" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Results Count */}
      <View style={{ backgroundColor: '#fff', padding: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}>
        <Text style={{ fontSize: 14, color: '#666' }}>
          {sortedWishlist.length} item{sortedWishlist.length !== 1 ? 's' : ''} in wishlist
        </Text>
      </View>

      {/* Wishlist Items */}
      <FlatList
        data={sortedWishlist}
        renderItem={renderWishlistItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
            <Icon name="favorite-border" size={48} color="#ccc" />
            <Text style={{ fontSize: 16, color: '#888', marginTop: 16, textAlign: 'center' }}>
              Your wishlist is empty
            </Text>
            <Text style={{ fontSize: 14, color: '#666', marginTop: 8, textAlign: 'center' }}>
              Start adding items you love!
            </Text>
            <TouchableOpacity 
              style={{ 
                backgroundColor: '#a0522d', 
                paddingHorizontal: 20, 
                paddingVertical: 12, 
                borderRadius: 8, 
                marginTop: 20 
              }}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <SortModal />
    </View>
  );
};

export default Wishlist;