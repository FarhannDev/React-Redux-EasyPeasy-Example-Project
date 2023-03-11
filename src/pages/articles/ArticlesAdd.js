import React, { useEffect, useState } from "react";
import Box from "../../components/box/Box";
import BoxTitle from "../../components/box/BoxTitle";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ArticleAdd from "../../components/articles/ArticleAdd";
import Loading from "../../components/shared/Loading";

export default function ArticlesAdd({ articles, setArticles }) {
  const [limit, setLimit] = useState("");
  const history = useHistory();
  const [state, setState] = useState({
    title: "",
    contentSnipet: "",
  });

  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (state.title.length) {
      setLimit(50);
    }
  }, [limit, state.title]);

  const onSubmitChangeHandler = async (e) => {
    e.preventDefault();

    if (!state.title || !state.contentSnipet)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Artikel tidak boleh kosong!",
      });
    try {
      const uniqueId =
        Date.now().toString(36) +
        Math.floor(
          Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
        ).toString(36);
      // Passing data
      const newArticle = {
        ...state,
        id: uniqueId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await axios.post(
        "http://localhost:5000/articles",
        newArticle
      );
      // setArticles([...articles, response.data]);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Berhasil menambahkan artikel",
      });

      setTimeout(() => {
        history.push("/");
      }, 300);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loading title="Sedang memuat..." />}
      {!isLoading && (
        <Box>
          <div className="row justify-content-center">
            <div className="col-lg-7 col-sm-12 col-md-10">
              <div className="pt-5">
                <BoxTitle title="Tambah daftar artikel" />
                <ArticleAdd
                  state={state}
                  setState={setState}
                  limit={limit}
                  onSubmitHandler={onSubmitChangeHandler}
                />
              </div>
            </div>
          </div>
        </Box>
      )}
    </>
  );
}
