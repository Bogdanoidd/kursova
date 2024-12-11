import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    if (username.trim()) {
      navigate("/chat", { state: { username } });
    }
  };
  return (
    <div className="login">
        <div className="loginbox">
            <h2>Авторизація</h2>
            <input type="text" placeholder="Уведіть нікнейм" value={username} onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleLogin}>Авторизуватись</button>
        </div>
    </div>
);
}
export default LoginPage;
