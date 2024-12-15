import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,Dimensions } from 'react-native';
import google from '../assets/icons/google.png';
import facebook from '../assets/icons/facebook.png';
import apple from '../assets/icons/apple.png';

type NavbarProps = {
  navigation: BottomTabNavigationProp<TabParamList>;
};
const SignUpScreen: React.FC<NavbarProps> = ({ navigation }) => {

  const navigateScreen=()=>{
    navigation.navigate('otp',{number:42})
  }
  return (
    <View style={styles.container}>
      <Image source={require('../assets/JESUSMUSIC.png')} style={styles.image} />

      
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" />
        <TextInput style={styles.input} placeholder="Phone number" placeholderTextColor="#999" secureTextEntry />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#999" secureTextEntry />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#999" secureTextEntry />
        <TouchableOpacity style={styles.loginButton} onPress={()=>navigateScreen()}>
          <Text style={styles.loginButtonText}>Signup</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.orText}>or</Text>
      <View style={styles.socialIcons}>
        <TouchableOpacity style={{padding:16}} onPress={()=>{alert("Google Signup")}}>
          <Image source={google} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding:16}} onPress={()=>{alert("Facebook Signup")}}>
          <Image source={facebook} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding:16}} onPress={()=>{alert("Apple Signup")}}>
          <Image source={apple} style={styles.icon} />
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
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 280,
    height: 141,
    marginBottom:48
  },
  title: {
    fontSize: 36,
    color: '#FFF',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  form: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#1C6C72',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#333',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#1C6C72',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#1C6C72',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  orText: {
    color: '#FFF',
    marginVertical: 20,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default SignUpScreen;