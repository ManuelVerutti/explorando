import React, { useEffect, useState } from "react";
import "./Animation.css";
import soundFile from '../Sounds/pop.mpeg';


function Animation(props) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(props.message);

  function playSound() {
    const audio = new Audio(soundFile);
    audio.play();
}

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(true);
    }, 1000);
    setTimeout(() => {
      setShowMessage(true);
    }, 2000);
    setTimeout(() => {
      setMessage("Haz click para continuar");
    }, 7000);
  }, []);

  return (
    <div className="screen">
      <img
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
      {showMessage && (
        <div className= {` ${message === "Haz click para continuar" ?"dialogueClick" :  "dialogue"}`}>
          <p onClick={() =>{ playSound(); props.handleAnimationClick()}} dangerouslySetInnerHTML={{__html: message}} ></p>
        </div>
      )}
    </div>
  );
}

export default Animation;