import { carregarSetoresLocalStorage } from "../../utils/data";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import search from "../../images/svg/search (2).svg";

import "react-toastify/dist/ReactToastify.css";

export default function SearchInput() {
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    let id = e.target.id.value;
    if (id == null || id == undefined) return;
    const setores = carregarSetoresLocalStorage();
    id = id.toUpperCase();
    for (const setorKey in setores) {
      if (Object.prototype.hasOwnProperty.call(setores, setorKey)) {
        const setor = setores[setorKey];

        for (const contratoKey in setor) {
          if (Object.prototype.hasOwnProperty.call(setor, contratoKey)) {
            if (contratoKey === id) {
              navigate(`/contrato/${id}`);
              break;
            }
          }
        }
      }
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSearch(e)} className="input-search">
        <button>
          <img src={search}></img>
        </button>
        <input
          autoComplete="off"
          type="text"
          placeholder="Id Contrato"
          name="id"
          id="id"
        ></input>
      </form>
    </>
  );
}
