import React from "react";
import { Route, Switch } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Layout from "./components/shared/Layout";
import Container from "./components/shared/Container";
import PageNotFound from "./components/PageNotFound";
import Home from "./containers/Home";
import AddNewArticle from "./containers/AddNewArticle";
import DetailArticle from "./containers/DetailArticle";
import EditArticle from "./containers/EditArticle";

export default function App() {
  return (
    <Layout>
      <Container>
        <DataProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/article" component={AddNewArticle} />
            <Route exact path="/article/:id" component={DetailArticle} />
            {/* <Route exact path="/article/:id/edit" component={EditArticle} /> */}
            <Route path="*" component={PageNotFound} />
          </Switch>
        </DataProvider>
      </Container>
    </Layout>
  );
}
