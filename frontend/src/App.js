import "./App.css";
import { useState, useEffect } from "react";
import InputBox from "./InputBox";
import BigButton from "./BigButton";
import DisplayResult from "./DisplayResult";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [displayData, setDisplayData] = useState({});

  async function handleApiCall(name) {
    setInputValue("");
    const lowerCaseName = name.toLowerCase();
    const response = await fetch(
      `http://localhost:5001/api/search?name=${encodeURIComponent(
        lowerCaseName
      )}`
    );
    const data = await response.json();
    console.log(data);

    if (data.length > 0) {
      await fetch(
        `http://localhost:5001/api/increment?name=${encodeURIComponent(
          lowerCaseName
        )}`,
        {
          method: "PUT",
        }
      );

      setDisplayData({
        name: name,
        catUrl: data[0].cat,
        searchcount: data[0].searchcount + 1,
      });
    } else {
      // If name doesn't exist, post it and get the new data
      const catApiResponse = await fetch(
        `https://api.thecatapi.com/v1/images/search`
      );
      const catApiData = await catApiResponse.json();
      console.log(catApiData);

      await fetch(`http://localhost:5001/api/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: lowerCaseName,
          cat: catApiData[0].url,
        }),
      });

      setDisplayData({
        name: name,
        catUrl: catApiData[0].url,
        searchcount: 1,
      });
    }
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

  useEffect(() => {
    console.log(displayData);
  }, [displayData]);

  return (
    <div className="App">
      <div className="column1">
        <InputBox
          handleChange={handleChange}
          maxLength="255"
          inputValue={inputValue}
        ></InputBox>
        <BigButton
          handleClick={handleClick}
          inputValue={inputValue}
        ></BigButton>
      </div>
      <div className="column2">
        <DisplayResult displayData={displayData} />
      </div>
    </div>
  );
}

export default App;
