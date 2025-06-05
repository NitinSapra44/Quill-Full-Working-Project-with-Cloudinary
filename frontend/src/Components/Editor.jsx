// src/components/Editor.jsx
import React, { useState, useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";

// ✅ Register image resize module
Quill.register("modules/imageResize", ImageResize);

const Size = Quill.import("attributors/style/size");
Size.whitelist = ["12px", "14px", "18px", "24px", "32px", "48px"];
Quill.register(Size, true);

const Editor = ({ onSubmit }) => {
  const quillRef = useRef(null);
  const [value, setValue] = useState("");

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Hello_12"); //Here Hello_12 is unsigned cloudinary preset

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/djwqli3w2/image/upload",  //Here djwqli3w2 is Cloudinary Cloud Name
          formData
        );
        console.log(res.data)
        const imageUrl = res.data.secure_url;
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, "image", imageUrl);
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    };
  };

  // ✅ Note: `imageResize` is lowercase here
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ size: Size.whitelist }],
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
    imageResize: {
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  }), []);

  const handleSubmit = () => {
    onSubmit(value);
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={setValue}
        modules={modules}
        theme="snow"
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Editor;
