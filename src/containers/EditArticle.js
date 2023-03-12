import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import DataContext from "../context/DataContext";
import axios from "axios";
import Swal from "sweetalert2";
import Box from "../components/box/Box";
import BoxTitle from "../components/box/BoxTitle";
import Loading from "../components/shared/Loading";
import EditArticleForm from "../components/articles/EditArticleForm";

export default function EditArticle() {
  const { id } = useParams();
  const { articles, setArticles, isLoading, fetchError } =
    useContext(DataContext);

  const [editTitle, setEditTitle] = useState("");
  const [editContentSnipet, setEditContentSnipet] = useState("");
  const [limit, setLimit] = useState("");
  const article = articles.find((article) => article.id.toString() === id);
  const history = useHistory();

  useEffect(() => {
    if (article) setEditTitle(article.title);
    setEditContentSnipet(article.contentSnipet);
  }, [article, setEditTitle, setEditContentSnipet]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const updateArtikel = {
      id,
      editTitle,
      editContentSnipet,
      createdAt: article.createdAt,
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/articles/${id}`,
        updateArtikel
      );
      setArticles(
        articles.map((article) =>
          article.id === id ? { ...response.data } : article
        )
      );

      history.push("/");
    } catch (error) {}
  };

  return (
    <>
      {fetchError && <Loading title={fetchError} />}
      {isLoading && !fetchError && <Loading title="Sedang memuat..." />}
      {!isLoading && !fetchError && (
        <>
          {editTitle && (
            <Box>
              <div className="row justify-content-center">
                <div className="col-lg-7 col-sm-12 col-md-10">
                  <div className="pt-5">
                    <BoxTitle title="Edit artikel" />

                    <EditArticleForm
                      editTitle={editTitle}
                      editContentSnipet={editContentSnipet}
                      setEditTitle={setEditTitle}
                      setEditContentSnipet={setEditContentSnipet}
                      onSubmitHandler={onSubmitHandler}
                      limit={limit}
                    />
                  </div>
                </div>
              </div>
            </Box>
          )}
        </>
      )}
    </>
  );
}
