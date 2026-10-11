const db = require("../db");

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({
      message: "Please fill all fields",
    });
  }
  db.query(
    "INSERT INTO users(name,email,password) VALUES(?,?,?)",
    [name, email, password],
    (err, result) => {
      if (err) {
        return res.json({
          message: "Error",
        });
      }

      res.json({
        message: "Registered",
      });
    },
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      message: "Please fill all fields",
    });
  }

  db.query("SELECT * FROM users WHERE email=?", [email], (err, result) => {
    if (result.length === 0) {
      return res.json({
        message: "User does not exist",
      });
    }

    if (result[0].password !== password) {
      return res.json({
        message: "Incorrect password",
      });
    }

    res.json({
      message: "Login Success",
      user: result[0],
    });
  });
};

exports.createPost = (req, res) => {
  const { title, category, content, user_id } = req.body;

  db.query(
    "INSERT INTO blogs(title,category,content,user_id) VALUES(?,?,?,?)",
    [title, category, content, user_id],
    (err, result) => {
      if (err) {
        return res.json({
          message: "Error",
        });
      }

      res.json({
        message: "Post Created",
      });
    },
  );
};
exports.getBlogs = (req, res) => {
  db.query(
    `
    SELECT blogs.*, users.name
    FROM blogs
    JOIN users
    ON blogs.user_id = users.id
    `,
    (err, result) => {
      if (err) {
        return res.json([]);
      }

      res.json(result);
    },
  );
};

exports.getBlogsByCategory = (req, res) => {
  const { category } = req.params;

  db.query(
    `
    SELECT blogs.*, users.name
    FROM blogs
    JOIN users
    ON blogs.user_id = users.id
    WHERE blogs.category = ?
    `,
    [category],
    (err, result) => {
      if (err) {
        return res.json([]);
      }
      console.log(result);
      res.json(result);
    },
  );
};
exports.updateBlog = (req, res) => {
  const { title, content, category, user_id } = req.body;
  const blogId = req.params.id;

  db.query("SELECT * FROM blogs WHERE id=?", [blogId], (err, result) => {
    if (result.length === 0) {
      return res.json({
        message: "Blog not found",
      });
    }

    if (result[0].user_id != user_id) {
      return res.json({
        message: "You can edit only your own blog",
      });
    }

    db.query(
      "UPDATE blogs SET title=?, content=?, category=? WHERE id=?",
      [title, content, category, blogId],
      (err2) => {
        if (err2) {
          return res.json({
            message: "Error",
          });
        }

        res.json({
          message: "Blog updated successfully",
        });
      },
    );
  });
};

exports.deleteBlog = (req, res) => {
  const blogId = req.params.id;
  const { user_id } = req.body;

  db.query("SELECT * FROM blogs WHERE id=?", [blogId], (err, result) => {
    if (result.length === 0) {
      return res.json({
        message: "Blog not found",
      });
    }

    if (result[0].user_id != user_id) {
      return res.json({
        message: "You can delete only your own blog",
      });
    }

    db.query("DELETE FROM blogs WHERE id=?", [blogId], (err2) => {
      if (err2) {
        return res.json({
          message: "Error",
        });
      }

      res.json({
        message: "Blog deleted successfully",
      });
    });
  });
};
