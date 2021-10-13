import {MovieCard} from "./MovieCard";
import {useEffect, useState} from "react";
import {api} from "../services/api";
import {GenreResponseProps} from "../interfaces/GenreResponseProps";

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

export function Content(props: any) {

    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(props.genre);

    useEffect(() => {
        setSelectedGenre({...props.genre});
    }, [props.genre]);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${props.genre.id}`).then(response => {
            setMovies(response.data);
        });
    }, [selectedGenre]);

    return (
        <div className="container">
            <header>
                <span className="category">Categoria:<span> {props.genre.title}</span></span>
            </header>

            <main>
                <div className="movies-list">
                    {movies.map(movie => (
                        <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime}
                                   rating={movie.Ratings[0].Value}/>
                    ))}
                </div>
            </main>
        </div>

    );
}
