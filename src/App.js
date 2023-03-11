import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Layout from "./components/shared/Layout";
import Container from "./components/shared/Container";
import Home from "./pages/Home";
import ArticlesDetails from "./pages/articles/ArticlesDetails";
import PageNotFound from "./components/PageNotFound";
import ArticleAdd from "./components/articles/ArticleAdd";

export default function App() {
  const history = useHistory();
  const [articles, setArticles] = useState([]);
  const [searchArticles, setSearchArticles] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [limit, setLimit] = useState("");
  const [state, setState] = useState({
    title: "",
    contentSnipet: "",
  });

  useEffect(() => {
    const fetchDataArticle = async () => {
      try {
        const response = await axios.get("http://localhost:5000/articles");
        const data = response.data;
        setArticles(data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setIsloading(true);
        } else if (error.request) {
          console.log(error.request);
          setIsloading(true);
        } else {
          console.log(error.message);
          setIsloading(true);
        }
      }
    };
    (async () => fetchDataArticle())();
  }, []);

  useEffect(() => {
    const filteredResult = articles.filter((article) =>
      article.title.toLowerCase().includes(searchArticles.toLowerCase())
    );

    setSearchResult(filteredResult);
  }, [articles, searchArticles]);

  useEffect(() => {
    if (state.title.length) {
      setLimit(50);
    }
  }, [limit, state.title]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!state.title || !state.contentSnipet)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Artikel tidak boleh kosong!",
      });
    try {
      const uniqueId =
        Date.now().toString(36) +
        Math.floor(
          Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
        ).toString(36);
      // Passing data
      const newArticle = {
        ...state,
        id: uniqueId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await axios.post(
        "http://localhost:5000/articles",
        newArticle
      );
      // setArticles([...articles, response.data]);
      setArticles([...articles, response.data]);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Berhasil menambahkan artikel",
      });

      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Layout>
        <Container>
          <Switch>
            <Route exact path="/">
              <Home
                articles={articles}
                result={searchResult}
                searchArticle={searchArticles}
                setSearchArticle={setSearchArticles}
              />
            </Route>
            <Route exact path="/articles/new">
              <ArticleAdd
                state={state}
                setState={setState}
                limit={limit}
                onSubmitHandler={onSubmitHandler}
              />
            </Route>
            <Route exact path="/articles/:id">
              <ArticlesDetails articles={articles} />
            </Route>

            <Route path="*" component={PageNotFound} />
          </Switch>
        </Container>
      </Layout>
    </>
  );
}
