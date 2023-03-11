import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./shared/Loading";

export default function PageNotFound() {
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  }, [isLoading]);
  return (
    <>
      {isLoading && <Loading title="Sedang memuat..." />}
      {!isLoading && (
        <div className="pageNotFound ">
          <div className="pageNotFoundTextContainer ">
            Opps.... <br /> Halaman tidak ditemukan <br />
            <Link to="/" className="btn btn-dark btn-lg rounded-pill mt-3">
              Kembali halaman utama
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
