/**
 * Mock data para desarrollo UI/UX
 *
 * Este archivo contiene datos estáticos que simulan las respuestas
 * de Deezer y el backend para poder trabajar en UI sin consumir tokens.
 *
 * ACTIVAR: Configurar USE_MOCK_DATA = true en environment
 */

import { DeezerAlbum, DeezerArtist, DeezerTrack } from './deezer.service';
import { Album, Artist, Track, Review, AlbumStats } from '../models/data.models';

// =============================================================================
// MOCK ARTISTS
// =============================================================================

export const MOCK_ARTISTS: DeezerArtist[] = [
  {
    id: 1,
    name: 'Radiohead',
    picture: 'https://picsum.photos/seed/radiohead/200',
    picture_small: 'https://picsum.photos/seed/radiohead/56',
    picture_medium: 'https://picsum.photos/seed/radiohead/250',
    picture_big: 'https://picsum.photos/seed/radiohead/500',
    picture_xl: 'https://picsum.photos/seed/radiohead/1000',
    nb_album: 9,
    nb_fan: 4500000,
    tracklist: '',
    type: 'artist'
  },
  {
    id: 2,
    name: 'Pink Floyd',
    picture: 'https://picsum.photos/seed/pinkfloyd/200',
    picture_small: 'https://picsum.photos/seed/pinkfloyd/56',
    picture_medium: 'https://picsum.photos/seed/pinkfloyd/250',
    picture_big: 'https://picsum.photos/seed/pinkfloyd/500',
    picture_xl: 'https://picsum.photos/seed/pinkfloyd/1000',
    nb_album: 15,
    nb_fan: 8200000,
    tracklist: '',
    type: 'artist'
  },
  {
    id: 3,
    name: 'Daft Punk',
    picture: 'https://picsum.photos/seed/daftpunk/200',
    picture_small: 'https://picsum.photos/seed/daftpunk/56',
    picture_medium: 'https://picsum.photos/seed/daftpunk/250',
    picture_big: 'https://picsum.photos/seed/daftpunk/500',
    picture_xl: 'https://picsum.photos/seed/daftpunk/1000',
    nb_album: 4,
    nb_fan: 6100000,
    tracklist: '',
    type: 'artist'
  },
  {
    id: 4,
    name: 'The Beatles',
    picture: 'https://picsum.photos/seed/beatles/200',
    picture_small: 'https://picsum.photos/seed/beatles/56',
    picture_medium: 'https://picsum.photos/seed/beatles/250',
    picture_big: 'https://picsum.photos/seed/beatles/500',
    picture_xl: 'https://picsum.photos/seed/beatles/1000',
    nb_album: 13,
    nb_fan: 9500000,
    tracklist: '',
    type: 'artist'
  },
  {
    id: 5,
    name: 'Kendrick Lamar',
    picture: 'https://picsum.photos/seed/kendrick/200',
    picture_small: 'https://picsum.photos/seed/kendrick/56',
    picture_medium: 'https://picsum.photos/seed/kendrick/250',
    picture_big: 'https://picsum.photos/seed/kendrick/500',
    picture_xl: 'https://picsum.photos/seed/kendrick/1000',
    nb_album: 5,
    nb_fan: 7800000,
    tracklist: '',
    type: 'artist'
  },
  {
    id: 6,
    name: 'Arcade Fire',
    picture: 'https://picsum.photos/seed/arcadefire/200',
    picture_small: 'https://picsum.photos/seed/arcadefire/56',
    picture_medium: 'https://picsum.photos/seed/arcadefire/250',
    picture_big: 'https://picsum.photos/seed/arcadefire/500',
    picture_xl: 'https://picsum.photos/seed/arcadefire/1000',
    nb_album: 6,
    nb_fan: 2100000,
    tracklist: '',
    type: 'artist'
  }
];

// =============================================================================
// MOCK ALBUMS
// =============================================================================

export const MOCK_ALBUMS: DeezerAlbum[] = [
  {
    id: 101,
    title: 'OK Computer',
    cover: 'https://picsum.photos/seed/okcomputer/200',
    cover_small: 'https://picsum.photos/seed/okcomputer/56',
    cover_medium: 'https://picsum.photos/seed/okcomputer/250',
    cover_big: 'https://picsum.photos/seed/okcomputer/500',
    cover_xl: 'https://picsum.photos/seed/okcomputer/1000',
    genre_id: 152,
    label: 'Parlophone',
    nb_tracks: 12,
    duration: 3180,
    release_date: '1997-05-21',
    record_type: 'album',
    explicit_lyrics: false,
    tracklist: '',
    artist: MOCK_ARTISTS[0],
    type: 'album'
  },
  {
    id: 102,
    title: 'The Dark Side of the Moon',
    cover: 'https://picsum.photos/seed/dsotm/200',
    cover_small: 'https://picsum.photos/seed/dsotm/56',
    cover_medium: 'https://picsum.photos/seed/dsotm/250',
    cover_big: 'https://picsum.photos/seed/dsotm/500',
    cover_xl: 'https://picsum.photos/seed/dsotm/1000',
    genre_id: 152,
    label: 'Harvest',
    nb_tracks: 10,
    duration: 2583,
    release_date: '1973-03-01',
    record_type: 'album',
    explicit_lyrics: false,
    tracklist: '',
    artist: MOCK_ARTISTS[1],
    type: 'album'
  },
  {
    id: 103,
    title: 'Random Access Memories',
    cover: 'https://picsum.photos/seed/ram/200',
    cover_small: 'https://picsum.photos/seed/ram/56',
    cover_medium: 'https://picsum.photos/seed/ram/250',
    cover_big: 'https://picsum.photos/seed/ram/500',
    cover_xl: 'https://picsum.photos/seed/ram/1000',
    genre_id: 113,
    label: 'Columbia',
    nb_tracks: 13,
    duration: 4467,
    release_date: '2013-05-17',
    record_type: 'album',
    explicit_lyrics: false,
    tracklist: '',
    artist: MOCK_ARTISTS[2],
    type: 'album'
  },
  {
    id: 104,
    title: 'Abbey Road',
    cover: 'https://picsum.photos/seed/abbeyroad/200',
    cover_small: 'https://picsum.photos/seed/abbeyroad/56',
    cover_medium: 'https://picsum.photos/seed/abbeyroad/250',
    cover_big: 'https://picsum.photos/seed/abbeyroad/500',
    cover_xl: 'https://picsum.photos/seed/abbeyroad/1000',
    genre_id: 152,
    label: 'Apple Records',
    nb_tracks: 17,
    duration: 2817,
    release_date: '1969-09-26',
    record_type: 'album',
    explicit_lyrics: false,
    tracklist: '',
    artist: MOCK_ARTISTS[3],
    type: 'album'
  },
  {
    id: 105,
    title: 'To Pimp a Butterfly',
    cover: 'https://picsum.photos/seed/tpab/200',
    cover_small: 'https://picsum.photos/seed/tpab/56',
    cover_medium: 'https://picsum.photos/seed/tpab/250',
    cover_big: 'https://picsum.photos/seed/tpab/500',
    cover_xl: 'https://picsum.photos/seed/tpab/1000',
    genre_id: 116,
    label: 'Top Dawg Entertainment',
    nb_tracks: 16,
    duration: 4788,
    release_date: '2015-03-15',
    record_type: 'album',
    explicit_lyrics: true,
    tracklist: '',
    artist: MOCK_ARTISTS[4],
    type: 'album'
  },
  {
    id: 106,
    title: 'The Suburbs',
    cover: 'https://picsum.photos/seed/suburbs/200',
    cover_small: 'https://picsum.photos/seed/suburbs/56',
    cover_medium: 'https://picsum.photos/seed/suburbs/250',
    cover_big: 'https://picsum.photos/seed/suburbs/500',
    cover_xl: 'https://picsum.photos/seed/suburbs/1000',
    genre_id: 152,
    label: 'Merge Records',
    nb_tracks: 16,
    duration: 3929,
    release_date: '2010-08-02',
    record_type: 'album',
    explicit_lyrics: false,
    tracklist: '',
    artist: MOCK_ARTISTS[5],
    type: 'album'
  },
  {
    id: 107,
    title: 'In Rainbows',
    cover: 'https://picsum.photos/seed/inrainbows/200',
    cover_small: 'https://picsum.photos/seed/inrainbows/56',
    cover_medium: 'https://picsum.photos/seed/inrainbows/250',
    cover_big: 'https://picsum.photos/seed/inrainbows/500',
    cover_xl: 'https://picsum.photos/seed/inrainbows/1000',
    genre_id: 152,
    label: 'XL Recordings',
    nb_tracks: 10,
    duration: 2596,
    release_date: '2007-10-10',
    record_type: 'album',
    explicit_lyrics: false,
    tracklist: '',
    artist: MOCK_ARTISTS[0],
    type: 'album'
  },
  {
    id: 108,
    title: 'Wish You Were Here',
    cover: 'https://picsum.photos/seed/wywh/200',
    cover_small: 'https://picsum.photos/seed/wywh/56',
    cover_medium: 'https://picsum.photos/seed/wywh/250',
    cover_big: 'https://picsum.photos/seed/wywh/500',
    cover_xl: 'https://picsum.photos/seed/wywh/1000',
    genre_id: 152,
    label: 'Harvest',
    nb_tracks: 5,
    duration: 2690,
    release_date: '1975-09-12',
    record_type: 'album',
    explicit_lyrics: false,
    tracklist: '',
    artist: MOCK_ARTISTS[1],
    type: 'album'
  },
  {
    id: 109,
    title: 'Discovery',
    cover: 'https://picsum.photos/seed/discovery/200',
    cover_small: 'https://picsum.photos/seed/discovery/56',
    cover_medium: 'https://picsum.photos/seed/discovery/250',
    cover_big: 'https://picsum.photos/seed/discovery/500',
    cover_xl: 'https://picsum.photos/seed/discovery/1000',
    genre_id: 113,
    label: 'Virgin',
    nb_tracks: 14,
    duration: 3606,
    release_date: '2001-03-12',
    record_type: 'album',
    explicit_lyrics: false,
    tracklist: '',
    artist: MOCK_ARTISTS[2],
    type: 'album'
  },
  {
    id: 110,
    title: 'Revolver',
    cover: 'https://picsum.photos/seed/revolver/200',
    cover_small: 'https://picsum.photos/seed/revolver/56',
    cover_medium: 'https://picsum.photos/seed/revolver/250',
    cover_big: 'https://picsum.photos/seed/revolver/500',
    cover_xl: 'https://picsum.photos/seed/revolver/1000',
    genre_id: 152,
    label: 'Parlophone',
    nb_tracks: 14,
    duration: 2105,
    release_date: '1966-08-05',
    record_type: 'album',
    explicit_lyrics: false,
    tracklist: '',
    artist: MOCK_ARTISTS[3],
    type: 'album'
  },
  {
    id: 111,
    title: 'DAMN.',
    cover: 'https://picsum.photos/seed/damn/200',
    cover_small: 'https://picsum.photos/seed/damn/56',
    cover_medium: 'https://picsum.photos/seed/damn/250',
    cover_big: 'https://picsum.photos/seed/damn/500',
    cover_xl: 'https://picsum.photos/seed/damn/1000',
    genre_id: 116,
    label: 'Top Dawg Entertainment',
    nb_tracks: 14,
    duration: 3300,
    release_date: '2017-04-14',
    record_type: 'album',
    explicit_lyrics: true,
    tracklist: '',
    artist: MOCK_ARTISTS[4],
    type: 'album'
  },
  {
    id: 112,
    title: 'Funeral',
    cover: 'https://picsum.photos/seed/funeral/200',
    cover_small: 'https://picsum.photos/seed/funeral/56',
    cover_medium: 'https://picsum.photos/seed/funeral/250',
    cover_big: 'https://picsum.photos/seed/funeral/500',
    cover_xl: 'https://picsum.photos/seed/funeral/1000',
    genre_id: 152,
    label: 'Merge Records',
    nb_tracks: 10,
    duration: 2886,
    release_date: '2004-09-14',
    record_type: 'album',
    explicit_lyrics: false,
    tracklist: '',
    artist: MOCK_ARTISTS[5],
    type: 'album'
  }
];

// =============================================================================
// MOCK TRACKS
// =============================================================================

export const MOCK_TRACKS: Record<number, DeezerTrack[]> = {
  101: [ // OK Computer
    { id: 1001, readable: true, title: 'Airbag', title_short: 'Airbag', link: '', duration: 287, track_position: 1, disk_number: 1, rank: 950000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[0], type: 'track' },
    { id: 1002, readable: true, title: 'Paranoid Android', title_short: 'Paranoid Android', link: '', duration: 394, track_position: 2, disk_number: 1, rank: 980000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[0], type: 'track' },
    { id: 1003, readable: true, title: 'Subterranean Homesick Alien', title_short: 'Subterranean Homesick Alien', link: '', duration: 262, track_position: 3, disk_number: 1, rank: 850000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[0], type: 'track' },
    { id: 1004, readable: true, title: 'Exit Music (For a Film)', title_short: 'Exit Music', link: '', duration: 262, track_position: 4, disk_number: 1, rank: 920000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[0], type: 'track' },
    { id: 1005, readable: true, title: 'Let Down', title_short: 'Let Down', link: '', duration: 298, track_position: 5, disk_number: 1, rank: 910000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[0], type: 'track' },
    { id: 1006, readable: true, title: 'Karma Police', title_short: 'Karma Police', link: '', duration: 264, track_position: 6, disk_number: 1, rank: 970000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[0], type: 'track' },
    { id: 1007, readable: true, title: 'Fitter Happier', title_short: 'Fitter Happier', link: '', duration: 117, track_position: 7, disk_number: 1, rank: 700000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[0], type: 'track' },
    { id: 1008, readable: true, title: 'Electioneering', title_short: 'Electioneering', link: '', duration: 233, track_position: 8, disk_number: 1, rank: 800000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[0], type: 'track' },
    { id: 1009, readable: true, title: 'Climbing Up the Walls', title_short: 'Climbing Up the Walls', link: '', duration: 283, track_position: 9, disk_number: 1, rank: 830000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[0], type: 'track' },
    { id: 1010, readable: true, title: 'No Surprises', title_short: 'No Surprises', link: '', duration: 229, track_position: 10, disk_number: 1, rank: 960000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[0], type: 'track' },
    { id: 1011, readable: true, title: 'Lucky', title_short: 'Lucky', link: '', duration: 262, track_position: 11, disk_number: 1, rank: 890000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[0], type: 'track' },
    { id: 1012, readable: true, title: 'The Tourist', title_short: 'The Tourist', link: '', duration: 323, track_position: 12, disk_number: 1, rank: 820000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[0], type: 'track' },
  ],
  103: [ // Random Access Memories
    { id: 1031, readable: true, title: 'Give Life Back to Music', title_short: 'Give Life Back to Music', link: '', duration: 275, track_position: 1, disk_number: 1, rank: 880000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[2], type: 'track' },
    { id: 1032, readable: true, title: 'The Game of Love', title_short: 'The Game of Love', link: '', duration: 321, track_position: 2, disk_number: 1, rank: 750000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[2], type: 'track' },
    { id: 1033, readable: true, title: 'Giorgio by Moroder', title_short: 'Giorgio by Moroder', link: '', duration: 544, track_position: 3, disk_number: 1, rank: 920000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[2], type: 'track' },
    { id: 1034, readable: true, title: 'Within', title_short: 'Within', link: '', duration: 228, track_position: 4, disk_number: 1, rank: 700000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[2], type: 'track' },
    { id: 1035, readable: true, title: 'Instant Crush', title_short: 'Instant Crush', link: '', duration: 337, track_position: 5, disk_number: 1, rank: 950000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[2], type: 'track' },
    { id: 1036, readable: true, title: 'Lose Yourself to Dance', title_short: 'Lose Yourself to Dance', link: '', duration: 354, track_position: 6, disk_number: 1, rank: 940000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[2], type: 'track' },
    { id: 1037, readable: true, title: 'Touch', title_short: 'Touch', link: '', duration: 498, track_position: 7, disk_number: 1, rank: 850000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[2], type: 'track' },
    { id: 1038, readable: true, title: 'Get Lucky', title_short: 'Get Lucky', link: '', duration: 369, track_position: 8, disk_number: 1, rank: 990000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[2], type: 'track' },
    { id: 1039, readable: true, title: 'Beyond', title_short: 'Beyond', link: '', duration: 290, track_position: 9, disk_number: 1, rank: 720000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[2], type: 'track' },
    { id: 1040, readable: true, title: 'Motherboard', title_short: 'Motherboard', link: '', duration: 341, track_position: 10, disk_number: 1, rank: 710000, explicit_lyrics: false, preview: '', artist: MOCK_ARTISTS[2], type: 'track' },
  ]
};

// Generar tracks genéricos para otros álbumes
for (const album of MOCK_ALBUMS) {
  if (!MOCK_TRACKS[album.id]) {
    const trackCount = album.nb_tracks || 10;
    MOCK_TRACKS[album.id] = Array.from({ length: trackCount }, (_, i) => ({
      id: album.id * 10 + i + 1,
      readable: true,
      title: `Track ${i + 1}`,
      title_short: `Track ${i + 1}`,
      link: '',
      duration: 180 + Math.floor(Math.random() * 180),
      track_position: i + 1,
      disk_number: 1,
      rank: 500000 + Math.floor(Math.random() * 500000),
      explicit_lyrics: false,
      preview: '',
      artist: album.artist,
      type: 'track' as const
    }));
  }
}

// =============================================================================
// MOCK REVIEWS
// =============================================================================

export const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    albumId: '101',
    userId: '1',
    username: 'musiclover42',
    userAvatar: 'https://picsum.photos/seed/user1/100',
    rating: 5,
    content: 'Una obra maestra absoluta. OK Computer redefinió lo que podía ser el rock alternativo. Cada canción es perfecta.',
    date: '2024-12-15',
    likes: 234
  },
  {
    id: '2',
    albumId: '101',
    userId: '2',
    username: 'vinylhead',
    userAvatar: 'https://picsum.photos/seed/user2/100',
    rating: 4.5,
    content: 'Paranoid Android y Karma Police son increíbles, pero el álbum completo fluye como una experiencia única.',
    date: '2024-11-20',
    likes: 156
  },
  {
    id: '3',
    albumId: '103',
    userId: '3',
    username: 'electronicfan',
    userAvatar: 'https://picsum.photos/seed/user3/100',
    rating: 5,
    content: 'Get Lucky es solo la punta del iceberg. Este álbum es un tributo perfecto a la música disco y funk.',
    date: '2024-10-05',
    likes: 312
  },
  {
    id: '4',
    albumId: '105',
    userId: '4',
    username: 'hiphophead',
    userAvatar: 'https://picsum.photos/seed/user4/100',
    rating: 5,
    content: 'Kendrick alcanzó la perfección. To Pimp a Butterfly es poesía, jazz y hip-hop fusionados magistralmente.',
    date: '2024-09-18',
    likes: 445
  },
  {
    id: '5',
    albumId: '102',
    userId: '5',
    username: 'classicrocker',
    userAvatar: 'https://picsum.photos/seed/user5/100',
    rating: 5,
    content: 'Después de 50 años, The Dark Side of the Moon sigue siendo una experiencia sonora incomparable.',
    date: '2024-08-22',
    likes: 567
  }
];

// =============================================================================
// MOCK ALBUM STATS
// =============================================================================

export const MOCK_ALBUM_STATS: Record<string, AlbumStats> = {
  '101': { albumId: 101, reviewCount: 1243, ratingCount: 5678, averageRating: 4.8, listenedCount: 15432 },
  '102': { albumId: 102, reviewCount: 2156, ratingCount: 8901, averageRating: 4.9, listenedCount: 23456 },
  '103': { albumId: 103, reviewCount: 987, ratingCount: 4321, averageRating: 4.6, listenedCount: 12345 },
  '104': { albumId: 104, reviewCount: 3456, ratingCount: 12345, averageRating: 4.9, listenedCount: 34567 },
  '105': { albumId: 105, reviewCount: 1567, ratingCount: 6789, averageRating: 4.7, listenedCount: 18765 },
  '106': { albumId: 106, reviewCount: 654, ratingCount: 2345, averageRating: 4.4, listenedCount: 8765 },
  '107': { albumId: 107, reviewCount: 876, ratingCount: 3456, averageRating: 4.6, listenedCount: 11234 },
  '108': { albumId: 108, reviewCount: 1234, ratingCount: 5678, averageRating: 4.8, listenedCount: 19876 },
  '109': { albumId: 109, reviewCount: 765, ratingCount: 3210, averageRating: 4.5, listenedCount: 10234 },
  '110': { albumId: 110, reviewCount: 2345, ratingCount: 9876, averageRating: 4.8, listenedCount: 28765 },
  '111': { albumId: 111, reviewCount: 1098, ratingCount: 4567, averageRating: 4.5, listenedCount: 14567 },
  '112': { albumId: 112, reviewCount: 543, ratingCount: 2109, averageRating: 4.3, listenedCount: 7654 }
};

// Stats por defecto para álbumes sin datos
export const DEFAULT_ALBUM_STATS: AlbumStats = {
  reviewCount: 0,
  ratingCount: 0,
  averageRating: null,
  listenedCount: 0
};
