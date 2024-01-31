import "./styles.scss";
import logoHeader from "../../images/png/logoHeader.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";

export default function Header() {
  const { userDataAuthContext, logoutAuthContext } = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (userDataAuthContext) {
      setUser(userDataAuthContext);
    }
    console.log(userDataAuthContext);
  }, [userDataAuthContext]);

  return (
    <>
      <header className="">
        <div className="container header">
          <img
            src={logoHeader}
            alt="logo"
            className="logoHeader
          "
          />
          <ul>
            <li>
              <Link to={"/"} className="link nav-link">
                <h1>Início</h1>
              </Link>
            </li>
            <li>
              <Link to={"/noticias"} className="link nav-link">
                <h1>Notícias</h1>
              </Link>
            </li>
            {user ? (
              <></>
            ) : (
              <li>
                <Link to="/login" className="link nav-link">
                  <h1>Login</h1>
                </Link>
              </li>
            )}

            {user ? (
              <li>
                <Link to={`/procurar`} className="link nav-link">
                  <h1>{user.nome.toLowerCase()}</h1>
                </Link>
              </li>
            ) : (
              <li>
                <Link to={`/login`} className="link nav-link">
                  <h1>Setores</h1>
                </Link>
              </li>
            )}

            {user && (
              <li className="leave-link">
                <button
                  onClick={() => {
                    logoutAuthContext();
                  }}
                  className="link nav-link"
                >
                  <h1>Sair</h1>
                </button>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
}
