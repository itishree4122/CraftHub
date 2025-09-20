import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList, Dimensions, Modal, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from './StyleSheet/AppStyles';

const { width } = Dimensions.get('window');

const ArtisanBlog = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Sample data for multiple artisans (like Instagram suggestions)
  const suggestedArtisans = [
    {
      id: 1,
      name: 'Rajesh Meher',
      craft: 'Master Weaver',
      location: 'Nuapatna, Odisha',
      profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMc3W6hMygMuUJSkbgik9jIEKdDwqHT5pTxQ&s',
    },
    {
      id: 2,
      name: 'Laxmi Devi',
      craft: 'Pottery Artist',
      location: 'Bhubaneswar, Odisha',
      profilePic: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      name: 'Anil Patra',
      craft: 'Wood Carver',
      location: 'Puri, Odisha',
      profilePic: 'https://m.media-amazon.com/images/I/61-l7NCLBEL._UF894,1000_QL80_.jpg',
    }
  ];

  // Short videos data (like Instagram Reels/YouTube Shorts)
  const shortVideos = [
    {
      id: 1,
      artisan: suggestedArtisans[0],
      title: 'Silk Weaving Magic',
      thumbnail: 'https://m.media-amazon.com/images/I/61-l7NCLBEL._UF894,1000_QL80_.jpg',
      duration: '0:45',
      views: '1.2K'
    },
    {
      id: 2,
      artisan: suggestedArtisans[1],
      title: 'Pottery Wheel Art',
      thumbnail: 'https://m.media-amazon.com/images/I/71F90YRir5L._UF894,1000_QL80_.jpg',
      duration: '0:32',
      views: '2.4K'
    },
    {
      id: 3,
      artisan: suggestedArtisans[2],
      title: 'Wood Carving Secrets',
      thumbnail: 'https://theheritageartifacts.com/cdn/shop/products/THA007HR_700x934.jpg?v=1678686839',
      duration: '0:58',
      views: '3.1K'
    },
    {
      id: 4,
      artisan: suggestedArtisans[0],
      title: 'Natural Dye Process',
      thumbnail: 'https://www.indianvillez.com/cdn/shop/collections/851c575f507678e0cef4c77690fba8b1.jpg?v=1692000344',
      duration: '0:41',
      views: '1.8K'
    },
    {
      id: 5,
      artisan: suggestedArtisans[1],
      title: 'Clay Sculpting Tips',
      thumbnail: 'https://m.media-amazon.com/images/I/71jG+rQPj8L._UF1000,1000_QL80_.jpg',
      duration: '0:37',
      views: '2.7K'
    }
  ];

  // Sample content feed (mixed posts, stories, videos)
  const contentFeed = [
    {
      id: 1,
      type: 'video',
      artisan: suggestedArtisans[0],
      title: 'Weaving Process: From Thread to Fabric',
      date: '2 hours ago',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMc3W6hMygMuUJSkbgik9jIEKdDwqHT5pTxQ&s',
      excerpt: 'For three generations, my family has been weaving the finest silk sarees. Each piece takes 15-20 days to complete, but the satisfaction of preserving our heritage is priceless. The intricate patterns you see are not just designs - they tell stories of our culture, our festivals, and our connection to nature.',
    },
    {
      id: 2,
      type: 'post',
      artisan: suggestedArtisans[1],
      title: 'New Pottery Collection - Monsoon Inspired',
      date: '5 hours ago',
      image: 'https://m.media-amazon.com/images/I/71F90YRir5L._UF894,1000_QL80_.jpg',
      excerpt: 'Just finished this beautiful collection inspired by the monsoon rains. Each piece tells a story of renewal and growth. The glazes mimic the colors of the sky during rainfall, and the textures represent the patterns of raindrops on water.',
    },
    {
      id: 3,
      type: 'story',
      artisan: suggestedArtisans[2],
      title: 'A Day in My Workshop',
      date: '1 day ago',
      image: 'https://m.media-amazon.com/images/I/71F90YRir5L._UF894,1000_QL80_.jpg',
      excerpt: 'Sharing glimpses of my daily routine. Wood carving is not just a craft, it\'s meditation. The smell of fresh wood, the sound of chisels, and the gradual emergence of forms from raw material - this is my spiritual practice.',
    },
    {
      id: 4,
      type: 'video',
      artisan: suggestedArtisans[0],
      title: 'Natural Dye Preparation Tutorial',
      date: '2 days ago',
      thumbnail: 'https://theheritageartifacts.com/cdn/shop/products/THA007HR_700x934.jpg?v=1678686839',
      excerpt: 'In this video, I show how we prepare natural dyes from plants and minerals. Each color has its own story: turmeric for yellow, indigo for blue, madder root for red. These colors don\'t fade easily and they connect our work to the earth.',
    },
    {
      id: 5,
      type: 'post',
      artisan: suggestedArtisans[2],
      title: 'Traditional Wood Carving Techniques',
      date: '3 days ago',
      image: 'https://m.media-amazon.com/images/I/61-l7NCLBEL._UF894,1000_QL80_.jpg',
      excerpt: 'Sharing some traditional techniques passed down through generations. Each carving has a story, often inspired by our mythology and nature. The tools may be simple, but the skills required take years to master.',
    }
  ];

  const [shareMenuVisible, setShareMenuVisible] = useState(null);

  const openPostDetail = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const closePostDetail = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

  const toggleShareMenu = (postId) => {
    setShareMenuVisible(shareMenuVisible === postId ? null : postId);
  };

  const shareOptions = [
    { id: 1, icon: 'message', label: 'Send via Message' },
    { id: 2, icon: 'email', label: 'Share via Email' },
    { id: 3, icon: 'link', label: 'Copy Link' },
    { id: 4, icon: 'social-distance', label: 'Other Apps' },
  ];

  const navigateToArtisanProfile = (artisan) => {
    navigation.navigate('ArtisanProfile', { artisan: artisan.name });
  };

  const renderArtisanSuggestion = ({ item }) => (
    <TouchableOpacity 
      style={AppStyles.artisanSuggestionCard}
      onPress={() => navigateToArtisanProfile(item)}
    >
      <View style={AppStyles.artisanSuggestionHeader}>
        <Image source={{ uri: item.profilePic }} style={AppStyles.artisanSuggestionImage} />
        <View style={AppStyles.artisanSuggestionInfo}>
          <Text style={AppStyles.artisanSuggestionName}>{item.name}</Text>
          <Text style={AppStyles.artisanSuggestionCraft}>{item.craft}</Text>
          <Text style={AppStyles.artisanSuggestionLocation}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderShortVideo = ({ item }) => (
    <TouchableOpacity 
      style={AppStyles.shortVideoCard}
      onPress={() => navigation.navigate('VideoPlayer')}
    >
      <View style={AppStyles.videoThumbnailContainer}>
        <Image source={{ uri: item.thumbnail }} style={AppStyles.shortVideoThumbnail} />
        <View style={AppStyles.videoOverlay}>
          <View style={AppStyles.playIconContainer}>
            <Icon name="play-arrow" size={24} color="#fff" />
          </View>
          <Text style={AppStyles.videoDuration}>{item.duration}</Text>
        </View>
      </View>
      <View style={AppStyles.videoInfo}>
        <Text style={AppStyles.videoTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={AppStyles.videoViews}>{item.views} views</Text>
      </View>
    </TouchableOpacity>
  );

  const renderContentItem = ({ item }) => (
    <View style={AppStyles.contentCard}>
      {/* Header with artisan info */}
      <View style={AppStyles.contentHeader}>
        <TouchableOpacity 
          style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
          onPress={() => navigateToArtisanProfile(item.artisan)}
        >
          <Image source={{ uri: item.artisan.profilePic }} style={AppStyles.contentArtisanImage} />
          <View style={AppStyles.contentArtisanInfo}>
            <Text style={AppStyles.contentArtisanName}>{item.artisan.name}</Text>
            <Text style={AppStyles.contentArtisanCraft}>{item.artisan.craft} • {item.date}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleShareMenu(item.id)}>
          <Icon name="more-horiz" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Share Menu */}
      {shareMenuVisible === item.id && (
        <View style={AppStyles.shareMenu}>
          {shareOptions.map(option => (
            <TouchableOpacity key={option.id} style={AppStyles.shareOption}>
              <Icon name={option.icon} size={20} color="#333" style={AppStyles.shareIcon} />
              <Text style={AppStyles.shareOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Content */}
      <TouchableOpacity onPress={() => openPostDetail(item)}>
        {item.type === 'video' ? (
          <View style={AppStyles.videoContainer}>
            <Image source={{ uri: item.thumbnail }} style={AppStyles.contentImage} />
            <View style={AppStyles.playButtonOverlay}>
              <Icon name="play-arrow" size={48} color="#fff" />
            </View>
          </View>
        ) : (
          <Image source={{ uri: item.image }} style={AppStyles.contentImage} />
        )}
      </TouchableOpacity>

      {/* Caption Preview */}
      <TouchableOpacity onPress={() => openPostDetail(item)} style={AppStyles.captionPreview}>
        <Text style={AppStyles.captionText} numberOfLines={2}>
          <Text style={AppStyles.captionName}>{item.artisan.name} </Text>
          {item.excerpt}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPostDetailModal = () => (
    <Modal
      visible={modalVisible}
      animationType="slide"
      onRequestClose={closePostDetail}
    >
      <View style={AppStyles.modalContainer}>
        {/* Modal Header */}
        <View style={AppStyles.modalHeader}>
          <TouchableOpacity onPress={closePostDetail} style={AppStyles.modalBackButton}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={AppStyles.modalTitle}>Post</Text>
          <TouchableOpacity onPress={() => toggleShareMenu('modal')}>
            <Icon name="more-horiz" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {selectedPost && (
          <ScrollView style={AppStyles.modalContent}>
            {/* Artisan Info */}
            <TouchableOpacity 
              style={AppStyles.modalArtisanInfo}
              onPress={() => {
                closePostDetail();
                navigateToArtisanProfile(selectedPost.artisan);
              }}
            >
              <Image source={{ uri: selectedPost.artisan.profilePic }} style={AppStyles.modalArtisanImage} />
              <View style={AppStyles.modalArtisanDetails}>
                <Text style={AppStyles.modalArtisanName}>{selectedPost.artisan.name}</Text>
                <Text style={AppStyles.modalArtisanCraft}>{selectedPost.artisan.craft}</Text>
              </View>
            </TouchableOpacity>

            {/* Post Content */}
            {selectedPost.type === 'video' ? (
              <View style={AppStyles.modalVideoContainer}>
                <Image source={{ uri: selectedPost.thumbnail }} style={AppStyles.modalContentImage} />
                <View style={AppStyles.modalPlayButton}>
                  <Icon name="play-arrow" size={64} color="#fff" />
                </View>
              </View>
            ) : (
              <Image source={{ uri: selectedPost.image }} style={AppStyles.modalContentImage} />
            )}

            {/* Post Details */}
            <View style={AppStyles.postDetails}>
              <Text style={AppStyles.postTitle}>{selectedPost.title}</Text>
              <Text style={AppStyles.postDate}>{selectedPost.date}</Text>
              <Text style={AppStyles.postDescription}>{selectedPost.excerpt}</Text>
            </View>
          </ScrollView>
        )}
      </View>
    </Modal>
  );

  return (
    <View style={[AppStyles.container, { 
      
    }]}>
      {/* Custom Header Section */}
      <SafeAreaView edges={['top']}  >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={AppStyles.headerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8, marginRight: 16 }}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>Artisan Stories</Text>
        </View>
        
        <View style={AppStyles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={AppStyles.searchIcon} />
          <Text style={AppStyles.searchInput}>Search stories...</Text>
        </View>
      </View>
      </SafeAreaView>
      
      
      <ScrollView style={AppStyles.artisanBlogContent}>
        {/* Suggested Artisans Section */}
        <View style={AppStyles.sectionContainer}>
          <Text style={AppStyles.sectionTitle}>Suggested Artisans</Text>
          <FlatList
            data={suggestedArtisans}
            renderItem={renderArtisanSuggestion}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={AppStyles.suggestionsList}
          />
        </View>

        {/* Short Videos Section */}
        <View style={AppStyles.sectionContainer}>
          <View style={AppStyles.sectionHeader}>
            <Text style={AppStyles.sectionTitle}>Artisan Shorts</Text>
            <TouchableOpacity>
              <Text style={AppStyles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={shortVideos}
            renderItem={renderShortVideo}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={AppStyles.videosList}
          />
        </View>

        {/* Content Feed Section */}
        <View style={AppStyles.sectionContainer}>
          <Text style={AppStyles.sectionTitle}>Popular Stories</Text>
          <SafeAreaView edges={['bottom']} >
          <FlatList
            data={contentFeed}
            renderItem={renderContentItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
          </SafeAreaView>
        </View>
      </ScrollView>

      {renderPostDetailModal()}
    </View>
  );
};


export default ArtisanBlog;