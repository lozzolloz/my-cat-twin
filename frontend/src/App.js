import "./App.css";
import { useState, useEffect } from "react";
import InputBox from "./InputBox";
import BigButton from "./BigButton";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [displayData, setDisplayData] = useState([]);

  async function handleApiCall(name) {
    const lowerCaseName = name.toLowerCase();
    const response = await fetch(
      `http://localhost:5001/api/search?name=${encodeURIComponent(
        lowerCaseName
      )}`
    );
    const data = await response.json();
    console.log(data);
  }

  function handleChange(event) {
    if (event.target.value.length > 255) {
      event.target.value = "";
    }
    setInputValue(event.target.value);
  }

  function handleClick() {
    if (inputValue !== "") {
      handleApiCall(inputValue);
    }
  }

  useEffect(() => {
    console.log(`input = ${inputValue}`);
  }, [inputValue]);

  return (
    <div className="App">
      <InputBox handleChange={handleChange} maxLength="255"></InputBox>
      <BigButton handleClick={handleClick}></BigButton>
    </div>
  );
}

export default App;
