import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import Box from "../components/box/Box";
import BoxTitle from "../components/box/BoxTitle";
import Loading from "../components/shared/Loading";
import Button from "../components/shared/Button";
import axios from "axios";
import Swal from "sweetalert2";
export default function DetailArticle() {
  const history = useHistory();
  const { id } = useParams();
  const { isLoading, articles, setArticles } = useContext(DataContext);
  const article = articles.find((article) => article.id.toString() === id);

  const onDeleteHandler = (id) => {
    try {
      Swal.fire({
        title: "Hapus Artikel",
        text: "Apakah kamu yakin menghapus artikel ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batalkan",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:5000/articles/${id}`);
          const filteredArticle = articles.filter(
            (filtered) => filtered.id !== id
          );
          setArticles(filteredArticle);
          history.push("/");
          Swal.fire("Dihapus", "Artikel dihapus.", "success");
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loading title="Sedang memuat..." />}
      {!isLoading && (
        <>
          {!article && <Loading title="Halaman tidak ditemukan..." />}
          {article && (
            <Box>
              <div className="d-flex justify-content-start flex-column col-lg-8">
                <Link to="/" className=" text-decoration-none text-white mb-3">
                  <i className="fas fa-arrow-left"></i> Kembali
                </Link>
                {/* <Button
                  urlRedirect={`/article/${article.id}/edit`}
                  icon="fas fa-2x fa-edit"
                /> */}
                <BoxTitle title={`${article.title}`} />
                <div className="pt-3">
                  <p className="text-justify">Dibuat {article.createdAt}</p>
                  <p className="text-justify">{article.contentSnipet}</p>
                </div>
              </div>
            </Box>
          )}
          <button
            onClick={() => onDeleteHandler(id)}
            className="btn btn-danger btn-lg rounded"
          >
            Hapus
          </button>
          <Link
            to={`/article/${id}/edit`}
            className="btn btn-danger btn-lg rounded ms-2"
          >
            Edit
          </Link>
        </>
      )}
    </>
  );
}
