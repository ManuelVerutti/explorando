import React, { useState, useEffect } from "react";
import Back from "../Componentes/Back";
import { useNavigate } from 'react-router-dom';
import "./Juego.css";
import soundFile from '../Sounds/pop.mpeg';
import Animation from "../Componentes/Animation";
import LazyImage from "../Componentes/LazyImage";
import tiktakSound from "../Sounds/tension.mp3";
import whosh from "../Componentes/whosh.mp3";


const audioS = new Audio(tiktakSound);



//Pendiente - Hacer lectura del json

function Juego(props) {

    const navigate = useNavigate();

    function playSound() {
        const audio = new Audio(soundFile);
        audio.play();
    }

    const playEffects = (action, sound) => {

        switch (action) {
            case "start":
                
                props.playSound(false);
                console.log("playing Musica")
                audioS.play();
                break;
            case "stop":
                console.log("stop Musica")
                audioS.pause();
                props.playSound(true);
                audioS.currentTime = 0;
                break;
    
            default:
                break;
        }
    
    }

    const [topic, setTopic] = useState(localStorage.getItem("currentTema"));
    const [enPregunta, setEnPregunta] = useState(true);
    const [puntos, setPuntos] = useState(0);
    const [preguntas, setPreguntas] = useState([]);
    const [cinematicOn, setCinematicOn] = useState(true);
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [tiempoRestante, setTiempoRestante] = useState(45);
    const [finDelJuego, setFinDelJuego] = useState(false);
    const [victoria, setVictoria] = useState(false);
    const [imgFondo, setImgFondo] = useState("/Medios/Cinematicas/fondo (1).webp");
    const [imgMap, setImgMap] = useState("/Medios/Mapas/Map1.Fwebp");
    const [imgPersona1, setImgPersona1] = useState("/Medios/Cinematicas/explorador.webp");
    const [imgPersona2, setImgPersona2] = useState("/Medios/Cinematicas/exploradora.webp");
    const [mensaje, setMensaje] = useState("<b> Vamos por tu primer nivel:</b><br> GLACIARES");
    const [infoMessage, setInfoMessage] = useState([]);


    let extraPoints = 150;
    // función para manejar el tiempo restante

    useEffect(() => {
        console.log(enPregunta, cinematicOn)
        if (enPregunta && !cinematicOn) {
            playEffects("start", "");
        } else{


            playEffects("stop", "");

        }

    }
        , [enPregunta, cinematicOn])

    useEffect(() => {
        setPuntos(0);
        setTiempoRestante(45);
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
                const preguntasAleatorias = randomQuestion(data, 15);
                console.log(preguntasAleatorias);
                // Almacenamos las preguntas aleatorias en setPreguntas
                setPreguntas(preguntasAleatorias);
            })
            .catch(err => console.error(err));

        fetch("info.json")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setInfoMessage(data.lugares);
            })
            .catch(err => console.error(err));

        messageUpdate();

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
        setImgFondo(("/Medios/Cinematicas/fondo (" + (preguntaActual + 1) + ").webp"));
        setImgMap("/Medios/Mapas/Map" + (preguntaActual + 1) + ".webp");

        console.log(preguntaActual);
        messageUpdate();

    }, [cinematicOn, preguntaActual, infoMessage]);

    function messageUpdate() {

        try {
            switch (preguntaActual) {
                case 0:
                    console.log(infoMessage);
                    setMensaje("<b> Vamos por tu primer nivel:</b><br>  " + infoMessage[preguntaActual].nombre);
                    break;
                case 1:
                    setMensaje("<b> Vamos por tu segundo nivel:</b><br> " + infoMessage[preguntaActual].nombre);
                    break;
                case 2:
                    setMensaje("<b> Vamos por tu tercer nivel:</b><br> " + infoMessage[preguntaActual].nombre);
                    break;
                case 3:
                    setMensaje("<b> Vamos por tu cuarto nivel:</b><br> " + infoMessage[preguntaActual].nombre);
                    break;
                case 4:
                    setMensaje("<b> Vamos por tu quinto nivel:</b><br> " + infoMessage[preguntaActual].nombre);
                    break;
                case 5:
                    setMensaje("<b> Vamos por tu sexto nivel:</b><br> " + infoMessage[preguntaActual].nombre);
                    break;
                case 6:
                    setMensaje("<b> Vamos por tu septimo nivel:</b><br> " + infoMessage[preguntaActual].nombre);
                    break;
                case 7:
                    setMensaje("<b> Vamos por tu octavo nivel:</b><br> " + infoMessage[preguntaActual].nombre);
                    break;
                case 8:
                    setMensaje("<b> Vamos por tu noveno nivel:</b><br> " + infoMessage[preguntaActual].nombre);
                    break;
                case 9:
                    setMensaje("<b> Vamos por tu decimo nivel:</b><br> " + infoMessage[preguntaActual].nombre);
                    break;
                case 10:
                    setMensaje("<b> Vamos por tu decimo primer nivel:</b><br> " + infoMessage[preguntaActual].nombre);
                    break;
                case 11:
                    setMensaje("<b> Vamos por tu decimo segundo nivel:</b><br> " + infoMessage[preguntaActual].nombre);
                    break;
                case 12:
                    setMensaje("<b> Vamos por tu decimo tercero nivel:</b><br> " + infoMessage[preguntaActual].nombre);
                    break;
                case 13:
                    setMensaje("<b> Vamos por tu decimo cuarto nivel:</b><br> " + infoMessage[preguntaActual].nombre);
                    break;
                case 14:
                    setMensaje("<b> Vamos por tu decimo quinto nivel:</b><br> " + infoMessage[preguntaActual].nombre);
                    break;
                default:
                    setMensaje("");
                    break;
            }
        } catch (error) {

        }

    }

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
            setTiempoRestante(45);
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
        const audio = new Audio(whosh);
        audio.play();
        setTiempoRestante(45);
    }



    return (
        <>
            {cinematicOn ?

                <Animation
                    backgroundImage={imgFondo}
                    personImage1={imgPersona1}
                    personImage2={imgPersona2}
                    handleAnimationClick={handleAnimationClick}
                    message={mensaje}
                    secondMessage={infoMessage}
                    stage={preguntaActual}
                    imgMap={"./Medios/Mapas/Map1.webp"}
                >

                </Animation>

                :
                <div className="App">

                    <div>

                        {finDelJuego ?
                            (
                                <>

                                    {victoria ?
                                        <div className="gameEndContainer">
                                            <LazyImage className="backgroundImage" src="/Medios/Victoria/fondo.PNG" />

                                            <Back destino="/temas" playEffects={playEffects} />
                                            <LazyImage className="colibriImg" src="Medios\logo-colibri-03.webp" alt="" />

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
                                            <LazyImage className="backgroundImage" src="/Medios/Victoria/fondo.PNG" />

                                            <Back destino="/temas" playEffects={playEffects} />
                                            <LazyImage className="colibriImg" src="Medios\logo-colibri-03.webp" alt="" />

                                            <h1>¡Fin del juego!</h1>
                                            <h2>Tu puntaje final es de {puntos} puntos.</h2>
                                            <div>
                                                <button className="buttonJ" onClick={() => {

                                                    if (!JSON.parse(localStorage.getItem("scores"))) {
                                                        alert('No existen datos de partidas');
                                                    } else {
                                                        playEffects("stop")
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
                                            <LazyImage className="backgroundImage" src={imgFondo} />
                                            <Back destino="/temas" playEffects={playEffects} />
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
                                                <LazyImage id="bg1" className="backgroundImage" src="/Medios/Victoria/fondo.PNG" />

                                                <div className="piramide">
                                                    <img src="/Medios/Niveles-10.webp" alt="piramide" />

                                                    <button className="btnSig" onClick={() => { playSound(); setEnPregunta(true); setCinematicOn(true); }}>Siguiente</button>
                                                    <div className="escalones">
                                                        {preguntas.map((pregunta, i) => (
                                                            <div className="escalon"
                                                                id={"escalon" + (i + 1)}
                                                                key={pregunta.id}
                                                            >

                                                            </div>
                                                        ))}
                                                    </div>

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