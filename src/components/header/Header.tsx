import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-blue-700">Krishna Wisdom</h1>

      <div className="hidden gap-6 text-sm font-medium text-slate-700 md:flex">
        <Link to="/books" className="hover:text-blue-700">
          Books
        </Link>
        <Link to="/gallery" className="hover:text-blue-700">
          Gallery
        </Link>
        <Link to="/about" className="hover:text-blue-700">
          About
        </Link>
      </div>
    </nav>
  );
}

export default Header;
