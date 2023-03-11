import React from "react";
import ArticleItemList from "./ArticleItemList";

export default function ArticleItem({ articles }) {
  return (
    <div className="row justify-content-arround">
      {articles?.map((article, index) => (
        <ArticleItemList key={index} articles={article} />
      ))}
    </div>
  );
}
