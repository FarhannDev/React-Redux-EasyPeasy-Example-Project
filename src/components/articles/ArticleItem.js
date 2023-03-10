import React from "react";
import { Card } from "react-bootstrap";
import styles from "../../styles/articles.module.css";

export const ArticleItemList = ({ articles }) => {
  return (
    <>
      <div className="col-xl-6 col-md-6 col-sm-12">
        <Card className={styles.cardArticle}>
          <Card.Body>
            <Card.Title className={styles.cardArticleTitle}>
              {articles.title}
            </Card.Title>
            <Card.Text className={styles.cardArticleBody}>
              {articles.contentSnipet}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default function ArticleItem({ articles }) {
  return (
    <div className="row justify-content-arround">
      {articles?.map((article, index) => (
        <ArticleItemList key={index} articles={article} />
      ))}
    </div>
  );
}
