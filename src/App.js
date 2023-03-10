import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
// Include components
import Layout from "./components/shared/Layout";
import Container from "./components/shared/Container";
import Home from "./pages/Home";
import Articles from "./pages/articles/Articles";
import ArticlesDetails from "./pages/articles/Articles";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import axios from "axios";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [searchArticles, setSearchArticles] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const requestApi = async () => {
      try {
        const response = await axios.get("http://localhost:5000/articles");
        const responseData = response.data;
        setArticles(responseData);
      } catch (error) {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
          setIsloading(true);
        }
        if (error.response && error.response.status === 404) setIsloading(true);
      }
    };

    const filteredResult = articles.filter((article) =>
      article.title.toLowerCase().includes(searchArticles.toLowerCase())
    );

    setSearchResult(filteredResult);
    setTimeout(() => {
      setIsloading(false);
      (async () => requestApi())();
    }, 1500);
  }, [articles, searchArticles]);

  return (
    <Layout>
      <Container>
        <Switch>
          <Route exact path="/">
            <Home
              articles={articles}
              result={searchResult}
              isLoading={isLoading}
              searchArticle={searchArticles}
              setSearchArticle={setSearchArticles}
            />
          </Route>
          <Route exact path="/articles" component={Articles} />
          <Route exact path="/articles/:id" component={ArticlesDetails} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Container>
    </Layout>
  );
}
