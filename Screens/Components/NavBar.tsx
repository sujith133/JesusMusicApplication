import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import HomeIcon from './HomeIcon';
import SearchIcon from './SearchIcon';
import InfoIcon from './InfoIcon';
import LibraryIcon from './LibraryIcon';
import { View, Text, TouchableOpacity, StyleSheet,Platform,Image, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import {setValue,setPrevValue,setPlayerView} from '../Redux/StateSlice';
import { useSelector } from 'react-redux';
import {  selectValue } from '../MusicPlayer/Selector'; // Adjust path as needed
import TrackPlayer, {
  usePlaybackState,
  useProgress,  State , RepeatMode
} from 'react-native-track-player';
import play from '../assets/play.png';
import pause from '../assets/pause.png';
import forward from '../assets/forward.png';
import backward from '../assets/backward.png';
// Define the types for the screens in your tab navigator
type TabParamList = {
  Home: undefined;
  Search: undefined;
  Info: undefined;
  Library: undefined;
};

// Define the props type for the Navbar component, without `route`


const Navbar = ({ navigation }: any) => {
  const dispatch =useDispatch();
  const [isVisible,setIsVisible] = useState(false);
  const [activeTrackDetails,setActiveTrackDetails]=useState({});
    const value = useSelector(selectValue); 
  const prevValue = useSelector((state)=>state.state.playerPrevValue)
  const playerView = useSelector((state)=>state.state.playerView)
  const playbackState = usePlaybackState();


  useEffect(()=>{
    console.log('nav is visible',playbackState.state,playbackState.state==='playing' || playbackState.state==='paused' || playbackState.state==='buffering');
    if(playbackState.state==='playing' || playbackState.state==='paused' || playbackState.state==='buffering' || playbackState.state==='loading' || playbackState.state==='ready'){
      setIsVisible(true)
      try{
        trackFInder();
      }
      catch(error){
        console.log(error)
      }

    }
    else{
      setIsVisible(false)
    }
  },[playbackState.state]);


  useEffect(()=>{
    console.log('playerView,value:',playerView,value);
    if(!playerView && value===0){
       // dispatch(setValue(3))
      dispatch(setValue(prevValue===1?5:prevValue));
       console.log('showing prevValue:',prevValue);
    }
  },[playerView]);

  

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
      console.log('shown keyboard')
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


const trackFInder = async() => {
    const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
    if(currentTrackIndex!=null){
      const trackDetails = await TrackPlayer.getTrack(currentTrackIndex);
      setActiveTrackDetails(trackDetails || {"artist": "Unknown", "artwork": "unknown", "id": "unknown", "title": "Loading Error", "url": "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3"});
      //console.log('trackDetails',trackDetails)
    }}
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

  const stackSetter = ()=>
    {switch (value) {
    case 1:
      return {screen:'homemusicplayer',stack:'home'};
    break;
    case 2:
      return {screen:'searchmusicplayer',stack:'search'};
    break;
    case 3:
      return {screen:'librarymusicplayer',stack:'library'};
    break;
    default:
      return {screen:'homemusicplayer',stack:'home'};
      break;
  }}

  const musicNavigator =() =>{
    //console.log("value",value);
    const currentStack =stackSetter();
    dispatch(setPlayerView(true));
    dispatch(setValue(0));
    navigation.navigate(currentStack.stack,{screen:currentStack.screen})

    
  }
  return (
    <View style={isKeyboardVisible || value===0?styles.inactiveNav:styles.activeNav}>
      {isVisible && 
      <View style={Platform.OS==='ios'?styles.iosplayerContainer : styles.androidplayerContainer} >
        <TouchableOpacity style={{flex:0, flexDirection:'row', justifyContent:'flex-start',width:'55%',alignItems:'center'}} onPress={()=>musicNavigator()}>
        <Image source={{uri:activeTrackDetails.artwork}} style={{width:50,height:50,borderRadius:5}} />
        <View style={{marginLeft:10}}>
          <Text style={{width:100,color:'#f5f5f5',fontWeight:500 }} numberOfLines={1} ellipsizeMode="tail">{activeTrackDetails.title}</Text>
          <Text style={{width:100,color:'#f5f5f5',fontWeight:300 }} numberOfLines={1} ellipsizeMode="tail">{activeTrackDetails.artist}</Text>
        </View>
        </TouchableOpacity>

        <View style={{flex:0,flexDirection:'row',alignItems:'center',justifyContent:'space-around',width:'40%'}}>
          <TouchableOpacity style={{padding:20}} onPress={async()=>{await TrackPlayer.skipToPrevious()}}>
            <Image source={backward} style={{height:11,width:17}} />
          </TouchableOpacity>
          <TouchableOpacity style={{padding:20}} onPress={async()=>{playbackState.state==='playing'?await TrackPlayer.pause():await TrackPlayer.play()}}>
            <Image source={playbackState.state==='playing'?pause:play} style={{height:21,width:18}} />
          </TouchableOpacity>
          <TouchableOpacity style={{padding:20}} onPress={async()=>{await TrackPlayer.skipToNext()}}>
            <Image source={forward} style={{height:11,width:17}} />
          </TouchableOpacity>
        </View>

    </View>}
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
    height:70,
    borderRadius: 16,
    position:'absolute',
    bottom:40,
  },
  androidContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
    backgroundColor: '#257180',
    width:'95%',
    height:70,
    borderRadius: 16,
    position:'absolute',
    bottom:5,
  },
  iosplayerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'center',
    padding: 10,
    backgroundColor: '#257180',
    width:'95%',
    height:70,
    borderRadius: 16,
    position:'absolute',
    bottom:120,
  },
  androidplayerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'center',
    backgroundColor: '#257180',
    width:'95%',
    height:70,
    borderRadius: 16,
    position:'absolute',
    bottom:75,
    paddingHorizontal:16
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
    flexDirection:'column',
    alignItems:'center',
  },
});

export default Navbar;
