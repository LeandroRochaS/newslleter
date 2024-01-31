// import { useEffect, useState } from "react";
// import { API } from "../../services/api";
// import { PostType, UserProfileType } from "../../utils/types";
import { PostType } from "../../utils/types";
import "./styles.scss";
import { Link } from "react-router-dom";

export default function MainPost(item: PostType) {
  return (
    <>
      {item && (
        <div className="mainPost">
          <Link to={`/noticia/${item.id}`} className="">
            <img className="img-card-right mb-1" src={item.imgUrl} />
          </Link>

          <div className="px-1">
            <Link to={`/noticia/${item.id}`} className="">
              <h5 className="color-gray title-card link-title">
                {item.titulo}
              </h5>
            </Link>
            <p>{item.resumo}</p>
            <div className="flex-aling-center mt-2">
              <div className="flex-aling-center w-100"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
