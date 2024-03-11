
import config from './config'

import './index.css';
import FeatureMovieCard from './components/Molecules/FeatureMovieCard';
import OtherMoviesContainer from './components/Organisms/OtherMoviesContainer';
import { useEffect, useState } from 'react';
import MovieCard from './components/Molecules/movieCard';
import FilterPill from './components/Atoms/FilterPill';
import styled from 'styled-components';


const GenreDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin: 0;
    padding: 0;
    padding-bottom: 32px;
`
const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 52px;
`

const NavBar = styled.nav`
  display: flex;
  padding-top: 36px;
  padding-bottom: 36px;
  gap: 32px;
  align-items: center;
  padding-right:  24px;
  padding-left:  24px;
  
  @media only screen and (min-width: 768px){
      padding-bottom: 64px;
      padding-right:  0px;
      padding-left:  0px;
  }
`
const StyledBold = styled.span`
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;`


function App() {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedPill, setSelectedPill] = useState('All genres')

  const BASEURL = "https://api.themoviedb.org/3/"
  const API_KEY = config.apiKey;


  useEffect(() => {

  const getGenres = async () => {
    try {
      const response = await fetch(BASEURL+`genre/movie/list?api_key=${API_KEY}`);
      const data = await response.json()
      setGenres(data.genres)
    }
    catch(e) {
      console.log(e)
    }
  }
  getGenres()
  }, [])

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const response = await fetch(BASEURL + `trending/all/day?api_key=${API_KEY}`)
        const data = await response.json()
        setMovies(data.results)
      }
      catch(e){
        console.log(e)
      }
    }

    const getMoviesById = async (id) => {
      try {
        const response = await fetch(BASEURL + `discover/movie?&with_genres=${id}&api_key=${API_KEY}`)
        const data = await response.json()
        setMovies(data.results)
      }
      catch(e){
        console.log(e)
      }
    }

      if (selectedPill === 'All genres'){
        getTrendingMovies()
      }
      else {
        getMoviesById(selectedPill)
     } 
    
   

  }, [selectedPill])


  function handleFilterClick(e) {
    if(e !== selectedPill){
      setSelectedPill(e)
    }
  }

  return (
    <>

      <NavBar>
        <img src="./assets/film.png" alt="Evolving web logo" width="42px" height="40px"/>
        <h3>Movie Nights</h3>
      </NavBar>

      <h1>What’s your favourite Movie?</h1>
            
      <FilterContainer>
        <StyledBold>Filter by Movie Genre</StyledBold>
        <GenreDiv>
          <FilterPill 
            onClick={handleFilterClick} 
            key={0}
            genreName={'All genres'}
            genreID={'All genres'}
            selected={'All genres' === selectedPill}>
          </FilterPill>
          
          {genres.slice(0,20).map((genre, index) => {
              return <FilterPill 
                onClick={handleFilterClick} 
                genreName={genre.name} 
                genreID={genre.id}
                key={index + 1}
                selected={genre.id === selectedPill}>
              </FilterPill>
            })}
        </GenreDiv>
      </FilterContainer>
        
      
        { movies?.length > 0 && (
          <>
            <FeatureMovieCard movie={movies[0]} genres={movies[0]} allGenres={genres}></FeatureMovieCard>
            <OtherMoviesContainer movies={movies.slice(1,4)} genres={movies.slice(1,4)} allGenres={genres}></OtherMoviesContainer>
          </>
        )}
    </>
  );
}

export default App;
