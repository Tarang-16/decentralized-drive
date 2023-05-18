import {useState} from "react";
import "./Display.css";

const Display = ({contract, account}) => {
  const[data,setData] = useState("");
  const getData = async() => {
    let dataArray;
    const otherAddress = document.querySelector(".address").value;
    try {
    if (otherAddress) {
      dataArray = await contract.getImage(otherAddress);
      console.log(dataArray);
    } else {
      dataArray = await contract.getImage(account);
    }
  } catch (e) {
    console.log ("You do not have access");
  }
    const isEmpty = Object.keys(dataArray).length === 0; 

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(str);
      console.log(str_array);

      const images = str_array.map((item,i) => {
        return (
          <a href = {item} key = {i} target = "_blank">
            <img key = {i} src = {`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} alt = "new" className="image-list" ></img>
          </a>
        )
      });
      setData(images);
    } else {
      alert ("No image to Display");
    }
  
  };
  return <>
  <div className = "image-list">{data}</div>
  <input type = "text" placeholder = "Enter Address" className = "address"></input>
  <button className = "center-button" onClick = {() => getData()}> Get Data</button>
  </>;
};
export default Display;
