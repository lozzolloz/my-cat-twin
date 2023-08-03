export default function InputBox(props) {
  return (
    <div>
      <p className="instruction">Enter name:</p>
      <input className="inputbox" onChange={props.handleChange}></input>
    </div>
  );
}
