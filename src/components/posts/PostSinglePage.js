import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import Box from "../box/Box";
import BoxTitle from "../box/BoxTitle";
import Loading from "../shared/Loading";
import Swal from "sweetalert2";

export default function PostSinglePage({ isLoading, fetchError }) {
  const { id } = useParams();
  const history = useHistory();
  const getPostById = useStoreState((state) => state.getPostById);
  const deletePost = useStoreActions((actions) => actions.destroyPost);
  const post = getPostById(id);

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
          deletePost(id);
          Swal.fire("Dihapus", "Artikel dihapus.", "success");
          history.push("/");
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {isLoading && fetchError && <Loading title={fetchError} />}
      {isLoading && <Loading title="Sedang memuat..." />}
      {!isLoading && !fetchError && (
        <>
          {post && (
            <Box>
              <div className="d-flex justify-content-start flex-column col-lg-8">
                <Link to="/" className=" text-decoration-none text-white mb-3">
                  <i className="fas fa-arrow-left"></i> Kembali
                </Link>

                <BoxTitle title={`${post.title}`} />
                <div className="pt-3">
                  <p className="text-justify">Dibuat {post.createdAt}</p>
                  <p className="text-justify">{post.body}</p>
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
            to={`/post/${id}/edit`}
            className="btn btn-danger btn-lg rounded ms-2"
          >
            Edit
          </Link>
        </>
      )}
    </>
  );
}
