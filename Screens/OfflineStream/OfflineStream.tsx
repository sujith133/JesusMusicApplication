import React from 'react';
import { SafeAreaView, StyleSheet, View, Image,Text, TextInput, FlatList, ScrollView, Dimensions } from 'react-native';
import { useState } from 'react';
import { songList } from '../Components/DummyDate';
import SongTile from '../Components/SongTile';
import AlbumTile from '../Components/AlbumTile';

export interface Song {
  id: number;
  songName: string;
  authorName: string;
  albumId: string;
  songImage: string;
}

export interface Album {
  id: number;
  albumName: string;
  albumAuthor: string;
  songId: number[];
  AlbumImage: string;
}

function OfflineStream(): React.JSX.Element {
  const { width } = Dimensions.get('window'); // Get the screen width
  const isTablet = width >= 768; // Consider devices with a width >= 768 as tablets (like iPads)
  const numColumns = isTablet ? 4 : 2; // Set columns based on device type
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(songList);
  const albumList=[]
  const podcastList=[]
  const songLists=songList.slice(0,10)
  const handleSearch = (text: string) => {
    setSearchText(text);

    // Filter the mock data
    const filtered = songList.filter((item) =>
      item.songName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const clearSearch = () => {
    setSearchText('');
    setFilteredData(songList); // Reset to original data
  };
  const renderSong = ({ item }: { item: Song }) => (
    <SongTile
      id={item.id}
      songName={item.songName}
      songAuthor={item.authorName}
      imageUrl={item.songImage}
    />
  );
  const renderAlbum = ({ item }: { item: Album }) => (
    <AlbumTile
      id={item.id}
      songName={item.albumName}
      songAuthor={item.albumAuthor}
      imageUrl={item.AlbumImage}
    />
  );
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <View style={{flex:0,paddingLeft:24,paddingBottom:8}}>
        <Image
          source={require('../assets/image.png')}
          style={styles.image}
        />
        </View>

        <View style={{backgroundColor:'#f5f5f5',flex:1,borderTopRightRadius:20,borderTopLeftRadius:20,padding:20,paddingBottom:8,flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>

          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View>
          {songList.length>0 && <View>
            <Text style={{fontSize:20, fontWeight:700,marginTop:24, color:'#257180'}}>Offline Streaming Songs</Text>
            <FlatList
              data={songLists}
              renderItem={renderSong}
              keyExtractor={(item) => item.id.toString()}
              numColumns={numColumns} // Display 2 cards in a row
              columnWrapperStyle={styles.row} // Align items in a row
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>}
          {albumList.length>0 && <View>
            <Text style={{fontSize:24, fontWeight:700, color:'#45719D',marginTop:24}}>Album Result</Text>
            <FlatList
              data={albumList}
              renderItem={renderAlbum}
              keyExtractor={(item) => item.id.toString()}
              numColumns={numColumns} // Display 2 cards in a row
              columnWrapperStyle={styles.row} // Align items in a row
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>}
          {podcastList.length>0 && <View>
            <Text style={{fontSize:24, fontWeight:700, color:'#45719D',marginTop:24}}>Podcast Result</Text>
            <FlatList
              data={podcastList}
              renderItem={renderAlbum}
              keyExtractor={(item) => item.id.toString()}
              numColumns={numColumns} // Display 2 cards in a row
              columnWrapperStyle={styles.row} // Align items in a row
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>}
          </View>
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
  image: {
    width: 100,
    height: 53,
  },
  searchContainer: {
    backgroundColor: '#257180', // Match the main background color
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width:'100%',
    borderWidth:2,
    borderColor:'#000000',

  },
  inputContainer: {
    backgroundColor: '#f5f5f5', // Light gray input background
  },
  row: {
    width:'100%',
    justifyContent: 'flex-start', // Ensures spacing between two cards
    marginBottom: 16, // Adds spacing between rows
    paddingHorizontal:10,
    marginHorizontal:12,
  },
});

export default OfflineStream;
