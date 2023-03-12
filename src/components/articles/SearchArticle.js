import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import DataContext from "../../context/DataContext";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function SearchArticle({ title }) {
  const inputRef = useRef();
  const { articles, searchArticle, setSearchArticle, setSearchResult } =
    useContext(DataContext);

  useEffect(() => {
    const filteredResult = articles.filter((article) =>
      article.title.toLowerCase().includes(searchArticle.toLowerCase())
    );

    setSearchResult(filteredResult);
  }, [articles, searchArticle, setSearchResult]);

  const onSearchChangeEventHandler = (e) => setSearchArticle(e.target.value);

  return (
    <div className="py-3">
      <div className="row justify-content-end">
        <div className="col-lg-5 col-md-6 col-sm-12">
          <Form onSubmit={(e) => e.preventDefault()} autoComplete="off">
            <InputGroup className="mb-3">
              <Form.Control
                ref={inputRef}
                value={searchArticle}
                onChange={onSearchChangeEventHandler}
                placeholder={title}
                aria-label={title}
              />
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
}
