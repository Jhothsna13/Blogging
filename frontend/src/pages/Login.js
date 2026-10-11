import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.message === "Login Success") {
      localStorage.setItem("userId", data.user.id);
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

      <input
        type="passwosrd"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
