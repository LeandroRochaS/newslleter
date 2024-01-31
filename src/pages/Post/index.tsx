// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { API } from "../../services/api";
// import Header from "../../components/Header";
// import { PostType, UserProfileType } from "../../utils/types";
// import GoToTop from "../../utils/GoTop";
// import { useAuthContext } from "../../context/AuthContext";
import "./styles.scss";

import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostType } from "../../utils/types";
import { api } from "../../utils/api";

export default function Post() {
  const { id } = useParams();

  const [post, setPost] = useState<PostType>(); // Alteração aqui
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch(() => {
        navigate("/404");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Header />
      <section className="container">
        {post && (
          <div className="mb-3">
            <h6 className="color-primary uppercase text-center">
              {post.categoria.toUpperCase()}
            </h6>
            <h3 className="text-center title-new-top">{post.titulo}</h3>
            <h3 className="text-center">{post.data}</h3>
            <div className="row">
              <div className="grid-3"></div>

              <div className="">
                <img
                  src={post?.imgUrl}
                  alt="img-post"
                  className="img-post
            "
                />
              </div>
              <div className="my-8">
                <h4 className="title-down">{post.titulo}</h4>
                <p
                  className="mt-2 content-down"
                  dangerouslySetInnerHTML={{ __html: post.conteudo }}
                />{" "}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
