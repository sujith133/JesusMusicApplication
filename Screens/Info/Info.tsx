import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StyleSheet, View, Image,Text, TouchableOpacity,Linking, ScrollView } from 'react-native';
import {setValue,setId } from '../Redux/StateSlice';
import { useDispatch, useSelector } from 'react-redux';
import whatsappIcon from '../assets/whatsapp.png';
import instagramIcon from '../assets/instagram.png';
import facebookIcon from '../assets/facebook.png';
import youtubeIcon from '../assets/youtube.png';
import linkedinIcon from '../assets/linkedin.png';
import Indicator from '../assets/indicator.png';

type NavbarProps = {
  navigation: BottomTabNavigationProp<TabParamList>;
};


const Info: React.FC<NavbarProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const logoutHandle=()=>{
    navigation.navigate("login", { screen: "intialscreen", });    
    dispatch(setValue(0));
    dispatch(setId('')) 
  };
  const sections = [
    {
      title: '',
      items: [
        { label: 'Hello Username', onPress: () => alert('userprofile') },
      ],
    },
    {
      title: 'Donate',
      items: [{ label: 'Donate', onPress: () => alert('Donate Clicked') }],
    },
    {
      title: 'Contact Us',
      items: [
        { label: 'Email', onPress: () => alert('Email Clicked') },
        { label: 'Feedback', onPress: () => alert('Feedback Clicked') },
      ],
    },
    {
      title: 'Legal Info',
      items: [
        { label: 'Privacy Policy', onPress: () => alert('Privacy Policy Clicked') },
        { label: 'Terms of Service', onPress: () => alert('Terms Clicked') },
        { label: 'Do not share our Info', onPress: () => alert('Info Clicked') },
      ],
    },
    {
      title: '',
      items: [
        { label: 'Logout', onPress: () => logoutHandle()},
      ],
    },
  ];

  const socialLinks = [
    { icon: whatsappIcon, url: 'https://wa.me/' },
    { icon: instagramIcon, url: 'https://instagram.com' },
    { icon: facebookIcon, url: 'https://facebook.com' },
    { icon: youtubeIcon, url: 'https://youtube.com' },
    { icon: linkedinIcon, url: 'https://linkedin.com' },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <View style={{flex:0,paddingLeft:24,paddingBottom:8}}>
        <Image
          source={require('../assets/image.png')}
          style={styles.image}
        />
        </View>

        <View style={{backgroundColor:'#f5f5f5',flex:1,borderTopRightRadius:20,borderTopLeftRadius:20,paddingVertical:20,paddingHorizontal:16,paddingBottom:90,flexDirection:'column',justifyContent:'flex-start',alignItems:'center'}}>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            {section.title && <Text style={styles.sectionTitle}>{section.title}</Text>}
            {section.items.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.button}
                onPress={item.onPress}>
                <Text style={styles.buttonText}>{item.label}</Text>
                <Image source={Indicator} style={{height:28,width:28}} />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <Text style={styles.connectTitle}>Connect with us</Text>
        <View style={styles.socialLinks}>
          {socialLinks.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => Linking.openURL(item.url)}
              style={styles.iconButton}>
              <Image source={item.icon} style={{ height: 30, width: 30, borderRadius:5 }} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.footer}>Jesus Music App{'\n'}2024 Be in faith Ministries.</Text>

          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#257180',

  },
  subContainer: {
    // Positions subContainer absolutely within SafeAreaView

    flex:1,
  },
    container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
    image: {
    width: 80,
    height: 43,
    marginTop:7,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005f6a',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    width:'100%',
    marginVertical: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#257180',
    fontWeight:800,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',

  },
  buttonText: {
    fontSize: 16,
    color: '#257180',
    fontWeight:600,
  },
  connectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
    marginVertical: 20,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width:'100%',
  },
  iconButton: {
    marginHorizontal: 10,
  },
  footer: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#005f6a',
    paddingVertical: 10,
  },
});

export default Info;

