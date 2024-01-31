import { useState } from "react";
import Header from "../../components/Header";
import "./styles.scss";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
  };

  return (
    <>
      <Header />
      <div className="contact-container">
        <h1 className="title-contact">Entre em contato</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group-content">
            <div className="contact-input-group">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="contact-input-group">
              <label htmlFor="email">Email Corporativo:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>

          <div className="contact-input-group">
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              rows={5}
            />
          </div>
          <button className="btn" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactPage;
