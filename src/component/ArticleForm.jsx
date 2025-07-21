import React, { useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import {Image, ImageResizeEditing, ImageResizeHandles} from "@ckeditor/ckeditor5-build-classic";
// import CustomEditor from "./CustomEditor";
import axios from "axios";

function ArticleForm() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("TYPE_1");
  const [category, setCategory] = useState("CATEGORY_1");
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/articles", {
      title,
      content,
      type,
      category,
    });
    alert("Bài viết đã lưu!");
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <h2>Tạo bài viết</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="TYPE_1">TYPE_1</option>
          <option value="TYPE_2">TYPE_2</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="CATEGORY_1">CATEGORY_1</option>
          <option value="CATEGORY_2">CATEGORY_2</option>
        </select>

        <CKEditor
          editor={ClassicEditor}
          data={content}
          config={{
            ckfinder: { uploadUrl: "http://localhost:8080/api/articles/upload" }
          }}
          onChange={(event, editor) => setContent(editor.getData())}
        />

        <button type="submit">Lưu</button>
      </form>
    </div>
  );
}

export default ArticleForm;
