import "./style.css";

export default function DisplayResult(props) {
  const { name, catUrl, searchcount } = props.displayData;
  let display = false;
  if (name) {
    display = true;
  }
  console.log(display);
  let countInfo = "This is the first time someone has searched this name!";
  if (searchcount > 1) {
    countInfo = `This name has been searched ${searchcount} times!`;
  }

  return (
    <div className={"displayresult-div--" + display}>
      <p>This cat's name is {name}! </p>
      <img className="cat-photo" src={catUrl} alt="that's you" />
      <p>{countInfo}</p>
    </div>
  );
}
