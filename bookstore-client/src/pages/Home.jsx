import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/books/bookSlice";
import BookCard from "../components/BookCard";
import { Search } from "lucide-react";

function Home() {
  const dispatch = useDispatch();

  const {
    books,
    loading,
    error,
  } = useSelector((state) => state.books);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(
      fetchBooks({
        search,
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-900">
          Welcome to BookStore
        </h1>

        <p className="text-gray-500 mt-3">
          Discover your next favorite book
        </p>
      </div>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="max-w-xl mx-auto flex mb-10"
      >
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 rounded-r-lg hover:bg-blue-700"
        >
          <Search size={20} />
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <div className="text-center py-10">
          Loading books...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Books */}
      {!loading && books.length === 0 && (
        <div className="text-center text-gray-500">
          No books found.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;