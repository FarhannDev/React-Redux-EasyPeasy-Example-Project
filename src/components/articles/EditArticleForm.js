import { useRef } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function EditArticleForm({
  editTitle,
  editContentSnipet,
  setEditTitle,
  setEditContentSnipet,
  limit,
  onSubmitHandler,
}) {
  const inputRef = useRef();
  return (
    <Form onSubmit={onSubmitHandler} className="py-3" autoComplete="off">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <div className="text-end">
          <div className="ms-3"></div>Jumlah karakter tersisa:{" "}
          {limit ? limit - editTitle.length : 50}
        </div>
        <Form.Label>Judul Artikel</Form.Label>
        <Form.Control
          ref={inputRef}
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          type="text"
          placeholder="Judul artikel"
          maxLength={limit}
          isInvalid={editTitle.length >= 50}
          isValid={editTitle.length && editTitle.length >= 10}
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
          value={editContentSnipet}
          onChange={(e) => setEditContentSnipet(e.target.value)}
          as="textarea"
          rows={8}
          placeholder="Tuliskan isi artikel..."
          isInvalid={editContentSnipet && editContentSnipet.length >= 1000}
          isValid={editContentSnipet && editContentSnipet.length >= 30}
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
            editTitle.length >= 50 ||
            editContentSnipet.length >= 1000 ||
            !editTitle.length ||
            !editContentSnipet.length
          }
          className="ms-2"
          variant="dark"
          size="lg"
          type="submit"
        >
          Perbarui artikel
        </Button>
      </div>
    </Form>
  );
}
