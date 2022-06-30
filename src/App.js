import { CssBaseline, AppBar, Toolbar, Typography, ThemeProvider, createTheme} from '@mui/material';
import TextField from '@mui/material/TextField';
import Box  from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MovieCard from './MovieCards';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// import HomeIcon from '@mui/icons-material/Home';
import { useEffect, useState } from 'react';
import './App.css';

import SvgIcon from '@mui/material/SvgIcon';
//TODO: Local Storage Favorite Movies 
const API_URL = "http://www.omdbapi.com?apikey=e2d2cf37";

//Theme installation
const theme = createTheme({
  typography: {
      fontSize: 25,
      fontFamily: 'Lato',
      // '@media (max-width: 700px)' :{
      //   fontSize: 10,
      //   fontFamily: 'Federant',
      // }
  },

});

theme.typography.h4 = {
  [theme.breakpoints.up('sm')]: {
    fontSize: 40,
  },
}

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const App = () => {

  const [ movies, setMovies ] = useState([]);
  const [ searchKeyWord, setSearchKeyWord ] = useState('');

  const [ sortOption, setSortOption ] = useState(0);

  // if (localStorage.getItem("movies") == undefined) {
  //   localStorage.setItem("movies", [movie1, movie2, movie3])
  // }

  //Search Movies by title
  const searchMovies = async(title) => {
    const response = await fetch (`${API_URL}&s=${title}`);
    const data = await response.json();

    if (data.Search){
      setMovies(data.Search);
    }
  }
  useEffect(()=> {
    searchMovies(searchKeyWord);
  },[searchKeyWord])

  const handleChange = (event) =>{
    setSearchKeyWord(event.target.value);
  };


  const handleSort = (event) => {
      // setSortOption(sortedYear.sort(compareYears));
      setSortOption(event.target.value);
      console.log('Hey Handle sorted is trigger', sortOption);
  }

  const sortAndBuildMovies = () => {
    let sortedMovies = [];

    // sort movies according to sortOption
    // store into sortedMovies variable
    if(sortOption === 1){
      sortedMovies = movies.sort((movie1, movie2) => {
        return movie1.Year - movie2.Year
      })
    }
    else if(sortOption === 2){
      sortedMovies = movies.sort((movie1, movie2) =>{
        return movie2.Year - movie1.Year
      })
    }
    else{
      sortedMovies = movies;
    }

    return sortedMovies.map((movie, key) => 
              <Grid 
                item 
                xs={12}
                md={4}
                key={key}
              >    
                  <MovieCard 
                    pic = {movie.Poster}
                    title={movie.Title.length > 12 ? (movie.Title.substr(0, 12) + "..."): movie.Title}  
                    year = {movie.Year.length > 6 ? (movie.Year.substr(0,6) + "..."): movie.Year}
                  />
              </Grid>
    )
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar 
          position="static"
          color="primary"
          elevation={0}
          sx={{ borderBottom: '1px solid lightblue'}}
        >
          {/* Home Icon Button*/}
          <Toolbar>
            <Button variant='none' size='medium' 
                    startIcon={<HomeIcon color="default"/>} 
                    onClick={() => window.location.reload()}>TV</Button>
            <Typography variant='h4' sx={{ flexGrow: 1}} align='center'>
              Movies Theater Site
            </Typography>
          </Toolbar>
        </AppBar>

        <Container sx={{ marginTop: 8}}>
          <Grid 
            container spacing={5}
            justifyContent='center'
            alignItems='flex-start'
          >
            <Box 
            component='form'
            autoComplete= 'off'
            >
              <TextField id='outlined-basic' label='Search ...' variant='outlined' 
                        value={searchKeyWord}
                        onChange={handleChange}
              />
              {/* Sorted by Newst Movies to the Oldest Movies  */}
              <FormControl sx={{ marginLeft: 2, minWidth: 200}} >
                <InputLabel id='search-drop-down'>Sort by</InputLabel>
                <Select
                  labelId='search-drop-down'
                  id='search-drop-down'
                  autoWidth
                  value={sortOption}
                  onChange={handleSort}
                >
                  <MenuItem value={0}>Shuffle
                  </MenuItem>
                  <MenuItem value={2}>Newest to Oldest
                  </MenuItem>
                  <MenuItem value={1}>Oldest to Newest
                  </MenuItem>
                </Select>
              </FormControl>

              <Button href='#' variant='contained' sx={{ my: 1, mx: 1.5}} onClick={ () => {
                //Boolean whether what the TextField is true or false to trigger the search engine
                searchMovies(searchKeyWord)
              }}>
                Search
              </Button>
            </Box>
          </Grid>

          <Grid container spacing = {3}>
            {movies.length > 0 ?
              sortAndBuildMovies()
            :
              <Grid 
                item 
                xs={12}
                md={4}
              >   
                {/* <h2>No Movies Found!!!</h2> */}
              </Grid>
            }
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
