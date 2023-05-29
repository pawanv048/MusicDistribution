import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Animated } from 'react-native';

const StyledActivityIndicator = () => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    animateActivityIndicator();
  }, []);

  const animateActivityIndicator = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animationContainer, { opacity: fadeAnim }]}>
        <ActivityIndicator size="large" color="#000000" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export default StyledActivityIndicator;
