import React, { useState, useEffect } from "react";
import "./styles/CartPage.css";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BounceLoader } from "react-spinners";

console.log("API Instance:", API);

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showDeleteSelectedModal, setShowDeleteSelectedModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [outOfStockItems, setOutOfStockItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await API.get("/cart/cart");
        setCartItems(response.data.items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        if (error.response && error.response.status === 401) {
          toast.error("Unauthorized! Please log in.");
        } else {
          toast.error("Failed to fetch cart items. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveMultiple = async (itemIds) => {
    try {
      // Make the DELETE request to your API
      const response = await API.delete('/cart/remove-multiple', {
        data: { itemIds }, // Send the itemIds in the request body
      });
  
      if (response.status === 200) {
        console.log('Items removed successfully:', response.data.message);
        toast.success('Items removed successfully!');
  
        // Optionally, update the cart items in the frontend (to reflect the changes)
        setCartItems((prevItems) =>
          prevItems.filter((item) => !itemIds.includes(item.productId._id))
        );
        setShowModal(false);
      } else {
        console.error('Failed to remove items:', response.data.message || 'Unknown error');
        toast.error(response.data.message || 'Failed to remove items.');
      }
    } catch (error) {
      console.error('Error removing items:', error);
      toast.error('An error occurred while removing items.');
    }
  };

  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const openModal = () => {
    const outOfStock = cartItems.filter((item) => item.productId.quantity === 0);
    setOutOfStockItems(outOfStock);
    setShowModal(true);
  };

  const handleSelectAll = () => {
    const inStockItems = cartItems.filter((item) => item.productId.quantity > 0).map((item) => item.productId._id);
    if (selectedItems.length === inStockItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(inStockItems);
    }
  };

  const handleQuantityChange = async (itemId, quantity) => {
    if (quantity < 1) {
      const item = cartItems.find((item) => item.productId._id === itemId);
      setShowRemoveModal(true);
      setItemToRemove(item);
      return;
    }

    try {
      await API.patch(`/cart/update-quantity`, { productId: itemId, quantity });
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.productId._id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity. Please try again.");
    }
  };

  const confirmRemoveItem = async () => {
    try {
      const productDetails = await API.get(`/products/${itemToRemove.productId._id}`);
      const productName = productDetails.data.name;
      await API.post(`/cart/remove`, { productId: itemToRemove.productId._id });
      setCartItems(cartItems.filter((item) => item.productId._id !== itemToRemove.productId._id));
      setShowRemoveModal(false);
      setItemToRemove(null);
      toast.success(`${productName} removed successfully.`);
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item. Please try again.");
    }
  };

  const confirmDeleteSelectedItems = async () => {
    try {
      await API.post(`/cart/remove-selected`, { items: selectedItems });
      setCartItems(cartItems.filter((item) => !selectedItems.includes(item.productId._id)));
      setSelectedItems([]);
      setShowDeleteSelectedModal(false);
      toast.success("Selected items removed successfully.");
    } catch (error) {
      console.error("Error removing selected items:", error);
      toast.error("Failed to remove selected items. Please try again.");
    }
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.productId._id))
      .reduce((acc, item) => acc + item.quantity * item.productId.price, 0);
  };



  if (loading) {
    // Show Spinner while loading
    return (
      <div className="loading-spinner">
        <BounceLoader color="#729762" size={50} />
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <p>Your cart is empty!</p>
        <button onClick={() => navigate("/dashboard/Products")} className="shop-btn">
          Shop Now
        </button>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate("dashboard/checkout");
  };

  
  

  
  return (
    <>
      
      <div className="cart-page">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <div className="cart-total-items">Total Items: {cartItems.length}</div>
          <div className="cart-actions">
            <button onClick={() => navigate("/wishlist")} className="wishlist-btn">
              ❤️ Wishlist
            </button>
            <button
              onClick={() => setShowDeleteSelectedModal(true)}
              className="delete-btn"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
  
        {/* Section for Items in Stock */}
        <div className="cart-items">
          <div className="cart-select-all">
            <input
              type="checkbox"
              checked={
                selectedItems.length === cartItems.filter((item) => item.productId.quantity > 0).length
              }
              onChange={handleSelectAll}
            />
            <span>Select All</span>
          </div>
  
          {cartItems
            .filter((item) => item.productId.quantity > 0)
            .map((item) => (
              <div key={item.productId._id} className="cart-item">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.productId._id)}
                  onChange={() => handleSelectItem(item.productId._id)}
                />
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="product-image"
                />
                <div className="item-details">
                  <h3>{item.productId.name}</h3>
                  <p className="price">Price: ${item.productId.price.toFixed(2)}</p>
                </div>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => {
                    setShowRemoveModal(true);
                    setItemToRemove(item);
                  }}
                >
                  🗑️ Remove
                </button>
              </div>
            ))}
        </div>
  
        {/* Section for Unavailable Items */}
        {cartItems.some((item) => item.productId.quantity === 0) && (
          <div className="cart-unavailable-items">
            <div className="unavailable-header">
              <h2>Unavailable Items</h2>
              <button
                className="delete-all-btn"
                onClick={openModal}
              >
                Remove All
              </button>
            </div>
            {cartItems
              .filter((item) => item.productId.quantity === 0)
              .map((item) => (
                <div key={item.productId._id} className="cart-item out-of-stock">
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="product-image blur-image"
                  />
                  <div className="item-details">
                    <h3>{item.productId.name}</h3>
                    <p className="price">Price: ${item.productId.price.toFixed(2)}</p>
                    <p className="out-of-stock-text">Out of Stock</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowRemoveModal(true);
                      setItemToRemove(item);
                    }}
                    className="delete-btn"
                  >
                    🗑️ Remove
                  </button>
                </div>
              ))}
          </div>
        )}
  
      </div>
  
      <div className="cart-bottom-bar">
        <div className="cart-select-all">
          <input
            type="checkbox"
            checked={
                selectedItems.length === cartItems.filter((item) => item.productId.quantity > 0).length
              }
            onChange={handleSelectAll}
          />
          <span>Select All</span>
        </div>
        <div className="total-amount">Total: ${calculateTotal().toFixed(2)}</div>
        <button 
          className="checkout-btn" 
          onClick={handleCheckout}
        >
          Checkout ({selectedItems.length} items)
        </button>
      </div>
  
      {showRemoveModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <h3>
              Are you sure you want to remove this item:{" "}
              <strong style={{ color: "#f44336" }}>
                {itemToRemove?.productId?.name || "this item"}
              </strong>{" "}
              from the cart?
            </h3>
            <button onClick={() => setShowRemoveModal(false)} className="modal-close">
              Close
            </button>
            <div className="delete-modal-actions">
              <button className="delete-modal-confirm-btn" onClick={confirmRemoveItem}>
                Yes, Remove
              </button>
              <button
                className="delete-modal-cancel-btn"
                onClick={() => setShowRemoveModal(false)}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
  
      {showDeleteSelectedModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <h3>Are you sure you want to remove the following items from the cart?</h3>
            <ul className="delete-items-list">
              {selectedItems.map((selectedId) => {
                const item = cartItems.find(
                  (cartItem) => cartItem.productId._id === selectedId
                );
                return <li key={selectedId}>{item?.productId?.name || "Unnamed Item"}</li>;
              })}
            </ul>
            <button
              onClick={() => setShowDeleteSelectedModal(false)}
              className="modal-close"
            >
              Close
            </button>
            <div className="delete-modal-actions">
              <button
                className="delete-modal-confirm-btn"
                onClick={confirmDeleteSelectedItems}
              >
                Yes, Remove All
              </button>
              <button
                className="delete-modal-cancel-btn"
                onClick={() => setShowDeleteSelectedModal(false)}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
  
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Removal</h3>
            <p> Are you sure you want to remove all 
                <span className="out-of-stock-text"> Out of Stock</span> items?
            </p>

            <ul className="delete-items-list">
              {outOfStockItems.map((item) => (
                <li key={item.productId._id}>{item.productId.name}</li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="modal-close"
            >
              Close
            </button>
            <div className="delete-modal-actions">
              <button
                className="delete-modal-confirm-btn"
                onClick={() =>
                  handleRemoveMultiple(outOfStockItems.map((item) => item.productId._id))
                }
              >
                Yes, Confirm
              </button>
              <button className="delete-modal-cancel-btn" onClick={() => setShowModal(false)}>
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
};

export default CartPage;
