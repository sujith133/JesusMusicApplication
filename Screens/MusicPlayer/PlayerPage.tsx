import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {setValue } from '../Redux/StateSlice';
import { useDispatch, useSelector } from 'react-redux';
import TrackPlayer, {
  usePlaybackState,
  useProgress,  State , RepeatMode
} from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';

import ShuffleMode from "react-native-track-player"

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
import playlist from '../assets/playlist.png'



const PlayerScreen = () => {
  const navigation = useNavigation();
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [loopState, setLoopState] = useState(0);
  const [activeTrackDetails,setActiveTrackDetails] = useState({});

  const handleBackPress = () => {
    navigation.goBack(); // Go back to the previous screen
    console.log('going back');
  };
  const value = useSelector((state) => state.state.value);
  const dispatch = useDispatch();
  const switchLoop = async()=>{
    if (loopState===0){
      setLoopState(loopState+1)
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
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

  const toggleShuffle = async () => {
    try {
      // Toggle the local state
      setIsShuffle(!isShuffle);
  
      // Get the current shuffle mode
      const currentMode = await TrackPlayer.getShuffleMode();
  
      // Determine the new mode
      const newMode = currentMode === ShuffleMode.Enabled ? ShuffleMode.Off : ShuffleMode.Enabled;
  
      // Log the new mode
      console.log('New Shuffle Mode:', newMode);
  
      // Set the shuffle mode
      await TrackPlayer.setShuffleMode(newMode);
    } catch (error) {
      console.error('Error toggling shuffle mode:', error);
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
      console.log('No next track available:', error);
    }
    trackFInder();
    await TrackPlayer.play();
    setIsPlaying(true);
  };
  useEffect(() => {
      console.log(value,'value');
      dispatch(setValue(0))
      
    const setup = async () => {
      await setupPlayer();
    };
    trackFInder();
    setup();

    return () => {
      // Clean up resources when the component unmounts
      console.log(playbackState);
      dispatch(setValue(value))
      TrackPlayer.setupPlayer();
    };
  }, []);

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add([
      {
        id: "1",
        url: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/main/song1.mp3",
        title: "Viluve leni na jeevitham",
        artist: "Vinod Kumar",
        artwork: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile2.jpg"
      },
      {
        id: "2",
        url: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/main/song2.mp3",
        title: "Adigo Yevarai",
        artist: "Joshua Shaik",
        artwork: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile5.jpeg"
      },
      {
        id: "3",
        url: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/main/song3.mp3",
        title: "Yesu Natho",
        artist: "Anil Kumar",
        artwork: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile17.jpeg"
      },
      {
        id: "4",
        url: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/main/song4.mp3",
        title: "Karthikeya Namamu",
        artist: "John Samuel",
        artwork: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile11.jpeg"
      },
      {
        id: "5",
        url: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/main/song5.mp3",
        title: "Neenu Lekapothe",
        artist: "Jeevan Kumar",
        artwork: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile22.jpeg"
      }
    ]
    );

  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
    }
    trackFInder()
  };
  const trackFInder = async() => {
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();
    if(currentTrackIndex!=null){
      const trackDetails = await TrackPlayer.getTrack(currentTrackIndex);
      setActiveTrackDetails(trackDetails || {"artist": "Unknown", "artwork": "unknown", "id": "unknown", "title": "Loading Error", "url": "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3"});
      console.log(activeTrackDetails);
    }

  }
  return (
    <View style={styles.container}> 
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>handleBackPress()}>
          <Image source={minimize} style={{height:30,width:30}} />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: activeTrackDetails.artwork }} 
        style={styles.artwork}
      />
      <Text style={styles.trackTitle}>{activeTrackDetails.title}</Text>
      <Text style={styles.artist}>{activeTrackDetails.artist}</Text>

      <View style={styles.progressContainer}>
        <Text style={styles.time}>
          {new Date(progress.position * 1000).toISOString().substr(14, 5)}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width:
                  `${(progress.position / progress.duration) * 100}%` || '0%',
              },
            ]}
          />
        </View>
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
        <TouchableOpacity>
        <Image source={playlist} style={{height:40,width:40}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>switchLoop()}>
        <Image source={loopStates[loopState]} style={{height:40,width:40}} />
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
    padding: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  artwork: {
    width: 300,
    height: 300,
    borderRadius: 30,
    marginBottom: 40,
    marginTop:60,
  },
  trackTitle: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artist: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    marginTop:80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
});

export default PlayerScreen;
