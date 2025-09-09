import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from './StyleSheet/AppStyles';

const { width } = Dimensions.get('window');

const ArtisanProfile = ({ route, navigation }) => {
  const { artisan } = route.params;
  
  // Sample artisan data
  const [artisanData, setArtisanData] = useState({
    id: '1',
    name: artisan || 'Rajesh Meher',
    profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    coverPhoto: 'https://5.imimg.com/data5/ANDROID/Default/2020/11/CH/RM/AG/51816421/product-jpeg-500x500.jpg',
    craft: 'Master Weaver',
    location: 'Nuapatna, Odisha',
    experience: '25+ years',
    rating: 4.9,
    reviews: 128,
    completedOrders: 456,
    story: 'For three generations, my family has been weaving the finest silk sarees in Nuapatna. Each piece takes 15-20 days to complete, but the satisfaction of preserving our heritage is priceless. I learned this craft from my father and grandfather, and now I\'m teaching my children to continue this beautiful tradition.',
    techniques: ['Traditional Handloom', 'Ikkat Weaving', 'Natural Dyeing', 'Silk Processing'],
    awards: [
      'National Award for Handlooms (2018)',
      'Odisha State Craftsmanship Award (2015)',
      'Best Traditional Weaver (2012)'
    ],
    products: [
      {
        id: '1',
        name: 'Nuapatna Silk Saree',
        image: 'https://i0.wp.com/utkalikaodisha.com/wp-content/uploads/2024/12/Sp__dp6__silk_set304_trupti_side1__2024-12-19-16-42-2__4096X4096_optimized_550.jpg?resize=600%2C600&ssl=1',
        price: 12599,
        rating: 4.8,
        reviews: 89
      },
      {
        id: '2',
        name: 'Handloom Cotton Saree',
        image: 'https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/a/tr:h-400,w-300,cm-pad_resize/da4e416FBSRMH1897_1.jpg?rnd=20200526195200',
        price: 7850,
        rating: 4.6,
        reviews: 67
      },
      {
        id: '3',
        name: 'Traditional Ikkat Fabric',
        image: 'https://www.kiransboutique.com/wp-content/uploads/2021/12/1727221946985_Deep-Red-and-Gulabi-Ikat-Cotton-Suit-Material-%E2%80%93-Traditional-Charm-for-Everyday-Style.jpeg',
        price: 9500,
        rating: 4.9,
        reviews: 124
      },
      {
        id: '4',
        name: 'Embroidered Silk Dupatta',
        image: 'https://masakalee.com/cdn/shop/files/handmade-nakshi-kantha-dupatta-in-pure-silk-792495.jpg?v=1721673948',
        price: 6725,
        rating: 4.7,
        reviews: 56
      },
      {
        id: '5',
        name: 'Bomkai Cotton Saree',
        image: 'https://i0.wp.com/utkalikaodisha.com/wp-content/uploads/2023/05/bomkai-cotton-6__Bomkai-cotton-6__cotton_set309_kavya_side1_tassels__2023-5-12-11-29-57__1200X1200.jpg?fit=1200%2C1200&ssl=1',
        price: 8999,
        rating: 4.8,
        reviews: 78
      },
      {
        id: '6',
        name: 'Traditional Sambalpuri Saree',
        image: 'https://m.media-amazon.com/images/I/91-fS-tYAnL._UY1100_.jpg',
        price: 11250,
        rating: 4.9,
        reviews: 145
      }
    ]
  });

  const navigateToProduct = (product) => {
    navigation.navigate('Product', { 
      product: {
        ...product,
        artisan: artisanData.name,
        // colors: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'].map(color => ({ value: color })),
        // sizes: ['S', 'M', 'L', 'XL']
      }
    });
  };

  const renderProductItem = ({ item, index }) => (
    <TouchableOpacity 
      style={[
        AppStyles.handicraftCard,
        { 
          width: (width - 48) / 2, // Calculate width for 2 columns with proper padding
          marginRight: index % 2 === 0 ? 8 : 0,
          marginBottom: 16
        }
      ]}
      onPress={() => navigateToProduct(item)}
    >
      <Image source={{ uri: item.image }} style={AppStyles.handicraftImage} />
      <Text style={AppStyles.handicraftTitle} numberOfLines={1}>{item.name}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Icon name="star" size={14} color="#FFD700" />
        <Text style={{ fontSize: 12, color: '#666', marginLeft: 4 }}>
          {item.rating} ({item.reviews})
        </Text>
      </View>
      <Text style={AppStyles.handicraftPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={AppStyles.container}>
      {/* Header */}
      <View style={AppStyles.headerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 4 }}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={[AppStyles.profileHeaderTitle, { fontSize: 18 }]} numberOfLines={1}>
            Artisan Profile
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Photo */}
        <Image 
          source={{ uri: artisanData.coverPhoto }} 
          style={{ width: '100%', height: 200 }}
          resizeMode="cover"
        />

        {/* Profile Header */}
        <View style={{ padding: 16, backgroundColor: '#fff' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
            <Image 
              source={{ uri: artisanData.profilePic }} 
              style={{ width: 80, height: 80, borderRadius: 40, marginRight: 16 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 4 }}>
                {artisanData.name}
              </Text>
              <Text style={{ fontSize: 16, color: '#a0522d', marginBottom: 4 }}>
                {artisanData.craft}
              </Text>
              <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
                <Icon name="location-on" size={14} color="#666" /> {artisanData.location}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text style={{ fontSize: 14, color: '#666', marginLeft: 4 }}>
                    {artisanData.rating} ({artisanData.reviews} reviews)
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="work" size={16} color="#666" />
                  <Text style={{ fontSize: 14, color: '#666', marginLeft: 4 }}>
                    {artisanData.experience} experience
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#a0522d' }}>
                {artisanData.completedOrders}+
              </Text>
              <Text style={{ fontSize: 14, color: '#666' }}>Orders Completed</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#a0522d' }}>
                {artisanData.experience}
              </Text>
              <Text style={{ fontSize: 14, color: '#666' }}>Experience</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#a0522d' }}>
                {artisanData.rating}/5
              </Text>
              <Text style={{ fontSize: 14, color: '#666' }}>Rating</Text>
            </View>
          </View>
        </View>

        {/* Artisan Story */}
        <View style={AppStyles.productDetailsContainer}>
          <Text style={AppStyles.productSectionTitle}>My Story</Text>
          <Text style={[AppStyles.productDescription, { lineHeight: 24 }]}>
            {artisanData.story}
          </Text>
        </View>

        {/* Techniques */}
        <View style={AppStyles.productDetailsContainer}>
          <Text style={AppStyles.productSectionTitle}>Specialized Techniques</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
            {artisanData.techniques.map((technique, index) => (
              <View key={index} style={{ 
                backgroundColor: '#FAECE0', 
                paddingHorizontal: 12, 
                paddingVertical: 6, 
                borderRadius: 16, 
                marginRight: 8, 
                marginBottom: 8 
              }}>
                <Text style={{ color: '#a0522d', fontSize: 12, fontWeight: '500' }}>
                  {technique}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Awards & Recognition */}
        <View style={AppStyles.productDetailsContainer}>
          <Text style={AppStyles.productSectionTitle}>Awards & Recognition</Text>
          {artisanData.awards.map((award, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Icon name="emoji-events" size={20} color="#a0522d" />
              <Text style={{ marginLeft: 12, fontSize: 14, color: '#666', flex: 1 }}>
                {award}
              </Text>
            </View>
          ))}
        </View>

        {/* Artisan's Creations */}
        <View style={[AppStyles.productDetailsContainer, { marginBottom: 20 }]}>
          <View style={AppStyles.sectionHeader}>
            <Text style={AppStyles.productSectionTitle}>Artisan's Creations</Text>
            <TouchableOpacity>
              <Text style={{ color: '#a0522d', fontSize: 14, fontWeight: '500' }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={artisanData.products}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingVertical: 8 }}
          />
        </View>

        {/* Contact & Follow */}
        {/* <View style={[AppStyles.productDetailsContainer, { marginBottom: 20 }]}>
          <Text style={AppStyles.productSectionTitle}>Connect with {artisanData.name.split(' ')[0]}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 16 }}>
            <TouchableOpacity style={[AppStyles.productCartButton, { flex: 1, marginRight: 8 }]}>
              <Icon name="message" size={20} color="#a0522d" />
              <Text style={AppStyles.productCartButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[AppStyles.productBuyButton, { flex: 1, marginLeft: 8 }]}>
              <Icon name="videocam" size={20} color="#fff" />
              <Text style={AppStyles.productBuyButtonText}>Video Call</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default ArtisanProfile;