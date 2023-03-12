import React from "react";
import { Card } from "react-bootstrap";
import { format } from "date-fns";
import styles from "../../styles/articles.module.css";
import Message from "../shared/Message";
export default function SearchResult({ result }) {
  return (
    <>
      {!result.length && <Message message="Postingan tidak ditemukan." />}
      <div className="row justify-content-center">
        {result.map((result, index) => (
          <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <Card className={styles.cardArticle}>
              <Card.Body>
                <div className="text-white mb-3">
                  {format(new Date(result.createdAt), `dd MMM yyyy (pp)`)}
                </div>
                <Card.Title className={styles.cardArticleTitle}>
                  {result.title}
                </Card.Title>
                <Card.Text className={styles.cardArticleBody}>
                  {`${result.body.slice(0, 120)}...`}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
