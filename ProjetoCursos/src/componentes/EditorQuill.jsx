import React from "react";
import ReactQuill, { Quill } from "react-quill-new"; 
import "react-quill-new/dist/quill.snow.css";
import "./EditorQuill.css";

function EditorQuill({ value, onChange }) {
  return (
    <div className="quill-wrapper">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder="Digite aqui o conteúdo do curso..."
          modules={EditorQuill.modules}
          formats={EditorQuill.formats}
        />
    </div>
  );
}

EditorQuill.modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }], 
    ["link", "image", "video"],
    ["clean"],
  ],
};

EditorQuill.formats = [
  "header", "bold", "italic", "underline", "strike",
  "color", "background", "list", "align", 
  "link", "image", "video",
];

export default EditorQuill;