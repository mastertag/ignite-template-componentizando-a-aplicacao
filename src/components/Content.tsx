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

interface ContentProps {
    genre:GenreResponseProps
}

export function Content({genre}: ContentProps) {

    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(genre);

    useEffect(() => {
        setSelectedGenre({...genre});
    }, [genre]);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${genre.id}`).then(response => {
            setMovies(response.data);
        });
    }, [selectedGenre]);

    return (
        <div className="container">
            <header>
                <span className="category">Categoria:<span> {genre.title}</span></span>
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
