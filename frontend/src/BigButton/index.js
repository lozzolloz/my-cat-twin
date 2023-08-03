import "./style.css";

export default function BigButton(props) {
  return (
    <div>
      <p className="instruction">Find my cat twin!</p>
      <button className="big-button" onClick={props.handleClick}></button>
    </div>
  );
}
