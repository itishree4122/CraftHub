import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';

export default function SplashScreen() {
  const craftOpacity = useRef(new Animated.Value(0)).current;
  const hubOpacity = useRef(new Animated.Value(0)).current;
  const craftPosition = useRef(new Animated.Value(-50)).current;
  const hubPosition = useRef(new Animated.Value(50)).current;
  
  // For the second animation phase
  const cOpacity = useRef(new Animated.Value(1)).current;
  const hOpacity = useRef(new Animated.Value(1)).current;
  const otherLettersOpacity = useRef(new Animated.Value(1)).current;
  const cPosition = useRef(new Animated.Value(0)).current;
  const hPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation sequence
    Animated.sequence([
      // First, animate "Craft" in from the left
      Animated.parallel([
        Animated.timing(craftOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(craftPosition, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      
      // Brief pause
      Animated.delay(300),
      
      // Then animate "Hub" in from the right
      Animated.parallel([
        Animated.timing(hubOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(hubPosition, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      
      // Pause to show the full "Craft Hub"
      Animated.delay(1000),
      
      // Second phase: fade out all letters except C and H
      Animated.timing(otherLettersOpacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      
      // Brief pause
      Animated.delay(300),
      
      // Move C and H together
      Animated.parallel([
        Animated.timing(cPosition, {
          toValue: -15,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(hPosition, {
          toValue: 15,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {/* Craft Text with individual letter animations */}
        <Animated.Text style={[styles.text, { opacity: craftOpacity, transform: [{ translateX: craftPosition }] }]}>
          <Animated.Text style={{ opacity: cOpacity, transform: [{ translateX: cPosition }] }}>C</Animated.Text>
          <Animated.Text style={{ opacity: otherLettersOpacity }}>raft</Animated.Text>
        </Animated.Text>
        
        <Text style={styles.text}> </Text>
        
        {/* Hub Text with individual letter animations */}
        <Animated.Text style={[styles.text, { opacity: hubOpacity, transform: [{ translateX: hubPosition }] }]}>
          <Animated.Text style={{ opacity: hOpacity, transform: [{ translateX: hPosition }] }}>H</Animated.Text>
          <Animated.Text style={{ opacity: otherLettersOpacity }}>ub</Animated.Text>
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A0522D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
  },
});