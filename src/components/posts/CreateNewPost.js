import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Box from "../box/Box";
import BoxTitle from "../box/BoxTitle";
import Loading from "../shared/Loading";
import { Link, useHistory } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import Swal from "sweetalert2";

export default function CreateNewPost({ isLoading, fetchError }) {
  const history = useHistory();
  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);

  const storePost = useStoreActions((actions) => actions.storePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);

  const [limitKarakterTitle, setLimitKarakterTitle] = useState(50);
  const [limitKarakterBody, setLimitKarakterBody] = useState(0);

  const onPostTitleChangeHandler = (e) => {
    setLimitKarakterTitle(50);
    setPostTitle(e.target.value.slice(0, limitKarakterTitle));
  };
  const onPostBodyChangeHandler = (e) => {
    setLimitKarakterBody(1000);
    setPostBody(e.target.value.slice(0, limitKarakterBody));
  };

  const onSubmitPostHandler = (e) => {
    e.preventDefault();

    if (postTitle.length || postBody.length) {
      const id =
        posts.length &&
        Date.now().toString(36) +
          Math.floor(
            Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
          ).toString(36);

      const currentDate = new Date().toISOString();
      const newPost = {
        id,
        title: postTitle,
        body: postBody,
        createdAt: currentDate,
        updatedAt: currentDate,
      };

      storePost(newPost);
      history.push("/");
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Postingan berhasil dibuat",
      });
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
                <Form
                  onSubmit={onSubmitPostHandler}
                  className="py-3"
                  autoComplete="off"
                >
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <div className="text-end">
                      <div className="ms-3"></div>Maksimal{" "}
                      {postTitle
                        ? limitKarakterTitle - postTitle.length
                        : limitKarakterTitle}{" "}
                      karakter tersisa
                    </div>
                    <Form.Label>Judul Artikel</Form.Label>
                    <Form.Control
                      value={postTitle}
                      onChange={onPostTitleChangeHandler}
                      type="text"
                      placeholder="Judul artikel"
                      isInvalid={postTitle.length >= 50}
                      isValid={postTitle.length && postTitle.length >= 10}
                    />

                    <Form.Control.Feedback
                      className="font-weight-bold"
                      type="invalid"
                      role="alert"
                    >
                      Batas karakter sudah maksimal
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Deskripsi</Form.Label>
                    <Form.Control
                      value={postBody}
                      onChange={onPostBodyChangeHandler}
                      as="textarea"
                      rows={8}
                      placeholder="Tuliskan isi artikel..."
                      isInvalid={postBody && postBody.length >= 1000}
                      isValid={postBody && postBody.length >= 30}
                    />
                    <Form.Control.Feedback
                      className="font-weight-bold"
                      type="invalid"
                      role="alert"
                    >
                      Batas karakter sudah maksimal
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="text-end">
                    <Link to="/" className="btn btn-dark btn-lg">
                      Batalkan
                    </Link>
                    <Button
                      disabled={
                        postTitle.length >= 50 ||
                        postBody.length >= 1000 ||
                        !postTitle.length ||
                        !postBody.length
                      }
                      className="ms-2"
                      variant="dark"
                      size="lg"
                      type="submit"
                    >
                      Buat postingan
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Box>
      )}
    </>
  );
}
