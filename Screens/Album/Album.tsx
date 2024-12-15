import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { albumList, songList, podcastList } from '../Components/DummyDate';
import { Snackbar } from 'react-native-paper';

const Album = ({ route, navigation }: any) => {
  const [snackVisible, setSnackVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState('');
  const showSnack = () => { setSnackVisible(true) }
  const hideSnack = () => { setSnackVisible(false) }
  
  const { albumId } = route.params;
  console.log(albumId);
  const AlbumData = albumList.filter((item) => item.id === albumId);
  const PodcastData = podcastList.filter((item) => item.id === albumId);

  const songs = AlbumData[0]?.songId || PodcastData[0].songId;
  const SongData = songList.filter((item) => songs.includes(item.id));

  const navigateBack = () => {
    navigation.goBack();
  };

  const [playlists, setPlaylists] = useState([
    'Chill Vibes',
    'Workout Beats',
    'Sunday Worship',
    'Road Trip',
    'Study Tunes',
  ]); // Example playlists
  
  const renderModal = () => (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select a Playlist</Text>
          <ScrollView style={{ maxHeight: 200 }}>
            {playlists.map((playlist, index) => (
              <TouchableOpacity
                key={index}
                style={styles.playlistOption}
                onPress={() => {
                  alert(`Song added to "${playlist}"!`);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.playlistName}>{playlist}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#f5f5f5', borderWidth: 1 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.modalButtonText, { color: '#333' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderSong = (item: any) => (
    <TouchableOpacity style={styles.songContainer} key={item.id}>
      <View style={styles.songContainer}>
        <View style={styles.songInfo}>
          <Text style={styles.songName}>{item.songName}</Text>
          <Text style={styles.songAuthor}>{item.authorName}</Text>
        </View>
        <View style={styles.songActions}>
          <Menu>
            <MenuTrigger>
              <Image
                style={styles.actionIconoption}
                source={require('../assets/albumoptions.png')}
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() =>
                  alert('Song added to library')
                } style={styles.menuOption} text="Add to Library" />
              <MenuOption style={styles.menuOption} onSelect={() => setModalVisible(true)} text="Add to Playlist" />
              <MenuOption
                style={styles.menuOption}
                onSelect={() =>
                  alert('Please mail us at reportyourquery@jesusmusic.com including Album/Song name')
                }
                text="Report"
              />
            </MenuOptions>
          </Menu>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <View style={{ flex: 0, paddingLeft: 24, paddingBottom: 8 }}>
          <Image source={require('../assets/image.png')} style={styles.image} />
        </View>

        <ScrollView
          contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center' }}
          style={{
            backgroundColor: '#f5f5f5',
            flex: 1,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            padding: 20,
          }}
        >
          <View style={{ width: '100%' }}>
            <TouchableOpacity onPress={navigateBack}>
              <Image style={{ height: 25, width: 14,marginBottom:60 }} source={require('../assets/backbutton.png')} />
            </TouchableOpacity>
          </View>

          <Image
            style={styles.albumImage}
            source={{ uri: AlbumData[0]?.AlbumImage || PodcastData[0].podcastImage }}
          />
          <View style={{ width: '100%', marginVertical: 10 }}>
            <Text style={styles.albumName}>{AlbumData[0]?.albumName || PodcastData[0].podcastName}</Text>
            <Text style={styles.albumAuthor}>{AlbumData[0]?.albumAuthor || PodcastData[0].podcastHost}</Text>
          </View>
          <View style={styles.actionsContainer}>
            <View style={styles.row}>
              <TouchableOpacity>
                <Image
                  style={styles.actionIcon1}
                  source={require('../assets/shuffleAlbum.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('album added to library')}>
                <Image
                  style={styles.actionIcon2}
                  source={require('../assets/addalbum.png')}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => showSnack()}>
              <Image style={styles.playIcon} source={require('../assets/albumplay.png')} />
            </TouchableOpacity>
          </View>

          {/* Replacing FlatList with ScrollView */}
          <ScrollView contentContainerStyle={{ flex:1,paddingBottom: 95 }}>
            {SongData.map(renderSong)}
          </ScrollView>
        </ScrollView>
      </View>
      {renderModal()}
      <Snackbar
        visible={snackVisible}
        onDismiss={hideSnack}
        action={{
          label: 'Undo',
          onPress: () => {
            // Perform an action on Undo
            console.log('Undo action triggered');
          },
        }}
      >
        This is a snackbar message!
      </Snackbar>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#257180' },
  subContainer: { flex: 1 },
  image: {
    width: 80,
    height: 43,
    marginTop:7,
  },
  albumImage: { height: 300, width: 300, borderRadius: 8 },
  albumName: { color:'#257180', fontSize: 30, fontWeight: 'bold', marginVertical: 5 },
  albumAuthor: { fontSize: 20, color: 'gray' },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', width: '100%', padding: 10 },
  row: { flexDirection: 'row' },
  actionIconoption: { height: 22, width: 22, marginRight: 35, transform: 'rotate(90deg)' },
  actionIcon1: { height: 22, width: 22, marginRight: 35 },
  actionIcon2: { height: 25, width: 25, marginRight: 35 },
  actionIcon3: { height: 32, width: 32, marginRight: 35 },
  playIcon: { height: 50, width: 50 },
  songContainer: { width:"100%",flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, backgroundColor: '#ffffff', height: 90,borderBottomWidth:1,borderColor:"#ccc" },
  songInfo: { flex: 1, marginLeft: 10 },
  songName: { color:'#257180', fontSize: 16, fontWeight: 'bold' },
  songAuthor: { fontSize: 14, color: 'gray' },
  songActions: { flexDirection: 'row', justifyContent: 'space-between', width: 60 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContainer: { width: 300, backgroundColor: '#fff', padding: 20, borderRadius: 8 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalInput: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 20, paddingHorizontal: 8 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-around' },
  modalButton: { padding: 10, backgroundColor: '#257180', borderRadius: 5 },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
  menuOption: { padding: 20 },
  playlistOption: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  playlistName: {
    fontSize: 16,
    color: '#333',
  },
  
});

export default Album;
