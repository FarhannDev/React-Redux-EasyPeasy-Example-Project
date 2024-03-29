import { useRef } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function CreateArticle({
  state,
  setState,
  limit,
  onSubmitHandler,
}) {
  const inputRef = useRef();
  return (
    <Form onSubmit={onSubmitHandler} className="py-3" autoComplete="off">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <div className="text-end">
          <div className="ms-3"></div>Jumlah karakter tersisa:{" "}
          {limit ? limit - state.title.length : 50}
        </div>
        <Form.Label>Judul Artikel</Form.Label>
        <Form.Control
          ref={inputRef}
          value={state.title}
          onChange={(e) => {
            setState({
              ...state,
              title: e.target.value,
            });
          }}
          type="text"
          placeholder="Judul artikel"
          maxLength={limit}
          isInvalid={state.title.length >= 50}
          isValid={state.title.length && state.title.length >= 10}
          max={250}
        />

        <Form.Control.Feedback
          className="font-weight-bold"
          type="invalid"
          role="alert"
        >
          Batas karakter sudah maksimal
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Deskripsi</Form.Label>
        <Form.Control
          ref={inputRef}
          value={state.contentSnipet}
          onChange={(e) =>
            setState({
              ...state,
              contentSnipet: e.target.value,
            })
          }
          as="textarea"
          rows={8}
          placeholder="Tuliskan isi artikel..."
          isInvalid={state.contentSnipet && state.contentSnipet.length >= 1000}
          isValid={state.contentSnipet && state.contentSnipet.length >= 30}
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
            state.title.length >= 50 ||
            state.contentSnipet.length >= 1000 ||
            !state.title.length ||
            !state.contentSnipet.length
          }
          className="ms-2"
          variant="dark"
          size="lg"
          type="submit"
        >
          Simpan artikel
        </Button>
      </div>
    </Form>
  );
}
