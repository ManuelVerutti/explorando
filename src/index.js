import React from 'react';
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

const root = ReactDOM.createRoot(document.getElementById('root'));


function App() {

  return (
    <React.StrictMode>
      <Music/>
      <Router>
        <Routes>
          <Route exact path="/" element={<Inicio/>} /> 
          <Route exact path="/temas" element={<Temas/>} /> 
          <Route exact path="/registro" element={<Registro/>} /> 
          <Route exact path="/juego" element={<Juego/>} /> 
          <Route exact path="/puntuaciones" element={<TablaPuntuacion/>} /> 
        </Routes>
      </Router>  
    </React.StrictMode>
  );
}

root.render(<App/>);

reportWebVitals();
