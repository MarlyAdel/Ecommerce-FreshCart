import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { cartContext } from "../../Context/CartContext";
import { tokenContext } from "../../Context/tokenContext";
import { jwtDecode } from "jwt-decode";
import SharedModel from "../SharedModel/SharedModel";
import Loader from "../Shared/Loader/Loader";



export default function AllOrders() {
  const [Orders, setOrders] = useState([]);
  let { getUserOrder } = useContext(cartContext);
  let { token } = useContext(tokenContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [displayModel, setDisplayModel] = useState(false);
  const [loading, setLoading] = useState(true);

  function getId() {
    let decode = jwtDecode(token);
    console.log(decode, "hello from jwtDecode");
    getOrders(decode.id);
  }

  async function getOrders(id) {
    
    setLoading(true); 
    try {
      let data = await getUserOrder(id);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); 
    }
  }
  

  function openModel(items) {
    setSelectedItems(items);
    setDisplayModel(true);
  }

  function closeModel(){
    setDisplayModel(false);
  }


  useEffect(() => {
    token && getId();
  }, [token]);

  return (
    <>
      <div className="container my-12 h-full">
        <h1 className="text-5xl text-blue-950 text-center font-medium mb-16">
          All Orders
        </h1>

        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-6 mx-12">
            {Orders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 sm:flex-row sm:items-center"
              >
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-900">
                    Order ID: {order.id}
                  </p>
                  <p className="text-gray-600">
                    Status: {order.isPaid ? "Paid" : "Not Paid"}
                  </p>
                  <p className="text-gray-600">
                    Payment: {order.paymentMethodType}
                  </p>
                  <p className="text-gray-600">Total: ${order.totalOrderPrice}</p>
                </div>
                <button
                  onClick={() => openModel(order.cartItems)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
                >
                  <i className="fa fa-eye mr-2"></i>View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {displayModel && (
        <SharedModel closeModel={closeModel} selectedItems={selectedItems} />
      )}
    </>
  );
}
