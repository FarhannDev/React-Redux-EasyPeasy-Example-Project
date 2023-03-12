import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Box from "../box/Box";
import BoxTitle from "../box/BoxTitle";
import Loading from "../shared/Loading";
import { Link, useHistory, useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import Swal from "sweetalert2";

export default function PostEdit({ isLoading, fetchError }) {
  const history = useHistory();
  const { id } = useParams();

  const postEditBody = useStoreState((state) => state.postEditBody);
  const postEditTitle = useStoreState((state) => state.postEditTitle);

  const setPostEditTitle = useStoreActions(
    (actions) => actions.setPostEditTitle
  );
  const setPostEditBody = useStoreActions((actions) => actions.setPostEditBody);
  const updatePost = useStoreActions((actions) => actions.updatePost);

  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);

  useEffect(() => {
    post && setPostEditTitle(post.title);
    setPostEditBody(post.body);
  }, [post, setPostEditTitle, setPostEditBody]);

  const [limitKarakterTitle, setLimitKarakterTitle] = useState(50);
  const [limitKarakterBody, setLimitKarakterBody] = useState(0);

  const onPostTitleChangeHandler = (e) => {
    setLimitKarakterTitle(50);
    setPostEditTitle(e.target.value.slice(0, limitKarakterTitle));
  };
  const onPostBodyChangeHandler = (e) => {
    setLimitKarakterBody(1000);
    setPostEditBody(e.target.value.slice(0, limitKarakterBody));
  };

  const onSubmitPostHandler = (e) => {
    e.preventDefault();

    if (postEditTitle.length || postEditBody.length) {
      const currentDate = new Date().toISOString();
      const updateNewPost = {
        id,
        title: postEditTitle,
        body: postEditBody,
        createdAt: post.createdAt,
        updatedAt: currentDate,
      };

      updatePost(updateNewPost);
      history.push(`/post/${id}`);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Postingan berhasil diperbarui",
      });
    }
  };

  return (
    <>
      {fetchError && <Loading title={fetchError} />}
      {isLoading && !fetchError && <Loading title="Sedang memuat..." />}
      {!isLoading && !fetchError && (
        <>
          {post && (
            <Box>
              <div className="row justify-content-center">
                <div className="col-lg-7 col-sm-12 col-md-10">
                  <div className="pt-5">
                    <BoxTitle title="Edit postingan " />
                    <Form
                      onSubmit={onSubmitPostHandler}
                      className="py-3"
                      autoComplete="off"
                    >
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <div className="text-end">
                          <div className="ms-3"></div>Maksimal{" "}
                          {postEditTitle
                            ? limitKarakterTitle - postEditTitle.length
                            : limitKarakterTitle}{" "}
                          karakter tersisa
                        </div>
                        <Form.Label>Judul Postingan</Form.Label>
                        <Form.Control
                          value={postEditTitle}
                          onChange={onPostTitleChangeHandler}
                          type="text"
                          placeholder="Judul artikel"
                          isInvalid={postEditTitle.length >= 50}
                          isValid={
                            postEditTitle.length && postEditTitle.length >= 10
                          }
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
                          value={postEditBody}
                          onChange={onPostBodyChangeHandler}
                          as="textarea"
                          rows={8}
                          placeholder="Tuliskan isi artikel..."
                          isInvalid={
                            postEditBody && postEditBody.length >= 1000
                          }
                          isValid={postEditBody && postEditBody.length >= 30}
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
                            postEditTitle.length >= 50 ||
                            postEditBody.length >= 1000 ||
                            !postEditTitle.length ||
                            !postEditBody.length
                          }
                          className="ms-2"
                          variant="dark"
                          size="lg"
                          type="submit"
                        >
                          Edit postingan
                        </Button>
                      </div>
                    </Form>
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
