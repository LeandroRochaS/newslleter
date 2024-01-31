import { Link } from "react-router-dom";
import "./styles.scss";

export default function ButtonContact() {
  return (
    <>
      <div className="modal-button-contact">
        <Link to={"/contato"}>
          <button className="buttonContact">
            <span>Entre em contato</span>
          </button>
        </Link>
      </div>
    </>
  );
}
