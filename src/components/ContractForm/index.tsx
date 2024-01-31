// ContractForm.jsx
import { useState } from "react";
import "./styles.scss"; // Importa o arquivo CSS
import { Etapa } from "../../utils/types";
import {
  adicionarContrato,
  adicionarEtapa,
  carregarSetoresLocalStorage,
} from "../../utils/data";
import x from "../../images/svg/x.svg";
import { ToastContainer, toast } from "react-toastify";
interface ContractData {
  id: string;
  description: string;
  title: string;
  date: string;
  hour: string;
  image: string;
  sector: string;

  etapas: Etapa[]; // Substitua 'any[]' pelo tipo real das etapas
}

export const ContractForm = () => {
  const [currentSector, setCurrentSector] = useState("");
  const [contractData, setContractData] = useState<ContractData>();
  const [sectorEtapa, setSectorEtapa] = useState("");
  const [etapaData, setEtapaData] = useState({
    data: "",
    person: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [etapas, setEtapas] = useState([]);

  const [contractId, setContractId] = useState("");

  const [isModalContractOpen, setIsModalContractOpen] = useState(false);
  const [isModalEtapaOpen, setisModalEtapaOpen] = useState(false);
  const [indexEtapa, setIndexEtapa] = useState(0);

  const handleSectorChange = (event) => {
    console.log(event.target.value);
    setCurrentSector(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContractData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "contractId") {
      if (value === "") return;
      setContractId(`${sectorEtapa.toUpperCase()}${value}`);
      const setoresLocal = carregarSetoresLocalStorage();
      const setor = setoresLocal[sectorEtapa];
      let etapas;
      try {
        etapas = setor[`${sectorEtapa.toUpperCase()}${value}`].etapas || [];
      } catch (e) {
        toast.error("ID incorreto");
      }
      setEtapas(etapas);

      if (etapas.length > 0) {
        const firstIncompleteEtapaIndex = etapas.findIndex(
          (etapa) => !etapa.data || !etapa.person
        );

        setIndexEtapa(firstIncompleteEtapaIndex);

        const etapaElement = document.getElementById(
          "etapa"
        ) as HTMLInputElement;
        etapaElement.value = `${sectorEtapa.toUpperCase()}${value} - ${firstIncompleteEtapaIndex.toString()} - ${
          etapas[firstIncompleteEtapaIndex].title
        }`;
      }
    }
  };

  const handleEtapaInputChange = (event) => {
    const { name, value } = event.target;
    setEtapaData((prevData) => ({ ...prevData, [name]: value }));
    console.log(etapaData);
  };

  const handleSectorChangeEtapa = (event) => {
    console.log(event.target.value);
    setSectorEtapa(event.target.value);
  };

  const handleSubmitEtapa = (event) => {
    event.preventDefault();
    console.log("Etapa enviada:", etapaData);
    console.log("Setor da Etapa:", sectorEtapa);
    const etapas =
      carregarSetoresLocalStorage()[sectorEtapa][contractId]["etapas"][
        indexEtapa
      ];

    console.log(sectorEtapa);

    const newEtapa = {
      data: etapaData.data,
      person: etapaData.person,
      title: etapas.title,
    };

    adicionarEtapa(sectorEtapa, contractId, newEtapa, indexEtapa);
    window.location.reload();
  };

  const handleSubmitContract = (event) => {
    event.preventDefault();
    console.log("Contratos enviados:", contractData);

    const objData = {
      description: contractData.description,
      title: contractData.title,
      date: contractData.date,
      hour: contractData.hour,
      image: contractData.image,
      sector: currentSector,

      etapas: [
        {
          title: "Compilação dossiê",
        },
        {
          title: "Revisão técnica do dossiê",
        },
        {
          title: "Orçamento",
        },
        {
          title: "ECPN",
        },
        {
          title: "Processo de contratação",
        },
        {
          title: "Assinatura do contrato",
        },
        {
          title: "Divulgação da contratação",
        },
      ],
    };

    // Faça o que você precisa com objContract
    console.log("Objeto de Contrato:", objData);
    console.log(
      "Setor do Contrato:",
      currentSector.toLocaleUpperCase() + contractData.id
    );
    const idContract = currentSector.toLocaleUpperCase() + contractData.id;
    adicionarContrato(currentSector, idContract, objData);
    window.location.reload();
  };

  const handleModalContract = () => {
    setIsModalContractOpen(!isModalContractOpen);
  };
  const handleModalEtapa = () => {
    setisModalEtapaOpen(!isModalEtapaOpen);
  };

  return (
    <>
      <button className="add-contract-btn" onClick={handleModalContract}>
        Adicionar Contrato
      </button>
      <button className="add-contract-btn" onClick={handleModalEtapa}>
        Adicionar Etapa
      </button>

      {isModalContractOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-title-container">
              <h2 className="modal-title">Adicionar Contrato</h2>
              <button
                className="close-modal-btn"
                type="button"
                onClick={handleModalContract}
              >
                <img src={x} />
              </button>
            </div>
            <form onSubmit={(e) => handleSubmitContract(e)}>
              <div className="row">
                <div className="grid-6 p-0">
                  <label className="form-label">
                    Setor:
                    <select
                      className="form-input"
                      name="sector"
                      onChange={handleSectorChange}
                    >
                      <option value="">Selecione um setor</option>
                      <option value="sopsms">SOP/SMS</option>
                      <option value="sopalso">SOP/ALSO</option>
                      <option value="giad">GIAD</option>
                      <option value="gstdenpi">GSTD/ENPI</option>
                    </select>
                  </label>
                </div>
                <div className="grid-6 p-0">
                  <label className="form-label">
                    Id do Contrato:
                    <input
                      type="number"
                      className="form-input"
                      name="id"
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="grid-6 p-0">
                  <label className="form-label">
                    Titulo do Contrato:
                    <input
                      type="text"
                      className="form-input"
                      name="title"
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </div>
                <div className="grid-6 p-0">
                  <label className="form-label">
                    Descrição do Contrato:
                    <textarea
                      className="form-input"
                      name="description"
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="grid-6 p-0">
                  <label className="form-label">
                    Horário do Contrato:
                    <input
                      className="form-input"
                      name="hour"
                      type="text"
                      onChange={handleInputChange}
                      required
                    ></input>
                  </label>
                </div>
                <div className="grid-6 p-0">
                  <label className="form-label">
                    Data do Contrato:
                    <input
                      className="form-input"
                      name="date"
                      type="date"
                      onChange={handleInputChange}
                      required
                    ></input>
                  </label>
                </div>
              </div>
              <div
                className="row
              "
              >
                <div className="grid-6 p-0">
                  <label className="form-label">
                    Imagem do Contrato:
                    <input
                      className="form-input"
                      name="image"
                      type="text"
                      onChange={handleInputChange}
                      required
                    ></input>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="grid-6">
                  <div className="form-label">
                    <button type="submit" className="add-contract-btn">
                      Adicionar Contrato
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalEtapaOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={(e) => handleSubmitEtapa(e)} className="form-group">
              <div className="modal-title-container">
                <h2 className="modal-title">Adicionar Etapa</h2>

                <button
                  className="close-modal-btn"
                  type="button"
                  onClick={handleModalEtapa}
                >
                  <img src={x} />
                </button>
              </div>
              <div className="row">
                <div className="grid-6 p-0">
                  <label className="form-label">
                    Setor:
                    <select
                      className="form-input select-input"
                      name="sector"
                      onChange={handleSectorChangeEtapa}
                    >
                      <option value="">Selecione um setor</option>
                      <option value="sopsms">SOP/SMS</option>
                      <option value="sopalso">SOP/ALSO</option>
                      <option value="giad">GIAD</option>
                      <option value="gstdenpi">GSTD/ENPI</option>
                    </select>
                  </label>
                </div>
                <div className="grid-6 p-0">
                  <label className="form-label">
                    Id do Contrato:
                    <input
                      type="number"
                      className="form-input"
                      name="contractId"
                      id="contractId"
                      placeholder="Id"
                      onBlur={handleInputChange}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="grid-6 p-0">
                  <label className="form-label">
                    Etapa:
                    <input
                      className="form-input overflow-x"
                      id="etapa"
                      disabled
                      name="sector"
                    ></input>
                  </label>
                </div>
                <div className="grid-6 p-0">
                  <label className="form-label">
                    Data da Etapa:
                    <input
                      type="text"
                      className="form-input"
                      name="data"
                      placeholder="00/00/0000"
                      onChange={handleEtapaInputChange}
                      required
                    />
                  </label>
                </div>
              </div>
              <div className="row mb-2">
                <label className="form-label">
                  Responsável da Etapa:
                  <input
                    type="text"
                    className="form-input"
                    name="person"
                    onChange={handleEtapaInputChange}
                    required
                  />
                </label>
              </div>
              <div className="row">
                <div className="form-label">
                  <button type="submit" className="add-etapa-btn">
                    Adicionar Etapa
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};
