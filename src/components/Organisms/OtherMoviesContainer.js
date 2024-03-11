import styled from "styled-components"
import MovieCard from "../Molecules/movieCard"

const StyledContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;


    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
        column-gap: 24px;
        margin: 0px    
    }
`

export default function OtherMoviesContainer({movies, genres, allGenres}) {

    return (
        <StyledContainer>
            {movies?.map((movie, index) => {
                return <MovieCard movie={movie} genres={movie} allGenres={allGenres} key={index}></MovieCard>
            })} 
        </StyledContainer>
    )
}