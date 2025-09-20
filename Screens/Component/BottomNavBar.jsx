import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from '../StyleSheet/AppStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

const BottomNavBar = ({ state, descriptors, navigation }) => {
  // Filter out routes that should not appear in the tab bar
  const visibleRoutes = state.routes.filter((route) => {
    const { options } = descriptors[route.key];
    // Exclude routes with tabBarButton set to null or a custom component
    return options.tabBarButton === undefined;
  });

  return (
    <SafeAreaView edges={['bottom']} style={AppStyles.safeArea}>
    <View style={AppStyles.navContainer}>
      {visibleRoutes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = {
          home: 'home',
          profile: 'person',
          videos: 'ondemand-video',
          cart: 'shopping-cart',
          categories: 'menu',
        }[route.name] || 'help';

        const label = {
          home: 'Home',
          profile: 'Profile',
          videos: 'Videos',
          cart: 'Cart',
          categories: 'Categories',
        }[route.name] || route.name;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={AppStyles.tab}
          >
            <Icon
              name={iconName}
              size={24}
              color={isFocused ? '#A0522D' : '#666'}
            />
            <Text
              style={[
                AppStyles.tabLabel,
                isFocused && AppStyles.activeTab,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
    </SafeAreaView>
  );
};

export default BottomNavBar;