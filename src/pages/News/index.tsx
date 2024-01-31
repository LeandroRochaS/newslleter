import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import MainPost from "../../components/MainPost";
import { PostType } from "../../utils/types";
import { api } from "../../utils/api";
import "./styles.scss";
import { Pagination } from "@nextui-org/react";
import { AuthContext } from "../../context/AuthContext";
import AddNewNotice from "../../components/AddNewNotice";
import plusSquare from "../../images/svg/plus-square (2).svg";

export default function News() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [isAdm, setIsAdm] = useState(false);
  const { userDataAuthContext } = useContext(AuthContext);
  const [isShowModalAddNewNotice, setIsShowModalAddNewNotice] = useState(false);

  useEffect(() => {
    api.get("/posts").then((response) => {
      setPosts(response.data);
    });

    if (userDataAuthContext?.nome === "cont") {
      setIsAdm(true);
    }
  }, [userDataAuthContext]);

  const lastPost = currentPage * postsPerPage;
  const firstPost = lastPost - postsPerPage;
  const postsCut = posts.slice(firstPost, lastPost);

  // Função para mudar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  function handleShowModalAddNewNotice() {
    setIsShowModalAddNewNotice(!isShowModalAddNewNotice);
  }

  return (
    <>
      <Header />
      <section className="container">
        <h1 className="text-center title-down">Notícias</h1>

        <div className="row news-container">
          {postsCut.map((item) => (
            <div key={item.id} className="grid-3 notice-card">
              <MainPost {...item} />
            </div>
          ))}
        </div>

        <div className="pagination-container">
          <Pagination
            total={Math.ceil(posts.length / postsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
        {isAdm && (
          <div className="container-button-addnew">
            <img src={plusSquare} onClick={handleShowModalAddNewNotice}></img>
          </div>
        )}
        {isShowModalAddNewNotice && (
          <div className="text-center">
            <AddNewNotice handleModal={handleShowModalAddNewNotice} />
          </div>
        )}
      </section>
    </>
  );
}
