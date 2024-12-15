import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const LoaderComponent = ({ loading, message }) => {
  if (!loading) return null;

  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // semi-transparent background
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default LoaderComponent;
