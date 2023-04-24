import React from "react";
import "./ItemQuantitySelector.css";

// componente para seleccionar la cantidad de un producto
function ItemQuantitySelector({ quantity, setQuantity }) {
  // manejar el cambio en la cantidad a través del input
  const handleQuantityChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    setQuantity(value === "" ? 1 : parseInt(value));
  };

  // disminuir la cantidad en 1
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
    }
  };

  // aumentar la cantidad en 1
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // renderizar el componente
  return (
    <div className="d-flex justify-content-center">
      <div className="input-group input-group-responsive">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleDecreaseQuantity}
        >
          -
        </button>
        <input
          type="text"
          className="form-control text-center"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleIncreaseQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ItemQuantitySelector;
