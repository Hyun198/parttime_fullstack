import { useState } from 'react';
import Header from './Header/header'
import Time from './Time/Time'
import Movie from './Movie/Movie'
import './App.css';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  }

  return (
    <>
      <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      <Movie />
      <Time isDarkTheme={isDarkTheme} />
    </>
  );
}


export default App;
