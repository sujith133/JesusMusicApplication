import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TrackPlayer, { Capability } from 'react-native-track-player';
import trackPlayerServices from './service';
import PlayerScreen from './Screens/MusicPlayer/PlayerPage';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
// Import your screen components
import Home from './Screens/Home/Home';
import Search from './Screens/Search/Search';
import Info from './Screens/Info/Info';
import Library from './Screens/Library/Library';
import Login from './Screens/Login/login';
import Signup from './Screens/Signup/Signup';
import OtpScreen from './Screens/Otp/Otp';
import ForgotPasswordScreen from './Screens/Forgot/Forgot';
import ResetPassword from './Screens/ResetPassword/ResetPassword';
import SubHome from './Screens/SubHome/SubHome';
import Album from './Screens/Album/Album';
import OfflineStream from './Screens/OfflineStream/OfflineStream';
import NavBar from './Screens/Components/NavBar';
import IntialScreen from './Screens/InitialScreen/IntialScreen';
import {BackHandler, Alert } from 'react-native';
import { setupPlayer } from './Screens/Components/setupPlayer';
import { navigationRef } from './NavigationService'; // Import navigationRef
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setValue } from './Screens/Redux/StateSlice';

// Navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="homescreen" component={Home} />
    <Stack.Screen name="subhome" component={SubHome} />
    <Stack.Screen name="homealbum" component={Album} />
    <Stack.Screen name="homemusicplayer" component={PlayerScreen} />
  </Stack.Navigator>
);

// Search Stack
const SearchStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="searchscreen" component={Search} />
    <Stack.Screen name="searchalbum" component={Album} />
    <Stack.Screen name="searchmusicplayer" component={PlayerScreen} />

  </Stack.Navigator>
);

// Library Stack
const LibraryStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="libraryscreen" component={Library} />
    <Stack.Screen name="libraryalbum" component={Album} />
    <Stack.Screen name="librarymusicplayer" component={PlayerScreen} />
  </Stack.Navigator>
);

// Info Stack
const InfoStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="infoscreen" component={Info} />
    {/* Add more screens if needed */}
  </Stack.Navigator>
);

// Login Stack
const LoginStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="intialscreen" component={IntialScreen} />
    <Stack.Screen name="loginscreen" component={Login} />
    <Stack.Screen name="signup" component={Signup} />
    <Stack.Screen name="forgot" component={ForgotPasswordScreen} />
    <Stack.Screen name="otp" component={OtpScreen} />
    <Stack.Screen name="resetpassword" component={ResetPassword} />
  </Stack.Navigator>
);

// Main Stack (Tab Navigation)
const MainStack = () => (
  <Tab.Navigator
  screenOptions={{
    headerShown: false, 
  }}

    
  tabBar={(props) => <NavBar {...props} />} // Custom Navbar component
>
<Tab.Screen name="login" component={LoginStack} 
  listeners={({ navigation }) => ({
    tabPress: (e) => {
      e.preventDefault();
      navigation.navigate("login", {
        screen: "loginscreen",
      });
    },
  })}/>
  <Tab.Screen name="home" component={HomeStack} options={{ unmountOnBlur: true }} listeners={({ navigation }) => ({
      tabPress: (e) => {
        e.preventDefault();
        navigation.navigate("home", {
          screen: "homescreen",
        });
      },
    })}/>
  <Tab.Screen name="search" component={SearchStack} listeners={({ navigation }) => ({
      tabPress: (e) => {
        e.preventDefault();
        navigation.navigate("search", {
          screen: "searchscreen",
        });
      },
    })}/>
  <Tab.Screen name="library" component={LibraryStack} 
  listeners={({ navigation }) => ({
      tabPress: (e) => {
        e.preventDefault();
        navigation.navigate("library", {
          screen: "libraryscreen",
        });
      },
    })} />
  <Tab.Screen name="info" component={InfoStack}
  listeners={({ navigation }) => ({
    tabPress: (e) => {
      e.preventDefault();
      navigation.navigate("info", {
        screen: "infoscreen",
      });
    },
  })} />

</Tab.Navigator>
);

// App Component
export default function App({}) {
  const [currentScreen, setCurrentScreen] = useState('');
  const navigationRef = useRef();
  const dispatch =useDispatch();

  useEffect(() => {
    const handleBackButtonPress = () => {
      console.log("Current screen:", currentScreen);

      if (['homescreen', 'searchscreen', 'libraryscreen', 'infoscreen'].includes(currentScreen)) {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit the app?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: true }
        );
       return true; // Prevent default back behavior
      // }
      // else{
      //   navigation.goBack();
      }

      // Additional logic for specific screens

      return false; // Allow default back behavior
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPress);
    };
  }, [currentScreen]); // Add currentScreen as a dependency



  useEffect(() => {
    const initializePlayer = async () => {
      await setupPlayer();
    };

    initializePlayer();

    return () => {
      TrackPlayer.reset();
    };
  }, []); 

  return (
    <SafeAreaProvider>
      <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        const currentRoute = navigationRef.current?.getCurrentRoute();
        setCurrentScreen(currentRoute?.name || null);
      }}
      >
        <MainStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
TrackPlayer.registerPlaybackService(() => trackPlayerServices);
