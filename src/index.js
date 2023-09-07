import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Inicio from './Pantallas/Inicio';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import { Routes } from 'react-router';
import Registro from './Pantallas/Registro';
import Temas from './Pantallas/Temas';
import Juego from './Pantallas/Juego';
import TablaPuntuacion from './Pantallas/TablaPuntuacion';
import Music from './Componentes/Music.jsx';

import soundFile from './Componentes/music.mp3';

const audio = new Audio(soundFile);

const root = ReactDOM.createRoot(document.getElementById('root'));
var isPlaying = false;

const playSound=(play) =>{
    if (play) {
      audio.play();
      audio.addEventListener('ended', function () {
        audio.currentTime = 0;
        audio.play();
      });
      isPlaying =true;
    } else {
      audio.pause();
      audio.currentTime = 0;
      isPlaying=false;
    }
}



function App() {


  useEffect(()=>{
    playSound(true);
  }
  
  ,[])

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route exact path="/" element={<Inicio/>} /> 
          <Route exact path="/temas" element={<Temas/>} /> 
          <Route exact path="/registro" element={<Registro/>} /> 
          <Route exact path="/juego" element={<Juego playSound={playSound} />} /> 
          <Route exact path="/puntuaciones" element={<TablaPuntuacion/>} /> 
        </Routes>
      </Router>  
    </React.StrictMode>
  );
}

root.render(<App/>);

reportWebVitals();
