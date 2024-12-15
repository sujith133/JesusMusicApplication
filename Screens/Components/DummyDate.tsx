export interface Song {
    id: number;
    songName: string;
    authorName: string;
    albumId: string;
    songImage: string;
  }

  export interface Carousel {
    id: number;
    imageUrl: string;
  }

  export interface Album{
    id:number;
    albumName:string;
    albumAuthor:string;
    songId:number[];
    AlbumImage:string;
  }
  export interface Podcast{
    id:number;
    podcastName:string;
    podcastHost:string;
    songId:number[];
    podcastImage:string;
  }

  interface Recents {
    id: number;
    songName: string;
    authorName: string;
    albumId: string;
    songImage: string;
  }
  


export const songList: Song[] = [
    { id: 1, songName: "Neelone Anandham", authorName: "Evan Mark Ronald", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile1.jpg" },
    { id: 2, songName: "YESU NEE RAKTHAMU", authorName: "Sunny Santosh Kornepati", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile2.jpg" },
    { id: 3, songName: "Nee Pilupu", authorName: "Benny Joshua", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile3.jpg" },
    { id: 4, songName: "Shuddha Hrudayam", authorName: "Ravinder Vottepu", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile4.jpeg" },
    { id: 5, songName: "Ilalona Ediayina", authorName: "Ravinder Vottepu", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile5.jpeg" },
    { id: 6, songName: "Kalanaina Ilanaina", authorName: "Ravinder Vottepu", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile6.jpg" },
    { id: 7, songName: "Aaradhana Sthuthi Aaradhana", authorName: "Ravinder Vottepu", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile7.jpeg" },
    { id: 8, songName: "Lekinchaleni Sthrothramul", authorName: "Ravinder Vottepu", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile8.jpeg" },
    { id: 9, songName: "Naa Thandri Neeve", authorName: "Ravinder Vottepu", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile9.jpeg" },
    { id: 10, songName: "Neeve Naa Raajuvu", authorName: "Ravinder Vottepu", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile10.jpeg" },
    { id: 11, songName: "Nee Krupaye", authorName: "Benny Joshua", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile11.jpeg" },
    { id: 12, songName: "Ninupolina Vaarevaru", authorName: "Benny Joshua", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile12.jpeg" },
    { id: 13, songName: "Kruthagnathatho", authorName: "Joel N Bob", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile13.jpeg" },
    { id: 14, songName: "Viluveleni Na Jeevitham", authorName: "Vinod Kumar", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile14.jpeg" },
    { id: 15, songName: "Hosanna", authorName: "Vinod Kumar", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile15.jpeg" },
    { id: 16, songName: "Ayyiah Vandhanaalu", authorName: "James Ezekiel", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile16.jpeg" },
    { id: 17, songName: "Na Priya Yesu Raa", authorName: "Pranith Paul", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile17.jpeg" },
    { id: 18, songName: "Neeve Na Daagustalama", authorName: "Anand John", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile18.jpeg" },
    { id: 19, songName: "Ye Bhayamu", authorName: "Vinod Kumar", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile19.jpeg" },
    { id: 20, songName: "Deva Naa Hrudayamutho", authorName: "Ravinder Vottepu", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile20.jpeg" },
    { id: 21, songName: "Maa Yesu Raaja", authorName: "Pranith Paul", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile21.jpeg" },
    { id: 22, songName: "Yesu Naa Poratamlo", authorName: "Benny Joshua", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile22.jpeg" },
    { id: 23, songName: "Devuni Sneham Leni", authorName: "Anand John", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile23.jpeg" },
    { id: 24, songName: "Naa Koraku Cheppina Nuvve", authorName: "Ravinder Vottepu", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile24.jpeg" },
    { id: 25, songName: "Hrudaya Vedhana Nee Jatha", authorName: "Vinod Kumar", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile25.jpeg" },
    { id: 26, songName: "Naa Jeevitham Nee Sannidhilo", authorName: "Joel N Bob", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile26.jpeg" },
    { id: 27, songName: "Yesu Nadaka Nalo Undaga", authorName: "Sunny Santosh Kornepati", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile27.jpeg" },
    { id: 28, songName: "Yeduta Nilichina Devudu", authorName: "Benny Joshua", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile28.jpeg" },
    { id: 29, songName: "Sneham Thone Nannu Aadarinchina", authorName: "James Ezekiel", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile29.jpeg" },
    { id: 30, songName: "Prajala Paapam Chellinchina", authorName: "Ravinder Vottepu", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile30.jpeg" },
    { id: 31, songName: "Naa Yesu Prabhu", authorName: "Anand John", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile1.jpeg" },
    { id: 32, songName: "Yesu Sthuthi Geetam", authorName: "Vinod Kumar", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile2.jpeg" },
    { id: 33, songName: "Neelone Anandham", authorName: "Evan Mark Ronald", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile3.jpeg" },
    { id: 34, songName: "Krupa Vachamulu", authorName: "Benny Joshua", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile34.jpeg" },
    { id: 35, songName: "Nuvve Naa Raksha", authorName: "Joel N Bob", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile35.jpeg" },
    { id: 36, songName: "Satyamaina Vakyam", authorName: "Sunny Santosh Kornepati", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile1.jpeg" },
    { id: 37, songName: "Yesu Janminchina Raathri", authorName: "Pranith Paul", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile2.jpeg" },
    { id: 38, songName: "Prathi Jeevitham Lo Sandeshaalu", authorName: "Ravinder Vottepu", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile3.jpeg" },      
    { id: 39, songName: "Maa Yesu Raaja", authorName: "Pranith Paul", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile4.jpeg" },
    { id: 40, songName: "Yesu Naa Poratamlo", authorName: "Benny Joshua", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile5.jpeg" },
    { id: 41, songName: "Devuni Sneham Leni", authorName: "Anand John", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile6.jpeg" },
    { id: 42, songName: "Naa Koraku Cheppina Nuvve", authorName: "Ravinder Vottepu", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile7.jpeg" },
    { id: 43, songName: "Hrudaya Vedhana Nee Jatha", authorName: "Vinod Kumar", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile8.jpeg" },
    { id: 44, songName: "Naa Jeevitham Nee Sannidhilo", authorName: "Joel N Bob", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile9.jpeg" },
    { id: 45, songName: "Yesu Nadaka Nalo Undaga", authorName: "Sunny Santosh Kornepati", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile10.jpeg" },
    { id: 46, songName: "Yeduta Nilichina Devudu", authorName: "Benny Joshua", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile11.jpeg" },
    { id: 47, songName: "Sneham Thone Nannu Aadarinchina", authorName: "James Ezekiel", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile12.jpeg" },
    { id: 48, songName: "Prajala Paapam Chellinchina", authorName: "Ravinder Vottepu", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile13.jpeg" },
    { id: 49, songName: "Naa Yesu Prabhu", authorName: "Anand John", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile14.jpeg" },
    { id: 50, songName: "Yesu Sthuthi Geetam", authorName: "Vinod Kumar", albumId: "02", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile15.jpeg" }
];


export const songCarousel: Carousel[] = [
    {
    id: 1,
    imageUrl: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/cover1.jpg",
  },
  {
    id: 2,
    imageUrl: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/cover2.jpg",
  },
  {
    id: 3,
    imageUrl: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/cover3.jpg",
  },
  {
    id: 4,
    imageUrl: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/cover4.jpg",
  },
  {
    id: 5,
    imageUrl: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/cover5.jpg",
  },
  {
    id: 6,
    imageUrl: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/cover6.jpg",
  },
  {
    id: 7,
    imageUrl: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/cover7.jpg",
  },
  {
    id: 8,
    imageUrl: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/cover8.jpg",
  },

];

export const albumList: Album[] = [
  {
    id: 1256,
    albumName: "Album 1",
    albumAuthor: "Evan Mark Ronald",
    songId: [1, 2, 3, 4],
    AlbumImage:"https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile13.jpeg",
  },
  {
    id: 1324,
    albumName: "Album 2",
    albumAuthor: "Sunny Santosh Kornepati",
    songId: [5, 6, 7, 8],
    AlbumImage:"https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile15.jpeg",
  },
  {
    id: 1428,
    albumName: "Album 3",
    albumAuthor: "Benny Joshua",
    songId: [9, 10, 11, 12],
    AlbumImage:"https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile17.jpeg",
  },
  {
    id: 1589,
    albumName: "Album 4",
    albumAuthor: "Ravinder Vottepu",
    songId: [13, 14, 15, 16],
    AlbumImage:"https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile19.jpeg",
  },
  {
    id: 1634,
    albumName: "Album 5",
    albumAuthor: "Vinod Kumar",
    songId: [17, 18, 19, 20],
    AlbumImage:"https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile21.jpeg",
  },
  {
    id: 1773,
    albumName: "Album 6",
    albumAuthor: "James Ezekiel",
    songId: [21, 22, 23, 24],
    AlbumImage:"https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile23.jpeg",
  },
  {
    id: 1820,
    albumName: "Album 7",
    albumAuthor: "Pranith Paul",
    songId: [25, 26, 27, 28],
    AlbumImage:"https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile25.jpeg",
  },
  {
    id: 1956,
    albumName: "Album 8",
    albumAuthor: "Joel N Bob",
    songId: [29, 30, 31, 32],
    AlbumImage:"https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile27.jpeg",
  },
];

export const podcastList: Podcast[] = [
  {
    id: 2001,
    podcastName: "Podcast 1",
    podcastHost: "Evan Mark Ronald",
    songId: [1, 5, 9, 13],
    podcastImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile1.jpg",
  },
  {
    id: 2105,
    podcastName: "Podcast 2",
    podcastHost: "Sunny Santosh Kornepati",
    songId: [2, 6, 10, 14],
    podcastImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile2.jpg",
  },
  {
    id: 2213,
    podcastName: "Podcast 3",
    podcastHost: "Benny Joshua",
    songId: [3, 7, 11, 15],
    podcastImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile3.jpg",
  },
  {
    id: 2324,
    podcastName: "Podcast 4",
    podcastHost: "Ravinder Vottepu",
    songId: [4, 8, 12, 16],
    podcastImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile4.jpeg",
  },
  {
    id: 2440,
    podcastName: "Podcast 5",
    podcastHost: "Vinod Kumar",
    songId: [17, 21, 25, 29],
    podcastImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile17.jpeg",
  },
  {
    id: 2562,
    podcastName: "Podcast 6",
    podcastHost: "James Ezekiel",
    songId: [18, 22, 26, 30],
    podcastImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile18.jpeg",
  },
  {
    id: 2683,
    podcastName: "Podcast 7",
    podcastHost: "Pranith Paul",
    songId: [19, 23, 27, 31],
    podcastImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile19.jpeg",
  },
  {
    id: 2751,
    podcastName: "Podcast 8",
    podcastHost: "Joel N Bob",
    songId: [20, 24, 28, 32],
    podcastImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile20.jpeg",
  },
];



export const RecentList: Recents[] = [
  { id: 20, songName: "Deva Naa Hrudayamutho", authorName: "Ravinder Vottepu", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile20.jpeg" },
    { id: 21, songName: "Maa Yesu Raaja", authorName: "Pranith Paul", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile21.jpeg" },
    { id: 22, songName: "Yesu Naa Poratamlo", authorName: "Benny Joshua", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile22.jpeg" },
    { id: 23, songName: "Devuni Sneham Leni", authorName: "Anand John", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile23.jpeg" },
    { id: 24, songName: "Naa Koraku Cheppina Nuvve", authorName: "Ravinder Vottepu", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile24.jpeg" },
    { id: 25, songName: "Hrudaya Vedhana Nee Jatha", authorName: "Vinod Kumar", albumId: "01", songImage: "https://raw.githubusercontent.com/sujith133/dummy-data-dump/refs/heads/main/Tile25.jpeg" },
];