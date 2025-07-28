import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

function ArticleFormTinyMCE() {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("NEWS");
    const [category, setCategory] = useState("INTRODUCE");
    const [content, setContent] = useState("");

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
                    <option value="NEWS">Tin tức</option>
                    <option value="ANSWER_THE_QUESTION">Trả lời câu hỏi</option>
                </select>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="INTRODUCE">GIỚI_THIỆU</option>
                    <option value="NEWS_AND_EVENT">TIN_TỨC_SỰ_KIỆN</option>
                </select>

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

                            return axios.post(
                                "http://localhost:8080/api/articles/upload",
                                formData,
                                { headers: { "Content-Type": "multipart/form-data" } }
                            )
                                .then(response => {
                                    console.log("Upload response:", response.data);
                                    if (response.data && response.data.location) {
                                        return response.data.location; // trả về URL hợp lệ
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

                <button type="submit">Lưu</button>
            </form>
        </div>
    );
}

export default ArticleFormTinyMCE;
