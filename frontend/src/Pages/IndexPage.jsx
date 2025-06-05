import React from "react";
import axios from "axios";
import Editor from "../components/Editor";

function IndexPage(){
    const handleSubmit = async (html) => {
    await axios.post("http://localhost:3000/api/posts", { content: html });
    alert("Content submitted!");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Enter Text Here</h1>
      <Editor onSubmit={handleSubmit} />
    </div>
  );
}

export default IndexPage