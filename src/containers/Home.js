import React, { useContext } from "react";
import DataContext from "../context/DataContext";
import Box from "../components/box/Box";
import BoxTitle from "../components/box/BoxTitle";
import BoxSubheading from "../components/box/BoxSubheading";
import ArticleItem from "../components/articles/ArticleItem";
import SearchArticle from "../components/articles/SearchArticle";
import SearchResultArticle from "../components/articles/SearchResultArticle";
import Loading from "../components/shared/Loading";
import Message from "../components/shared/Message";
import Button from "../components/shared/Button";

export default function Home() {
  const { articles, searchArticle, isLoading, fetchError, searchResult } =
    useContext(DataContext);

  console.log({ isArtikel: { ...articles } });
  console.log({ isSearchResult: { ...searchResult } });

  return (
    <>
      {fetchError && <Loading title={fetchError} />}
      {isLoading && !fetchError && <Loading title="Sedang memuat..." />}
      {!isLoading && !fetchError && (
        <Box>
          <div className="mx-md-2 mb-3">
            <BoxTitle title="DAFTAR ARTIKEL" />
            {articles.length >= 1 && (
              <BoxSubheading
                title={`${articles.length + " artikel ditulis"} `}
              />
            )}
            <SearchArticle title="Cari semua artikel..." />
            <Button urlRedirect="/article" icon="fas fa-2x fa-pencil-alt" />
          </div>

          {!searchArticle && !articles.length && (
            <Message message="Belum Menulis Artikel." />
          )}
          {!searchArticle && <ArticleItem articles={articles} />}
          {searchArticle && <SearchResultArticle result={searchResult} />}
        </Box>
      )}
    </>
  );
}
