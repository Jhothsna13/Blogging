import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditBlog() {
  const location = useLocation();
  const navigate = useNavigate();

  const blog = location.state;

  if (!blog) {
    return (
      <div>
        <h2>No Blog Data Found</h2>
      </div>
    );
  }

  const [title, setTitle] = useState(blog.title);
  const [category, setCategory] = useState(blog.category);
  const [content, setContent] = useState(blog.content);

  const updateBlog = async () => {
    const user_id = localStorage.getItem("userId");

    const res = await fetch(
      `http://localhost:5000/auth/update-blog/${blog.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          content,
          user_id,
        }),
      },
    );

    const data = await res.json();

    alert(data.message);

    if (data.message === "Blog updated successfully") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-container">
      <h1>Edit Blog</h1>

      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        value={category}
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        value={content}
        placeholder="Write your blog..."
        onChange={(e) => setContent(e.target.value)}
        rows="8"
      />

      <button onClick={updateBlog}>Update Blog</button>
    </div>
  );
}

export default EditBlog;
