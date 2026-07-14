import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-plum-light shadow-sm border-b border-gray-200 dark:border-indigo-light/30 flex items-center justify-between px-4 sm:px-6 py-3">
      <h2 className="text-base sm:text-xl font-semibold text-indigo dark:text-ivory ml-10 lg:ml-0">Admin Panel</h2>
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 dark:bg-indigo-light/20 text-gray-500 dark:text-ivory hover:bg-gray-200 dark:hover:bg-indigo-light/40 transition-all"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-indigo text-ivory px-3 sm:px-4 py-2 rounded-xl text-sm font-body font-medium hover:bg-indigo-light transition-all"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
