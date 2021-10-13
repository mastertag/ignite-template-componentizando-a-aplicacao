import { useEffect, useState } from 'react';

import { Button } from './components/Button';
import { MovieCard } from './components/MovieCard';

// import { SideBar } from './components/SideBar';
// import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import {SideBar} from "./components/SideBar";
import { GenreResponseProps } from './interfaces/GenreResponseProps';
import {Content} from "./components/Content";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  function selectGenres(obj:GenreResponseProps) {
    setSelectedGenre(obj);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>

      <SideBar onChange={selectGenres}></SideBar>
      <Content genre={selectedGenre}></Content>
    </div>
  )
}
