import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  StatusBar,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from './StyleSheet/AppStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const ArtisanProfile = ({ route, navigation }) => {
  const { artisan } = route.params;
  
  const [artisanData, setArtisanData] = useState({
    id: '1',
    shopName: 'Heritage Weaves',
    name: artisan || 'Rajesh Meher',
    profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    coverPhoto: 'https://5.imimg.com/data5/ANDROID/Default/2020/11/CH/RM/AG/51816421/product-jpeg-500x500.jpg',
    craft: 'Master Weaver',
    location: 'Nuapatna, Odisha',
    experience: '25+ years',
    rating: 4.9,
    reviews: 128,
    completedOrders: 456,
    aboutShop: 'Heritage Weaves is a family-run establishment with three generations of expertise in traditional Odisha handloom. We specialize in authentic Sambalpuri, Bomkai, and Nuapatna silk sarees, using techniques passed down through generations.',
    shippingPolicy: '• Orders are processed within 1-2 business days\n• Free shipping on orders above ₹5000\n• Delivery within 7-10 business days across India\n• International shipping available with additional charges',
    returnPolicy: '• 7-day return policy for defective products\n• Products must be in original condition with tags attached\n• Return shipping costs are borne by the customer\n• Refunds are processed within 5-7 business days',
    contactInfo: {
      phone: '+91 9876543210',
      email: 'heritageweaves@example.com',
      hours: 'Mon-Sat: 10AM - 7PM'
    },
    feedbacks: [
      {
        id: '1',
        customer: 'Priya Sharma',
        rating: 5,
        comment: 'Excellent craftsmanship! The saree was even more beautiful in person. Perfect stitching and color.',
        date: '2 weeks ago',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '2',
        customer: 'Anjali Patel',
        rating: 4,
        comment: 'Beautiful product but delivery was slightly delayed. Quality is exceptional though!',
        date: '1 month ago',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '3',
        customer: 'Rahul Verma',
        rating: 5,
        comment: 'Authentic handloom work. Will definitely purchase again from Heritage Weaves.',
        date: '2 months ago',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '4',
        customer: 'Sneha Desai',
        rating: 3,
        comment: 'Product quality was good but the color was slightly different from the picture.',
        date: '3 months ago',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    products: [
      {
        id: '1',
        name: 'Nuapatna Silk Saree',
        image: 'https://i0.wp.com/utkalikaodisha.com/wp-content/uploads/2024/12/Sp__dp6__silk_set304_trupti_side1__2024-12-19-16-42-2__4096X4096_optimized_550.jpg?resize=600%2C600&ssl=1',
        price: 12599,
        rating: 4.8,
        reviews: 89,
        artisan: 'Rajesh Meher'
      },
      {
        id: '2',
        name: 'Handloom Cotton Saree',
        image: 'https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/a/tr:h-400,w-300,cm-pad_resize/da4e416FBSRMH1897_1.jpg?rnd=20200526195200',
        price: 7850,
        rating: 4.6,
        reviews: 67,
        artisan: 'Rajesh Meher'
      },
      {
        id: '3',
        name: 'Traditional Ikkat Fabric',
        image: 'https://www.kiransboutique.com/wp-content/uploads/2021/12/1727221946985_Deep-Red-and-Gulabi-Ikat-Cotton-Suit-Material-%E2%80%93-Traditional-Charm-for-Everyday-Style.jpeg',
        price: 9500,
        rating: 4.9,
        reviews: 124,
        artisan: 'Rajesh Meher'
      },
      {
        id: '4',
        name: 'Embroidered Silk Dupatta',
        image: 'https://masakalee.com/cdn/shop/files/handmade-nakshi-kantha-dupatta-in-pure-silk-792495.jpg?v=1721673948',
        price: 6725,
        rating: 4.7,
        reviews: 56,
        artisan: 'Rajesh Meher'
      }
    ]
  });

  // State for modals and user input
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState('all');
  const [userQuestion, setUserQuestion] = useState('');
  const [userReview, setUserReview] = useState({
    rating: 0,
    comment: ''
  });

  const navigateToProduct = (product) => {
    navigation.navigate('Product', { 
      product: {
        ...product,
        artisan: artisanData.name,
      }
    });
  };

  const navigateToProductList = () => {
    navigation.navigate('ProductList', {
      products: artisanData.products,
      categoryName: `${artisanData.shopName} Products`
    });
  };

  const renderProductItem = ({ item, index }) => (
    <TouchableOpacity 
      style={[
        AppStyles.handicraftCard,
        { 
          width: (width - 48) / 2,
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

  const renderRatingStars = (rating, size = 16) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Icon key={i} name="star" size={size} color="#FFD700" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Icon key={i} name="star-half" size={size} color="#FFD700" />);
      } else {
        stars.push(<Icon key={i} name="star-outline" size={size} color="#FFD700" />);
      }
    }
    
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  const renderFeedbackItem = ({ item }) => (
    <View style={AppStyles.feedbackItem}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Image source={{ uri: item.avatar }} style={AppStyles.avatar} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{item.customer}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            {renderRatingStars(item.rating)}
            <Text style={{ marginLeft: 8, fontSize: 12, color: '#666' }}>{item.date}</Text>
          </View>
        </View>
      </View>
      <Text style={{ fontSize: 14, color: '#333', lineHeight: 20 }}>{item.comment}</Text>
    </View>
  );

  // Filter feedbacks based on rating
  const filteredFeedbacks = selectedRatingFilter === 'all' 
    ? artisanData.feedbacks 
    : artisanData.feedbacks.filter(fb => Math.floor(fb.rating) === parseInt(selectedRatingFilter));

  // Handle submitting a question
  const handleSubmitQuestion = () => {
    if (userQuestion.trim()) {
      // Here you would typically send the question to your backend
      alert('Your question has been submitted to the seller!');
      setUserQuestion('');
      setQuestionModalVisible(false);
    }
  };

  // Handle submitting a review
  const handleSubmitReview = () => {
    if (userReview.rating > 0 && userReview.comment.trim()) {
      // Here you would typically send the review to your backend
      alert('Thank you for your feedback!');
      setUserReview({ rating: 0, comment: '' });
    }
  };

  // Render the rating filter buttons
  const renderRatingFilters = () => (
    <View style={AppStyles.filterContainer}>
      <Text style={AppStyles.filterTitle}>Filter by rating:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={AppStyles.filterScroll}>
        <TouchableOpacity 
          style={[AppStyles.filterButton, selectedRatingFilter === 'all' && AppStyles.filterButtonActive]}
          onPress={() => setSelectedRatingFilter('all')}
        >
          <Text style={[AppStyles.filterText, selectedRatingFilter === 'all' && AppStyles.filterTextActive]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[AppStyles.filterButton, selectedRatingFilter === '5' && AppStyles.filterButtonActive]}
          onPress={() => setSelectedRatingFilter('5')}
        >
          <Text style={[AppStyles.filterText, selectedRatingFilter === '5' && AppStyles.filterTextActive]}>5 Stars</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[AppStyles.filterButton, selectedRatingFilter === '4' && AppStyles.filterButtonActive]}
          onPress={() => setSelectedRatingFilter('4')}
        >
          <Text style={[AppStyles.filterText, selectedRatingFilter === '4' && AppStyles.filterTextActive]}>4 Stars</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[AppStyles.filterButton, selectedRatingFilter === '3' && AppStyles.filterButtonActive]}
          onPress={() => setSelectedRatingFilter('3')}
        >
          <Text style={[AppStyles.filterText, selectedRatingFilter === '3' && AppStyles.filterTextActive]}>3 Stars</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[AppStyles.filterButton, selectedRatingFilter === '2' && AppStyles.filterButtonActive]}
          onPress={() => setSelectedRatingFilter('2')}
        >
          <Text style={[AppStyles.filterText, selectedRatingFilter === '2' && AppStyles.filterTextActive]}>2 Stars</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[AppStyles.filterButton, selectedRatingFilter === '1' && AppStyles.filterButtonActive]}
          onPress={() => setSelectedRatingFilter('1')}
        >
          <Text style={[AppStyles.filterText, selectedRatingFilter === '1' && AppStyles.filterTextActive]}>1 Star</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  return (
    <View style={AppStyles.container}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={AppStyles.safeArea} >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={AppStyles.artisanHeaderContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 4 }}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={AppStyles.headerTitle} numberOfLines={1}>
          Shop Profile
        </Text>
        <View style={{ width: 24 }} />
      </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Photo */}
        <Image 
          source={{ uri: artisanData.coverPhoto }} 
          style={AppStyles.coverPhoto}
          resizeMode="cover"
        />

        {/* Shop Header */}
        <View style={AppStyles.shopHeader}>
          <Image 
            source={{ uri: artisanData.profilePic }} 
            style={AppStyles.profileImage}
          />
          <View style={AppStyles.shopInfo}>
            <Text style={AppStyles.shopName}>{artisanData.shopName}</Text>
            <Text style={AppStyles.ownerName}>By {artisanData.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              {renderRatingStars(artisanData.rating)}
              <Text style={{ marginLeft: 8, fontSize: 14, color: '#666' }}>
                ({artisanData.reviews} reviews)
              </Text>
            </View>
            <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
              <Icon name="location-on" size={14} color="#666" /> {artisanData.location}
            </Text>
          </View>
        </View>

        {/* Shop Stats */}
        <View style={AppStyles.statsContainer}>
          <View style={AppStyles.statItem}>
            <Text style={AppStyles.statValue}>{artisanData.completedOrders}+</Text>
            <Text style={AppStyles.statLabel}>Orders</Text>
          </View>
          <View style={AppStyles.statItem}>
            <Text style={AppStyles.statValue}>{artisanData.experience}</Text>
            <Text style={AppStyles.statLabel}>Experience</Text>
          </View>
          <View style={AppStyles.statItem}>
            <Text style={AppStyles.statValue}>{artisanData.rating}/5</Text>
            <Text style={AppStyles.statLabel}>Rating</Text>
          </View>
          <View style={AppStyles.statItem}>
            <Text style={AppStyles.statValue}>{artisanData.products.length}+</Text>
            <Text style={AppStyles.statLabel}>Products</Text>
          </View>
        </View>

        {/* About Shop */}
        <View style={AppStyles.artisanSectionContainer}>
          <Text style={AppStyles.sectionTitle}>About Our Shop</Text>
          <Text style={AppStyles.descriptionText}>
            {artisanData.aboutShop}
          </Text>
        </View>

        {/* Ask Question Section */}
        <View style={AppStyles.artisanSectionContainer}>
          <Text style={AppStyles.sectionTitle}>Ask a Question</Text>
          <Text style={[AppStyles.descriptionText, { marginBottom: 16 }]}>
            Have a question about our products or process? We're happy to help!
          </Text>
          <TouchableOpacity 
            style={AppStyles.askButton}
            onPress={() => setQuestionModalVisible(true)}
          >
            <Icon name="help-outline" size={20} color="#a0522d" />
            <Text style={AppStyles.askButtonText}>Ask a Question</Text>
          </TouchableOpacity>
        </View>

        {/* Shipping & Return Policies */}
        <View style={AppStyles.artisanSectionContainer}>
          <Text style={AppStyles.sectionTitle}>Shipping & Return Policies</Text>
          <View style={AppStyles.policySection}>
            <Text style={AppStyles.policySubtitle}>Shipping Policy</Text>
            <Text style={AppStyles.policyText}>{artisanData.shippingPolicy}</Text>
          </View>
          <View style={AppStyles.policySection}>
            <Text style={AppStyles.policySubtitle}>Return & Refund Policy</Text>
            <Text style={AppStyles.policyText}>{artisanData.returnPolicy}</Text>
          </View>
        </View>

        {/* Seller Information */}
        <View style={AppStyles.artisanSectionContainer}>
          <Text style={AppStyles.sectionTitle}>Seller Information</Text>
          <View style={AppStyles.contactItem}>
            <Icon name="phone" size={20} color="#a0522d" />
            <Text style={AppStyles.contactText}>{artisanData.contactInfo.phone}</Text>
          </View>
          <View style={AppStyles.contactItem}>
            <Icon name="email" size={20} color="#a0522d" />
            <Text style={AppStyles.contactText}>{artisanData.contactInfo.email}</Text>
          </View>
          <View style={AppStyles.contactItem}>
            <Icon name="access-time" size={20} color="#a0522d" />
            <Text style={AppStyles.contactText}>{artisanData.contactInfo.hours}</Text>
          </View>
        </View>

        {/* Ratings & Reviews */}
        <View style={AppStyles.artisanSectionContainer}>
          <View style={AppStyles.sectionHeader}>
            <Text style={AppStyles.sectionTitle}>Ratings & Reviews</Text>
            <TouchableOpacity onPress={() => setReviewModalVisible(true)}>
              <Text style={AppStyles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={artisanData.feedbacks.slice(0, 2)}
            renderItem={renderFeedbackItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={{ paddingVertical: 8 }}
          />
        </View>

        {/* Leave Feedback Section */}
        <View style={AppStyles.artisanSectionContainer}>
          <Text style={AppStyles.sectionTitle}>Leave Your Feedback</Text>
          <Text style={[AppStyles.descriptionText, { marginBottom: 16 }]}>
            Share your experience with this seller
          </Text>
          
          <View style={{ marginBottom: 16 }}>
            <Text style={AppStyles.label}>Your Rating</Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity 
                  key={star} 
                  onPress={() => setUserReview({...userReview, rating: star})}
                >
                  <Icon 
                    name={star <= userReview.rating ? "star" : "star-outline"} 
                    size={28} 
                    color="#FFD700" 
                    style={{ marginRight: 4 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={{ marginBottom: 16 }}>
            <Text style={AppStyles.label}>Your Review</Text>
            <TextInput
              style={AppStyles.textInput}
              multiline
              numberOfLines={4}
              placeholder="Share your experience with this seller"
              value={userReview.comment}
              onChangeText={(text) => setUserReview({...userReview, comment: text})}
            />
          </View>
          
          <TouchableOpacity 
            style={[AppStyles.submitButton, (!userReview.rating || !userReview.comment.trim()) && AppStyles.submitButtonDisabled]}
            onPress={handleSubmitReview}
            disabled={!userReview.rating || !userReview.comment.trim()}
          >
            <Text style={AppStyles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>

        {/* Products */}
        <View style={[AppStyles.artisanSectionContainer, { marginBottom: 20 }]}>
          <View style={AppStyles.sectionHeader}>
            <Text style={AppStyles.sectionTitle}>Shop Products</Text>
            <TouchableOpacity onPress={navigateToProductList}>
              <Text style={AppStyles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={artisanData.products.slice(0, 4)}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingVertical: 8 }}
          />
        </View>
      </ScrollView>

      {/* Reviews Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={reviewModalVisible}
        onRequestClose={() => setReviewModalVisible(false)}
      >
        <View style={AppStyles.modalContainer}>
          <View style={AppStyles.modalHeader}>
            <TouchableOpacity onPress={() => setReviewModalVisible(false)}>
              <Icon name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={AppStyles.modalTitle}>All Reviews</Text>
            <View style={{ width: 24 }} />
          </View>
          
          {renderRatingFilters()}
          
          <FlatList
            data={filteredFeedbacks}
            renderItem={renderFeedbackItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 16 }}
          />
        </View>
      </Modal>

      {/* Ask Question Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={questionModalVisible}
        onRequestClose={() => setQuestionModalVisible(false)}
      >
        <View style={AppStyles.modalContainer}>
         
          <View style={AppStyles.modalHeader}>
            <TouchableOpacity onPress={() => setQuestionModalVisible(false)}>
              <Icon name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={AppStyles.modalTitle}>Ask a Question</Text>
            <View style={{ width: 24 }} />
          </View>
          
          <View style={AppStyles.modalContent}>

             <View style={{ padding: 16 }} >

              <Text style={[AppStyles.descriptionText, { marginBottom: 16 }]}>
              Have a question about our products or process? We're happy to help!
            </Text>
            
            <Text style={AppStyles.label}>Your Question</Text>
            <TextInput
              style={[AppStyles.textInput, { height: 120 }]}
              multiline
              numberOfLines={6}
              placeholder="Type your question here..."
              value={userQuestion}
              onChangeText={setUserQuestion}
            />
            
            <TouchableOpacity 
              style={[AppStyles.submitButton, !userQuestion.trim() && AppStyles.submitButtonDisabled]}
              onPress={handleSubmitQuestion}
              disabled={!userQuestion.trim()}
            >
              <Text style={AppStyles.submitButtonText}>Submit Question</Text>
            </TouchableOpacity>
            
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ArtisanProfile;