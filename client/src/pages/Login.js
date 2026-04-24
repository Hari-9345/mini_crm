import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      console.log("LOGIN RESPONSE:", res.data);

      // 🔥 STORE TOKEN CORRECTLY
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");

      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={login}>Login</button>
    </div>
  );
}