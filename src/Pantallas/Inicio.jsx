import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicio.css';
import soundFile from '../Sounds/pop.mpeg';
import LazyImage from '../Componentes/LazyImage';

function Inicio() {

    const [cambio, setCambio] = useState(false);
    const [storedData, setStoredData] = useState([]);

    useEffect(() => {
        setStoredData(JSON.parse(localStorage.getItem("userData")));
        console.log("Data Encontrada")
        setCambio(false);
    }, [cambio])

    function playSound() {
        const audio = new Audio(soundFile);
        audio.play();
    }

    function eraseUser(index) {

        if (window.confirm('¿Deseas eliminar a ' + storedData[index].nombre + "?")) {
            let tempStoredD = JSON.parse(localStorage.getItem("userData"));

            let storedProgreso = JSON.parse(localStorage.getItem("progreso"));
            if (!storedProgreso) { } else {
                for (let i = 0; i < storedProgreso.length; i++) {
                    if (storedProgreso[i].nombre === tempStoredD[index].nombre) {
                        storedProgreso.splice(i, 1);
                        localStorage.setItem("progreso", JSON.stringify(storedProgreso));
                    }
                }
            }
            
            tempStoredD.splice(index, 1);
            localStorage.setItem("userData", JSON.stringify(tempStoredD));
            setCambio(true);
        }


    }

    const handleUserClick = (event, user) => {
        if (event.target.className !== 'trash') {
            playSound();
            localStorage.setItem("currentUser", JSON.stringify(user));
            navigate("/temas")

        }
    }

    const navigate = useNavigate();
//
    return (
        <div>
        <LazyImage className="backgroundImage" src="/Medios/Cinematicas/main.jpeg" />

        <div className='fondoInicio'>

            <div className='cuerpoInicio'>
                <div className='headerInicio'>
                    <img src="Medios\logo-colibri-03.webp" alt="" />
                </div>
                <div className='escogerUsuario'>
                    <h3>Escoge Usuario</h3>
                    <div className='usuarios'>
                        {storedData == null ?
                            <p>No Hay datos para mostrar</p>
                            :
                            storedData.map((user, i) => (
                                <div onClick={(event) => handleUserClick(event, user)} className='div' key={i}>
                                    <p>{user.nombre}</p>
                                    <img src='/Medios/caneca.webp' className="trash" onClick={() => { eraseUser(i) }} ></img>
                                </div>
                            ))
                        }

                    </div>
                    <button onTouchEnd={() => { playSound();navigate("/registro") }} >Nuevo Usuario</button>
                </div>
            </div>
            <div className='footerInicio'>
                <div className='footerContenedor'>
                    <img src="Medios\Marca_EcoHabitats_2.webp" alt="Icono" />
                    <img src="Medios\Logo-Patrimonio-Color.webp" alt="Icono" />
                    <img src="Medios\CEPF-Logo.webp" alt="Icono" />
                    <img src="Medios\LOGO30AÑOS_Horizontal_fullcolor.png" alt="Icono" />
                    <img src="Medios\asoagroambiental.jpeg" alt="Icono" />

                    <img src="Medios\Marca_EcoHabitats_2.webp" alt="Icono" />
                    <img src="Medios\Logo-Patrimonio-Color.webp" alt="Icono" />
                    <img src="Medios\CEPF-Logo.webp" alt="Icono" />
                    <img src="Medios\LOGO30AÑOS_Horizontal_fullcolor.png" alt="Icono" />
                    <img src="Medios\asoagroambiental.jpeg" alt="Icono" />
                </div>

            </div>
        </div></div>
    );
}

export default Inicio;
