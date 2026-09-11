import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { ShoppingCart, BookOpen, LogOut, User } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart.cart);

  const cartItems =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold"
        >
          <BookOpen size={25} />
          BookStore
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="hover:text-blue-300 transition"
          >
            Home
          </Link>

          {user && (
            <>
              <Link
                to="/cart"
                className="relative flex items-center gap-1 hover:text-blue-300"
              >
                <ShoppingCart size={20} />

                Cart

                {cartItems > 0 && (
                  <span className="absolute -top-3 -right-4 bg-red-500 text-xs rounded-full px-2 py-0.5">
                    {cartItems}
                  </span>
                )}
              </Link>

              <span className="flex items-center gap-1">
                <User size={18} />
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 hover:text-red-300"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link
                to="/login"
                className="hover:text-blue-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;