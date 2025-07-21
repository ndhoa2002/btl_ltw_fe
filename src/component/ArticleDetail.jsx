import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await axios.get(`http://localhost:8080/api/articles/${id}`);
      setArticle(res.data);
    };
    fetchArticle();
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Link to="/">← Quay lại danh sách</Link>
      <h1>{article.title}</h1>
      <p><b>Ngày đăng:</b> {new Date(article.date).toLocaleDateString()}</p>
      <p><b>Loại:</b> {article.type} | <b>Danh mục:</b> {article.category}</p>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
}

export default ArticleDetail;
