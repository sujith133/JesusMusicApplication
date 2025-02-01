import React, { useEffect } from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StyleSheet, View, Image,Text,TouchableOpacity, Button, FlatList,ScrollView, Alert, BackHandler } from 'react-native';
import { increment,decrement, setValue } from '../Redux/StateSlice';
import { useDispatch, useSelector } from 'react-redux';
import SongCarousel from '../Components/SongCarousel';
import { podcastList, songList } from '../Components/DummyDate';
import { RecentList } from '../Components/DummyDate';
import { albumList } from '../Components/DummyDate';
import HorizontalList from '../Components/HorizontalList';
import HorizontalListAlbum from '../Components/HorizontalListAlbums';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';

type NavbarProps = {
  navigation: BottomTabNavigationProp<TabParamList>;
};

const Home: React.FC<NavbarProps> = ({ navigation }) => {
  const userId = useSelector((state)=>state.state.userId)
  //console.log(userId,'userId');
  const dispatch = useDispatch();
  const navigateScreen=(screen:string,value:[string,string])=>{
    navigation.navigate(screen, { targetString: value });
  }
  const routeNames = useNavigationState((state) => state.routeNames); // Get all route names
  const currentRouteIndex = useNavigationState((state) => state.index); // Get the index of the active route
  const currentScreen = routeNames[currentRouteIndex]; // Determine the current screen name

  // const handleBackButtonPress = () => {
  //   console.log(currentScreen, currentRouteIndex);

  //   if (currentScreen === 'homescreen' || currentScreen === 'searchscreen' || currentScreen === 'libraryscreen' || currentScreen === 'infoscreen') {
  //     Alert.alert(
  //       'Exit App',
  //       'Are you sure you want to exit the app?',
  //       [
  //         { text: 'Cancel', style: 'cancel' },
  //         { text: 'OK', onPress: () => BackHandler.exitApp() },
  //       ],
  //       { cancelable: true }
  //     );
  //     return true; // Prevent default back behavior
  //   }

  //   switch(currentScreen){
  //     case  'homemusicplayer':
  //       dispatch(setValue(1));
  //       break;
  //     case  'searchmusicplayer':
  //       dispatch(setValue(2));
  //       break;
  //     case  'librarymusicplayer':
  //       dispatch(setValue(3));
  //       break;
  //     default:
  //       break;
  // };}

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);

  //   return () => {
  //      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPress);
  //   };
  // }, [currentScreen, currentRouteIndex]); 

    return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <View style={{flex:0,paddingLeft:24,paddingBottom:8}}>
        <Image
          source={require('../assets/image.png')}
          style={styles.image}
        />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent:'flex-start',alignItems:'flex-start'}} style={{backgroundColor:'#f5f5f5',flex:1,borderTopRightRadius:20,borderTopLeftRadius:20} }>
          <SongCarousel />


          <View style={{paddingHorizontal:10,paddingTop:20,flex:1,alignItems:'flex-start',justifyContent:'flex-start'}}>
            <Text style={{fontSize:24, fontWeight:700, color:'#257180'}}>Recents</Text>
            <HorizontalList data={RecentList} cardType={'Rectangle'} />
          </View>


          <View style={{paddingHorizontal:10,paddingTop:20,flex:1,alignItems:'flex-start',justifyContent:'flex-start'}}>
          <View style={{flexDirection:'row',width:'100%', justifyContent:'space-between'}}>
            <Text style={{fontSize:24, fontWeight:700, color:'#257180'}}>New Releases</Text>
            <TouchableOpacity style={styles.seemorebutton} onPress={()=>navigateScreen('subhome', ['New Releases','song'])}>
              <Text style={{fontSize:18,fontWeight:700, color:'#257180'}}>{"See more >"}</Text>
            </TouchableOpacity>
            </View>
            <HorizontalList data={RecentList} cardType={'Square'} requestFrom={['homemusicplayer','home']} />
          </View>

          <View style={{paddingHorizontal:10,flex:1,alignItems:'flex-start',justifyContent:'flex-start'}}>
            <View style={{flexDirection:'row',width:'100%', justifyContent:'space-between'}}>
            <Text style={{fontSize:24, fontWeight:700, color:'#257180'}}>Mostly played</Text>
            <TouchableOpacity style={styles.seemorebutton} onPress={()=>navigateScreen('subhome', ['Mostly Played','song'])}>
              <Text style={{fontSize:18,fontWeight:700, color:'#257180'}}>{"See more >"}</Text>
            </TouchableOpacity>
            </View>
            <HorizontalList data={songList} cardType={'Square'} />
          </View>


          <View style={{paddingHorizontal:10,flex:1,alignItems:'flex-start',justifyContent:'flex-start'}}>
            <View style={{flexDirection:'row',width:'100%', justifyContent:'space-between'}}>
            <Text style={{fontSize:24, fontWeight:700, color:'#257180'}}>Albums</Text>
            <TouchableOpacity style={styles.seemorebutton} onPress={()=>navigateScreen('subhome', ['Albums','album'])}>
              <Text style={{fontSize:18,fontWeight:700, color:'#257180'}}>{"See more >"}</Text>
            </TouchableOpacity>
            </View>
            <HorizontalListAlbum data={albumList} cardType={'Square'} />
          </View>


          <View style={{paddingHorizontal:10,flex:1,alignItems:'flex-start',justifyContent:'flex-start'}}>
            <View style={{flexDirection:'row',width:'100%', justifyContent:'space-between'}}>
            <Text style={{fontSize:24, fontWeight:700, color:'#257180'}}>Podcasts</Text>
            <TouchableOpacity style={styles.seemorebutton} onPress={()=>navigateScreen('subhome', ['Podcasts','album'])}>
              <Text style={{fontSize:18,fontWeight:700, color:'#257180'}}>{"See more >"}</Text>
            </TouchableOpacity>
            </View>
            <HorizontalListAlbum data={podcastList} cardType={'Square'} />
          </View>          
          <View style={{paddingBottom:70}}></View>
        </ScrollView>
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
    image: {
    width: 80,
    height: 43,
    marginTop:7,
  },
  tileImage: {
    width: 100,
    height: 100,
    borderRadius:10,
  },
  seemorebutton: {
    padding:5,
  },
});

export default Home;
