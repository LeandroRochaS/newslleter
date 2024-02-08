import { useContext, useState } from "react";
import { api } from "../../utils/api";
import Header from "../../components/Header";
import logo from "../../images/png/petobrasLogo.png";
import logo2 from "../../images/png/logo2.png";
import "./styles.scss";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { loginAuthContext } = useContext(AuthContext);
  const [form, setForm] = useState({
    user: "",
    password: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await api.get(`/perfis?nome=${form.user}`);
      console.log(response);

      if (response.data[0].senha === form.password) {
        if (response.data && response.data.length > 0) {
          loginAuthContext(response.data[0]);
          navigate("/");
        }
      } else {
        console.error("Usuário ou senha incorretos!");
      }
    } catch (error) {
      console.error("Erro ao realizar o login:", error);
    }
  };

  return (
    <>
      <Header />
      <section className="container">
        <div className="flex">
          <div className="w-50 login-left">
            <img src={logo} alt="logo" className="icon" />
            <img src={logo2} alt="logo petros" className="logo-2"></img>
            <h3>
              Informações mais rápidas, <br></br> mais práticas para você!{" "}
            </h3>
          </div>
          <div className="w-50 flex-column-center">
            <h2 className="title-login">Seja bem vindo !</h2>
            <form className="flex-column-center w-100" onSubmit={handleLogin}>
              <div className="w-50 flex-column-center mb-2">
                <label>Usuário</label>
                <input
                  type="text"
                  name="user"
                  placeholder="User"
                  className="input-login"
                  value={form.user}
                  onChange={onChange}
                  autoComplete="off"
                />
              </div>
              <div className="w-50 flex-column-center">
                <label>Senha</label>
                <input
                  type="password"
                  name="password"
                  placeholder="senha"
                  className="input-login"
                  value={form.password}
                  onChange={onChange}
                  autoComplete="off"
                />
              </div>
              <p className="color-red text-center esqueceu">
                Esqueceu a senha ?
              </p>
              <button type="submit" className="btn btn-login">
                Login
              </button>
            </form>
          </div>
        </div>
        {/* <ToastContainer
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
      /> */}
      </section>
    </>
  );
}
