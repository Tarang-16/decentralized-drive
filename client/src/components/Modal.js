import { useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    try {
      await contract.giveAccess(address);
      console.log("Shared");
    } catch (error) {
      if (!address) {
        // Handle the error here
        alert("Put address in the box");
      } else {
        alert(error);
      }
    }
  };

  const takeAccess = async () => {
    const address = document.querySelector(".address").value;
    try {
      await contract.deleteAccess(address);
      console.log("Access updated");
    } catch (error) {
      if (!address) {
        // Handle the error here
        alert("Put address in the box");
      } else {
        alert(error);
      }
    }
  };

  useEffect(() => {
    const accesslist = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };

    contract && accesslist();
  }, []);
  return (
    <>
      <div className="ModalBackground">
        <div className="modalContainer">
          <div className="title"> Share With</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address"> People with Access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              {" "}
              Cancel{" "}
            </button>
            <button onClick={() => sharing()}> Share </button>
            <button onClick={() => takeAccess()}> Deny Access </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
