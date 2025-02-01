import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { albumList } from '../Components/DummyDate';
import { songList } from '../Components/DummyDate';

import AlbumTile from '../Components/AlbumTile';
import SongTile from '../Components/SongTile';

export interface Album {
  id: number;
  albumName: string;
  albumAuthor: string;
  songId: number[];
  AlbumImage: string;
}

interface Song {
  id: number;
  songName: string;
  authorName: string;
  albumId: string;
  songImage: string;
  songUrl:string;
}

function SubHome({ route, navigation }): React.JSX.Element {
  const { width } = Dimensions.get('window'); // Get the screen width
  const isTablet = width >= 768; // Consider devices with a width >= 768 as tablets (like iPads)
  ////console.log('going back home');
  const numColumns = isTablet ? 4 : 2; // Set columns based on device type
  const columnWrapperStyle = {
    flex:1,
    width:'100%',
    justifyContent: 'center',
    marginBottom: 8,
    paddingHorizontal: isTablet ? 32 : 16, // Adjust padding for larger screens
  };

  const renderAlbum = ({ item }: { item: Album }) => (
    <AlbumTile
      id={item.id}
      songName={item.albumName}
      songAuthor={item.albumAuthor}
      imageUrl={item.AlbumImage}
      cardfrom='homealbum'
    />
  );

  const renderSong = ({ item }: { item: Song }) => (
    <SongTile
    id={item.id}
    songName={item.songName}
    songAuthor={item.authorName}
    imageUrl={item.songImage}
    screen='homemusicplayer'
    stack='home'
    songUrl={item.songUrl}
  />



  );

  const navigateBack = () => {
    navigation.goBack();
    console.log('going back home');
  };

  const { targetString } = route.params;
  const selectItem = targetString[1]==="song"?renderSong:renderAlbum
  const selectData = targetString[1]==="song"?songList:albumList  
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <View style={{ flex: 0, paddingLeft: 24, paddingBottom: 8 }}>
          <Image
            source={require('../assets/image.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={{flex:0,flexDirection:'row',alignItems:'center' }}>
            <TouchableOpacity style={{height:36,width:36}} onPress={()=>navigateBack()}>
              <Image style={{ height: 25, width: 14 }} source={require('../assets/backbutton.png')} />
            </TouchableOpacity>
            <Text style={{marginLeft:0,fontSize:24, fontWeight:700, color:'#257180'}}>{targetString[0]}</Text>
          </View>
          <FlatList
            style={{marginBottom:50}}
            data={selectData}
            renderItem={selectItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns} // Dynamic column count
            columnWrapperStyle={styles.row} // Align items in a row
            showsVerticalScrollIndicator={false}
            key={`numColumns-${numColumns}`} // Add a dynamic key to force re-render
          />
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
    flex: 1,
  },
  image: {
    width: 80,
    height: 43,
    marginTop:7,
  },
  row: {
    flex:1,
    justifyContent: 'space-around', // Ensures spacing between two cards
    marginBottom: 16, // Adds spacing between rows
    width:'100%',
  },
  contentContainer: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 20,
    paddingHorizontal:10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleText: {
    fontWeight: '700',
    marginTop: 16,
  },
  titleTextIpad:{
    fontWeight: '700',
    fontSize:24,
    marginTop: 16,
  },
});

export default SubHome;
