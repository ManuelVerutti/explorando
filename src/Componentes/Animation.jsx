import React, { useEffect, useState } from "react";
import "./Animation.css";
import soundFile from '../Sounds/pop.mpeg';
import LazyImage from "./LazyImage";
import whosh from "./whosh.mp3";


function Animation(props) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(props.message);
  const [currentMessage, setCurrentMessage] = useState(0);

  function playSound() {
    const audio = new Audio(soundFile);
    audio.play();
  }

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(true);
      setCurrentMessage(0);
    }, 1000);
    setTimeout(() => {
      setShowMessage(true);
    }, 2000);
  }, []);

  function handleClick(){
    if (props.secondMessage) {
      
      if(currentMessage===props.secondMessage[props.stage].mensaje.length){
        setMessage("Mapa");
        const audio = new Audio(whosh);
        audio.play();

      }else{
        setMessage(props.secondMessage[props.stage].mensaje[currentMessage]);
        setCurrentMessage(currentMessage+1);
      }

    }else{
      setMessage("Haz click para continuar");
      

    }
  }

  return (
    <div className="screen">
      <LazyImage
        src={props.backgroundImage}
        alt="background"
        className="background-image"
      />
      <img
        src={props.personImage1}
        alt="person1"
        className={`person person-1 ${showAnimation ? "slide-up" : ""}`}
      />
      <img
        src={props.personImage2}
        alt="person2"
        className={`person person-2 ${showAnimation ? "slide-up" : ""}`}
      />
      <button className="skip" onClick={() => { playSound(); props.handleAnimationClick() }}  >Omitir</button>
      {showMessage && (
        <>
          {message === "Haz click para continuar" ?

            <div className="dialogueClick">
              <p onClick={() => { playSound(); props.handleAnimationClick() }} dangerouslySetInnerHTML={{ __html: message }} ></p>
            </div>
            :

            <>

            {
            
            message==="Mapa"?

            <div className="map" >
            <img onClick={()=>{playSound(); setMessage("Haz click para continuar");}} src={props.imgMap} alt="Mapa" />

            </div>
            :
            <div className="dialogue">
              <p onClick={() => { playSound();handleClick(); }} dangerouslySetInnerHTML={{ __html: message+"<p>>></p><span>&#160;</span>" }} ></p>
            
            </div>
            
            }
            </>
            

          }
        </>

      )}
    </div>
  );
}

export default Animation;