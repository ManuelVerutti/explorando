import React, { useState, useEffect } from "react";
import Back from "../Componentes/Back";
import { useNavigate } from 'react-router-dom';
import "./Juego.css";
import soundFile from '../Sounds/pop.mpeg';
import Animation from "../Componentes/Animation";


//Pendiente - Hacer lectura del json

function Juego() {

    const navigate = useNavigate();

    function playSound() {
        const audio = new Audio(soundFile);
        audio.play();
    }

    const [topic, setTopic] = useState(localStorage.getItem("currentTema"));
    const [enPregunta, setEnPregunta] = useState(true);
    const [puntos, setPuntos] = useState(0);
    const [preguntas, setPreguntas] = useState([]);
    const [cinematicOn, setCinematicOn] = useState(true);
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [tiempoRestante, setTiempoRestante] = useState(30);
    const [finDelJuego, setFinDelJuego] = useState(false);
    const [victoria, setVictoria] = useState(false);
    const [imgFondo, setImgFondo] = useState("/Medios/Cinematicas/fondo (1).jpeg");
    const [imgPersona1, setImgPersona1] = useState("/Medios/Cinematicas/explorador (1).png");
    const [imgPersona2, setImgPersona2] = useState("/Medios/Cinematicas/explorador (2).png");
    const [mensaje, setMensaje] = useState("<b> Vamos por tu primer nivel:</b><br> Los Ecosistemas Marinos");


    let extraPoints = 100;
    // función para manejar el tiempo restante

    useEffect(() => {
        setPuntos(0);
        setTiempoRestante(30);
        let selectedTopic = "JSONBiodiversidad.json";
        switch (topic) {
            case "Biodiversidad":
                selectedTopic = "JSONBiodiversidad.json";
            case "Cambio":
                selectedTopic = "JSONCambio_Climatico.json";
            case "Planificación":
                selectedTopic = "JSONPlanificación.json";
        }
        fetch(selectedTopic)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // Seleccionamos 7 preguntas aleatorias
                const preguntasAleatorias = randomQuestion(data, 15);
                console.log(preguntasAleatorias);
                // Almacenamos las preguntas aleatorias en setPreguntas
                setPreguntas(preguntasAleatorias);
            })
            .catch(err => console.error(err));

    }, []);

    useEffect(() => {
        if (tiempoRestante === 0) {
            return setFinDelJuego(true);
        }
        if (enPregunta) {
            const intervalo = setInterval(() => {
                console.log(cinematicOn);
                if (!cinematicOn) {

                    setTiempoRestante(tiempoRestante - 1);
                }
            }, 1000);
            return () => clearInterval(intervalo);
        }
    }, [tiempoRestante, enPregunta, cinematicOn]);

    useEffect(() => {
        if (!enPregunta && !finDelJuego) {

            console.log("escalon" + preguntaActual);
            let escalon = document.getElementById("escalon" + preguntaActual);
            escalon.classList.add('escalonDone');
            escalon.scrollIntoView({ behavior: 'smooth', block: 'center' });

        }
    }, [enPregunta]);

    useEffect(() => {
        setImgFondo(("/Medios/Cinematicas/fondo (" + (preguntaActual + 1) + ").png"))

        console.log(preguntaActual);
        switch (preguntaActual) {
            case 0:
                setMensaje("<b> Vamos por tu primer nivel:</b><br> Los Ecosistemas Marinos");
                break;
            case 1:
                setMensaje("<b> Vamos por tu segundo nivel:</b><br> Los Arrecifes de Coral");
                break;
            case 2:
                setMensaje("<b> Vamos por tu tercer nivel:</b><br> Los Pastos Marinos");
                break;
            case 3:
                setMensaje("<b> Vamos por tu cuarto nivel:</b><br> Los Bosques Xerofíticos");
                break;
            case 4:
                setMensaje("<b> Vamos por tu quinto nivel:</b><br> Las Sabanas");
                break;
            case 5:
                setMensaje("<b> Vamos por tu sexto nivel:</b><br> Los Manglares");
                break;
            case 6:
                setMensaje("<b> Vamos por tu septimo nivel:</b><br> Los Bosques de Galería");
                break;
            case 7:
                setMensaje("<b> Vamos por tu octavo nivel:</b><br> Los Rios");
                break;
            case 8:
                setMensaje("<b> Vamos por tu noveno nivel:</b><br> La Selva Inferior");
                break;
            case 9:
                setMensaje("<b> Vamos por tu decimo nivel:</b><br> Los Bosques Andinos");
                break;
            case 10:
                setMensaje("<b> Vamos por tu decimo primer nivel:</b><br> Los Humedales Altoandinos");
                break;
            case 11:
                setMensaje("<b> Vamos por tu decimo segundo nivel:</b><br> Los Bosques Altoandinos");
                break;
            case 12:
                setMensaje("<b> Vamos por tu decimo tercero nivel:</b><br> Los Paramos");
                break;
            case 13:
                setMensaje("<b> Vamos por tu decimo cuarto nivel:</b><br> El Glaciar");
                break;
            case 14:
                setMensaje("<b> Vamos por tu decimo quinto nivel:</b><br> Desierto");
                break;
            default:
                setMensaje("");
                break;
        }

    }, [cinematicOn, preguntaActual]);

    function randomQuestion(preguntas, cantidad) {
        // Creamos una copia de las preguntas originales para no modificar el array original
        const copiaPreguntas = [...preguntas];
        // Array donde almacenaremos las preguntas aleatorias
        const preguntasAleatorias = [];
        // Seleccionamos preguntas aleatorias hasta que hayamos alcanzado la cantidad deseada
        while (preguntasAleatorias.length < cantidad && copiaPreguntas.length > 0) {
            // Seleccionamos una pregunta aleatoria
            const indiceAleatorio = Math.floor(Math.random() * copiaPreguntas.length);
            const preguntaAleatoria = copiaPreguntas[indiceAleatorio];
            // Agregamos la pregunta aleatoria al array de preguntas aleatorias y la eliminamos de la copia de preguntas
            preguntasAleatorias.push(preguntaAleatoria);
            copiaPreguntas.splice(indiceAleatorio, 1);
        }
        return preguntasAleatorias;
    }

    // función para manejar la selección de respuesta

    const handleRes = (correcta) => {
        if (correcta) {
            setPuntos(puntos + extraPoints);
            setEnPregunta(false);
        } else {
            setFinDelJuego(true);
            saveScores();
        }
        if (preguntaActual < preguntas.length - 1) {
            setPreguntaActual(preguntaActual + 1);
            setTiempoRestante(30);
        } else {
            setFinDelJuego(true);
            setVictoria(true);
            saveScores();
        }
    };

    function saveScores() {
        const fechaActual = new Date(Date.now());
        const dia = fechaActual.getDate().toString().padStart(2, '0');
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaActual.getFullYear();
        const hora = fechaActual.getHours().toString().padStart(2, '0');
        const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
        const fechaFormateada = `${dia}-${mes}-${anio}_${hora}:${minutos}`;

        const scores = JSON.parse(localStorage.getItem("scores"));
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (!scores) {
            console.log("entra !Stored")
            const progreso = [{
                nombre: currentUser.nombre,
                datos: [{
                    tema: localStorage.getItem("currentTema"),
                    puntuacion: puntos,
                    fecha: fechaFormateada
                }]
            }
            ];
            let tempStored = progreso;
            localStorage.setItem("scores", JSON.stringify(tempStored));

        } else {

            console.log("entra Stored")

            let usuarioEncontrado = false;
            for (let i = 0; i < scores.length; i++) {
                if (scores[i].nombre === currentUser.nombre) {
                    scores[i].datos.push({
                        tema: localStorage.getItem("currentTema"),
                        puntuacion: puntos,
                        fecha: fechaFormateada
                    });
                    usuarioEncontrado = true;
                    break;
                }
            }

            if (!usuarioEncontrado) {
                scores.push({
                    nombre: currentUser.nombre,
                    datos: [{
                        tema: localStorage.getItem("currentTema"),
                        puntuacion: puntos,
                        fecha: fechaFormateada
                    }]
                });
            }

            localStorage.setItem("scores", JSON.stringify(scores));
        }

    }

    const handleAnimationClick = () => {
        setCinematicOn(false);
        setTiempoRestante(30);
    }



    return (
        <>
            {cinematicOn ?

                <Animation
                    backgroundImage={imgFondo}
                    personImage1={imgPersona1}
                    personImage2={imgPersona2}
                    handleAnimationClick={handleAnimationClick}
                    message={mensaje}>

                </Animation>

                :
                <div className="App">

                    <div>

                        {finDelJuego ?
                            (
                                <>

                                    {victoria ?
                                        <div className="gameEndContainer">
                                            <img className="backgroundImage" src="/Medios/Victoria/fondo.PNG" />

                                            <Back destino="/temas" />
                                            <img className="colibriImg" src="Medios\logo-colibri-03.webp" alt="" />

                                            <h1>¡Felicidades Has Ganado!</h1>
                                            <h2>Tu puntaje final es de {puntos} puntos.</h2>
                                            <div>
                                                <button className="buttonJ" onClick={() => {

                                                    if (!JSON.parse(localStorage.getItem("scores"))) {
                                                        alert('No existen datos de partidas');
                                                    } else {
                                                        playSound();
                                                        navigate("/puntuaciones")
                                                    }

                                                }}>Ver Tabla de Puntuaciones</button>
                                                <button className="buttonJ" onClick={() => { playSound(); window.location.reload() }}>Reiniciar</button>
                                            </div>
                                        </div>
                                        :
                                        <div className="gameEndContainer">
                                            <img className="backgroundImage" src="/Medios/Victoria/fondo.PNG" />

                                            <Back destino="/temas" />
                                            <img className="colibriImg" src="Medios\logo-colibri-03.webp" alt="" />

                                            <h1>¡Fin del juego!</h1>
                                            <h2>Tu puntaje final es de {puntos} puntos.</h2>
                                            <div>
                                                <button className="buttonJ" onClick={() => {

                                                    if (!JSON.parse(localStorage.getItem("scores"))) {
                                                        alert('No existen datos de partidas');
                                                    } else {
                                                        playSound();
                                                        navigate("/puntuaciones")
                                                    }

                                                }}>Ver Tabla de Puntuaciones</button>
                                                <button className="buttonJ" onClick={() => { playSound(); window.location.reload() }}>Reiniciar</button>
                                            </div>
                                        </div>
                                    }

                                </>
                            )
                            :
                            (
                                <>
                                    {enPregunta ? (
                                        <>
                                            <img className="backgroundImage" src={imgFondo} />
                                            <Back destino="/temas" />
                                            <div className="pregunta">

                                                <h2 className="tiempo">{tiempoRestante}s</h2>
                                                <div className="datosPregunta">
                                                    <h2 className="puntosAvance"> {puntos} - {preguntaActual}/{preguntas.length}</h2>
                                                    <h1 className="textoPreg">{preguntas[preguntaActual].pregunta}</h1>
                                                </div>
                                            </div>
                                            <div className="respuestas">
                                                {preguntas[preguntaActual].respuestas.map((respuesta) => (
                                                    <button className="buttonJ"
                                                        key={respuesta.id}
                                                        onClick={() => { playSound(); handleRes(respuesta.correcta) }}
                                                    >
                                                        {respuesta.texto}
                                                    </button>
                                                ))}
                                            </div>
                                        </>)
                                        : (
                                            <>
                                                <img className="backgroundImage" src="/Medios/Victoria/fondo.PNG" />

                                                <div className="piramide">
                                                    <button className="btnSig" onClick={() => { playSound(); setEnPregunta(true); setCinematicOn(true); }}>Siguiente</button>
                                                    {preguntas.map((pregunta, i) => (
                                                        <div className="escalon"
                                                            id={"escalon" + (i + 1)}
                                                            key={pregunta.id}
                                                        >
                                                            {i + 1}
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )

                                    }
                                </>
                            )}
                    </div>

                </div >
            }
        </>
    );

}

export default Juego;