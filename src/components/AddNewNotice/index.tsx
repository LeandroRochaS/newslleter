import { useState } from "react";
import { validarFormularioRegister } from "../../utils/Verifications";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../utils/api";
import "./styles.scss";
import { PostType } from "../../utils/types";
import x from "../../images/svg/x.svg";

const meses = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export default function AddNewNotice({ handleModal }) {
  const [form, setForm] = useState<PostType | null>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleOnChange(e: any) {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSubmit(e: any) {
    e.preventDefault();

    const dateString = form?.data;

    const date = new Date(dateString!);
    const month = date.getMonth();

    const dataFormatada = `${date.getDate() + 1} ${
      meses[month]
    } ${date.getFullYear()}`;

    const data = {
      ...form,
      data: dataFormatada.toUpperCase(),
    };

    console.log(data);

    if (data.resumo.length > 60) {
      data.resumo = data.resumo.substring(0, 50) + "...";
    }

    if (validarFormularioRegister()) {
      api
        .post("/posts", data)
        .then(() => {
          toast.success("Notícia adicionada com sucesso!");
          window.location.reload();
        })
        .catch(() => {
          toast.error("Erro ao adicionar notícia!");
        });
    } else {
      toast.error("Preencha todos os campos!");
    }
  }

  return (
    <>
      <div className="modal-addnotice-container">
        <section className=" addnewnotice-container">
          <div className="flex-center">
            <img src={x} className="icon-10" onClick={handleModal}></img>
          </div>

          <div className="p-2">
            <h3 className="addnewnotice-title"> Adicionar novo post</h3>
            <p className="addnewnotice-subtitle">
              Preencha os campos abaixo para adicionar uma nova notícia.
            </p>
          </div>

          <form className="addnewnotice-form" onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
              <div className="grid-3 p-0 ">
                <label htmlFor="data">
                  <h6>Data </h6>
                </label>
                <input
                  className="mt-1 inputform"
                  type="date"
                  id="data"
                  name="data"
                  onChange={handleOnChange}
                />
              </div>
              <div className="grid-3 p-0 ">
                <label htmlFor="categoria">
                  <h6>Categoria </h6>
                </label>
                <input
                  className="mt-1 inputform"
                  id="categoria"
                  name="categoria"
                  onChange={handleOnChange}
                ></input>
              </div>
              <div className="grid-6 p-0 ">
                <label htmlFor="titulo">
                  <h6>Título </h6>
                </label>
                <input
                  className="mt-1 inputform"
                  type="text"
                  id="titulo"
                  name="titulo"
                  maxLength={25}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="row ">
              <div className="grid-5 p-0 ">
                <label htmlFor="image">
                  <h6>Imagem </h6>
                </label>
                <input
                  className="mt-1 inputform"
                  type="text"
                  id="image"
                  name="imgUrl"
                  onChange={handleOnChange}
                />
              </div>
              <div className="grid-7 p-0 ">
                <label>
                  <h6>Resumo da notícia </h6>
                </label>
                <input
                  className="mt-1 w-100 inputform"
                  id="description"
                  name="resumo"
                  onChange={handleOnChange}
                  maxLength={50}
                />
              </div>
            </div>
            <div className="row">
              <div className="grid-6 p-0">
                <label htmlFor="description">
                  <h6>Conteúdo </h6>
                </label>
                <textarea
                  className="mt-1 w-100 inputform"
                  rows={10}
                  id="description"
                  name="conteudo"
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="row flex-start">
              <button
                type="submit"
                className="btn addnewnotice-btn b-0 mt-3 w-25 ml-2"
              >
                Adicionar
              </button>
            </div>
          </form>
        </section>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
}
