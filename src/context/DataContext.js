import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [searchArticle, setSearchArticle] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:5000/articles"
  );

  useEffect(() => {
    setArticles(data);
  }, [data]);

  return (
    <DataContext.Provider
      value={{
        articles,
        setArticles,
        searchResult,
        setSearchResult,
        fetchError,
        isLoading,
        searchArticle,
        setSearchArticle,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
