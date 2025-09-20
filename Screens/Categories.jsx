import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from './StyleSheet/AppStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const Categories = ({ navigation }) => {
  // Odisha handicraft categories
  const categories = [
    {
      id: 'all',
      name: 'All Crafts',
      icon: 'dashboard',
      color: '#1E4D92'
    },
    {
      id: 'pattachitra',
      name: 'Pattachitra',
      icon: 'palette',
      color: '#FF6B6B'
    },
    {
      id: 'stone',
      name: 'Stone Carving',
      icon: 'architecture',
      color: '#4ECDC4'
    },
    {
      id: 'silver',
      name: 'Silver Filigree',
      icon: 'diamond',
      color: '#45B7D1'
    },
    {
      id: 'horn',
      name: 'Horn Work',
      icon: 'pets',
      color: '#F9A826'
    },
    {
      id: 'wood',
      name: 'Wood Carving',
      icon: 'content-cut',
      color: '#8E44AD'
    },
    {
      id: 'textile',
      name: 'Textiles',
      icon: 'style',
      color: '#E84393'
    },
    {
      id: 'terracotta',
      name: 'Terracotta',
      icon: 'ceramics',
      color: '#D35400'
    }
  ];

  // Sample handicraft products from Odisha
  const handicrafts = [
    {
      id: '1',
      name: 'Traditional Pattachitra Painting',
      category: 'pattachitra',
      image: 'https://s3.amazonaws.com/megastores-prod-bucket/images/product-images/CO-Handicrafts_&_Fashion/SE-Kitchenware/CA-Tableware_&_Dinnerware/7B0B-QU1I-MQIM-O6N6/real-images/Hand%20Painted%20Pattachitra%20Wooden%20Tray%20by%20The%20India%20Craft%20Project1651242279290.jpg',
      description: 'Handmade traditional painting on cloth depicting mythological scenes',
      artisan: 'Master Artist from Raghurajpur'
    },
    {
      id: '2',
      name: 'Silver Filigree Jewelry Set',
      category: 'silver',
      image: 'https://img.faballey.com/images/Product/12441036/4.jpg',
      description: 'Exquisite silver filigree work from Cuttack',
      artisan: 'Cuttack Silver Craftsman'
    },
    {
      id: '3',
      name: 'Stone Carved Buddha Statue',
      category: 'stone',
      image: 'https://vintagebihar.com/cdn/shop/products/1_02a753f9-ee04-4de9-bf28-5109a67d7d66_533x.png?v=1672296785',
      description: 'Hand-carved stone statue from Odisha tradition',
      artisan: 'Stone Artisan from Puri'
    },
    {
      id: '4',
      name: 'Horn Work Decorative Piece',
      category: 'horn',
      image: 'https://theheritageartifacts.com/cdn/shop/products/THA007HR_700x934.jpg?v=1678686839',
      description: 'Intricate horn work craftsmanship',
      artisan: 'Horn Craft Specialist'
    },
    {
      id: '5',
      name: 'Wooden Tribal Mask',
      category: 'wood',
      image: 'https://m.media-amazon.com/images/I/61-l7NCLBEL._UF894,1000_QL80_.jpg',
      description: 'Traditional wooden tribal masks from Odisha',
      artisan: 'Tribal Wood Carver'
    },
    {
      id: '6',
      name: 'Sambalpuri Silk Saree',
      category: 'textile',
      image: 'https://www.indianvillez.com/cdn/shop/collections/851c575f507678e0cef4c77690fba8b1.jpg?v=1692000344',
      description: 'Authentic Sambalpuri handloom silk saree',
      artisan: 'Sambalpuri Weaver'
    },
    {
      id: '7',
      name: 'Terracotta Horse',
      category: 'terracotta',
      image: 'https://m.media-amazon.com/images/I/71fJ0mgQr-L.jpg',
      description: 'Traditional terracotta horse sculpture',
      artisan: 'Clay Artist from Odisha'
    },
    {
      id: '8',
      name: 'Palm Leaf Engraving',
      category: 'pattachitra',
      image: 'https://m.media-amazon.com/images/I/71jG+rQPj8L._UF1000,1000_QL80_.jpg',
      description: 'Ancient palm leaf engraving art',
      artisan: 'Palm Leaf Artisan'
    }
  ];

  const handleCategoryPress = (categoryId) => {
    // Filter products based on selected category
    const filteredProducts = categoryId === 'all' 
      ? handicrafts 
      : handicrafts.filter(item => item.category === categoryId);
    
    // Navigate to ProductList with the filtered products and category name
    navigation.navigate('ProductList', { 
      products: filteredProducts,
      categoryName: categories.find(cat => cat.id === categoryId)?.name || 'All Crafts'
    });
  };

  const handleProductPress = (product) => {
    // Navigate to ProductList with all products of the same category
    const categoryProducts = handicrafts.filter(item => item.category === product.category);
    
    navigation.navigate('ProductList', { 
      products: categoryProducts,
      categoryName: categories.find(cat => cat.id === product.category)?.name || 'Crafts'
    });
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
          padding: 12,
          borderRadius: 25,
          marginHorizontal: 6,
          marginBottom: 12,
          minWidth: 110,
          borderWidth: 2,
          borderColor: 'transparent',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 2,
        }
      ]}
      onPress={() => handleCategoryPress(item.id)}
    >
      <Icon 
        name={item.icon} 
        size={18} 
        color={item.color} 
        style={{ marginRight: 6 }}
      />
      <Text style={[
        {
          fontSize: 12,
          fontWeight: '600',
          color: item.color,
        }
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Show only featured products on the main screen
  const featuredHandicrafts = handicrafts.slice(0, 4);

  const renderHandicraftItem = ({ item }) => (
    <View style={{ width: '48%', marginBottom: 16 }}>
      <TouchableOpacity 
        style={[
          AppStyles.handicraftCard,
          { 
            padding: 0,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#f0f0f0',
            margin: 0,
            width: '100%'
          }
        ]}
        onPress={() => handleProductPress(item)}
      >
        <Image 
          source={{ uri: item.image }} 
          style={[AppStyles.handicraftImage, { borderTopLeftRadius: 8, borderTopRightRadius: 8 }]}
          resizeMode="cover"
        />
        <View style={{ padding: 12 }}>
          <Text style={[AppStyles.handicraftTitle, { fontSize: 14, lineHeight: 18, marginBottom: 6 }]} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 11, color: '#666', marginBottom: 4 }} numberOfLines={1}>
            By {item.artisan}
          </Text>
          <View style={{ 
            backgroundColor: categories.find(cat => cat.id === item.category)?.color + '20',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
            alignSelf: 'flex-start'
          }}>
            <Text style={{ 
              fontSize: 10, 
              color: categories.find(cat => cat.id === item.category)?.color,
              fontWeight: '600'
            }}>
              {categories.find(cat => cat.id === item.category)?.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={AppStyles.container}>
      <SafeAreaView edges={['top']} style={AppStyles.safeArea} >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={AppStyles.headerContainer}>
        <Text style={[AppStyles.profileHeaderTitle, { fontSize: 22 }]}>Odisha Handicrafts</Text>
        
      </View>
      </SafeAreaView>
      {/* Header */}
      

      <ScrollView style={AppStyles.profileContent}>
        {/* Categories Filter */}
        <View style={{ marginBottom: 24, paddingHorizontal: 8 }}>
          <Text style={[AppStyles.sectionTitle, { marginBottom: 16, paddingHorizontal: 8 }]}>Explore Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
          />
        </View>

        {/* Featured Handicrafts */}
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={[AppStyles.sectionTitle, { marginBottom: 16 }]}>
            Featured Handicrafts
          </Text>
          
          <FlatList
            data={featuredHandicrafts}
            renderItem={renderHandicraftItem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={{ 
              justifyContent: 'space-between',
              gap: 16,
              marginBottom: 16
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ 
              paddingBottom: 30,
              paddingHorizontal: 0
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;