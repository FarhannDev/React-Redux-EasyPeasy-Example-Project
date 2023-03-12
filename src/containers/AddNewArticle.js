import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import DataContext from "../context/DataContext";
import axios from "axios";
import Swal from "sweetalert2";
import Box from "../components/box/Box";
import BoxTitle from "../components/box/BoxTitle";
import Loading from "../components/shared/Loading";
import CreateArticle from "../components/articles/CreateArticle";

export default function AddNewArticle() {
  const { articles, setArticles, isLoading, fetchError } =
    useContext(DataContext);
  const [limit, setLimit] = useState("");
  const history = useHistory();
  const [state, setState] = useState({
    title: "",
    contentSnipet: "",
  });

  useEffect(() => {
    if (state.title.length) {
      setLimit(50);
    }
  }, [limit, state.title]);

  const onSubmitHandler = async (e) => {
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
      setArticles([...articles, response.data]);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Berhasil menambahkan artikel",
      });

      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {fetchError && <Loading title={fetchError} />}
      {isLoading && !fetchError && <Loading title="Sedang memuat..." />}
      {!isLoading && !fetchError && (
        <Box>
          <div className="row justify-content-center">
            <div className="col-lg-7 col-sm-12 col-md-10">
              <div className="pt-5">
                <BoxTitle title="Tambah daftar artikel" />
                <CreateArticle
                  state={state}
                  setState={setState}
                  limit={limit}
                  onSubmitHandler={onSubmitHandler}
                />
              </div>
            </div>
          </div>
        </Box>
      )}
    </>
  );
}
