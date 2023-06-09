
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi } from "./constants/index";
import contractAddress from './constants/contractAddress.json';
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  try {
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAdd = contractAddress.contractAddresses;

        const contract = new ethers.Contract(
          contractAdd,
          abi,
          signer
        );
        // console.log(contract);
        setContract(contract);
        setProvider(provider);
      };
    };
    provider && loadProvider();
  }, []);
  } catch (error) {
      alert("Metamask is not installed");
    };
  return (
    <>
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}
      <div className="App">
        <h1 style= {{ color: "white" }}> Decentralized Drive</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: "white" }}>
          {" "}
          Account: {account ? account : "Please connect to Metamask"}
        </p>
        <FileUpload
          contract={contract}
          account={account}
          provider={provider}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </>
  );
}

export default App;
