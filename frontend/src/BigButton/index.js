import "./style.css";
import React, { useState, useEffect } from "react";

export default function BigButton(props) {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (props.inputValue) {
      function moveImage() {
        setPosition((prevPosition) => (prevPosition === 0 ? 10 : 0));
      }

      const animationInterval = setInterval(moveImage, 1000);
      return () => clearInterval(animationInterval);
    } else setPosition(0)
  }, [props.inputValue]);

  return (
    <div className="bigbutton-div">
      <p>Find my cat twin!</p>
      <img
        src={process.env.PUBLIC_URL + "/redarrow.png"}
        alt=""
        className="arrow"
        style={{ top: `${position}px` }}
      />
      <button className="big-button" onClick={props.handleClick}></button>
    </div>
  );
}
