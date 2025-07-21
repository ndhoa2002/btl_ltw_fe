import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await axios.get("http://localhost:8080/api/articles");
      setArticles(res.data);
    };
    fetchArticles();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>Danh sách bài viết</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {articles.map((article) => (
          <li key={article.id} style={{ margin: "10px 0" }}>
            <Link to={`/articles/${article.id}`} style={{ textDecoration: "none", color: "blue" }}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;
