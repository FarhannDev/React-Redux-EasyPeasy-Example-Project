import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Box from "../../components/box/Box";
import BoxTitle from "../../components/box/BoxTitle";
import Loading from "../../components/shared/Loading";

export default function ArticlesDetails({ articles }) {
  const { id } = useParams();
  const article = articles.find((article) => article.id.toString() === id);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  }, []);
  return (
    <>
      {isLoading && <Loading title="Sedang memuat..." />}
      {!isLoading && (
        <>
          <Box>
            <div className="d-flex justify-content-start flex-column col-lg-8">
              <Link to="/" className=" text-decoration-none text-white mb-3">
                <i className="fas fa-arrow-left"></i> Kembali
              </Link>
              <BoxTitle title={`${article.title}`} />
              <div className="pt-3">
                <p className="text-justify">Dibuat {article.createdAt}</p>
                <p className="text-justify">{article.contentSnipet}</p>
              </div>
            </div>
          </Box>
          <Link
            to={`/`}
            className="button-action btn btn-danger btn-lg rounded"
          >
            Perbarui artikel
          </Link>
        </>
      )}
    </>
  );
}
