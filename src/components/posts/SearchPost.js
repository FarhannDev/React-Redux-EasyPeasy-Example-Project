import React, { useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useStoreState, useStoreActions } from "easy-peasy";

export default function SearchPost({ posts, title }) {
  const inputRef = useRef();
  const searchPost = useStoreState((state) => state.searchPost);
  const setSearchPost = useStoreActions((actions) => actions.setSearchPost);
  const setSearchResults = useStoreActions(
    (actions) => actions.setSearchResults
  );

  useEffect(() => {
    const filteredResult = posts.filter((post) =>
      post.title.toLowerCase().includes(searchPost.toLowerCase())
    );

    setSearchResults(filteredResult);
  }, [posts, searchPost, setSearchResults]);

  const onSearchChangeEventHandler = (e) => setSearchPost(e.target.value);

  return (
    <div className="py-3">
      <div className="row justify-content-end">
        <div className="col-lg-5 col-md-6 col-sm-12">
          <Form onSubmit={(e) => e.preventDefault()} autoComplete="off">
            <InputGroup className="mb-3">
              <Form.Control
                ref={inputRef}
                value={searchPost}
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
