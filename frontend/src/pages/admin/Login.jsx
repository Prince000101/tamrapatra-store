import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Leaf, Sun, Moon } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { userInfo, login, logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && (userInfo.role === "admin" || userInfo.isAdmin === true)) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (result.success) {
      const isAdmin = result.user?.role === "admin" || result.user?.isAdmin === true;
      if (isAdmin) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError("Access denied. Admin only.");
        logout();
      }
    } else {
      setError(result.meswarm-grey || "Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-plum p-4">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-plum-light text-gray-500 dark:text-ivory shadow-sm border border-gray-200 dark:border-indigo-light/30 hover:bg-gray-100 dark:hover:bg-indigo-light/20 transition-all"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-plum-light shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200 dark:border-indigo-light/30"
      >
        <div className="flex items-center justify-center gap-2.5 mb-2">
          <Leaf className="text-indigo dark:text-warm-grey" size={28} strokeWidth={1.5} />
          <span className="text-2xl font-heading font-semibold text-indigo dark:text-ivory">Tamrapatra</span>
        </div>
        <h2 className="text-xl font-bold mb-6 text-center text-gray-800 dark:text-ivory">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-xl border border-gray-200 dark:border-indigo-light/30 bg-white dark:bg-plum-dark text-sm text-gray-800 dark:text-ivory focus:outline-none focus:ring-2 focus:ring-indigo/20 placeholder:text-gray-400 dark:placeholder:text-ivory/40"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-xl border border-gray-200 dark:border-indigo-light/30 bg-white dark:bg-plum-dark text-sm text-gray-800 dark:text-ivory focus:outline-none focus:ring-2 focus:ring-indigo/20 placeholder:text-gray-400 dark:placeholder:text-ivory/40"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <p className="mb-4 text-sm text-red-500 dark:text-red-400 text-center font-medium">{error}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo text-ivory p-3 rounded-xl font-medium hover:bg-indigo-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
