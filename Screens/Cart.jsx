import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from './StyleSheet/AppStyles';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Cart = ({ navigation, route }) => {
  // Sample Odisha handicraft products
  const odishaHandicrafts = [
    {
      id: '1',
      name: 'Pattachitra Painting',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400',
      quantity: 1,
      artisan: 'Master Pattachitra Artist',
      selectedColor: 'Traditional Colors',
      rating: 4.8,
      reviews: 124
    },
    {
      id: '2',
      name: 'Silver Filigree Work',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1605108721178-97a9514c0b94?w=400',
      quantity: 2,
      artisan: 'Cuttack Silver Artisan',
      selectedSize: 'Medium',
      rating: 4.9,
      reviews: 89
    },
    {
      id: '3',
      name: 'Dhokra Metal Craft',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400',
      quantity: 1,
      artisan: 'Tribal Dhokra Artist',
      selectedColor: 'Antique Bronze',
      rating: 4.7,
      reviews: 156
    },
    {
      id: '4',
      name: 'Palm Leaf Engraving',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
      quantity: 3,
      artisan: 'Puri Palm Leaf Artist',
      selectedSize: 'Large',
      rating: 4.6,
      reviews: 67
    }
  ];

  // State for cart items
  const [cartItems, setCartItems] = useState(odishaHandicrafts);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(50);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // Check if a product was added from the Product page
  useEffect(() => {
    if (route.params?.product) {
      const newProduct = {
        ...route.params.product,
        quantity: route.params.quantity || 1,
        selectedColor: route.params.selectedColor || null,
        selectedSize: route.params.selectedSize || null,
        id: Date.now().toString(), // Unique ID for the cart item
      };
      
      setCartItems(prevItems => [...prevItems, newProduct]);
    }
  }, [route.params]);

  // Calculate prices whenever cart items change
  useEffect(() => {
    calculatePrices();
  }, [cartItems]);

  const calculatePrices = () => {
    // Calculate subtotal
    const newSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(newSubtotal);
    
    // Calculate tax (10% of subtotal)
    const newTax = newSubtotal * 0.1;
    setTax(newTax);
    
    // Calculate total
    const newTotal = newSubtotal + newTax + deliveryCharge;
    setTotal(newTotal);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Remove", 
          onPress: () => {
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Your cart is empty", "Add some items to proceed to checkout");
      return;
    }
    
    // Navigate to checkout screen with cart data
    navigation.navigate('Checkout', { 
      cartItems, 
      subtotal, 
      tax, 
      deliveryCharge, 
      total 
    });
  };

  const continueShopping = () => {
    navigation.navigate('Home');
  };

  const renderCartItem = ({ item }) => (
    <View style={AppStyles.cartItem}>
      <Image source={{ uri: item.image }} style={AppStyles.cartItemImage} />
      
      <View style={AppStyles.cartItemDetails}>
        <Text style={AppStyles.cartItemName} numberOfLines={2}>{item.name}</Text>
        
        <View style={AppStyles.ratingContainer}>
          <Icon name="star" size={14} color="#FFD700" />
          <Text style={AppStyles.ratingText}>{item.rating}</Text>
          <Text style={AppStyles.reviewsText}>({item.reviews} reviews)</Text>
        </View>
        
        <Text style={AppStyles.artisanText}>By {item.artisan}</Text>
        
        {item.selectedColor && (
          <Text style={AppStyles.cartItemOption}>
            Color: {item.selectedColor}
          </Text>
        )}
        
        {item.selectedSize && (
          <Text style={AppStyles.cartItemOption}>
            Size: {item.selectedSize}
          </Text>
        )}
        
        <Text style={AppStyles.cartItemPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
        
        <View style={AppStyles.cartItemActions}>
          <View style={AppStyles.quantityContainer}>
            <TouchableOpacity 
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
              style={AppStyles.quantityButton}
            >
              <Icon name="remove" size={18} color="#333" />
            </TouchableOpacity>
            
            <Text style={AppStyles.quantityText}>{item.quantity}</Text>
            
            <TouchableOpacity 
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
              style={AppStyles.quantityButton}
            >
              <Icon name="add" size={18} color="#333" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            onPress={() => removeItem(item.id)}
            style={AppStyles.removeButton}
          >
            <Icon name="delete-outline" size={20} color="#a0522d" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={AppStyles.container}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={AppStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={AppStyles.headerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 4 }}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={[AppStyles.profileHeaderTitle, { fontSize: 18 }]}>
            My Cart ({cartItems.length})
          </Text>
          <TouchableOpacity style={{ padding: 4 }}>
            <Icon name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      </SafeAreaView>
        
     
      

      {cartItems.length === 0 ? (
        // Empty cart state
        <View style={AppStyles.emptyCartContainer}>
          <Icon name="remove-shopping-cart" size={80} color="#ddd" />
          <Text style={AppStyles.emptyCartText}>Your cart is empty</Text>
          <Text style={AppStyles.emptyCartSubtext}>
            Looks like you haven't added anything to your cart yet
          </Text>
          <TouchableOpacity 
            style={AppStyles.continueShoppingButton}
            onPress={continueShopping}
          >
            <Text style={AppStyles.continueShoppingText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {/* Cart Items List */}
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id}
            contentContainerStyle={AppStyles.cartItemsContainer}
            showsVerticalScrollIndicator={false}
          />
          
          {/* Price Summary */}
          <View style={AppStyles.priceSummary}>
            <Text style={AppStyles.summaryTitle}>Order Summary</Text>
            
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
              <Text style={AppStyles.totalLabel}>Total</Text>
              <Text style={AppStyles.totalValue}>₹{total.toLocaleString('en-IN')}</Text>
            </View>
          </View>
          
          {/* Checkout Button */}
          <View style={AppStyles.cartFooter}>
            <TouchableOpacity 
              style={AppStyles.checkoutButton}
              onPress={proceedToCheckout}
            >
              <Text style={AppStyles.checkoutButtonText}>
                Proceed to Checkout (₹{total.toLocaleString('en-IN')})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Cart;