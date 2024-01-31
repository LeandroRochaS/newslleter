import "../src/styles/styles.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ContactPage from "./pages/Contact";
import News from "./pages/News";
import Post from "./pages/Post";
import Contract from "./pages/Contract";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contrato/:id" element={<Contract />} />
        <Route path="/procurar" element={<Search />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/noticias" element={<News />} />
        <Route path="/noticia/:id" element={<Post />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
