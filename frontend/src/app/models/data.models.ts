// Interfaces compartidas para datos de la aplicación

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  coverUrl: string;
  releaseYear: number;
  genre: string;
  tracks: number;
  duration: string;
  label: string;
  description: string;
  averageRating: number;
  totalReviews: number;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  photoUrl: string;
  genre: string;
  activeYears: string;
  albums: number;
  monthlyListeners: number;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  duration: string;
  releaseYear: number;
  genre: string;
  coverUrl: string;
  description: string;
  averageRating: number;
  totalReviews: number;
}

export interface Track {
  id: string;
  number: number;
  title: string;
  duration: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  date: Date;
  likes: number;
}

export interface SearchResults {
  albums: Album[];
  artists: Artist[];
  songs: Song[];
  totalResults: number;
}
