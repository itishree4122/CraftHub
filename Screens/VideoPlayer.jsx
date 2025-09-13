import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  Platform,
  Share,
  Modal,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import AppStyles from './StyleSheet/AppStyles';

const { width, height } = Dimensions.get('window');

const VideoPlayer = ({ navigation, route }) => {
  const { video } = route.params || {};
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [expandedCaptions, setExpandedCaptions] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);

  // Sample videos data
  const videos = [
    {
      id: 1,
      uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      artisan: {
        name: 'Rajesh Meher',
        profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMc3W6hMygMuUJSkbgik9jIEKdDwqHT5pTxQ&s',
      },
      title: 'Silk Weaving Magic',
      views: '1.2K',
      caption: 'For three generations, my family has been weaving the finest silk sarees. Each piece takes 15-20 days to complete. The intricate patterns you see are not just designs - they tell stories of our culture, our festivals, and our connection to nature.'
    },
    {
      id: 2,
      uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      artisan: {
        name: 'Laxmi Devi',
        profilePic: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      },
      title: 'Pottery Wheel Art',
      views: '2.4K',
      caption: 'Just finished this beautiful collection inspired by the monsoon rains. Each piece tells a story of renewal and growth. The glazes mimic the colors of the sky during rainfall, and the textures represent the patterns of raindrops on water.'
    },
    {
      id: 3,
      uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      artisan: {
        name: 'Anil Patra',
        profilePic: 'https://m.media-amazon.com/images/I/61-l7NCLBEL._UF894,1000_QL80_.jpg',
      },
      title: 'Wood Carving Secrets',
      views: '3.1K',
      caption: 'Wood carving is not just a craft, it\'s meditation. The smell of fresh wood, the sound of chisels, and the gradual emergence of forms from raw material - this is my spiritual practice. Each carving has a story, often inspired by our mythology and nature.'
    },
  ];

  const initialIndex = video ? videos.findIndex(v => v.id === video.id) : 0;
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePlayPause = () => {
    setPaused(!paused);
  };

  const toggleCaption = (videoId) => {
    setExpandedCaptions(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  const shareVideo = async (platform = null) => {
    const currentVideo = videos[activeIndex];
    const shareOptions = {
      title: currentVideo.title,
      message: `Check out this amazing artisan video: ${currentVideo.title} by ${currentVideo.artisan.name}\n\n${currentVideo.caption.substring(0, 100)}...`,
      url: currentVideo.uri, // In a real app, you'd have a proper shareable link
    };

    try {
      if (platform) {
        // For specific platform sharing, you might need additional libraries
        // like react-native-share for more platform-specific control
        console.log(`Sharing to ${platform}`);
        
        // Using the general share dialog as fallback
        const result = await Share.share(shareOptions);
        
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // Shared with activity type of result.activityType
            console.log('Shared with', result.activityType);
          } else {
            // Shared
            console.log('Shared successfully');
          }
        } else if (result.action === Share.dismissedAction) {
          // Dismissed
          console.log('Share dismissed');
        }
      } else {
        // Open native share sheet
        const result = await Share.share(shareOptions);
        
        if (result.action === Share.sharedAction) {
          console.log('Shared successfully');
        } else if (result.action === Share.dismissedAction) {
          console.log('Share dismissed');
        }
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
    
    setShowShareModal(false);
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
      setPaused(false);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 100,
  }).current;

  const renderShareModal = () => (
    <Modal
      visible={showShareModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowShareModal(false)}
    >
      <View style={AppStyles.videoModalContainer}>
        <View style={AppStyles.videoModalContent}>
          <View style={AppStyles.videoModalHeader}>
            <Text style={AppStyles.videoModalTitle}>Share Video</Text>
            <TouchableOpacity onPress={() => setShowShareModal(false)}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={AppStyles.shareOptions}>
            <TouchableOpacity style={AppStyles.shareOption} onPress={() => shareVideo('whatsapp')}>
              <View style={[AppStyles.shareIcon, { backgroundColor: '#25D366' }]}>
                <IconFA name="whatsapp" size={24} color="#fff" />
              </View>
              <Text style={AppStyles.shareOptionText}>WhatsApp</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={AppStyles.shareOption} onPress={() => shareVideo('instagram')}>
              <View style={[AppStyles.shareIcon, { backgroundColor: '#E1306C' }]}>
                <IconFA name="instagram" size={24} color="#fff" />
              </View>
              <Text style={AppStyles.shareOptionText}>Instagram</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={AppStyles.shareOption} onPress={() => shareVideo('facebook')}>
              <View style={[AppStyles.shareIcon, { backgroundColor: '#4267B2' }]}>
                <IconFA name="facebook" size={24} color="#fff" />
              </View>
              <Text style={AppStyles.shareOptionText}>Facebook</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={AppStyles.shareOption} onPress={() => shareVideo('twitter')}>
              <View style={[AppStyles.shareIcon, { backgroundColor: '#1DA1F2' }]}>
                <IconFA name="twitter" size={24} color="#fff" />
              </View>
              <Text style={AppStyles.shareOptionText}>Twitter</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={AppStyles.shareOption} onPress={() => shareVideo('gmail')}>
              <View style={[AppStyles.shareIcon, { backgroundColor: '#DB4437' }]}>
                <IconFA name="envelope" size={24} color="#fff" />
              </View>
              <Text style={AppStyles.shareOptionText}>Email</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={AppStyles.shareOption} onPress={() => shareVideo('more')}>
              <View style={[AppStyles.shareIcon, { backgroundColor: '#777' }]}>
                <Icon name="more-horiz" size={24} color="#fff" />
              </View>
              <Text style={AppStyles.shareOptionText}>More</Text>
            </TouchableOpacity>
          </ScrollView>
          
          <TouchableOpacity 
            style={AppStyles.nativeShareButton}
            onPress={() => shareVideo()}
          >
            <Text style={AppStyles.nativeShareButtonText}>Share via Native Options</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderVideoItem = ({ item, index }) => {
    const isActive = index === activeIndex;
    const isExpanded = expandedCaptions[item.id];
    const shouldShowReadMore = item.caption.length > 80 && !isExpanded;
    
    return (
      <View style={AppStyles.videoContainer}>
        <Video
          ref={isActive ? videoRef : null}
          source={{ uri: item.uri }}
          style={AppStyles.video}
          resizeMode="cover"
          paused={!isActive || paused}
          repeat={true}
          muted={isMuted}
          onError={(error) => console.log('Video error:', error)}
        />
        
        {/* Video Overlay UI */}
        <View style={AppStyles.videoOverlay}>
          {/* Play/Pause button in center */}
          <TouchableOpacity 
            style={AppStyles.centerPlayButton} 
            onPress={togglePlayPause}
          >
            {paused && <Icon name="play-arrow" size={64} color="#fff" />}
          </TouchableOpacity>
          
          {/* Right side actions */}
          <View style={AppStyles.rightActions}>
            <TouchableOpacity style={AppStyles.videoActionButton} onPress={toggleMute}>
              <Icon name={isMuted ? "volume-off" : "volume-up"} size={28} color="#fff" />
              <Text style={AppStyles.videoActionText}>{isMuted ? "Unmute" : "Mute"}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={AppStyles.videoActionButton} onPress={() => setShowShareModal(true)}>
              <Icon name="share" size={28} color="#fff" />
              <Text style={AppStyles.videoActionText}>Share</Text>
            </TouchableOpacity>
          </View>
          
          {/* Bottom info */}
          <View style={AppStyles.bottomInfo}>
            <View style={AppStyles.videoArtisanInfo}>
              <Image source={{ uri: item.artisan.profilePic }} style={AppStyles.videoArtisanImage} />
              <Text style={AppStyles.videoArtisanName}>{item.artisan.name}</Text>
            </View>
            
            <View style={AppStyles.videoCaptionContainer}>
              <Text 
                style={AppStyles.videoCaption} 
                numberOfLines={isExpanded ? undefined : 2}
              >
                {item.caption}
              </Text>
              {shouldShowReadMore && (
                <TouchableOpacity onPress={() => toggleCaption(item.id)}>
                  <Text style={AppStyles.videoReadMoreText}>Read more</Text>
                </TouchableOpacity>
              )}
              {isExpanded && (
                <TouchableOpacity onPress={() => toggleCaption(item.id)}>
                  <Text style={AppStyles.videoReadMoreText}>Read less</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <Text style={AppStyles.videoViewsText}>{item.views} views</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={AppStyles.videoContainer}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      
      {/* Header */}
      <View style={[AppStyles.videoHeader, { paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={AppStyles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={AppStyles.videoHeaderTitle}>Artisan Shorts</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={item => item.id.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialScrollIndex={initialIndex}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
      />
      
      {renderShareModal()}
    </View>
  );
};


export default VideoPlayer;