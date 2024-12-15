import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeIcon from './HomeIcon';
import SearchIcon from './SearchIcon';
import InfoIcon from './InfoIcon';
import LibraryIcon from './LibraryIcon';
import { View, Text, TouchableOpacity, StyleSheet,Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import {setValue} from '../Redux/StateSlice';
import { useSelector } from 'react-redux';

// Define the types for the screens in your tab navigator
type TabParamList = {
  Home: undefined;
  Search: undefined;
  Info: undefined;
  Library: undefined;
};

// Define the props type for the Navbar component, without `route`
type NavbarProps = {
  navigation: BottomTabNavigationProp<TabParamList>;
};

const Navbar: React.FC<NavbarProps> = ({ navigation }) => {
  const dispatch =useDispatch();
  const value = useSelector((state)=>state.state.value)
  const navigateScreen =(stack,screen)=>{
    switch (stack) {
      case 'home':
          dispatch(setValue(1))
        break;
      case 'search':
          dispatch(setValue(2))
        break;
      case 'library':
          dispatch(setValue(3))
        break;
      case 'info':
          dispatch(setValue(4))
        break;
      default:
        break;
    }
    navigation.navigate(stack,{screen})
    

  }
  return (
    <View style={value===0?styles.inactiveNav:styles.activeNav}>
    <View style={Platform.OS==='ios'?styles.iosContainer : styles.androidContainer}>
      <TouchableOpacity onPress={() => navigateScreen('home','homescreen')}>
      <HomeIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateScreen('search','searchscreen')}>
        <SearchIcon /> 
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateScreen('library','libraryscreen')}>
      <LibraryIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateScreen('info','infoscreen')}>
        <InfoIcon />
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
    padding: 10,
    backgroundColor: '#257180',
    width:'95%',
    height:75,
    borderRadius: 22,
    position:'absolute',
    bottom:40,
  },
  androidContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
    backgroundColor: '#257180',
    width:'90%',
    height:70,
    borderRadius: 22,
    position:'absolute',
    bottom:10,
  },
  navText: {
    color: '#fff',
    fontSize: 16,
  },
  inactiveNav:{
    display:'none',
  },
  activeNav:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
  },
});

export default Navbar;
