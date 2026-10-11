import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const postBlog = async () => {
    const user_id = localStorage.getItem("userId");

    const res = await fetch("http://localhost:5000/auth/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        category,
        content,
        user_id,
      }),
    });

    const data = await res.json();
    alert(data.message);
    if (data.message === "Post Created") {
      alert("Post Created");
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-container">
      <h1>Create Post</h1>

      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />

      <input
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        placeholder="Write your blog..."
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={postBlog}>Post</button>
    </div>
  );
}

export default CreatePost;
