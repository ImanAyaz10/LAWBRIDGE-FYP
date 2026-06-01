import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import PageTransition from "../components/animations/PageTransition";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/login", formData);

      // Save token and user info in Context
      login(response.data.token, response.data);
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      // Redirect based on role
      if (response.data.role === "lawyer") {
        navigate("/lawyer-dashboard");
      } else if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="login-container">
        <div className="login-box">
          <h2>Login to Your Account</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <div className="relative flex items-center w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pr-12"
                style={{ width: "100%", boxSizing: "border-box" }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-slate-400 hover:text-[#1e6b52] transition-colors cursor-pointer flex items-center"
                style={{ padding: 0, margin: 0 }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="register-link">
            Don't have an account?
            <Link to="/signup"> Sign Up</Link>
          </p>
        </div>
      </div>
    </PageTransition>
  );
}

export default Login;