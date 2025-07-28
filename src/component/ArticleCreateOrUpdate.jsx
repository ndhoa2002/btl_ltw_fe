import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import api from "./api";

function ArticleCreateOrUpdate() {
  const { id } = useParams();       // Lấy id từ URL
  const navigate = useNavigate();   // Dùng để điều hướng về danh sách sau khi update

  const [title, setTitle] = useState("");
  const [type, setType] = useState("NEWS");
  const [category, setCategory] = useState("INTRODUCE");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch dữ liệu bài viết hiện tại
  useEffect(() => {
    if (id) {
      api.get(`/articles/${id}`)
        .then(res => {
          const data = res.data;
          setTitle(data.title);
          setCategory(data.category);
          setContent(data.content);
          setUserId(data.user.id);
        })
        .catch(err => console.error("Error fetching article:", err));
    }
  }, [id]);

  // Hàm submit update bài viết
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    try {
      if (id) {
        // Cập nhật bài viết
        await api.put(`/articles/${id}`, {
          id,
          title,
          category,
          content,
          userId
        });
        alert("Bài viết đã được cập nhật!");
      } else {
        // Tạo mới bài viết
        await api.post("/articles", {
          title,
          category,
          content,
          userId: 1
        });
        alert("Bài viết mới đã lưu!");
      }
      navigate("/articles"); // Quay lại danh sách bài viết
    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data.errors) {
        // Nếu có lỗi validation từ BE
        setValidationErrors(err.response.data.errors);
      } else {
        console.error("Error saving article:", err);
        alert("Đã xảy ra lỗi khi lưu bài viết!");
      }
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <Link to="/">← Quay lại danh sách</Link>
      <h2>{id ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
          {validationErrors.title && (
            <p style={{ color: "red", marginTop: "5px" }}>
              {validationErrors.title}
            </p>
          )}
        </div>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="INTRODUCE">GIỚI_THIỆU</option>
          <option value="NEWS_AND_EVENT">TIN_TỨC_SỰ_KIỆN</option>
        </select>

        <div style={{ marginBottom: "10px" }}>
          <Editor
            apiKey="n3kxhrveca1is968o5bxlw315g5060dra8v1a7wofh0jla3n"
            value={content}
            onEditorChange={(newContent) => setContent(newContent)}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
                'table', 'emoticons', 'help'
              ],
              toolbar:
                'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
                'forecolor backcolor emoticons | help',
              automatic_uploads: true,
              file_picker_types: "image",
              images_upload_handler: (blobInfo) => {
                const formData = new FormData();
                formData.append("upload", blobInfo.blob(), blobInfo.filename());

                return api.post(
                  "/articles/upload",
                  formData,
                  { headers: { "Content-Type": "multipart/form-data" } }
                )
                  .then(response => {
                    if (response.data && response.data.location) {
                      return response.data.location;
                    } else {
                      throw new Error("No location returned from server.");
                    }
                  })
                  .catch(err => {
                    console.error("Upload failed:", err);
                    throw new Error("Upload failed: " + err.message);
                  });
              },
            }}
          />
          {validationErrors.content && (
            <p style={{ color: "red", marginTop: "5px" }}>
              {validationErrors.content}
            </p>
          )}
        </div>

        <button type="submit">{id ? "CẬP NHẬT" : "THÊM MỚI"}</button>
      </form>
    </div>
  );
}

export default ArticleCreateOrUpdate;
