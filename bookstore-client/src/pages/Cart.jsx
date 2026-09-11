import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
} from "../features/cart/cartSlice";
import { Trash2 } from "lucide-react";

function Cart() {
  const dispatch = useDispatch();

  const { cart, loading, error } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = (bookId, quantity) => {
    if (quantity < 1) return;

    dispatch(
      updateCartItem({
        bookId,
        quantity,
      })
    );
  };

  const handleRemove = (bookId) => {
    dispatch(removeCartItem(bookId));
  };

  if (loading && !cart) {
    return (
      <div className="text-center py-20">
        Loading cart...
      </div>
    );
  }

  const items = cart?.items || [];

  const total = items.reduce((sum, item) => {
    return sum + item.book.price * item.quantity;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <h2 className="text-xl font-semibold">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-2">
            Add some books to your cart.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">

            {items.map((item) => (
              <div
                key={item.book._id}
                className="bg-white rounded-xl shadow p-5 flex gap-5 items-center"
              >

                <img
                  src={
                    item.book.image ||
                    "https://via.placeholder.com/100x140?text=Book"
                  }
                  alt={item.book.title}
                  className="w-24 h-32 object-cover rounded-lg"
                />

                <div className="flex-1">

                  <h2 className="font-bold text-lg">
                    {item.book.title}
                  </h2>

                  <p className="text-gray-500">
                    {item.book.author}
                  </p>

                  <p className="font-semibold mt-2">
                    ₹{item.book.price}
                  </p>

                  <div className="flex items-center gap-3 mt-4">

                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.book._id,
                          item.quantity - 1
                        )
                      }
                      className="w-8 h-8 border rounded"
                    >
                      -
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.book._id,
                          item.quantity + 1
                        )
                      }
                      className="w-8 h-8 border rounded"
                    >
                      +
                    </button>

                  </div>

                </div>

                <div className="text-right">

                  <p className="font-bold">
                    ₹{item.book.price * item.quantity}
                  </p>

                  <button
                    onClick={() =>
                      handleRemove(item.book._id)
                    }
                    className="text-red-500 mt-5 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl shadow p-6 h-fit">

            <h2 className="text-xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3">
              <span>Items</span>
              <span>{items.length}</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>

          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;
