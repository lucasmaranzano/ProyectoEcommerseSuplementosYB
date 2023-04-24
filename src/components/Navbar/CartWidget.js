import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartWidget = () => {
  const { cart } = useContext(CartContext);

  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (    
      <Link to="/checkout" className="cart-widget-link">
        <FaShoppingCart size={30} />
        {quantity ? (
          <span className="cart-widget-badge badge rounded-pill bg-danger">
            {quantity}
          </span>
        ) : null}
      </Link>
  );
};

export default CartWidget;
