import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useStoreActions } from "easy-peasy";
import useAxiosFetch from "./hooks/useAxiosFetch";
import Layout from "./components/shared/Layout";
import Container from "./components/shared/Container";
import PageNotFound from "./components/PageNotFound";
import PostHome from "./components/posts/PostHome";
import PostSinglePage from "./components/posts/PostSinglePage";
import CreateNewPost from "./components/posts/CreateNewPost";
import PostEdit from "./components/posts/PostEdit";

export default function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch("YOUR_API_KEY");

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

  return (
    <Layout>
      <Container>
        <Switch>
          <Route exact path="/">
            <PostHome isLoading={isLoading} fetchError={fetchError} />
          </Route>
          <Route exact path="/post">
            <CreateNewPost isLoading={isLoading} fetchError={fetchError} />
          </Route>
          <Route exact path="/post/:id">
            <PostSinglePage isLoading={isLoading} fetchError={fetchError} />
          </Route>
          <Route exact path="/post/:id/edit">
            <PostEdit isLoading={isLoading} fetchError={fetchError} />
          </Route>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Container>
    </Layout>
  );
}
