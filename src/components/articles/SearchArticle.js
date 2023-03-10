import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
export default function SearchArticle({
  title,
  searchArticle,
  setSearchArticle,
}) {
  const inputRef = useRef();
  return (
    <div className="py-3">
      <div className="row justify-content-end">
        <div className="col-lg-5 col-md-6 col-sm-12">
          <Form onSubmit={(e) => e.preventDefault()}>
            <InputGroup className="mb-3">
              <Form.Control
                ref={inputRef}
                value={searchArticle}
                onChange={(e) => setSearchArticle(e.target.value)}
                placeholder={title}
                aria-label={title}
                aria-describedby="basic-addon2"
              />
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
}
