import { useState, useEffect } from "react";
import useAuth from "../hook/AuthContextHook";
import { useNavigate, Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import SEO from "../components/SEO";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (userInfo) navigate("/", { replace: true }); }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) { setError("Please fill in all fields"); return; }
    const result = await login(email, password);
    if (result.success) navigate("/", { replace: true });
    else setError(result.meswarm-grey);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 transition-colors duration-500">
      <div className="w-full max-w-md rounded-[20px] sm:rounded-[28px] bg-white dark:bg-plum-light p-5 sm:p-6 md:p-8 shadow-sm border border-gold/20 dark:border-indigo-light/30">
        <SEO
          title="Login"
          description="Sign in to your Tamrapatra account. Access your orders, wishlist, and handcrafted collection."
          keywords="Tamrapatra login, sign in, account access"
          url="https://tamrapatra.com/login"
        />
        <div className="mb-6 sm:mb-8 text-center">
          <Leaf className="mx-auto text-indigo dark:text-warm-grey" size={32} strokeWidth={1.5} />
          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-heading text-indigo dark:text-ivory">Welcome Back</h2>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-indigo dark:text-ivory/60 font-body">Sign in to access your profile and wishlist</p>
        </div>

        {error && (
          <div className="mb-4 sm:mb-6 rounded-lg sm:rounded-xl bg-red-100 dark:bg-red-900/30 p-3 sm:p-4 text-xs sm:text-sm text-red-700 dark:text-red-400 font-body">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-body font-medium text-indigo dark:text-ivory/70">Email Address</label>
            <input type="email" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg sm:rounded-xl border border-gold/30 dark:border-indigo-light/30 bg-transparent p-2.5 sm:p-3 text-sm sm:text-base text-indigo dark:text-ivory outline-none transition focus:border-indigo font-body" />
          </div>
          <div>
            <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-body font-medium text-indigo dark:text-ivory/70">Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg sm:rounded-xl border border-gold/30 dark:border-indigo-light/30 bg-transparent p-2.5 sm:p-3 text-sm sm:text-base text-indigo dark:text-ivory outline-none transition focus:border-indigo font-body" />
          </div>
          <button type="submit" className="w-full rounded-lg sm:rounded-xl bg-indigo p-2.5 sm:p-3 text-base sm:text-lg font-body font-semibold text-ivory transition hover:bg-indigo-light">Sign In</button>
        </form>

        <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-indigo dark:text-ivory/60 font-body">
          New to Tamrapatra?{" "}
          <Link to="/register" className="font-medium text-indigo dark:text-warm-grey hover:text-indigo-light">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
