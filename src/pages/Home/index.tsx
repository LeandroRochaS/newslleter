import Header from "../../components/Header";
import "./styles.scss";
import logo from "../../images/png/petobrasLogo.png";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import ButtonContact from "../../components/ButtonContact";
import { salvarSetoresLocalStorage } from "../../utils/data";

export default function Home() {
  const { userDataAuthContext } = useContext(AuthContext);

  useEffect(() => {
    console.log(userDataAuthContext);
  }, [userDataAuthContext]);

  return (
    <>
      <Header />
      <section className="container">
        <div className="home-content">
          <div className="home-left w-50">
            <h1> Nossa história</h1>
            <p>
              A Petros newsletter foi criada no início de 2024 com o propósito
              de agilizar e simplificar a divulgação da contratação de serviços
              da Petrobras.
            </p>
          </div>
          <img src={logo} alt="logo" className="home-logo" />
          <div className="dividir"></div>
          <div className="home-right  w-50">
            <h1>Novidades</h1>
            <p>
              Os assuntos desta semana do novo lançamento da edição da petros
              newsletter estão super variados: novas contratações, status de uma
              demanda de contratação e cancelamento de serviços. Boa leitura e
              um bom fim de semana recarregando as baterias para o início de um
              novo mês.
            </p>
          </div>
        </div>
      </section>
      <ButtonContact />
    </>
  );
}
