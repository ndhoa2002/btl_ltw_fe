import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "./api";

function ArticleList() {
  const [articles, setArticles] = useState([]);

  // Lấy danh sách bài viết
  const fetchArticles = async () => {
    try {
      const res = await api.get("/articles");
      setArticles(res.data);
    } catch (err) {
      console.error("Error fetching articles:", err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Xóa bài viết
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      try {
        await api.delete(`/articles/${id}`);
        alert("Bài viết đã được xóa!");
        fetchArticles(); // Reload danh sách sau khi xóa
      } catch (err) {
        console.error("Error deleting article:", err);
        alert("Xóa bài viết thất bại!");
      }
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Danh sách bài viết</h2>
        <Link
          to="/articles/create"
          style={{
            textDecoration: "none",
            backgroundColor: "green",
            color: "white",
            padding: "6px 12px",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          + Tạo bài viết mới
        </Link>
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Tiêu đề</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <tr key={article.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {article.title}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <Link
                    to={`/articles/${article.id}`}
                    style={{
                      marginRight: "10px",
                      textDecoration: "none",
                      color: "white",
                      backgroundColor: "blue",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    UPDATE
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}
              >
                Không có bài viết nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ArticleList;
