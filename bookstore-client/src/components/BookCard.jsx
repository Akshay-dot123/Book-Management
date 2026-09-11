import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function BookCard({ book }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      
      <img
        src={
          book.image ||
          "https://via.placeholder.com/300x400?text=No+Image"
        }
        alt={book.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-5">
        
        <h2 className="text-lg font-bold text-slate-800 line-clamp-2">
          {book.title}
        </h2>

        <p className="text-gray-500 mt-1">
          by {book.author}
        </p>

        <p className="text-sm text-blue-600 mt-2">
          {book.category}
        </p>

        <div className="flex items-center gap-1 mt-3">
          <Star
            size={17}
            className="fill-yellow-400 text-yellow-400"
          />

          <span>
            {book.averageRating || 0}
          </span>

          <span className="text-gray-400 text-sm">
            ({book.reviewCount || 0})
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold">
            ₹{book.price}
          </span>

          <Link
            to={`/books/${book._id}`}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookCard;