import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="left">
        <h1>BLOGGER</h1>
      </div>

      <div className="right">
        <p>Every story needs to be heard</p>

        <button onClick={() => navigate("/login")}>Create Your Own Blog</button>

        <button onClick={() => navigate("/register")}>Sign Up</button>
      </div>
    </div>
  );
}

export default Home;
