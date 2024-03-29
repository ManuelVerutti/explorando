import React, { useState, useEffect } from 'react';
import Back from '../Componentes/Back';
import './Temas.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import soundFile from '../Sounds/pop.mpeg';
import Animation from "../Componentes/Animation"
import LazyImage from '../Componentes/LazyImage';



function Temas() {

    function playSound() {
        const audio = new Audio(soundFile);
        audio.play();
    }

    const handleAnimationClick = ()=>{
setEnCinematica(false);
    }

    const [temaSelec, setTemaSelec] = useState(1);
    const [enCinematica, setEnCinematica] = useState(true);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
    const navigate = useNavigate();

    return (
        <div>
            <LazyImage className="backgroundImage" src="/Medios/Cinematicas/main.webp" />

            {enCinematica ?
                <Animation backgroundImage="/Medios/Cinematicas/main.webp" personImage1='/camina.webp' personImage2='/camina2.webp' handleAnimationClick={handleAnimationClick} message="<b>¡Bienvenido!</b><br> En explorando deberás recorrer desde los los 5364 m.s.n.m en el <b>Nevado del Huila</b> hasta 0 m.s.n.m en la <b>Isla Gorgona</b> a medida que aciertas respuestas.<br> <b>¡Buena Suerte!</b>"></Animation>
                : <><div className='fondoTemas'>
                    <div className='btnPuntuaciones' onTouchEnd={() => { 
                        
                        let scores =JSON.parse(localStorage.getItem("scores"));
                        if(!scores){
                            alert('No existen datos de partidas');
                        }else{
                            let userData = false;
                            for (let i = 0; i < scores.length; i++) {
      
                                if (scores[i].nombre === currentUser.nombre) {
                                    playSound(); 
                                    navigate("/puntuaciones");
                                    userData = true;
                                }
                              }

                              if(!userData){
                                alert('No existen datos de puntuación con este usuario');

                              }
                            
                        }
                        
                        }}>Puntuaciones</div>
                    <Back destino="/" />

                    <div className='cuerpoTemas'>
                        <div className='headerTemas'>
                            <LazyImage src="Medios\logo-colibri-03.webp" alt="" />
                        </div>
                        <h3>Selecciona el tema</h3>
                        <div className='temas'>
                            <button className='btn' onClick={() => { playSound(); localStorage.setItem("currentTema", "Biodiversidad"); navigate("/juego") }} >Biodiversidad</button>
                            <button className='btn' onClick={() => { playSound(); localStorage.setItem("currentTema", "Planificación"); navigate("/juego") }} >Planificación territorial</button>
                            <button className='btn' onClick={() => { playSound(); localStorage.setItem("currentTema", "Cambio"); navigate("/juego"); setTemaSelec(3); }} >Cambio Climático</button>
                        </div>

                        <ToastContainer />

                    </div></div></>
            }

</div>
    );
}

export default Temas;