import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/articles.module.css";

export default function ArticleItemList({ articles }) {
  return (
    <>
      <div className="col-xl-6 col-md-6 col-sm-12">
        <Link
          to={`/article/${articles.id}`}
          className="text-decoration-none"
          aria-label="Selengkapnya"
        >
          <Card className={styles.cardArticle}>
            <Card.Body>
              <Card.Title className={styles.cardArticleTitle}>
                {articles.title.length <= 50
                  ? articles.title
                  : `${articles.title.slice(0, 50)}...`}
              </Card.Title>
              <Card.Text className={styles.cardArticleBody}>
                {`${articles.contentSnipet.slice(0, 120)}...`}
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </>
  );
}
