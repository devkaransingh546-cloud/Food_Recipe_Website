import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password
    };
    try {
      if (isLogin) {
        await login({ email: payload.email, password: payload.password });
      } else {
        await register(payload);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Authentication failed");
    }
  };

  return (
    <section className="auth-card">
      <h1>{isLogin ? "Login" : "Create account"}</h1>
      <form onSubmit={onSubmit} className="stack">
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
          required
          minLength={6}
        />
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <button className="btn ghost" onClick={() => setIsLogin((v) => !v)}>
        {isLogin ? "Need an account? Register" : "Already have an account? Login"}
      </button>
    </section>
  );
}
