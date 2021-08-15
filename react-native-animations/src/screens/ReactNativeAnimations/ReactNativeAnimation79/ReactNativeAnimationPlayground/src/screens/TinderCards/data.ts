export interface Movie {
  title: string;
  poster: string;
  rating: number;
  genres: string[];
}

export const movies: Movie[] = [
  {
    title: 'Black Panther',
    poster: require('../../../assets/poster-blackpanther.jpg'),
    rating: 5,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
  },
  {
    title: 'Fight Club',
    poster: require('../../../assets/poster-fightclub.jpg'),
    rating: 5,
    genres: ['Drama', 'Suspense'],
  },
  {
    title: 'Joker',
    poster: require('../../../assets/poster-joker.jpg'),
    rating: 4,
    genres: ['Crime', 'Drama', 'Thriller'],
  },
  {
    title: 'Avengers End Game',
    poster: require('../../../assets/poster-endgame.jpg'),
    rating: 5,
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
  },
];
