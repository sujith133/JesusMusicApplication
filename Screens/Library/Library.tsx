import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, TouchableOpacity,FlatList, ScrollView, Modal,TextInput, Dimensions} from 'react-native';
import { songList,podcastList,albumList } from '../Components/DummyDate';
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

function Library(): React.JSX.Element {
  const { width } = Dimensions.get('window'); // Get the screen width
  const isTablet = width >= 768; // Consider devices with a width >= 768 as tablets (like iPads)

  const numColumns = isTablet ? 4 : 2; // Set columns based on device type

  const [activeTab, setActiveTab] = useState('Songs'); // Initial state for active tab
  const songs=songList.slice(0,10)
  const albums=albumList.slice(0,10)
  const activeList=activeTab==="Songs"?songs:albums
  const podcasts=podcastList.slice(0,10)
  const playlists=podcastList.slice(10,20)
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState('');

  const renderSong = ({ item }: { item: Song }) => (
    <SongTile
      id={item.id}
      songName={item.songName}
      songAuthor={item.authorName}
      imageUrl={item.songImage}
      screen='librarymusicplayer'
      stack='library'
    />
  );

  const renderAlbum = ({ item }: { item: Album }) => (
    <AlbumTile
      id={item.id}
      songName={item.albumName} // Use albumName for albums
      songAuthor={item.albumAuthor}
      imageUrl={item.AlbumImage} // Use AlbumImage for albums
      cardfrom='libraryalbum'
    />
  );
  
  const renderModal = () => (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create Playlist</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Enter playlist name"
            value={newPlaylist}
            onChangeText={(text) => setNewPlaylist(text)}
          />
          <View style={styles.modalActions}>
            {newPlaylist!==""?
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                alert(`Playlist "${newPlaylist}" created!`);
                setNewPlaylist('');
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Create</Text>
            </TouchableOpacity>:<></>}
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#f5f5f5', borderWidth: 1 }]}
              onPress={() => {setModalVisible(false);                setNewPlaylist('');
              }}
            >
              <Text style={[styles.modalButtonText, { color: '#333' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
  // Tabs array for mapping
  const tabs = ['Songs', 'Albums', 'Podcasts', 'Playlists'];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <View style={{ flex: 0, paddingLeft: 24, paddingBottom: 8 }}>
          <Image source={require('../assets/image.png')} style={styles.image} />
        </View>

        <View
          style={{
            backgroundColor: '#f5f5f5',
            flex: 1,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            padding: 10,
            paddingVertical: 30,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          {/* Tabs Section */}
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)} // Set the active tab
                style={[
                  styles.tabButton,
                  activeTab === tab ? styles.activeTab : styles.inActiveTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab ? styles.activeText : styles.inActiveText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{flex:1,marginTop:36, width:'100%',alignItems:'center'}}>
          {activeTab==='Playlists'?<Text style={{fontSize:24,fontWeight:700, width:'100%',color:'#257180'}}>Add Your Own Playlist</Text>:<></>}
            {activeTab==='Playlists'?
            <View style={{width:'100%', flex:1,alignItems:'center', padding:24}}>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addContainer}>
              <Image style={{height:25,width:25}} source={require('../assets/addalbum.png')} />
              </TouchableOpacity>
            </View>
              :<></>}
            <Text style={{fontSize:24,fontWeight:700,color:'#257180',width:'100%'}}>{activeTab}</Text>
            <FlatList
              data={activeList}
              style={{paddingBottom:50}}
              renderItem={activeTab==='Songs'?renderSong:renderAlbum}
              keyExtractor={(item) => item.id.toString()}
              numColumns={numColumns} // Display 2 cards in a row
              columnWrapperStyle={styles.row} // Align items in a row
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>

          </ScrollView>

        </View>
      </View>
      {renderModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addContainer: {
    height: 80,
    width: 80,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#45719D', // Shadow color
    shadowOffset: { width: 1, height: 2 }, // x = 1, y = 2
    shadowOpacity: 0.4, // 40% opacity
    shadowRadius: 2.5, // Blur radius
    elevation: 5, // Required for shadow to work on Android
    backgroundColor: 'white', // Add background color to make shadow visible
  },
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
  tabButton: {
    borderRadius: 12,
    padding: 10,
  },
  activeTab: {
    backgroundColor: '#FD8B51',
  },
  inActiveTab: {
    backgroundColor: '#d9d9d9',
  },
  tabText: {
    fontSize: 14,
    fontWeight:700,
  },
  activeText: {
    color: 'white',
  },
  inActiveText: {
    color: '#257180',   

  },
  row: {
    flex:1,
    marginBottom: 8, // Adds spacing between rows
  },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContainer: { width: 300, backgroundColor: '#fff', padding: 20, borderRadius: 8 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalInput: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 20, paddingHorizontal: 8 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-around' },
  modalButton: { padding: 10, backgroundColor: '#257180', borderRadius: 5 },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
  menuOption: { padding: 20 },
});

export default Library;
