import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../features/books/bookSlice";
import { addToCart } from "../features/cart/cartSlice";
import { Star, ShoppingCart } from "lucide-react";

function BookDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedBook, loading, error } = useSelector(
    (state) => state.books
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchBookById(id));
  }, [dispatch, id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const result = await dispatch(
      addToCart({
        bookId: id,
        quantity,
      })
    );

    if (addToCart.fulfilled.match(result)) {
      alert("Book added to cart");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading book...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!selectedBook) {
    return (
      <div className="text-center py-20">
        Book not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="bg-white rounded-xl shadow-lg p-8 grid md:grid-cols-2 gap-10">

        {/* Image */}
        <div>
          <img
            src={
              selectedBook.image ||
              "https://via.placeholder.com/500x600?text=No+Image"
            }
            alt={selectedBook.title}
            className="w-full max-h-[600px] object-contain rounded-lg"
          />
        </div>

        {/* Details */}
        <div>

          <p className="text-blue-600 font-medium">
            {selectedBook.category}
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {selectedBook.title}
          </h1>

          <p className="text-gray-500 text-lg mt-2">
            by {selectedBook.author}
          </p>

          <div className="flex items-center gap-2 mt-5">

            <Star
              size={20}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="font-medium">
              {selectedBook.averageRating || 0}
            </span>

            <span className="text-gray-500">
              ({selectedBook.reviewCount || 0} reviews)
            </span>

          </div>

          <p className="text-3xl font-bold mt-6">
            ₹{selectedBook.price}
          </p>

          <p className="text-gray-600 leading-7 mt-6">
            {selectedBook.description}
          </p>

          <div className="mt-6 space-y-2">
            <p>
              <strong>ISBN:</strong>{" "}
              {selectedBook.ISBN}
            </p>

            <p>
              <strong>Stock:</strong>{" "}
              {selectedBook.stock}
            </p>
          </div>

          {selectedBook.stock > 0 ? (
            <div className="flex gap-4 mt-8">

              <input
                type="number"
                min="1"
                max={selectedBook.stock}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Number(e.target.value))
                }
                className="w-24 border rounded-lg px-3 py-3"
              />

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white rounded-lg px-6 py-3 flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

            </div>
          ) : (
            <div className="mt-8 bg-red-100 text-red-700 p-4 rounded-lg">
              Out of stock
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default BookDetails;