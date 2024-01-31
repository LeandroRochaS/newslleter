import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import { apagarContrato, carregarSetoresLocalStorage } from "../../utils/data";
import { LoginType, SectorType } from "../../utils/types";

import "./styles.scss";
import { Link } from "react-router-dom";
import fileText from "../../images/svg/file-text.svg";
import { ContractForm } from "../../components/ContractForm";
import filePlus from "../../images/svg/filePlus.svg";
import trash from "../../images/svg/trash.svg";
import SearchInput from "../../components/SearchInput";

export default function Search() {
  const { userDataAuthContext, verifyLogged } = useContext(AuthContext);
  const [setoresData, setSetoresData] = useState<SectorType[]>([]);
  const [userData, setUserData] = useState<LoginType>();
  const [isShowModal, setIsShowModal] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    verifyLogged();
    setUserData(userDataAuthContext);
    const sectorLower = userDataAuthContext?.nome.toLowerCase();
    const sectorFormt = sectorLower;
    if (sectorFormt != "cont") {
      const setor = carregarSetoresLocalStorage()[sectorFormt];

      console.log(setor);
      setSetoresData(setor);
    } else {
      const setores = carregarSetoresLocalStorage();
      if (filter == "") {
        for (let i = 0; i < Object.keys(setores).length; i++) {
          console.log(Object.keys(setores)[i]);
          const setor = setores[Object.keys(setores)[i]];
          for (
            let j = 0;
            j < Object.keys(setores[Object.keys(setores)[i]]).length;
            j++
          ) {
            const contratosSetor = Object.keys(setor);
            contratosSetor.map((contrato, index) => {
              setSetoresData((prevData) => ({
                ...prevData,
                [contrato]: contrato[index],
              }));
            });
          }
        }
      } else {
        const setor = carregarSetoresLocalStorage()[filter];

        console.log(setor);
        setSetoresData(setor);
      }
    }
  }, [userDataAuthContext, filter, verifyLogged]);

  function handleShowModal() {
    setIsShowModal(!isShowModal);
  }

  function handleDeleteContract(e, setorA, index) {
    e.preventDefault();
    console.log(index);
    const setores = carregarSetoresLocalStorage();

    for (let i = 0; i < Object.keys(setores).length; i++) {
      const setor = setores[Object.keys(setores)[i]];
      const contratosSetor = Object.keys(setor);

      for (let j = 0; j < contratosSetor.length; j++) {
        const contrato = contratosSetor[j];

        if (contrato === setorA) {
          console.log(
            "Contrato encontrado em setor: " +
              Object.keys(setores)[i] +
              " Com o id " +
              setorA
          );
          apagarContrato(Object.keys(setores)[i], setorA);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          return;
        }
      }
    }

    console.log("Contrato não encontrado");
    console.log(setores);
  }

  return (
    <>
      <Header />
      <section className="container search-container">
        <div className="search-input-container">
          <SearchInput />
          {userData && userData.nome == "cont" && (
            <img
              src={filePlus}
              className="icon-plus"
              onClick={handleShowModal}
            />
          )}
        </div>

        <div className="contracts">
          {userData && userData.nome != "cont" ? (
            <h1>Contratos do Setor {userData.nome.toLowerCase()}</h1>
          ) : (
            <div className="title-contracts">
              <h1>Contratos</h1>
              <select
                onChange={(e) => setFilter(e.target.value)}
                name="setores"
                id="setores"
              >
                <option value="">Todos</option>
                <option value="sopsms">SOP/SMS</option>
                <option value="sopalso">SOP/ALSO</option>
                <option value="gstdenpi">GSTD/ENPI</option>
              </select>
            </div>
          )}
          <ul>
            {setoresData &&
              Object.keys(setoresData).map((setor, index) => (
                <div key={index} className="contract-link-search ">
                  <div>
                    <Link
                      key={index}
                      className="link"
                      to={`/contrato/${setor}`}
                    >
                      <li>
                        <img src={fileText} alt="file text" /> #{setor}
                      </li>
                    </Link>
                  </div>
                  {userData && userData.nome == "cont" && (
                    <img
                      className="delete-button"
                      onClick={(e) => handleDeleteContract(e, setor, index)}
                      src={trash}
                    />
                  )}
                </div>
              ))}
          </ul>
        </div>
        {isShowModal && userData.nome == "cont" && (
          <div className="modal-form">
            <button className="btn btn-red" onClick={handleShowModal}>
              Fechar
            </button>

            <div className="contract-form-container">
              <ContractForm />
            </div>
          </div>
        )}
      </section>
    </>
  );
}
