import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { cartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [count, setCount] = useState(0);
  const { cartDetails, removeProduct, updateCount, clearCart } = useContext(cartContext);
  const [loading, setLoading] = useState(null);
  const [loadingClearCart, setLoadingClearCart] = useState(false);

  useEffect(() => {
    //console.log(cartDetails);
  }, [cartDetails]);

  //* To Remove from cart
  async function deleteProduct(id) {
    setLoading(id);
    let data = await removeProduct(id);
    console.log(data);
    setLoading(null);
  }

  //* To update the  quantity of the cart
  async function updateItem(id, count) {
    let data = await updateCount(id, count);
    console.log(data);
  }

  //* Clear all the cart
  async function handleClearCart() {
    await clearCart();
  }

  async function handleClearCart() {
    setLoadingClearCart(true);
    await clearCart();
    setLoadingClearCart(false);
  }

  return (
    <>
      {cartDetails ? (
        cartDetails.data.products.length === 0 ? (
          <h1 className="text-center text-3xl sm:text-5xl py-20 sm:py-48 font-medium md:h-full">
            The Cart is Empty🛒
          </h1>
        ) : (
          <div className="container py-10 px-4 h-full sm:px-8 bg-green-100 ">
            <div className="pb-4">
              <h1 className="text-2xl sm:text-4xl font-semibold pb-3">
                Cart Shop😎
              </h1>
              <h3 className="text-lg sm:text-xl">
                Number Of Items:{" "}
                <span className="text-main font-medium">
                  {cartDetails.numOfCartItems}
                </span>
              </h3>
              <h3 className="text-lg sm:text-xl">
                Total Cart Price:{" "}
                <span className="text-main font-medium">
                  EGP {cartDetails.data.totalCartPrice}
                </span>
              </h3>
            </div>

            <button
              onClick={handleClearCart}
              disabled={loadingClearCart}
              className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mb-5 ms-auto block ${
                loadingClearCart ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loadingClearCart ? "Clearing..." : "Clear the Cart 🗑"}
            </button>

            <div className="flex flex-col gap-6 mx-16">
              {cartDetails.data.products.map((product) => (
                <div
                  key={product.product._id}
                  className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center"
                >
                  <img
                    src={product.product.imageCover}
                    className="w-32 sm:w-48 h-auto rounded-md"
                    alt={product.product.title}
                  />
                  <div className="flex-1 text-center sm:text-left sm:ml-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {product.product.title}
                    </h2>
                    <p className="text-gray-500 text-sm">EGP {product.price}</p>
                    <div className="flex justify-center sm:justify-start items-center mt-2">
                      <button
                        onClick={() =>
                          updateItem(product.product._id, product.count - 1)
                        }
                        className="p-1 h-6 w-6 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="mx-2">{product.count}</span>
                      <button
                        onClick={() =>
                          updateItem(product.product._id, product.count + 1)
                        }
                        className="p-1 h-6 w-6 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0">
                    {loading === product.product._id ? (
                      <span className="text-blue-600 font-medium">
                        Removing...
                      </span>
                    ) : (
                      <button
                        onClick={() => deleteProduct(product.product._id)}
                        className="text-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <Link
                to="/checkout"
                className="bg-main text-white text-lg sm:text-2xl p-2 sm:p-4 rounded-md"
              >
                Checkout
              </Link>
            </div>
          </div>
        )
      ) : (
        <h1 className="text-2xl text-center py-8">Loading...</h1>
      )}
    </>
  );
}