import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../Screens/Component/Header';
import BottomNavBar from '../Screens/Component/BottomNavBar';
import AppStyles from './StyleSheet/AppStyles';
import { StatusBar } from "react-native";

const HomePage = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [userAddress, setUserAddress] = useState('123 Main Street, New York, NY 10001');
  const [currentSlide, setCurrentSlide] = useState(0);
  const insets = useSafeAreaInsets();

  // Sample images for the slideshow (replace with your actual image URLs)
  const slides = [
    { id: 1, image: 'https://www.shutterstock.com/shutterstock/photos/1429995848/display_1500/stock-photo-raghurajpur-odissa-april-the-colourful-mask-made-by-the-craftsman-of-raghurajpur-of-1429995848.jpg', title: 'Summer Collection' },
    { id: 2, image: 'https://www.shutterstock.com/shutterstock/photos/1287733432/display_1500/stock-photo-kumbakonam-india-september-nageshwara-temple-ceiling-ornament-1287733432.jpg', title: 'New Arrivals' },
    { id: 3, image: 'https://goswadeshi.in/cdn/shop/files/191__1.jpg?v=1747811542&width=1800', title: 'Special Offers' },
    { id: 4, image: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Chandua_%28Applique%29_art%29.jpg', title: 'Limited Edition' },
  ];

  // Handicraft images for different sections
  const handicrafts = {
    newArrivals: [
      { id: 1, image: 'https://kashmirobserver.net/wp-content/uploads/2024/11/Kashmriri-Shawl.jpeg', title: 'Handwoven Shawl', price: '$45.99' },
      { id: 2, image: 'https://m.media-amazon.com/images/I/71F90YRir5L._UF894,1000_QL80_.jpg', title: 'Pottery Vase', price: '$32.50' },
      { id: 3, image: 'https://content.jdmagicbox.com/comp/thrissur/x1/9999px487.x487.170209230459.f5x1/catalogue/laxmisri-handicrafts-cherpu-thrissur-mirror-frame-manufacturers-b0mp6300p8.jpg', title: 'Wooden Sculpture', price: '$67.99' },
      { id: 4, image: 'https://www.ethicaonline.com/wp-content/uploads/2020/04/Round-Basket-1.jpg', title: 'Bamboo Basket', price: '$28.75' },
    ],
    bestSellers: [
      { id: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-zTnKArBJl4X8zFsEy5KVTUMFPorOCkWv0w&s', title: 'Handmade Jewelry', price: '$55.00' },
      { id: 2, image: 'https://i.etsystatic.com/46565803/c/2542/2023/357/703/il/c4a06c/5964308259/il_340x270.5964308259_plki.jpg', title: 'Embroidered Cushion', price: '$39.99' },
      { id: 3, image: 'https://m.media-amazon.com/images/I/81Ro3NKXzcL._UF894,1000_QL80_.jpg', title: 'Ceramic Tea Set', price: '$89.50' },
      { id: 4, image: 'https://5.imimg.com/data5/OF/GH/MY-7610375/handmade-men-s-short-leather-wallet-500x500.jpg', title: 'Leather Wallet', price: '$42.25' },
    ],
    festiveCollections: [
      { id: 1, image: 'https://w0.peakpx.com/wallpaper/743/437/HD-wallpaper-lantern-chinese-holiday.jpg', title: 'Festive Lantern', price: '$38.99' },
      { id: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS86VT5_kxEQS0QNRWyfHUN4TzKjzifJLG-ZA&s', title: 'Decorative Mask', price: '$47.50' },
      { id: 3, image: 'https://shop.gaatha.com/image/catalog/Gaatha/07-jhabua-cotton-fabric-doll-(2).jpg', title: 'Traditional Doll', price: '$29.99' },
      { id: 4, image: 'https://images-eu.ssl-images-amazon.com/images/I/71HZm8WqiKL._AC_UL600_SR600,600_.jpg', title: 'Festive Garland', price: '$35.75' },
    ],
    nuapatnaLooms: [
      { id: 1, image: 'https://themagicroom.in/wp-content/uploads/2025/04/Nuapatna-Ikat-Silk-Saree-6.5.jpg', title: 'Nuapatna Silk Saree', price: '$125.99' },
      { id: 2, image: 'https://5.imimg.com/data5/ANDROID/Default/2024/3/398366892/QQ/MH/WU/128591487/product-jpeg-500x500.jpg', title: 'Handloom Cotton', price: '$78.50' },
      { id: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMc3W6hMygMuUJSkbgik9jIEKdDwqHT5pTxQ&s', title: 'Traditional Weave', price: '$95.00' },
      { id: 4, image: 'https://i.etsystatic.com/25244072/r/il/f3ef66/5665663707/il_570xN.5665663707_7vgj.jpg', title: 'Embroidered Fabric', price: '$67.25' },
    ]
  };

  // Artisan stories data
  const artisanStories = [
    {
      id: 1,
      name: 'Rajesh Meher',
      craft: 'Master Weaver',
      location: 'Nuapatna, Odisha',
      profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      story: 'For three generations, my family has been weaving the finest silk sarees. Each piece takes 15-20 days to complete, but the satisfaction of preserving our heritage is priceless.',
      years: '25+ years experience'
    },
    {
      id: 2,
      name: 'Laxmi Devi',
      craft: 'Pottery Artist',
      location: 'Bhubaneswar, Odisha',
      profilePic: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      story: 'I started learning pottery from my grandmother when I was just 8 years old. Now, I teach young women in my village this ancient craft, empowering them through art.',
      years: '18 years experience'
    },
    {
      id: 3,
      name: 'Anil Patra',
      craft: 'Wood Carver',
      location: 'Puri, Odisha',
      profilePic: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      story: 'Every piece of wood tells a story. I listen to the grain and let it guide my chisel. My work reflects our Odisha culture and mythology, keeping our stories alive.',
      years: '30+ years experience'
    }
  ];

  useEffect(() => {
    // Auto-advance the slideshow every 3 seconds
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = (searchText) => {
    console.log('Searching for:', searchText);
  };

  const handleAddressPress = () => {
    console.log('Address pressed');
  };

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    console.log('Navigating to:', tabId);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Function to navigate to ProductList
  const navigateToProductList = (categoryName, products) => {
    navigation.navigate('ProductList', { 
      products: products.map(product => ({
        id: product.id,
        name: product.title,
        image: product.image,
        artisan: 'Local Artisan', // Add default artisan name
      })),
      categoryName 
    });
  };

  // Function to navigate to Product page
  const navigateToProduct = (product) => {
    navigation.navigate('Product', { 
      product: {
        id: product.id,
        name: product.title,
        image: product.image,
        price: parseFloat(product.price.replace('$', '')) * 100, // Convert to number (assuming $1 = ₹100)
        rating: (Math.random() * 5).toFixed(1), // Random rating between 0-5
        reviews: Math.floor(Math.random() * 1000), // Random number of reviews
        artisan: 'Local Artisan', // Default artisan name
        // colors: ['#FF5733', '#33FF57', '#3357FF'].map(color => ({ value: color })), // Mock colors
        // sizes: ['S', 'M', 'L', 'XL'] // Mock sizes
      }
    });
  };

  const renderNewArrivalsSection = () => {
    const [featuredProduct, ...otherProducts] = handicrafts.newArrivals;
    
    return (
      <View style={AppStyles.sectionContainer}>
        <View style={AppStyles.sectionHeader}>
          <Text style={AppStyles.sectionTitleWithArrow}>New Arrivals</Text>
          <TouchableOpacity 
            style={AppStyles.arrowIcon}
            onPress={() => navigateToProductList('New Arrivals', handicrafts.newArrivals)}
          >
            <Icon name="arrow-forward" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        
        {/* Featured Product (Rectangle) */}
        <TouchableOpacity 
          style={AppStyles.featuredProductCard}
          onPress={() => navigateToProduct(featuredProduct)}
        >
          <Image source={{ uri: featuredProduct.image }} style={AppStyles.featuredProductImage} />
          <View style={AppStyles.featuredProductOverlay}>
            <Text style={AppStyles.featuredProductTitle}>{featuredProduct.title}</Text>
            <Text style={AppStyles.featuredProductPrice}>{featuredProduct.price}</Text>
          </View>
        </TouchableOpacity>
        
        {/* Other Products (Horizontal) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={AppStyles.horizontalScroll}>
          {otherProducts.map((product) => (
            <TouchableOpacity 
              key={product.id} 
              style={AppStyles.horizontalProductCard}
              onPress={() => navigateToProduct(product)}
            >
              <Image source={{ uri: product.image }} style={AppStyles.horizontalProductImage} />
              <View style={AppStyles.horizontalProductOverlay}>
                <Text style={AppStyles.horizontalProductTitle}>{product.title}</Text>
                <Text style={AppStyles.horizontalProductPrice}>{product.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderProductSection = (title, products) => (
    <View style={AppStyles.sectionContainer}>
      <View style={AppStyles.sectionHeader}>
        <Text style={AppStyles.sectionTitleWithArrow}>{title}</Text>
        <TouchableOpacity 
          style={AppStyles.arrowIcon}
          onPress={() => navigateToProductList(title, products)}
        >
          <Icon name="arrow-forward" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={AppStyles.horizontalScroll}>
        {products.map((product) => (
          <TouchableOpacity 
            key={product.id} 
            style={AppStyles.handicraftCard}
            onPress={() => navigateToProduct(product)}
          >
            <Image source={{ uri: product.image }} style={AppStyles.handicraftImage} />
            <Text style={AppStyles.handicraftTitle} numberOfLines={1}>{product.title}</Text>
            <Text style={AppStyles.handicraftPrice}>{product.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderArtisanStory = (artisan) => (
  <TouchableOpacity 
    key={artisan.id} 
    style={AppStyles.artisanCard}
    onPress={() => navigation.navigate('ArtisanProfile', { artisan: artisan.name })}
  >
    <View style={AppStyles.artisanHeader}>
      <Image source={{ uri: artisan.profilePic }} style={AppStyles.artisanImage} />
      <View style={AppStyles.artisanInfo}>
        <Text style={AppStyles.artisanName}>{artisan.name}</Text>
        <Text style={AppStyles.artisanCraft}>{artisan.craft}</Text>
        <Text style={AppStyles.artisanLocation}>{artisan.location}</Text>
        <Text style={AppStyles.artisanYears}>{artisan.years}</Text>
      </View>
    </View>
    <Text style={AppStyles.artisanStory}>{artisan.story}</Text>
  </TouchableOpacity>
);

  return (

    <>
  <StatusBar
    translucent
    backgroundColor="transparent"
    barStyle="light-content" // because your header has a dark gradient
  />
    <View style={[AppStyles.container, { 
      // paddingTop: insets.top,
      // paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right 
    }]}>
      <Header
        userAddress={userAddress}
        onSearch={handleSearch}
        onAddressPress={handleAddressPress}
      />
      
      <ScrollView style={AppStyles.content}>
        {/* Image Slideshow */}
        <View style={AppStyles.slideshowContainer}>
          <View style={AppStyles.slide}>
            <Image 
              source={{ uri: slides[currentSlide].image }} 
              style={AppStyles.slideImage}
              resizeMode="cover"
            />
            <Text style={AppStyles.slideTitle}>{slides[currentSlide].title}</Text>
            
            {/* Navigation Arrows */}
            <TouchableOpacity style={[AppStyles.arrow, AppStyles.leftArrow]} onPress={goToPrevSlide}>
              <Text style={AppStyles.arrowText}>‹</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[AppStyles.arrow, AppStyles.rightArrow]} onPress={goToNextSlide}>
              <Text style={AppStyles.arrowText}>›</Text>
            </TouchableOpacity>
            
            {/* Dots Indicator */}
            <View style={AppStyles.dotsContainer}>
              {slides.map((_, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[
                    AppStyles.dot, 
                    index === currentSlide ? AppStyles.activeDot : AppStyles.inactiveDot
                  ]} 
                  onPress={() => goToSlide(index)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* New Arrivals Section with special layout */}
        {renderNewArrivalsSection()}
        
        {/* Best Sellers Section */}
        {renderProductSection("Best Sellers", handicrafts.bestSellers)}
        
        {/* Festive Collections Section */}
        {renderProductSection("Festive Collections", handicrafts.festiveCollections)}
        
        {/* From the looms of Nuapatna Section */}
        {renderProductSection("From the looms of Nuapatna", handicrafts.nuapatnaLooms)}

        {/* Artisan Stories Section */}
        <View style={AppStyles.sectionContainer}>
          <View style={AppStyles.sectionHeader}>
            <Text style={AppStyles.sectionTitleWithArrow}>Artisan Stories</Text>
            <TouchableOpacity 
              style={AppStyles.arrowIcon}
              onPress={() => navigation.navigate('ArtisanBlog')}
            >
              <Icon name="arrow-forward" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={AppStyles.artisanStoriesContainer}>
            {artisanStories.map(renderArtisanStory)}
          </View>
        </View>
      </ScrollView>

      {/* <BottomNavBar
        activeTab={activeTab}
        onTabPress={handleTabPress}
      /> */}
    </View>
    </>
  );
};

export default HomePage;