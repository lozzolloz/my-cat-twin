import "./App.css";
import { useState, useEffect } from "react";
import InputBox from "./InputBox";
import BigButton from "./BigButton";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [displayData, setDisplayData] = useState([]);

  function handleChange(event) {
    if (event.target.value.length > 255) {
      event.target.value = "";
    }
    setInputValue(event.target.value);
  }

  function handleClick() {
    if (inputValue !== "") {
      setName(inputValue);
      //search database for name(toLowerCase)
      //if name exists, add +1 to times searched, get and display
      //if name doesnt exist, post, get + setDisplayData
      //clear inputBox field
    }
  }

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  return (
    <div className="App">
      <InputBox handleChange={handleChange} maxLength="255"></InputBox>
      <BigButton handleClick={handleClick}></BigButton>
    </div>
  );
}

export default App;
