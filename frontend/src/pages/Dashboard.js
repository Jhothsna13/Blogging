import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async (category = "") => {
    let url = "http://localhost:5000/auth/blogs";

    if (category) {
      url = `http://localhost:5000/auth/blogs/${category}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    setBlogs(data);
  };

  const deleteBlog = async (id) => {
    const user_id = localStorage.getItem("userId");

    const res = await fetch(`http://localhost:5000/auth/delete-blog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    });

    const data = await res.json();

    alert(data.message);

    fetchBlogs();
  };

  const editBlog = (blog) => {
    navigate("/edit-blog", {
      state: blog,
    });
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>BLOGGER</h2>

        <ul>
          <li onClick={() => fetchBlogs("Tech")}>Tech</li>
          <li onClick={() => fetchBlogs("Travel")}>Travel</li>
          <li onClick={() => fetchBlogs("Cooking")}>Cooking</li>
          <li onClick={() => fetchBlogs("Books")}>Books</li>
          <li onClick={() => navigate("/create-post")}>Write Your Post</li>
        </ul>
      </div>

      <div className="content">
        <h1>Blogs</h1>

        {blogs.map((blog) => (
          <div key={blog.id}>
            <h2>{blog.title}</h2>
            <h4>{blog.category}</h4>
            <p>Author: {blog.name}</p>
            <p>{blog.content}</p>

            {Number(loggedInUserId) === blog.user_id && (
              <>
                <button onClick={() => editBlog(blog)}>Edit</button>
                <button onClick={() => deleteBlog(blog.id)}>Delete</button>
              </>
            )}

            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
