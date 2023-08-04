import "./style.css";

export default function InputBox(props) {
  return (
    <div className="inputbox-div">
      <p>Enter name:</p>
      <input
        className="inputbox"
        onChange={props.handleChange}
        value={props.inputValue}
      ></input>
    </div>
  );
}
