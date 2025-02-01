import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, BackHandler, ScrollView} from 'react-native';
import {setValue,setPlayerView,setPrevValue } from '../Redux/StateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';
import TrackPlayer, {usePlaybackState,useProgress,  State , RepeatMode} from 'react-native-track-player';
import { selectSongData, selectValue } from './Selector'; // Adjust path as needed
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import ShuffleMode from "react-native-track-player";
import BottomTab from '../Components/BottomTab';
import play from '../assets/play.png';
import pause from '../assets/pause.png';
import forward from '../assets/forward.png';
import minimize from '../assets/minimize.png';
import backward from '../assets/backward.png';
import shuffleon from '../assets/shuffleon.png';
import shuffleoff from '../assets/shuffleoff.png';
import loopoff from '../assets/loopoff.png';
import loopon from '../assets/loopon.png';
import loopone from '../assets/loopone.png';
import option from '../assets/options.png';
import playlist from '../assets/playlist.png';
import Modal from "react-native-modal";
import LibraryIcon from '../Components/LibraryIcon';

const PlayerScreen = (route) => {

  const viewStatechecker =()=>{
  try{
    const {view} = route.params;
    return(true)
  }
  catch(error){
    return (false);
  }}
  const view=viewStatechecker();
  const navigation = useNavigation();
  const state = navigation.getState();
  //console.log('Current Navigation State:', state);
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [isShuffle, setIsShuffle] = useState(false);
  const [loopState, setLoopState] = useState(0);
  const [activeTrackDetails,setActiveTrackDetails] = useState({});
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeTrackIndex,setActiveTrackIndex]=useState(0);
  const [playingQueue,setPlayingQueue]=useState([]);

  const playerView = useSelector((state)=>state.state.playerView)
  
  const toggleModal=()=>{
    console.log('modal state:',isModalVisible);
    if(isModalVisible){
      setModalVisible(false);
    }
    else{
      setModalVisible(true);
    }
  }
  const handleSeek = async (value) => {
    setIsSeeking(false);
    await TrackPlayer.seekTo(value); // Set the playback position
  };
  const handleBackPress = () => {
    navigation.goBack(); // Go back to the previous screen
    //dispatch(setValue(prevValue));
    console.log(navigation.getState())
    console.log('going back');
  };
  const songData = useSelector(selectSongData); // Use memoized selector
  const value = useSelector(selectValue); 
  const prevValue = useSelector((state)=>state.state.playerPrevValue)

  const viewState = useSelector((state)=>state.state.playerView);

  const dispatch = useDispatch();
  const switchLoop = async()=>{
    if (loopState===0){
      setLoopState(loopState+1)
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);x
    }
    else if (loopState===1){
      setLoopState(loopState+1)
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
    }
    else{
      setLoopState(0)
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
    }
    
  }
  const loopStates = [loopoff,loopon,loopone];

  const shuffleList = (TrackData,current) => {
    // Clone the TrackData to avoid mutating the original list
    const shuffledList = [...TrackData];
  
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledList.length - 1; i > 0; i--) {
      // Generate a random index
      const randomIndex = Math.floor(Math.random() * (i + 1));
      // Swap elements at i and randomIndex
      [shuffledList[i], shuffledList[randomIndex]] = [shuffledList[randomIndex], shuffledList[i]];
    }
    const removedCurrentSong = shuffledList.filter((song) => song.title !== current.title);
    return removedCurrentSong;
  };

  const unshuffleList = (TrackData,current) => {

    const removedCurrentSong = TrackData.filter((song) => song.title !== current.title);
    return removedCurrentSong;
  };

  const toggleShuffle = async () => {
  
    const current = await TrackPlayer.getActiveTrack();
    const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
    let inactiveTrackIndex = [];
    if(isShuffle){
      setIsShuffle(false);
      console.log('shuffle state if true : ',!isShuffle);
      for (let i = 0; i < songData.length; i++) {
        if(i!==currentTrackIndex){
          inactiveTrackIndex = inactiveTrackIndex.concat(i);
        }
      }
      await TrackPlayer.remove(inactiveTrackIndex);
      const unshuffledList = unshuffleList(songData, current);
      await TrackPlayer.add(unshuffledList);
    }
    else{
      setIsShuffle(true);
      console.log('shuffle state : ',!isShuffle);
      for (let i = 0; i < songData.length; i++) {
        if(i!==currentTrackIndex){
          inactiveTrackIndex = inactiveTrackIndex.concat(i);
        }
      }
      await TrackPlayer.remove(inactiveTrackIndex);
      const shuffledList = shuffleList(songData, current);
      await TrackPlayer.add(shuffledList);
    }
  };

  const handleNextTrack = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.log('No next track available:', error);
    }
    trackFInder();
    await TrackPlayer.play();
    setIsPlaying(true);
  };
  const handlePrevTrack = async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {
      console.log('No previous track available:', error);
    }
    trackFInder();
    await TrackPlayer.play();
    setIsPlaying(true);
  };
  // useEffect(() => {
  //   const handleBackGesture = () => {
  //     navigation.goBack();
  //     return true;
  //   };
  //   BackHandler.addEventListener('hardwareBackPress', handleBackGesture);

  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', handleBackGesture);
  //   };
  // }, []);
  const likeApi = async (id) => {
    console.log(id);
  };


  useEffect(() => {  
    if(value!==0){
      if(value===5){
        dispatch(setPrevValue(1))
      }
      else{
        dispatch(setPrevValue(value))
      }
      dispatch(setValue(0));
    }  
    console.log(viewState,'fullscreen3:');
    if(viewState===false){
      console.log('fullscreen1:', playbackState);
      console.log('player started with the song',songData);
      const setupPlayer = async () => {
        try {
          if(playbackState.state!==undefined && playbackState.state!=='none'){
            await TrackPlayer.reset();
            console.log('trackplayer reset done');
          }
          else{
            console.log('trackplayer not setup',playbackState.state,playbackState.state!==undefined);
          }
        } catch(error){
          console.log('at reset track player',error);
        }
        try{
          if (songData && songData.length > 0) {
            console.log('Player setup with new song data start:', songData);
            await TrackPlayer.setQueue([])
            await TrackPlayer.add(songData);
            console.log('Player setup with new song data:', songData);
          }
        }catch(error){console.log('song data error', error,songData);
        }
        trackFInder();
        changePlayback('playing');
      };
  
      if (songData) {
        setupPlayer();
      }  
    }
    else{
      trackFInder();
    }
    // return () => {
    //   if(!playerView){
    //     dispatch(setValue(prevValue))
    //    console.log('showing prevValue:',prevValue);
    //  }};
  }, [songData]); // Only depends on songData

  // Respond to playbackState changes separately
  useEffect(() => {
    if (playbackState.state!=='paused') {setIsPlaying(true);}
    else{setIsPlaying(false);}
    dispatch(setPlayerView(true));

    return () => {
      // Clean up TrackPlayer only on unmount
      console.log('dispatched value 1:',prevValue);
      dispatch(setPlayerView(false));
      // dispatch(setValue(prevValue))

    };
  }, [playbackState.state]); // Only depends on playbackState

  const changePlayback = async (state) => {
    console.log('state',state);
    if (state!=='playing') {
      setIsPlaying(false);
      await TrackPlayer.pause();
      //Write code to link next songs  list here
    } else {
      setIsPlaying(true);
      await TrackPlayer.play();
    }
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  const trackFInder = async() => {
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();
    if(currentTrackIndex!=null){
      const trackDetails = await TrackPlayer.getTrack(currentTrackIndex);
      const activeTrackIndex = await TrackPlayer.getActiveTrackIndex();
      const playingQueue = await TrackPlayer.getQueue();
      setActiveTrackIndex(activeTrackIndex);
      setPlayingQueue(playingQueue);
      console.log('initialized:',trackDetails);
      setActiveTrackDetails(trackDetails || {"artist": "Unknown", "artwork": "unknown", "id": "unknown", "title": "Loading Error", "url": "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3"});
    }
  };
  
  return (
    <View style={styles.container}> 
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image source={minimize} style={{height:30,width:30}} />
        </TouchableOpacity>
      </View>
      <View style={{height:'60%',justifyContent:'center',width:'100%',alignItems:'center'}}>
      <Image
        source={{ uri: activeTrackDetails.artwork }} 
        style={styles.artwork}
      />
      
          <Text style={styles.trackTitle}>{activeTrackDetails.title}</Text>
          <Text style={styles.artist}>{activeTrackDetails.artist}</Text>          
        <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center',width:'100%'}}>
        <TouchableOpacity onPress={() => likeApi(activeTrackDetails.id)}>
          <LibraryIcon />
        </TouchableOpacity>
        </View>

      </View>

      
      <View style={styles.progressContainer}>
      <Text style={styles.time}>
          {new Date(progress.position * 1000).toISOString().substr(14, 5)}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={progress.duration}
          value={isSeeking ? seekValue : progress.position}
          onValueChange={(value) => {
            setIsSeeking(true);
            setSeekValue(value);
          }}
          onSlidingComplete={handleSeek}
          minimumTrackTintColor="#FFA500"
          maximumTrackTintColor="#FFF"
          thumbTintColor="#FFA500"
        />
        <Text style={styles.time}>
          {new Date(progress.duration * 1000).toISOString().substr(14, 5)}
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={()=>handlePrevTrack()}>
        <Image source={backward} style={{height:22,width:34}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayback}>
        <Image source={isPlaying?pause:play} style={{height:42,width:36}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleNextTrack()}>
        <Image source={forward} style={{height:22,width:34}} />
        </TouchableOpacity>
      </View>

      <View style={styles.controlMini}>
        <TouchableOpacity onPress={()=>toggleShuffle()}>
        <Image source={isShuffle?shuffleon:shuffleoff} style={{height:40,width:40}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal}>
        <Image source={playlist} style={{height:40,width:40}} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>switchLoop()}>
        <Image source={loopStates[loopState]} style={{height:40,width:40}} />
        </TouchableOpacity>
      </View>
      <Modal  isVisible={isModalVisible} style={{padding:0,margin:0,top:70,left:0,width:'100%'}} animationIn={'slideInUp'} animationOut={'slideOutDown'} onBackdropPress={toggleModal}>
        <View style={{ flex: 1, borderTopRightRadius:20,borderTopLeftRadius:20, justifyContent: 'flex-start', alignItems: 'flex-start',backgroundColor:'#f5f5f5',padding:20 }}>
          <View style={{flex:0,flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
          <Text style={{color:'#000000',fontSize:24}}>Now Playing</Text>
          <TouchableOpacity onPress={toggleModal}><Text>close</Text></TouchableOpacity>
          </View>
          <ScrollView style={{width:'100%'}}>
          {playingQueue.map((song, index) => (
            <View key={index} style={{flex:0,flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',marginTop:16}}>
              <Image source={{uri:song.artwork}} style={{width:50,height:50,borderRadius:5}} />
              <View style={{marginLeft:10}}>
                <Text style={{width:150,color:'#000000',fontWeight:500 }} numberOfLines={1} ellipsizeMode="tail">{song.title}</Text>
                <Text style={{width:150,color:'#000000',fontWeight:300 }} numberOfLines={1} ellipsizeMode="tail">{song.artist}</Text>
              </View>
              <Text style={{width:100,color:'#000000',fontWeight:500 }} numberOfLines={1} ellipsizeMode="tail">{index!=activeTrackIndex?'':'Now Playing'}</Text>

            </View>
          ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C6C72',
    alignItems: 'center',
    justifyContent:'space-around',
    padding:30,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  artwork: {
    width: 250,
    height: 250,
    borderRadius: 30,
    marginBottom: 40,
    marginTop:20,
  },
  trackTitle: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artist: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
   
    marginVertical: 20,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  progressBar: {
    flex: 1,
    height: 5,
    backgroundColor: '#FFF',
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFA500',
  },
  time: {
    color: '#FFF',
    fontSize: 14,
  },
  controls: {
    marginTop:40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
  },
  controlMini: {
    marginTop:40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
});

export default PlayerScreen;
