import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Keyboard,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from './StyleSheet/AppStyles';

const Search = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Pattachitra',
    'Silver Filigree',
    'Sambalpuri Saree',
    'Stone Carving'
  ]);
  const [searchResults, setSearchResults] = useState([]);

  // Sample handicrafts data
  const handicrafts = [
    {
      id: '1',
      name: 'Traditional Pattachitra Painting',
      category: 'pattachitra',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
      description: 'Handmade traditional painting on cloth depicting mythological scenes',
      artisan: 'Master Artist from Raghurajpur'
    },
    {
      id: '2',
      name: 'Silver Filigree Jewelry Set',
      category: 'silver',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ad5e5?w=400',
      description: 'Exquisite silver filigree work from Cuttack',
      artisan: 'Cuttack Silver Craftsman'
    },
    {
      id: '3',
      name: 'Stone Carved Buddha Statue',
      category: 'stone',
      image: 'https://images.unsplash.com/photo-1584735175097-719d848f8449?w=400',
      description: 'Hand-carved stone statue from Odisha tradition',
      artisan: 'Stone Artisan from Puri'
    },
    {
      id: '4',
      name: 'Sambalpuri Silk Saree',
      category: 'textile',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400',
      description: 'Authentic Sambalpuri handloom silk saree',
      artisan: 'Sambalpuri Weaver'
    },
    {
      id: '5',
      name: 'Wooden Tribal Mask',
      category: 'wood',
      image: 'https://images.unsplash.com/photo-1564466809058-b5a9c85aaf2d?w=400',
      description: 'Traditional wooden tribal masks from Odisha',
      artisan: 'Tribal Wood Carver'
    }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      Keyboard.dismiss();
      // Filter results based on search query
      const results = handicrafts.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
      
      // Add to recent searches if not already there
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
      }
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleRecentSearch = (query) => {
    setSearchQuery(query);
    setTimeout(() => handleSearch(), 100);
  };

  const renderSearchItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        AppStyles.handicraftCard,
        { 
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          marginBottom: 12
        }
      ]}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }}
        resizeMode="cover"
      />
      <View style={{ flex: 1 }}>
        <Text style={[AppStyles.handicraftTitle, { marginBottom: 4 }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={{ fontSize: 12, color: '#666' }} numberOfLines={1}>
          {item.artisan}
        </Text>
      </View>
      <Icon name="chevron-right" size={20} color="#999" />
    </TouchableOpacity>
  );

  const renderRecentSearch = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8
      }}
      onPress={() => handleRecentSearch(item)}
    >
      <Icon name="history" size={16} color="#666" style={{ marginRight: 4 }} />
      <Text style={{ fontSize: 14, color: '#333' }}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={AppStyles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Search Header */}
      <View style={[AppStyles.headerContainer, { flexDirection: 'row', alignItems: 'center', paddingTop: 16 }]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ padding: 8, marginRight: 12 }}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={[AppStyles.searchContainer, { flex: 1, marginBottom: 0 }]}>
          <Icon name="search" size={20} style={AppStyles.searchIcon} />
          <TextInput
            style={AppStyles.searchInput}
            placeholder="Search handicrafts, categories..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoFocus={true}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={{ padding: 4 }}>
              <Icon name="close" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Content */}
      <View style={AppStyles.profileContent}>
        {searchResults.length > 0 ? (
          // Search Results
          <FlatList
            data={searchResults}
            renderItem={renderSearchItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16 }}
          />
        ) : (
          // Recent Searches and Suggestions
          <View style={{ padding: 16 }}>
            {searchQuery.length === 0 && recentSearches.length > 0 && (
              <>
                <Text style={[AppStyles.sectionTitle, { marginBottom: 16 }]}>Recent Searches</Text>
                <FlatList
                  data={recentSearches}
                  renderItem={renderRecentSearch}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ marginBottom: 24 }}
                />
              </>
            )}

            <Text style={[AppStyles.sectionTitle, { marginBottom: 16 }]}>
              {searchQuery.length > 0 ? 'No results found' : 'Popular Searches'}
            </Text>
            
            {searchQuery.length === 0 && (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {['Pattachitra', 'Silver Jewelry', 'Stone Carving', 'Wood Work', 'Textiles', 'Terracotta'].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: '#e3f2fd',
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      marginRight: 8,
                      marginBottom: 8
                    }}
                    onPress={() => handleRecentSearch(item)}
                  >
                    <Text style={{ fontSize: 14, color: '#1976d2' }}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default Search;