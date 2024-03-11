import styled from "styled-components"
import FilterPill from "../Atoms/FilterPill.js"

const StyledButton = styled.button`
    background-color: var(--primary);
    clip-path: circle();
    width: 30px;
    height: 30px;
    margin: 0;
    padding: 0;   
`

const PillContainer = styled.div`
    display: flex;
    gap: 10px;
    padding: 8px;    
    position: absolute;
`

const MovieCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`


const MovieDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 24px 56px 24px;

    
`
const ImageContainer = styled.div`
    object-fit: cover; 
`

export default function MovieCard({movie, genres, allGenres}){
    const genrePills = genres?.genre_ids?.slice(0, 3)

    return (
        <MovieCardContainer> 
            <ImageContainer>
                <img className="movie-image" src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt="movie cover"/>
            </ImageContainer> 
            
            <PillContainer>
                {genrePills.map((id, index) => {
                    const filter = allGenres.find((item) => item.id === id)
                   return <FilterPill genreID={id} genreName={filter?.name} key={index} disableClick={true}></FilterPill>
                })}
            </PillContainer>
            <MovieDetails>
            <span>{movie?.release_date}</span>
            <h3>{movie?.title}</h3>
            <p>{movie?.overview}</p>
            <StyledButton>
                <img src="./assets/Favorite.png" alt="favourite" width={20} height={20}/>
            </StyledButton>
        </MovieDetails>
        </MovieCardContainer>
    )
}