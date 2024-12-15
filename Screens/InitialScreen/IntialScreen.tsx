import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setValue, setId } from '../Redux/StateSlice';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type NavbarProps = {
  navigation: BottomTabNavigationProp<TabParamList>;
};

const IntialScreen: React.FC<NavbarProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.state.value);
  // Update value based on userid
  useEffect(() => {
    if (value === 1) {
      dispatch(setId("userId"));
      navigation.navigate('home', { screen:'homescreen' });
    }
  }, [value, dispatch]); // Dependencies: userid and dispatch

  const navigateScreen = (stack: string, screen: string) => {
    navigation.navigate(stack, { screen });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/JESUSMUSIC.png')} style={styles.image} />
      <View>
        <Text style={styles.quote}>
          But the hour is coming, and is now here, when the true worshipers will worship the Father in spirit and truth,
          for the Father is seeking such people to worship him.
        </Text>
        <Text style={styles.quoteRef}>John 4:23</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.signupButton} onPress={() => navigateScreen('login', 'signup')}>
          <Text style={styles.signupText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigateScreen('login', 'loginscreen')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C6C72',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  signupButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD8B51',
    height: 54,
    width: 180,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 16,
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#FD8B51',
    height: 54,
    width: 180,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  signupText: {
    color: '#f5f5f5',
    fontSize: 22,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#FD8B51',
    fontSize: 22,
    fontWeight: 'bold',
  },
  image: {
    width: 140,
    height: 70,
    marginBottom: 48,
  },
  quote: {
    color: '#E7EDEC',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    paddingHorizontal: 20,
    lineHeight: 26,
  },
  quoteRef: {
    color: '#E7EDEC',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '800',
    paddingHorizontal: 20,
    lineHeight: 26,
  },
});

export default IntialScreen;
