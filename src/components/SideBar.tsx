import {Button} from "./Button";
import {useEffect, useState} from "react";
import {api} from "../services/api";
import {GenreResponseProps} from "../interfaces/GenreResponseProps";

interface SideBarProps{
    onChange: ()=>void
}


export function SideBar( {onChange} :SideBarProps ) {
    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);


    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
            setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        handleClickButton(1);
    }, [genres]);



    function handleClickButton(id: number) {
        setSelectedGenreId(id);
        let findGenre = genres.find(g=> g.id==id);
        if(findGenre){
            onChange(findGenre); // evento externo
        }
    }

  return (
      <>
          <nav className="sidebar">
              <span>Watch<p>Me</p></span>

              <div className="buttons-container">
                  {genres.map(genre => (
                      <Button
                          key={String(genre.id)}
                          title={genre.title}
                          iconName={genre.name}
                          onClick={() => handleClickButton(genre.id)}
                          selected={selectedGenreId === genre.id}
                      />
                  ))}
              </div>

          </nav>
      </>
  );
}
