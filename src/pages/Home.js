import React, { useEffect, useState } from "react";
import Box from "../components/box/Box";
import BoxTitle from "../components/box/BoxTitle";
import BoxSubheading from "../components/box/BoxSubheading";
import ArticleItem from "../components/articles/ArticleItem";
import SearchArticle from "../components/articles/SearchArticle";
import SearchResultArticle from "../components/articles/SearchResultArticle";
import Loading from "../components/shared/Loading";
import Message from "../components/shared/Message";
import Button from "../components/shared/Button";

export default function Home({
  articles,
  searchArticle,
  setSearchArticle,
  result,
}) {
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  }, []);

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
            <Button name="Tambah artikel baru" urlRedirect="/articles/new" />
          </div>

          {!articles.length && <Message message="Belum Menulis Artikel." />}
          {!searchArticle && <ArticleItem articles={articles} />}
          {searchArticle && <SearchResultArticle results={result} />}
        </Box>
      )}
    </>
  );
}
