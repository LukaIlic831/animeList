export interface IAnimeList {
  data: IAnime[];
  pagination: Pagination;
}

export interface IAnime {
  mal_id: number;
  url: string;
  images: { [key: string]: Image };
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: Demographic[];
  licensors: Demographic[];
  studios: Demographic[];
  genres: Demographic[];
  explicit_genres: Demographic[];
  themes: Demographic[];
  demographics: Demographic[];
}

export interface Aired {
  from: string;
  to: string;
  prop: Prop;
}

export interface Prop {
  from: From;
  to: From;
  string: string;
}

export interface From {
  day: number;
  month: number;
  year: number;
}

export interface Broadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

export interface Demographic {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Image {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Title {
  type: string;
  title: string;
}

export interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  items: Items;
}

export interface Items {
  count: number;
  total: number;
  per_page: number;
}

export interface IAppContext {
  searchOpened: boolean;
  setSearchOpened: React.Dispatch<React.SetStateAction<boolean>>;
  filterChangedSkel: boolean;
  setFilterChangedSkel: React.Dispatch<React.SetStateAction<boolean>>;
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
}

export interface IFilter {
  name: string;
  id: number;
}
