import React from "react";
import Box from "../components/box/Box";
import BoxTitle from "../components/box/BoxTitle";
import BoxSubheading from "../components/box/BoxSubheading";
import ArticleItem from "../components/articles/ArticleItem";
import SearchArticle from "../components/articles/SearchArticle";
import SearchResultArticle from "../components/articles/SearchResultArticle";
import Loading from "../components/shared/Loading";
import Message from "../components/shared/Message";

export default function Home({
  articles,
  isLoading,
  searchArticle,
  setSearchArticle,
  result,
}) {
  return (
    <>
      {isLoading && <Loading title="Sedang memuat..." />}
      {!isLoading && (
        <Box>
          <div className="mx-md-2 mb-3">
            <BoxTitle title="DAFTAR ARTIKEL" />
            <BoxSubheading
              title={`${
                !articles.length
                  ? "Belum menulis artikel"
                  : articles.length + " artikel ditulis"
              } `}
            />
            <SearchArticle
              title="Cari semua artikel..."
              searchArticle={searchArticle}
              setSearchArticle={setSearchArticle}
            />
          </div>

          {!articles.length && <Message message="Belum Menulis Artikel." />}
          {!searchArticle && <ArticleItem articles={articles} />}
          {searchArticle && <SearchResultArticle results={result} />}
        </Box>
      )}
    </>
  );
}
